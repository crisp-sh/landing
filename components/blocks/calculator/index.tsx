"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import CostCalculator from "./cost-calculator";
import PricingTable from "./pricing-table";
import { ArrowLeftRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define raw model spec type from JSON
type RawModelSpec = {
  input_cost_per_token?: number | null;
  output_cost_per_token?: number | null;
  cache_read_input_token_cost?: number | null;
  output_cost_per_reasoning_token?: number | null; 
  litellm_provider?: string | null;
  mode?: string | null;
  [key: string]: unknown;
};

// UI-friendly model type
export interface ModelInfo {
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
  'openai',
  'anthropic',
  'google',
  'gemini',
  'mistral',
  'meta',
  'deepseek',
  'openrouter',
];

// Helper to get logo URL (Lifted from cost-calculator)
const getLogoUrl = (provider: string | null | undefined, modelId: string): string => {
  const lowerProvider = provider?.toLowerCase();
  const lowerModelId = modelId.toLowerCase();
  if (lowerProvider === 'openrouter') {
    if (lowerModelId.startsWith('gpt-') || lowerModelId.includes('openai')) return "/logos/openai.svg";
    if (lowerModelId.startsWith('claude-') || lowerModelId.includes('anthropic')) return "/logos/anthropic.svg";
    if (lowerModelId.startsWith('gemini-') || lowerModelId.includes('google')) return "/logos/gemini.svg"; 
    if (lowerModelId.startsWith('mistral-') || lowerModelId.includes('mistral')) return "/logos/mistral-color.svg";
    if (lowerModelId.startsWith('llama-') || lowerModelId.includes('meta-llama')) return "/logos/meta-color.svg";
    if (lowerModelId.startsWith('deepseek-') || lowerModelId.includes('deepseek')) return "/logos/deepseek-color.svg"; 
    return "/logos/openrouter.png";
  }
  const logoMap: Record<string, string> = {
    openai: "/logos/openai.svg",
    azure: "/logos/openai.svg",
    anthropic: "/logos/anthropic.svg",
    google: "/logos/google-color.svg",
    gemini: "/logos/gemini.svg",
    mistral: "/logos/mistral-color.svg",
    meta: "/logos/meta-color.svg",
    deepseek: "/logos/deepseek-color.svg",
  };
  return lowerProvider && logoMap[lowerProvider] ? logoMap[lowerProvider] : "/logos/default.svg"; 
};

// Helper function to format provider name (Lifted from cost-calculator)
export const formatProviderName = (provider: string | null | undefined): string => {
  if (!provider) return "Unknown";
  const lowerProvider = provider.toLowerCase();
  const knownCasings: Record<string, string> = { /* ... casings ... */ };
  if (knownCasings[lowerProvider]) return knownCasings[lowerProvider];
  return provider.charAt(0).toUpperCase() + provider.slice(1);
};

// Helper function to format model ID (Lifted from cost-calculator)
const formatModelId = (id: string): string => {
  let formatted = id;
  // ... formatting logic ...
  formatted = formatted.replace(/^gpt-?/, "GPT ");
  formatted = formatted.replace(/^claude-?/, "Claude ");
  formatted = formatted.replace(/^gemini-?/, "Gemini ");
  formatted = formatted.replace(/^command-?/, "Command ");
  formatted = formatted.replace(/^mistral-?/, "Mistral ");
  formatted = formatted.replace(/^llama-?/, "LLaMA ");
  formatted = formatted.replace(/-(?![0-9])/g, " ");
  const dateMatch = formatted.match(/\s(\d{4}-\d{2}-\d{2})$/);
  let dateSuffix = "";
  if (dateMatch) {
    formatted = formatted.substring(0, dateMatch.index).trim();
    dateSuffix = ` (${dateMatch[1]})`;
  }
  formatted = formatted.split(' ').map(word => {
      if (["GPT", "AI", "LLaMA"].includes(word.toUpperCase())) return word.toUpperCase();
      if (/^[0-9.]+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
  return formatted + dateSuffix;
};

// Format model name (Lifted from cost-calculator)
const formatModelName = (id: string, provider: string | null | undefined): string => {
    const providerName = formatProviderName(provider);
    const modelName = formatModelId(id);
    return `${providerName}: ${modelName}`;
}

export default function Calculator() {
  const [showTable, setShowTable] = useState(false);

  // --- State for fetched JSON data (Lifted from cost-calculator) ---
  const [rawModelsData, setRawModelsData] = useState<Record<string, RawModelSpec> | null>(null);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [modelsError, setModelsError] = useState<string | null>(null);

  // --- Effect to fetch JSON data on mount (Lifted from cost-calculator) ---
  useEffect(() => {
    const fetchModels = async () => {
      setModelsLoading(true); // Ensure loading state is set
      setModelsError(null);
      try {
        const response = await fetch('/data/litellm_models.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRawModelsData(data);
      } catch (error) {
        console.error("Failed to fetch models JSON:", error);
        setModelsError("Could not load model pricing data. Please try refreshing.");
      } finally {
        setModelsLoading(false);
      }
    };
    fetchModels();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Process models using useMemo (Lifted from cost-calculator) ---
  const MODELS: ModelInfo[] = useMemo(() => {
    if (!rawModelsData) return [];
    return Object.entries(rawModelsData)
      .map(([id, rawSpec]): (Omit<ModelInfo, 'name'> & { provider: string | null | undefined }) | null => {
        // ... Filtering logic ...
          const provider = rawSpec.litellm_provider;
          if (!provider || !ALLOWED_PROVIDERS.includes(provider.toLowerCase())) return null;
          if (rawSpec.mode !== "chat") return null;
          if (rawSpec.input_cost_per_token == null || rawSpec.output_cost_per_token == null) return null;
          const inputCost = rawSpec.input_cost_per_token || 0;
          const outputCost = rawSpec.output_cost_per_token || 0;
          const cacheCost = rawSpec.cache_read_input_token_cost ?? rawSpec.output_cost_per_reasoning_token ?? 0;
          if (inputCost === 0 && outputCost === 0 && cacheCost === 0) return null;
          return {
            id,
            provider,
            logoUrl: getLogoUrl(provider, id),
            inputCost: inputCost,
            outputCost: outputCost,
            cacheCost: cacheCost,
          };
      })
      .filter((model): model is (Omit<ModelInfo, 'name'> & { provider: string }) => model !== null)
      .map(model => ({
          ...model,
          name: formatModelName(model.id, model.provider),
      }));
  }, [rawModelsData]);

  const variants = {
    hidden: { opacity: 0, y: 15, transition: { duration: 0.3 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
  };

  // Display loading or error state centrally before rendering switchable components
  const renderContent = () => {
    if (modelsLoading) {
      return <div className="p-4 text-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin inline mr-2"/>Loading pricing data...</div>;
    }
    if (modelsError) {
        return <div className="p-4 text-center text-red-600">Error: {modelsError}</div>;
    }
    if (MODELS.length === 0 && !modelsLoading) { // Check after loading attempt
      return <div className="p-4 text-center text-muted-foreground">No compatible models found in pricing data.</div>;
    }

    // Pass MODELS, loading, and error state as props
    return (
      <AnimatePresence mode="wait">
        {showTable ? (
          <motion.div
            key="pricing-table"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <PricingTable 
              models={MODELS} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="cost-calculator"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CostCalculator 
              models={MODELS} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <h3 className="mb-10 sm:mb-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase">
        how much does it <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-green-400">cost</span>?
      </h3>
      <div className="flex justify-center my-6">
        <Button variant="link" size="lg" onClick={() => setShowTable(prev => !prev)} className="shadow-sm hover:shadow-md transition-shadow bg-background/80">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          {showTable ? "Switch to calculator" : "Switch to pricing table"}
        </Button>
      </div>
      <div className="bg-background/70 rounded-md p-6 min-h-[300px] overflow-hidden">
        {renderContent()} { /* Render loading/error or the components */ }
      </div>
    </>
  );
}
