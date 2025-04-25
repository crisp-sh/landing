"use client";

import * as React from "react";
// Import types separately
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  TableMeta, // Import TableMeta if needed later in columns
} from "@tanstack/react-table";
// Import runtime functions
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Import shared data and types from cost-calculator
// import { MODELS } from "./cost-calculator"; // REMOVED THIS LINE
import type { ModelInfo } from "./cost-calculator";
// Import the function to get columns
import { getPricingColumns } from "./columns";

// Import shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import { Label } from "@/components/ui/label"; // Import Label
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DataTablePagination,
  DataTableViewOptions,
} from "@/components/ui/data-table-utils"; // Import utils

// Define Props for PricingTable
interface PricingTableProps {
  data: ModelInfo[]; // Accept data as a prop
}

// Define custom meta type (No longer needed for this approach)
// interface PricingTableMeta {
//   showPerMillionTokens: boolean;
// }

// Main PricingTable component using TanStack Table
export default function PricingTable({ data }: PricingTableProps) { // Destructure data from props
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [showPerMillionTokens, setShowPerMillionTokens] = React.useState<boolean>(false); // State for checkbox

  // Generate columns based on the current state
  const columns = React.useMemo(
    () => getPricingColumns(showPerMillionTokens),
    [showPerMillionTokens] // Re-generate columns when the state changes
  );

  const table = useReactTable<ModelInfo>({
    data, // Use the data prop
    columns, // Use the generated columns
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    // Meta is no longer needed here for passing the flag
    // meta: {
    //   showPerMillionTokens,
    // } as PricingTableMeta, 
    // Handlers for state changes
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    // Row model functions
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Initial state configuration (optional)
    // initialState: {
    //   pagination: {
    //     pageSize: 10, // Default page size
    //   },
    // },
  });

  return (
    <div className="w-full space-y-4">
      {/* Filter and View Options - Add Checkbox */}
      <div className="flex items-center justify-between py-4 gap-4"> {/* Add gap */}
        <Input
          placeholder="Filter models by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-xs h-8" // Slightly smaller max width
        />
        {/* Group Checkbox and View Options */}
        <div className="flex items-center gap-3"> {/* Smaller gap */}
           <div className="flex items-center space-x-2">
             <Checkbox
               id="showPerMillion"
               checked={showPerMillionTokens}
               onCheckedChange={(checked) => setShowPerMillionTokens(Boolean(checked))}
             />
             <Label htmlFor="showPerMillion" className="text-xs font-normal whitespace-nowrap">
               Show $/1M tokens
             </Label>
           </div>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Table - Use fainter border */}
      <div className="rounded-md border border-border/60"> {/* Adjusted border opacity */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              // Apply faint border to header row as well
              <TableRow key={headerGroup.id} className="border-b border-border/30">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className="h-10 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                // Apply faint border to body rows
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-border/30 last:border-b-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    // Adjust cell padding
                    <TableCell key={cell.id} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length} // Use table.getAllColumns().length for accurate colspan
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - Add padding */}
      <div className="pt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
