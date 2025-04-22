"use client";

import React, { useState } from "react";
// Adjust import path if necessary - assuming public is served statically
import rawModelsJson from "../../../public/data/litellm_models.json"; 
import { Input } from "@/components/ui/input";
import Image from 'next/image'; // Import Image for optimized logos
import { ModelCombobox } from "./model-combobox";
import { AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
export interface ModelInfo { // Export interface for PricingTable
  id: string;
  name: string;
  provider: string; // Add provider field
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
  'mistral', 
  'meta', 
  'gemini', // Added based on logos
  // Add other providers you want to include here
];

// Helper to get logo URL based on provider
const getLogoUrl = (provider: string | null | undefined): string => {
  const logoMap: Record<string, string> = {
    openai: "/logos/openai.svg",
    azure: "/logos/openai.svg", // Often uses OpenAI models
    anthropic: "/logos/anthropic.svg",
    google: "/logos/google-color.svg",
    gemini: "/logos/gemini.svg", // Specific Gemini logo
    mistral: "/logos/mistral-color.svg",
    meta: "/logos/meta-color.svg",
    deepmind: "/logos/deepmind-color.svg", // If distinct
    aistudio: "/logos/aistudio-color.svg", // If distinct
    qwen: "/logos/qwen.svg",
    xai: "/logos/xai.svg",
    // Add other providers and their corresponding logo paths
  };
  // Fallback if provider is unknown or logo missing
  return provider && logoMap[provider.toLowerCase()] ? logoMap[provider.toLowerCase()] : "/logos/default.svg"; // Add a default logo
};

// Helper function to format provider name with correct casing
// Export the function so it can be used elsewhere (e.g., columns.tsx)
export const formatProviderName = (provider: string | null | undefined): string => {
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
  formatted = formatted.split(' ').map(word => {
      // Keep specific capitalizations like GPT, AI
      if (["GPT", "AI", "LLaMA"].includes(word.toUpperCase())) return word.toUpperCase();
      // Capitalize first letter, handle version numbers like 4.1
      if (/^[0-9.]+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
  
  return formatted + dateSuffix;
};

// Format model name (e.g., "OpenAI: GPT 4.1 Nano (2025-04-14)")
const formatModelName = (id: string, provider: string | null | undefined): string => {
    const providerName = formatProviderName(provider);
    const modelName = formatModelId(id);
    return `${providerName}: ${modelName}`;
}

// Raw JSON data assertion
const rawModelsData = rawModelsJson as Record<string, RawModelSpec>;

// Transform raw JSON to UI models array, filtering and mapping
export const MODELS: ModelInfo[] = Object.entries(rawModelsData)
  .map(([id, rawSpec]): (Omit<ModelInfo, 'name'> & { provider: string | null | undefined }) | null => {
    // Basic validation: ensure it's a chat model with defined costs
    if (
      rawSpec.mode !== "chat" ||
      rawSpec.input_cost_per_token == null || 
      rawSpec.output_cost_per_token == null
    ) {
      return null; // Skip models that aren't chat or lack essential costs
    }

    const inputCost = rawSpec.input_cost_per_token || 0;
    const outputCost = rawSpec.output_cost_per_token || 0;
    const cacheCost = rawSpec.cache_read_input_token_cost ?? rawSpec.output_cost_per_reasoning_token ?? 0;
    const provider = rawSpec.litellm_provider;

    // Skip if essential costs are zero (likely not a priced model)
    if (inputCost === 0 && outputCost === 0 && cacheCost === 0) {
        return null;
    }
    
    // Skip if provider is missing or not in the allowed list
    if (!provider || !ALLOWED_PROVIDERS.includes(provider.toLowerCase())) {
        return null;
    }

    // Return intermediate object before final mapping
    return {
      id,
      provider,
      logoUrl: getLogoUrl(provider),
      inputCost: inputCost,
      outputCost: outputCost,
      cacheCost: cacheCost,
    };
  })
  .filter((model): model is (Omit<ModelInfo, 'name'> & { provider: string }) => model !== null) // Filter out nulls and ensure provider is string
  .map(model => ({ // Add the formatted name in the final step
      ...model,
      name: formatModelName(model.id, model.provider),
  }));

// Ensure MODELS is not empty after filtering
if (MODELS.length === 0) {
    // Handle case where no valid models are found
    // You could return a message or a default state
    console.error("No valid models found after filtering.");
    // Potentially throw an error or provide a fallback UI
}


export default function CostCalculator() {
  const [model, setModel] = useState<ModelInfo | null>(MODELS.length > 0 ? MODELS[0] : null);
  const [inTokens, setInTokens] = useState<number>(1695);
  const [outTokens, setOutTokens] = useState<number>(2048);
  const [cacheTokens, setCacheTokens] = useState<number>(0);

  // Simplified initial state handling
  if (MODELS.length === 0) {
    // If MODELS is empty after filtering
    return <div className="p-4 text-center text-muted-foreground">No allowed models found.</div>;
  }

  if (!model) {
     // Initialize model if MODELS exist but model state is somehow null
     // This might happen briefly on first render or if state logic changes
     if (MODELS.length > 0) {
         setModel(MODELS[0]);
     }
     // Return null or a loading indicator while state updates
     return <div className="p-4 text-center text-muted-foreground">Loading model...</div>; // Or return null
  }

  // Cost calculations (ensure model exists)
  const costIn = inTokens * model.inputCost;
  const costOut = outTokens * model.outputCost;
  const costCache = cacheTokens * model.cacheCost;
  const total = costIn + costOut + costCache;

  // Helper to format currency with more precision
  const formatCurrency = (value: number) => {
    // Show more decimals for small values, standard 2 for larger sums
    if (value === 0) return "$0.00";
    if (Math.abs(value) < 0.01) return `$${value.toPrecision(2)}`; // e.g., $0.000030
    return `$${value.toFixed(2)}`; // e.g., $12.34
  };

  const handleModelChange = (selectedModelId: string) => {
    const newSelectedModel = MODELS.find(m => m.id === selectedModelId) || null;
    setModel(newSelectedModel);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
      {/* Model selector - Replace Select with ModelCombobox */}
      <div className="space-y-1.5 md:col-span-2"> {/* Span across two columns for better width */}
        <label htmlFor="model-select" className="block text-sm font-medium text-muted-foreground">
          Select AI Model
        </label>
        <ModelCombobox 
          models={MODELS}
          value={model?.id || null} // Pass current model ID
          onValueChange={handleModelChange} // Pass handler function
          placeholder="Select or search for a model..."
          searchPlaceholder="Search models..."
          notFoundText="No matching models found."
          // className="w-full md:w-[400px]" // Example of controlling width
        />
        {/* <Select ... > // Old Select component removed */}
      </div>

      {/* Spacer div removed as Combobox now spans 2 columns */}
      {/* <div className="hidden md:block" /> */}

      {/* Input tokens */}
      <div className="space-y-1.5">
        <label htmlFor="input-tokens" className="block text-sm font-medium text-muted-foreground">
          Input Tokens
        </label>
        <Input
          id="input-tokens"
          type="number"
          min={1}
          value={inTokens}
          onChange={(e) => setInTokens(Number(e.target.value) || 0)}
          className="h-9" 
        />
        <label htmlFor="input-tokens" className="block text-sm font-medium text-muted-foreground">
          <span className="text-xs text-neutral-500">
            <AlertCircle className="w-4 h-4 inline-block mr-1" /> The transcript of the US Declaration of Independence contains ~1,695 tokens.
          </span>
        </label>
      </div>

      {/* Output tokens */}
      <div className="space-y-1.5">
        <label htmlFor="output-tokens" className="block text-sm font-medium text-muted-foreground">
          Output Tokens
        </label>
        <Input
          id="output-tokens"
          type="number"
          min={1}
          value={outTokens}
          onChange={(e) => setOutTokens(Number(e.target.value) || 0)}
          className="h-9" 
        />
        <label htmlFor="input-tokens" className="block text-sm font-medium text-muted-foreground">
          <span className="text-xs text-neutral-500">
            <AlertCircle className="w-4 h-4 inline-block mr-1" /> 1,500 words ≈ 2048 tokens
          </span>
        </label>
      </div>

      {/* Cached reads */}
      <div className="space-y-1.5">
        <label htmlFor="cached-reads" className="block text-sm font-medium text-muted-foreground">
          Cached Read Tokens
        </label>
        <Input
          id="cached-reads"
          type="number"
          min={0}
          value={cacheTokens}
          onChange={(e) => setCacheTokens(Number(e.target.value) || 0)}
          className="h-9" 
        />
        <label htmlFor="input-tokens" className="block text-sm font-medium text-muted-foreground">
          <span className="text-xs text-neutral-500">
            <AlertCircle className="w-4 h-4 inline-block mr-1" /> Cached responses require a minimum of 1024 tokens.
          </span>
        </label>
      </div>

      {/* Results panel - Enhanced styling */}
      <div className="md:col-span-2 bg-muted/40 p-4 rounded-lg border border-border/70 mt-4">
        <h3 className="text-base font-semibold mb-3 text-foreground">Cost Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Input Cost:</span>
            <span className="font-mono text-foreground">{formatCurrency(costIn)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Output Cost:</span>
            <span className="font-mono text-foreground">{formatCurrency(costOut)}</span>
          </div>
          <div className="flex justify-between items-center pb-3">
            <span className="text-muted-foreground">Cache Read Cost:</span>
            <span className="font-mono text-foreground">{formatCurrency(costCache)}</span>
          </div>
          <Separator className="my-2 bg-muted" decorative={true} />
          <div className="flex justify-between items-center font-bold pt-2 text-xl">
            <span className="text-green-500">Total Estimated Cost:</span>
            <span className="font-mono text-green-500">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
