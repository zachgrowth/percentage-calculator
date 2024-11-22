"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, Target } from "lucide-react";
import { TermGpa } from "./term-gpa";
import { CumulativeGpa } from "./cumulative-gpa";
import { TargetGpa } from "./target-gpa";
import { GpaHistory } from "./gpa-history";
import { useLocalStorage } from "@/hooks/use-local-storage";

export interface GradePoint {
  letter: string;
  points: number;
}

export const gradePoints: GradePoint[] = [
  { letter: "A+", points: 4.0 },
  { letter: "A", points: 4.0 },
  { letter: "A-", points: 3.7 },
  { letter: "B+", points: 3.3 },
  { letter: "B", points: 3.0 },
  { letter: "B-", points: 2.7 },
  { letter: "C+", points: 2.3 },
  { letter: "C", points: 2.0 },
  { letter: "C-", points: 1.7 },
  { letter: "D+", points: 1.3 },
  { letter: "D", points: 1.0 },
  { letter: "F", points: 0.0 },
];

export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export interface GpaCalculation {
  id: string;
  type: "term" | "cumulative" | "target";
  input: any;
  result: {
    gpa?: number;
    requiredGpa?: number;
    targetGpa?: number;
  };
  timestamp: number;
}

export function GpaCalculator() {
  const [history, setHistory] = useLocalStorage<GpaCalculation[]>("gpa-calculator-history", []);

  const addToHistory = (entry: Omit<GpaCalculation, "id" | "timestamp">) => {
    const newEntry: GpaCalculation = {
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
    <Tabs defaultValue="term" className="w-full">
      <TabsList className="grid grid-cols-3 w-full mb-8">
        <TabsTrigger value="term" className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          <span>Term GPA</span>
        </TabsTrigger>
        <TabsTrigger value="cumulative" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>Cumulative GPA</span>
        </TabsTrigger>
        <TabsTrigger value="target" className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          <span>Target GPA</span>
        </TabsTrigger>
      </TabsList>

      <div className="grid md:grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <TabsContent value="term">
            <TermGpa onCalculate={(result) => addToHistory({ type: "term", ...result })} />
          </TabsContent>

          <TabsContent value="cumulative">
            <CumulativeGpa onCalculate={(result) => addToHistory({ type: "cumulative", ...result })} />
          </TabsContent>

          <TabsContent value="target">
            <TargetGpa onCalculate={(result) => addToHistory({ type: "target", ...result })} />
          </TabsContent>
        </div>

        <div className="space-y-6">
          <GpaHistory history={history} onClear={clearHistory} />
        </div>
      </div>
    </Tabs>
  );
}