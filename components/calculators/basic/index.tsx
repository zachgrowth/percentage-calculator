"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimplePercentage } from "./simple-percentage";
import { PercentageChange } from "./percentage-change";
import { FormatConverter } from "./format-converter";
import { StatisticalAnalysis } from "./statistical-analysis";
import { Calculator, ArrowUpDown, Percent, BarChart2 } from "lucide-react";
import { CalculationHistory } from "./calculation-history";
import { useLocalStorage } from "@/hooks/use-local-storage";

export interface Calculation {
  id: string;
  type: "simple" | "change" | "convert" | "stats";
  input: {
    number?: number;
    percentage?: number;
    fromValue?: number;
    toValue?: number;
    fromFormat?: string;
    toFormat?: string;
    value?: number;
    dataset?: number[];
  };
  result: {
    value?: number;
    percentageChange?: number;
    isIncrease?: boolean;
    convertedValue?: number;
    statistics?: {
      mean: number;
      median: number;
      standardDeviation: number;
      percentiles: { [key: number]: number };
    };
  };
  timestamp: number;
}

export function BasicCalculator() {
  const [history, setHistory] = useLocalStorage<Calculation[]>("basic-calculator-history", []);

  const addToHistory = (entry: Omit<Calculation, "id" | "timestamp">) => {
    const newEntry: Calculation = {
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
      <TabsList className="grid grid-cols-4 w-full mb-8">
        <TabsTrigger value="simple" className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          <span>Basic</span>
        </TabsTrigger>
        <TabsTrigger value="change" className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          <span>Change</span>
        </TabsTrigger>
        <TabsTrigger value="convert" className="flex items-center gap-2">
          <Percent className="h-4 w-4" />
          <span>Convert</span>
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          <span>Statistics</span>
        </TabsTrigger>
      </TabsList>

      <div className="grid md:grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <TabsContent value="simple">
            <SimplePercentage onCalculate={(result) => addToHistory({ type: "simple", ...result })} />
          </TabsContent>

          <TabsContent value="change">
            <PercentageChange onCalculate={(result) => addToHistory({ type: "change", ...result })} />
          </TabsContent>

          <TabsContent value="convert">
            <FormatConverter onCalculate={(result) => addToHistory({ type: "convert", ...result })} />
          </TabsContent>

          <TabsContent value="stats">
            <StatisticalAnalysis onCalculate={(result) => addToHistory({ type: "stats", ...result })} />
          </TabsContent>
        </div>

        <div className="space-y-6">
          <CalculationHistory history={history} onClear={clearHistory} />
        </div>
      </div>
    </Tabs>
  );
}