"use client";

import React, { useState, useMemo } from "react";
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
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Flex, { FlexCol, FlexGroup } from "./flex";

interface ScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioLabel: string;
  inputText: string | null;
  outputText: string | null;
  isLoading: boolean;
}

const LINES_PER_PAGE = 30;

export function ScenarioModal({
  isOpen,
  onClose,
  scenarioLabel,
  inputText,
  outputText,
  isLoading,
}: ScenarioModalProps) {
  const [inputPage, setInputPage] = useState(1);
  const [outputPage, setOutputPage] = useState(1);

  const inputLines = useMemo(() => inputText?.split('\n') ?? [], [inputText]);
  const outputLines = useMemo(() => outputText?.split('\n') ?? [], [outputText]);

  const totalInputPages = Math.ceil(inputLines.length / LINES_PER_PAGE);
  const totalOutputPages = Math.ceil(outputLines.length / LINES_PER_PAGE);

  const getCurrentPageLines = React.useCallback((lines: string[], page: number) => {
    const start = (page - 1) * LINES_PER_PAGE;
    const end = start + LINES_PER_PAGE;
    return lines.slice(start, end).join('\n');
  }, []);

  const currentInputText = useMemo(() => getCurrentPageLines(inputLines, inputPage), [
    inputLines, inputPage, getCurrentPageLines
  ]);
  const currentOutputText = useMemo(() => getCurrentPageLines(outputLines, outputPage), [
    outputLines, outputPage, getCurrentPageLines
  ]);

  React.useEffect(() => {
    if (isOpen) {
        setInputPage(1);
        setOutputPage(1);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay>
        <DialogContent className="bg-muted/30 sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="pb-4">
              <Flex>
                <FlexGroup>
                  <FlexCol>
                    <span className="text-muted-foreground text-sm uppercase tracking-wider">
                      Scenario
                    </span>
                    <span className="text-foreground text-lg font-medium">
                      {scenarioLabel}
                    </span>
                  </FlexCol>
                </FlexGroup>
              </Flex>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-grow flex flex-col overflow-y-auto">
            <Tabs defaultValue="input" className="flex-grow flex flex-col">
              <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
                <TabsTrigger value="input">Input Prompt</TabsTrigger>
                <TabsTrigger value="output">Model Output</TabsTrigger>
              </TabsList>

              <TabsContent
                value="input"
                className="flex-grow flex flex-col p-4 border border-border/50 rounded-md mt-2 bg-muted/20"
              >
                {isLoading ? (
                  <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <pre className="flex-grow text-sm whitespace-pre-wrap break-words p-1">
                    {currentInputText || (inputText === null ? "Could not load input text." : " ")}
                  </pre>
                )}
                {!isLoading && totalInputPages > 1 && (
                    <div className="flex items-center justify-center pt-3 mt-auto border-t border-border/30 flex-shrink-0">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setInputPage(p => Math.max(1, p - 1))}
                            disabled={inputPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1"/> Previous
                        </Button>
                        <span className="text-xs text-muted-foreground mx-3">
                           Page {inputPage} of {totalInputPages} 
                        </span>
                         <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setInputPage(p => Math.min(totalInputPages, p + 1))}
                            disabled={inputPage === totalInputPages}
                        >
                            Next <ChevronRight className="h-4 w-4 ml-1"/>
                        </Button>
                     </div>
                 )}
              </TabsContent>

              <TabsContent
                value="output"
                className="flex-grow flex flex-col p-4 border border-border/50 rounded-md mt-2 bg-muted/20"
              >
                {isLoading ? (
                  <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <pre className="flex-grow text-sm whitespace-pre-wrap break-words p-1">
                     {currentOutputText || (outputText === null ? "Could not load output text." : " ")}
                  </pre>
                )}
                {!isLoading && totalOutputPages > 1 && (
                    <div className="flex items-center justify-center pt-3 mt-auto border-t border-border/30 flex-shrink-0">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setOutputPage(p => Math.max(1, p - 1))}
                            disabled={outputPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1"/> Previous
                        </Button>
                        <span className="text-xs text-muted-foreground mx-3">
                           Page {outputPage} of {totalOutputPages} 
                        </span>
                         <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setOutputPage(p => Math.min(totalOutputPages, p + 1))}
                            disabled={outputPage === totalOutputPages}
                        >
                            Next <ChevronRight className="h-4 w-4 ml-1"/>
                        </Button>
                     </div>
                 )}
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter className="mt-4 flex-shrink-0">
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
        </DialogOverlay>
    </Dialog>
  );
}
