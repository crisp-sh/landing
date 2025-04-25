"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { ModelInfo } from "./cost-calculator" // Import ModelInfo type from cost-calculator
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

// Import the provider formatter from cost-calculator
import { formatProviderName } from "./cost-calculator" 

// Define the meta type (can be removed later if not needed)
interface PricingTableMeta {
  showPerMillionTokens?: boolean; 
}

// Helper to format currency, considering per-million scale
const formatTableCurrency = (value: number | null | undefined, perMillion = false): string => {
  if (value == null) return "-"; 
  // Handle zero explicitly, regardless of scale
  if (value === 0) return "$0.00"; 

  const displayValue = perMillion ? value * 1000000 : value;
  const absDisplayValue = Math.abs(displayValue);

  // Use more precision for very small per-token costs
  if (!perMillion && absDisplayValue > 0 && absDisplayValue < 0.000001) { 
    return `$${displayValue.toFixed(8)}`; 
  }
  
  // For per-million or larger per-token costs, use 2 decimal places
  // Adjusted threshold for switching to 2 decimals if needed
  if (perMillion || absDisplayValue >= 0.01) {
      return `$${displayValue.toFixed(2)}`;
  }

  // Default for smaller per-token costs (e.g., 0.000015)
  return `$${displayValue.toFixed(6)}`; 
};

// Function to generate columns, accepting the state
export const getPricingColumns = (showPerMillion: boolean): ColumnDef<ModelInfo>[] => [
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <Button 
        variant="ghost" 
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 hover:bg-transparent"
      >
        Provider
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
        <div className="flex items-center space-x-2">
            <Image 
                src={row.original.logoUrl}
                alt={`${row.original.name} logo`} 
                width={20}
                height={20} 
                className="h-5 w-5 object-contain flex-shrink-0"
                unoptimized 
            />
            <span>{formatProviderName(row.getValue("provider"))}</span>
        </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Model",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "inputCost",
    header: ({ column }) => {
        const headerText = showPerMillion ? "Input $/1M tokens" : "Input $/token";
        return (
            <Button 
                variant="ghost" 
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="px-0 hover:bg-transparent w-full justify-end uppercase"
            > 
                <div className="text-right whitespace-nowrap">{headerText}</div>
                <ArrowUpDown className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
        );
    },
    cell: ({ row }) => {
      const val = row.getValue("inputCost") as number;
      return <div className="text-right font-mono">{formatTableCurrency(val, showPerMillion)}</div>;
    },
  },
  {
    accessorKey: "outputCost",
    header: ({ column }) => {
        const headerText = showPerMillion ? "Output $/1M tokens" : "Output $/token";
        return (
            <Button 
                variant="ghost" 
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="px-0 hover:bg-transparent w-full justify-end uppercase"
            >
                <div className="text-right whitespace-nowrap">{headerText}</div>
                <ArrowUpDown className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
        );
    },
    cell: ({ row }) => {
      const val = row.getValue("outputCost") as number;
      return <div className="text-right font-mono">{formatTableCurrency(val, showPerMillion)}</div>;
    },
  },
  {
    accessorKey: "cacheCost",
    header: ({ column }) => {
        const headerText = showPerMillion ? "Cache $/1M tokens" : "Cache $/token";
        return (
            <Button 
                variant="ghost" 
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="px-0 hover:bg-transparent w-full justify-end uppercase"
            >
                <div className="text-right whitespace-nowrap">{headerText}</div>
                <ArrowUpDown className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
        );
    },
    cell: ({ row }) => {
      const val = row.getValue("cacheCost") as number;
      return <div className="text-right font-mono">{formatTableCurrency(val, showPerMillion)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
            Copy model ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View details (TBD)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  },
] 