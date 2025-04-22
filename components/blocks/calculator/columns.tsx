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

// Helper to format currency (similar to the one in the old pricing table)
const formatTableCurrency = (value: number | null | undefined): string => {
  if (value == null || value === 0) return "-"; // Display dash for zero or undefined costs
  
  const absValue = Math.abs(value);
  
  // Use more decimal places for very small numbers instead of scientific notation
  if (absValue > 0 && absValue < 0.000001) { 
    return `$${value.toFixed(8)}`; // Show up to 8 decimal places
  }
  
  // For other numbers, stick to 6 decimal places
  return `$${value.toFixed(6)}`; 
};

export const pricingColumns: ColumnDef<ModelInfo>[] = [
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
    header: ({ column }) => (
        <Button 
            variant="ghost" 
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0 hover:bg-transparent w-full justify-end uppercase"
        > 
            <div className="text-right">Input $/token</div>
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("inputCost") as number
      return <div className="text-right font-mono">{formatTableCurrency(val)}</div>
    },
  },
  {
    accessorKey: "outputCost",
    header: ({ column }) => (
        <Button 
            variant="ghost" 
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0 hover:bg-transparent w-full justify-end uppercase"
        >
            <div className="text-right">Output $/token</div>
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("outputCost") as number
      return <div className="text-right font-mono">{formatTableCurrency(val)}</div>
    },
  },
  {
    accessorKey: "cacheCost",
    header: ({ column }) => (
        <Button 
            variant="ghost" 
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0 hover:bg-transparent w-full justify-end uppercase"
        >
            <div className="text-right">Cache read $/token</div>
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("cacheCost") as number
      return <div className="text-right font-mono">{formatTableCurrency(val)}</div>
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