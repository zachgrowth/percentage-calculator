"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PercentageDifferenceCalculator() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<{
    difference: number;
    absoluteDifference: number;
  } | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || isNaN(v2)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for both values.",
        variant: "destructive",
      });
      return;
    }

    const absoluteDifference = Math.abs(v1 - v2);
    const average = (v1 + v2) / 2;
    const difference = (absoluteDifference / average) * 100;

    setResult({ difference, absoluteDifference });
  };

  const exportResult = () => {
    if (!result) return;

    const data = `Percentage Difference Calculation
Value 1: ${value1}
Value 2: ${value2}
Absolute Difference: ${result.absoluteDifference.toFixed(2)}
Percentage Difference: ${result.difference.toFixed(2)}%

Formula: |${value1} - ${value2}| ÷ ((${value1} + ${value2}) ÷ 2) × 100`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "percentage-difference.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "Calculation has been exported to a file.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="value1">First Value</Label>
          <Input
            id="value1"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter first value"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value2">Second Value</Label>
          <Input
            id="value2"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter second value"
          />
        </div>
      </div>

      <Button onClick={calculate} className="w-full">
        Calculate Difference
      </Button>

      {result && (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Percentage Difference</h3>
                <p className="text-sm text-muted-foreground">
                  Between {value1} and {value2}
                </p>
              </div>
              <p className="text-3xl font-bold">{result.difference.toFixed(2)}%</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Absolute Difference</h3>
                <p className="text-sm text-muted-foreground">
                  |Value1 - Value2|
                </p>
              </div>
              <p className="text-xl font-semibold">{result.absoluteDifference.toFixed(2)}</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={exportResult}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Calculation
          </Button>
        </div>
      )}
    </div>
  );
}