"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// Import ScrollArea
import { ScrollArea } from "@/components/ui/scroll-area";

// Import the ModelInfo type
import type { ModelInfo } from "./cost-calculator"

// Props for the combobox
interface ModelComboboxProps {
  models: ModelInfo[];
  value: string | null; // Currently selected model ID
  onValueChange: (value: string) => void; // Callback when selection changes
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundText?: string;
  className?: string; // Allow passing custom styles to PopoverTrigger Button
}

export function ModelCombobox({ 
    models, 
    value, 
    onValueChange, 
    placeholder = "Select model...",
    searchPlaceholder = "Search model...",
    notFoundText = "No model found.",
    className
}: ModelComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedModel = models.find((model) => model.id === value)

  // Effect to handle body scroll locking
  React.useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }

    // Cleanup function to restore original style on unmount
    return () => {
        document.body.style.overflow = originalStyle;
    };
  }, [open]); // Re-run effect when 'open' state changes

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={cn("w-full justify-between h-9", className)} // Use full width, consistent height
        >
          {selectedModel ? (
            // Display selected model info
            <div className="flex items-center space-x-2 overflow-hidden">
               <Image 
                  src={selectedModel.logoUrl} 
                  alt={`${selectedModel.name} logo`} 
                  width={16} 
                  height={16} 
                  className="h-4 w-4 object-contain flex-shrink-0"
                  unoptimized 
              />
              <span className="text-sm truncate">{selectedModel.name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground font-normal">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[--radix-popover-trigger-width] p-0"
        // Prevent clicks inside the popover from closing it immediately
        // This helps if users accidentally click padding/scrollbar
        onInteractOutside={(e) => {
           // Optional: you could potentially allow closing if clicking specific elements
           // For now, just prevent default behavior which closes the popover
           // e.preventDefault(); // Be cautious with this, might prevent intended closes
        }}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.name} 
                  onSelect={() => {
                    onValueChange(model.id === value ? "" : model.id)
                    setOpen(false)
                  }}
                  className="px-2 py-1.5 cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === model.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                   <div className="flex items-center space-x-2">
                     <Image 
                        src={model.logoUrl} 
                        alt={`${model.name} logo`} 
                        width={16} 
                        height={16} 
                        className="h-4 w-4 object-contain flex-shrink-0"
                        unoptimized 
                    />
                    <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis"> 
                      {model.name}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 