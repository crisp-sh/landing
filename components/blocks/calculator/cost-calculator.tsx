"use client";

import type React from "react"; // Use type import
import { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ModelCombobox } from "./model-combobox";
import { AlertCircle, Eye, Info, Loader2 } from "lucide-react"; // Add Eye, Info, Loader2
import { Separator } from "@/components/ui/separator";
import type { Scenario } from "@/components/ui/scenario-combobox"; // Use type import
import { ScenarioCombobox } from "@/components/ui/scenario-combobox";
import { ScenarioModal } from "@/components/ui/scenario-modal";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
import type { ModelInfo as ParentModelInfo } from "."; // Use aliased import
import Flex, { FlexGroup } from "@/components/ui/flex";

// Define raw model spec type from JSON
type RawModelSpec = {
  input_cost_per_token?: number | null;
  output_cost_per_token?: number | null;
  cache_read_input_token_cost?: number | null;
  output_cost_per_reasoning_token?: number | null; // Include this as fallback
  litellm_provider?: string | null;
  mode?: string | null;
  // Add other potential fields if needed, marking as optional
  [key: string]: unknown; // Allow other fields
};

// UI-friendly model type
export interface ModelInfo {
  // Export interface for PricingTable
  id: string;
  name: string;
  provider: string;
  logoUrl: string;
  inputCost: number;
  outputCost: number;
  cacheCost: number;
}

// Define which providers to include
const ALLOWED_PROVIDERS = [
  "openai",
  "anthropic",
  "google",
  "gemini",
  "mistral",
  "meta",
  "deepseek",
  "openrouter", // Add openrouter
  // Add providers for the specific models below if needed
  // "o3-mini", // Need to confirm provider and add to ALLOWED_PROVIDERS if required
];

// Helper to get logo URL based on provider AND model ID
const getLogoUrl = (
  provider: string | null | undefined,
  modelId: string
): string => {
  const lowerProvider = provider?.toLowerCase();
  const lowerModelId = modelId.toLowerCase();

  // Handle OpenRouter specifically
  if (lowerProvider === "openrouter") {
    if (lowerModelId.startsWith("gpt-") || lowerModelId.includes("openai"))
      return "/logos/openai.svg";
    if (
      lowerModelId.startsWith("claude-") ||
      lowerModelId.includes("anthropic")
    )
      return "/logos/anthropic.svg";
    if (lowerModelId.startsWith("gemini-") || lowerModelId.includes("google"))
      return "/logos/gemini.svg"; // Or google-color.svg
    if (lowerModelId.startsWith("mistral-") || lowerModelId.includes("mistral"))
      return "/logos/mistral-color.svg";
    if (
      lowerModelId.startsWith("llama-") ||
      lowerModelId.includes("meta-llama")
    )
      return "/logos/meta-color.svg";
    if (
      lowerModelId.startsWith("deepseek-") ||
      lowerModelId.includes("deepseek")
    )
      return "/logos/deepseek-color.svg"; // Assuming deepseek logo exists
    // Add more OpenRouter mappings as needed
    return "/logos/openrouter.png"; // Fallback OpenRouter logo if specific mapping missing
  }

  // Existing logic for other providers
  const logoMap: Record<string, string> = {
    openai: "/logos/openai.svg",
    azure: "/logos/openai.svg",
    anthropic: "/logos/anthropic.svg",
    google: "/logos/google-color.svg",
    gemini: "/logos/gemini.svg",
    mistral: "/logos/mistral-color.svg",
    meta: "/logos/meta-color.svg",
    deepseek: "/logos/deepseek-color.svg", // Ensure this exists
    // Add other direct provider mappings
  };
  return lowerProvider && logoMap[lowerProvider]
    ? logoMap[lowerProvider]
    : "/logos/default.svg";
};

// Helper function to format provider name with correct casing
// Export the function so it can be used elsewhere (e.g., columns.tsx)
export const formatProviderName = (
  provider: string | null | undefined
): string => {
  if (!provider) return "Unknown";
  const lowerProvider = provider.toLowerCase();
  // Specific known casings
  const knownCasings: Record<string, string> = {
    openai: "OpenAI",
    anthropic: "Anthropic",
    google: "Google",
    mistral: "Mistral AI", // Example: Adjust if needed
    meta: "Meta",
    gemini: "Gemini",
    xai: "xAI", // Example: Adjust if needed
    qwen: "Qwen", // Example: Adjust if needed
    // Add more specific casings as needed
  };
  if (knownCasings[lowerProvider]) {
    return knownCasings[lowerProvider];
  }
  // General capitalization for others
  return provider.charAt(0).toUpperCase() + provider.slice(1);
};

