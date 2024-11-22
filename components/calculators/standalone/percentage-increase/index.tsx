"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PercentageIncreaseCalculator() {
  const [originalValue, setOriginalValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [result, setResult] = useState<{
    percentageIncrease: number;
    absoluteIncrease: number;
  } | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const original = parseFloat(originalValue);
    const current = parseFloat(newValue);

    if (isNaN(original) || isNaN(current) || original === 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for both values.",
        variant: "destructive",
      });
      return;
    }

    const absoluteIncrease = current - original;
    const percentageIncrease = (absoluteIncrease / Math.abs(original)) * 100;

    setResult({ percentageIncrease, absoluteIncrease });
  };

  const exportResult = () => {
    if (!result) return;

    const data = `Percentage Increase Calculation
Original Value: ${originalValue}
New Value: ${newValue}
Absolute Increase: ${result.absoluteIncrease.toFixed(2)}
Percentage Increase: ${result.percentageIncrease.toFixed(2)}%

Formula: (${newValue} - ${originalValue}) ÷ |${originalValue}| × 100`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "percentage-increase.txt";
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
          <Label htmlFor="originalValue">Original Value</Label>
          <Input
            id="originalValue"
            type="number"
            value={originalValue}
            onChange={(e) => setOriginalValue(e.target.value)}
            placeholder="Enter original value"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newValue">New Value</Label>
          <Input
            id="newValue"
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter new value"
          />
        </div>
      </div>

      <Button onClick={calculate} className="w-full">
        Calculate Increase
      </Button>

      {result && (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Percentage Increase</h3>
                <p className="text-sm text-muted-foreground">
                  From {originalValue} to {newValue}
                </p>
              </div>
              <p className="text-3xl font-bold">
                {result.percentageIncrease >= 0 ? "+" : ""}
                {result.percentageIncrease.toFixed(2)}%
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Absolute Increase</h3>
                <p className="text-sm text-muted-foreground">
                  New Value - Original Value
                </p>
              </div>
              <p className="text-xl font-semibold">
                {result.absoluteIncrease >= 0 ? "+" : ""}
                {result.absoluteIncrease.toFixed(2)}
              </p>
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