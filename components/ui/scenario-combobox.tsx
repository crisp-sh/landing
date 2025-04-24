"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Scenario {
  label: string;
  value: string;
  input_tokens?: number; // Make optional in case data isn't hardcoded
  output_tokens?: number; // Make optional in case data isn't hardcoded
}

interface ScenarioComboboxProps {
  scenarios: Scenario[];
  selectedScenario: Scenario | null;
  onSelectScenario: (scenario: Scenario | null) => void;
  className?: string;
}

export function ScenarioCombobox({
  scenarios,
  selectedScenario,
  onSelectScenario,
  className,
}: ScenarioComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedScenario
            ? scenarios.find((s) => s.value === selectedScenario.value)?.label
            : "Choose a scenario..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search scenarios..." />
          <CommandList>
            <CommandEmpty>No scenario found.</CommandEmpty>
            <CommandGroup>
              {scenarios.map((scenario) => (
                <CommandItem
                  key={scenario.value}
                  value={scenario.label} // Use label for search/filtering
                  onSelect={() => {
                    onSelectScenario(
                      scenario.value === selectedScenario?.value ? null : scenario
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedScenario?.value === scenario.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {scenario.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 