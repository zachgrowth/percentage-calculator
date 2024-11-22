"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PercentageChangeCalculator() {
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    isIncrease: boolean;
  } | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const initial = parseFloat(oldValue);
    const final = parseFloat(newValue);

    if (isNaN(initial) || isNaN(final) || initial === 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for both values.",
        variant: "destructive",
      });
      return;
    }

    const absoluteChange = final - initial;
    const percentageChange = (absoluteChange / Math.abs(initial)) * 100;

    setResult({
      percentageChange,
      absoluteChange,
      isIncrease: percentageChange >= 0,
    });
  };

  const exportResult = () => {
    if (!result) return;

    const data = `Percentage Change Calculation
Old Value: ${oldValue}
New Value: ${newValue}
Absolute Change: ${result.absoluteChange.toFixed(2)}
Percentage Change: ${result.percentageChange.toFixed(2)}%
Direction: ${result.isIncrease ? "Increase" : "Decrease"}

Formula: (${newValue} - ${oldValue}) ÷ |${oldValue}| × 100`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "percentage-change.txt";
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
          <Label htmlFor="oldValue">Old Value</Label>
          <Input
            id="oldValue"
            type="number"
            value={oldValue}
            onChange={(e) => setOldValue(e.target.value)}
            placeholder="Enter old value"
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
        Calculate Change
      </Button>

      {result && (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">
                  {result.isIncrease ? "Increase" : "Decrease"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  From {oldValue} to {newValue}
                </p>
              </div>
              <p className="text-3xl font-bold">
                {result.percentageChange >= 0 ? "+" : ""}
                {result.percentageChange.toFixed(2)}%
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Absolute Change</h3>
                <p className="text-sm text-muted-foreground">
                  New Value - Old Value
                </p>
              </div>
              <p className="text-xl font-semibold">
                {result.absoluteChange >= 0 ? "+" : ""}
                {result.absoluteChange.toFixed(2)}
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