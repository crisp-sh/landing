"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "./scroll-area";

interface ScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioLabel: string;
  inputText: string | null;
  outputText: string | null;
  isLoading: boolean;
}

export function ScenarioModal({
  isOpen,
  onClose,
  scenarioLabel,
  inputText,
  outputText,
  isLoading,
}: ScenarioModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay>
        <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] max-h-[80vh] flex flex-col">
      <ScrollArea className="h-full w-full">
          <DialogHeader>
            <DialogTitle className="pb-6">
              <span className="text-muted-foreground text-md uppercase">
                Scenario
              </span>{" "}
              {"|"} {scenarioLabel}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-grow">
            <Tabs defaultValue="input" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="input">Input Prompt</TabsTrigger>
                <TabsTrigger value="output">Model Output</TabsTrigger>
              </TabsList>
              <TabsContent
                value="input"
                className="flex-grow p-4 border border-border/50 rounded-md mt-2 bg-muted/20"
              >
                <ScrollArea className="h-full w-full">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <pre className="text-sm whitespace-pre-wrap break-words">
                    {inputText ?? "Could not load input text."}
                  </pre>
                )}
                </ScrollArea>
              </TabsContent>
              <TabsContent
                value="output"
                className="flex-grow p-4 border border-border/50 rounded-md mt-2 bg-muted/20"
              >
                <ScrollArea className="h-full w-full">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <pre className="text-sm whitespace-pre-wrap break-words">
                    {outputText ?? "Could not load output text."}
                  </pre>
                )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
          </DialogFooter>
      </ScrollArea>
        </DialogContent>
        </DialogOverlay>
    </Dialog>
  );
}