// Helper function to format model ID into a readable name
const formatModelId = (id: string): string => {
  let formatted = id;
  // Handle common prefixes/patterns
  formatted = formatted.replace(/^gpt-?/, "GPT ");
  formatted = formatted.replace(/^claude-?/, "Claude ");
  formatted = formatted.replace(/^gemini-?/, "Gemini ");
  formatted = formatted.replace(/^command-?/, "Command ");
  formatted = formatted.replace(/^mistral-?/, "Mistral ");
  formatted = formatted.replace(/^llama-?/, "LLaMA ");
  // Replace hyphens with spaces, unless between numbers (like version or date)
  formatted = formatted.replace(/-(?![0-9])/g, " ");
  // Extract and format date (YYYY-MM-DD) if present at the end
  const dateMatch = formatted.match(/\s(\d{4}-\d{2}-\d{2})$/);
  let dateSuffix = "";
  if (dateMatch) {
    formatted = formatted.substring(0, dateMatch.index).trim();
    dateSuffix = ` (${dateMatch[1]})`;
  }
  // Capitalize words (simple approach)
  formatted = formatted
    .split(" ")
    .map((word) => {
      // Keep specific capitalizations like GPT, AI
      if (["GPT", "AI", "LLaMA"].includes(word.toUpperCase()))
        return word.toUpperCase();
      // Capitalize first letter, handle version numbers like 4.1
      if (/^[0-9.]+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return formatted + dateSuffix;
};

// Format model name (e.g., "OpenAI: GPT 4.1 Nano (2025-04-14)")
const formatModelName = (
  id: string,
  provider: string | null | undefined
): string => {
  const providerName = formatProviderName(provider);
  const modelName = formatModelId(id);
  return `${providerName}: ${modelName}`;
};

// --- SCENARIOS Constant with pre-calculated tokens ---
const SCENARIOS: Scenario[] = [
  {
    label: "US Constitution",
    value: "constitution",
    input_tokens: 9022,
    output_tokens: 527,
  },
  {
    label: "College Essay",
    value: "essay",
    input_tokens: 843,
    output_tokens: 580,
  },
  {
    label: "Every Emoji",
    value: "emoji",
    input_tokens: 11451,
    output_tokens: 4217,
  },
  {
    label: "Organic Chemistry, Chapter 5",
    value: "textbook",
    input_tokens: 20196,
    output_tokens: 1392,
  },
];

// --- Define Props for CostCalculator, importing ModelInfo from index ---
interface CostCalculatorProps {
  models: ParentModelInfo[];
}

export default function CostCalculator({
  models: MODELS,
}: CostCalculatorProps) {
  // --- Hooks MUST be called at the top level ---

  // --- Existing State ---
  const [model, setModel] = useState<ParentModelInfo | null>(null);
  const [inTokens, setInTokens] = useState<number>(1695);
  const [outTokens, setOutTokens] = useState<number>(2048);

  // --- New State for Scenarios ---
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    SCENARIOS[0]
  );
  const [inputTokensManuallyEdited, setInputTokensManuallyEdited] =
    useState(false);
  const [outputTokensManuallyEdited, setOutputTokensManuallyEdited] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInputText, setModalInputText] = useState<string | null>(null);
  const [modalOutputText, setModalOutputText] = useState<string | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [scenarioFetchError, setScenarioFetchError] = useState<string | null>(
    null
  );

  // --- Effect to set initial model once MODELS prop is available ---
  useEffect(() => {
    if (MODELS.length > 0 && !model) {
      // Check passed MODELS prop
      const defaultModel = MODELS.find((m) => m.id === "gpt-4.1") || MODELS[0];
      setModel(defaultModel);
    }
    // Don't reset model if MODELS prop changes after initial set,
    // unless specific behavior is desired (e.g., parent filtering changes MODELS)
  }, [MODELS, model]); // Depend on MODELS prop and internal model state

  // --- Effect to update tokens based on selected scenario ---
  useEffect(() => {
    // If no scenario is selected, do nothing (keep manual/previous values)
    if (!selectedScenario) return;

    // Use pre-calculated tokens from the scenario object
    const inputTokens = selectedScenario.input_tokens ?? 0; // Fallback to 0 if undefined
    const outputTokens = selectedScenario.output_tokens ?? 0;

    // Update state only if not manually edited
    if (!inputTokensManuallyEdited) {
      setInTokens(inputTokens);
    }
    if (!outputTokensManuallyEdited) {
      setOutTokens(outputTokens);
    }

    // Reset manual edit flags when a scenario is selected
    // This ensures subsequent scenario selections correctly update the fields
    setInputTokensManuallyEdited(false);
    setOutputTokensManuallyEdited(false);
    setScenarioFetchError(null); // Clear any previous fetch errors (though we aren't fetching tokens here anymore)
  }, [selectedScenario, inputTokensManuallyEdited, outputTokensManuallyEdited]); // Dependencies remain the same

  // --- Event Handlers ---
  // Make sure handlers use the MODELS prop where needed
  const handleModelChange = useCallback(
    (selectedModelId: string) => {
      const newSelectedModel =
        MODELS.find((m) => m.id === selectedModelId) || null;
      setModel(newSelectedModel);
    },
    [MODELS]
  ); // Depend on MODELS prop

  const handleTokenInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setter: React.Dispatch<React.SetStateAction<number>>,
      setManualEditFlag: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      const value = e.target.value;
      const numValue =
        value === "" ? 0 : Number.parseInt(value.replace(/,/g, ""), 10);
      if (!Number.isNaN(numValue)) {
        setter(numValue);
        setManualEditFlag(true);
      } else if (value === "") {
        setter(0);
        setManualEditFlag(true);
      }
    },
    []
  ); // No dependencies needed here usually

  const handleSelectScenario = useCallback((scenario: Scenario | null) => {
    setSelectedScenario(scenario);
  }, []); // No dependencies needed

  const handleViewExample = useCallback(async () => {
    if (!selectedScenario) return;
    setIsModalLoading(true);
    setModalInputText(null);
    setModalOutputText(null);
    setIsModalOpen(true);
    try {
      const [inputRes, outputRes] = await Promise.all([
        fetch(`/data/${selectedScenario.value}/input.txt`),
        fetch(`/data/${selectedScenario.value}/output.txt`),
      ]);
      if (!inputRes.ok || !outputRes.ok) {
        throw new Error(
          `Failed to fetch scenario files for ${selectedScenario.label}`
        );
      }
      const inputText = await inputRes.text();
      const outputText = await outputRes.text();
      setModalInputText(inputText);
      setModalOutputText(outputText);
    } catch (error) {
      console.error("Error fetching scenario for modal:", error);
      setModalInputText("Error loading input text.");
      setModalOutputText("Error loading output text.");
    } finally {
      setIsModalLoading(false);
    }
  }, [selectedScenario]);

  // --- Initial Model Loading Check ---
  if (!model) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
        Initializing calculator...
      </div>
    );
  }

  // --- Cost Calculations (Model is guaranteed non-null here) ---
  const costIn = inTokens * (model?.inputCost ?? 0);
  const costOut = outTokens * (model?.outputCost ?? 0);
  const subtotal = costIn + costOut;

  // --- Helper Functions (Formatters - can stay or be moved) ---
  const formatCurrency = (value: number): string => {
    if (value === 0) return "$0.00";
    // Show up to 6 decimals for values less than 0.01
    if (Math.abs(value) < 0.01) return `$${value.toFixed(6)}`;
    // Otherwise, show standard 2 decimals
    return `$${value.toFixed(2)}`;
  };

  // New formatter for cost per token (avoids scientific notation)
  const formatCostPerToken = (value: number): string => {
    if (value === 0) return "$0.00";
    // Show significant decimals, e.g., up to 8, remove trailing zeros after decimal point if any
    return `$${value.toFixed(8).replace(/\.?0+$/, "")}`;
  };

  const formatNumber = (value: number): string => {
    return value.toLocaleString(); // Displays integer without .00
  };

  // --- Animation Variants ---
  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // --- Render Logic ---
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Inputs & Scenario */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Model Selector - uses MODELS prop */}
          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="block text-lg font-medium mb-4 text-foreground">
              Select Model
            </label>
            <ModelCombobox
              models={MODELS} // Pass MODELS prop
              value={model?.id || null}
              onValueChange={handleModelChange}
            />
          </div>

          {/* Scenario Selector */}
          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Try with a real prompt/response example:
            </label>
            <div className="flex items-center gap-2">
              <ScenarioCombobox
                scenarios={SCENARIOS}
                selectedScenario={selectedScenario}
                onSelectScenario={handleSelectScenario}
                className="flex-grow"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleViewExample}
                    disabled={!selectedScenario}
                    aria-label="View Example Text"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View example prompt & output</p>
                </TooltipContent>
              </Tooltip>
            </div>
            {scenarioFetchError && (
              <p className="text-xs text-red-500 mt-1.5">
                {scenarioFetchError}
              </p>
            )}
          </div>

          {/* Token Inputs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedScenario?.value ?? "manual"} // Animate when scenario changes or goes to manual
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="inTokens"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  <div className="flex items-center">
                     Input Tokens
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 ml-1.5 cursor-help opacity-70" />
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="max-w-xs text-center"
                        >
                          <p>
                            Token estimates based on GPT tokenizer. Counts may
                            differ slightly for other models.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                  </div>
                </label>
                <Input
                  id="inTokens"
                  disabled
                  type="text"
                  value={formatNumber(inTokens)}
                  onChange={(e) =>
                    handleTokenInputChange(
                      e,
                      setInTokens,
                      setInputTokensManuallyEdited
                    )
                  }
                  className="tabular-nums"
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="outTokens"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  <div className="flex items-center">
                      Output Tokens
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 ml-1.5 cursor-help opacity-70" />
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="max-w-xs text-center"
                        >
                          <p>
                            Token estimates based on GPT tokenizer. Counts may
                            differ slightly for other models.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                   </div>
                </label>
                <Input
                  id="outTokens"
                  disabled
                  type="text"
                  value={formatNumber(outTokens)}
                  onChange={(e) =>
                    handleTokenInputChange(
                      e,
                      setOutTokens,
                      setOutputTokensManuallyEdited
                    )
                  }
                  className="tabular-nums"
                  autoComplete="off"
                />
              </div>
              {/* Subcaption */}
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                {selectedScenario ? <span /> : <span />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Cost Breakdown */}
        <div className="w-full md:w-2/3 md:pl-8">
          <h3 className="text-lg font-medium mb-4 text-foreground">
            Cost Breakdown
          </h3>
          <div className="space-y-3 text-sm bg-muted/30 p-4 rounded-md border border-border/50">
            {/* Model Info */}
            <div className="flex items-center justify-between pb-3 border-b border-border/30">
              <div className="flex items-center gap-3">
                <Image
                  src={model.logoUrl ?? "/logos/default.svg"}
                  alt={`${model.provider ?? "Unknown"} logo`}
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <span className="font-medium text-foreground">
                  {model.name ?? "Unknown Model"}
                </span>
              </div>
              <div className="text-right text-muted-foreground">
                <div>
                  Input: {formatCostPerToken(model.inputCost * 1000000)} / 1M
                  tokens
                </div>
                <div>
                  Output: {formatCostPerToken(model.outputCost * 1000000)} / 1M
                  tokens
                </div>
              </div>
            </div>

            {/* Cost Items */}
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Input Cost ({formatNumber(inTokens)} tokens)
              </span>
              <span className="font-medium tabular-nums text-foreground">
                {formatCurrency(costIn)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Output Cost ({formatNumber(outTokens)} tokens)
              </span>
              <span className="font-medium tabular-nums text-foreground">
                {formatCurrency(costOut)}
              </span>
            </div>

            <Separator className="my-3 bg-border/40" />

            {/* Total Cost */}
            <div className="flex justify-between items-center pt-1">
              <span className="text-base font-semibold text-foreground">
                Estimated Total Cost
              </span>
              <span className="text-lg font-bold tabular-nums text-foreground">
                {formatCurrency(subtotal)}
                <span className="text-muted-foreground">*</span>
              </span>
            </div>

            {/* OnlyPrompt Fee (Example) */}
            {/* You can add your platform fee calculation here */}
            {/* <Separator className="my-3 bg-border/40" />
             <div className="flex justify-between items-center pt-1">
                 <span className="text-base font-semibold text-foreground">Total (incl. OnlyPrompt Fee)</span>
                 <span className="text-lg font-bold tabular-nums text-primary">{formatCurrency(subtotal * 1.XX)}</span>
             </div> */}
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mt-4 italic">
            * All costs are estimates based on publicly available pricing data.
            Token counts may vary based on model, message frequency, and other
            factors.
          </p>
        </div>
      </div>

      {/* Scenario Modal */}
      <ScenarioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scenarioLabel={selectedScenario?.label ?? "Example"}
        inputText={modalInputText}
        outputText={modalOutputText}
        isLoading={isModalLoading}
      />
    </TooltipProvider>
  );
}
