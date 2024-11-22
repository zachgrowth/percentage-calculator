"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleRoi } from "./simple-roi";
import { AnnualizedRoi } from "./annualized-roi";
import { RoiComparison } from "./roi-comparison";
import { Calculator, TrendingUp, BarChart2 } from "lucide-react";
import { RoiHistory } from "./roi-history";
import { useLocalStorage } from "@/hooks/use-local-storage";

export interface RoiCalculation {
  id: string;
  type: "simple" | "annualized" | "comparison";
  input: {
    initialInvestment?: number;
    finalValue?: number;
    timePeriod?: number;
    investments?: Array<{
      name: string;
      initialInvestment: number;
      finalValue: number;
    }>;
  };
  result: {
    roi?: number;
    annualizedRoi?: number;
    comparison?: Array<{
      name: string;
      roi: number;
    }>;
  };
  timestamp: number;
}

export function RoiCalculator() {
  const [history, setHistory] = useLocalStorage<RoiCalculation[]>("roi-calculator-history", []);

  const addToHistory = (entry: Omit<RoiCalculation, "id" | "timestamp">) => {
    const newEntry: RoiCalculation = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setHistory((prev) => [newEntry, ...prev].slice(0, 100));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <Tabs defaultValue="simple" className="w-full">
      <TabsList className="grid grid-cols-3 w-full mb-8">
        <TabsTrigger value="simple" className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          <span>Simple ROI</span>
        </TabsTrigger>
        <TabsTrigger value="annualized" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>Annualized ROI</span>
        </TabsTrigger>
        <TabsTrigger value="comparison" className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          <span>ROI Comparison</span>
        </TabsTrigger>
      </TabsList>

      <div className="grid md:grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <TabsContent value="simple">
            <SimpleRoi onCalculate={(result) => addToHistory({ type: "simple", ...result })} />
          </TabsContent>

          <TabsContent value="annualized">
            <AnnualizedRoi onCalculate={(result) => addToHistory({ type: "annualized", ...result })} />
          </TabsContent>

          <TabsContent value="comparison">
            <RoiComparison onCalculate={(result) => addToHistory({ type: "comparison", ...result })} />
          </TabsContent>
        </div>

        <div className="space-y-6">
          <RoiHistory history={history} onClear={clearHistory} />
        </div>
      </div>
    </Tabs>
  );
}