"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PercentageChangeProps {
  onCalculate: (result: { input: any; result: any }) => void;
}

export function PercentageChange({ onCalculate }: PercentageChangeProps) {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [operation, setOperation] = useState("increase");
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    isIncrease: boolean;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (fromValue && toValue) {
      calculate();
    }
  }, [fromValue, toValue, operation]);

  const calculate = () => {
    const from = parseFloat(fromValue);
    const to = parseFloat(toValue);

    if (isNaN(from) || isNaN(to)) {
      return;
    }

    if (from === 0 && operation !== "error") {
      toast({
        title: "Invalid Input",
        description: "Initial value cannot be zero for percentage change calculation.",
        variant: "destructive",
      });
      return;
    }

    let percentageChange: number;
    let absoluteChange: number;
    let isIncrease: boolean;

    switch (operation) {
      case "difference":
        absoluteChange = Math.abs(to - from);
        percentageChange = (absoluteChange / ((from + to) / 2)) * 100;
        isIncrease = to > from;
        break;
      case "error":
        absoluteChange = Math.abs(to - from);
        percentageChange = (absoluteChange / Math.abs(to)) * 100;
        isIncrease = false;
        break;
      default:
        absoluteChange = to - from;
        percentageChange = (absoluteChange / Math.abs(from)) * 100;
        isIncrease = to > from;
    }

    const calculatedResult = {
      percentageChange,
      absoluteChange,
      isIncrease,
    };
    
    setResult(calculatedResult);
    onCalculate({
      input: { fromValue: from, toValue: to, operation },
      result: calculatedResult,
    });
  };

  const exportResult = () => {
    if (!result) return;

    const data = `Percentage ${operation.charAt(0).toUpperCase() + operation.slice(1)} Calculation
From Value: ${fromValue}
To Value: ${toValue}
${operation === "error" ? "Percentage Error" : "Percentage Change"}: ${result.percentageChange.toFixed(2)}%
Absolute Change: ${result.absoluteChange.toFixed(2)}
${operation !== "error" ? `Direction: ${result.isIncrease ? "Increase" : "Decrease"}` : ""}`;

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
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Calculation Type</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="increase">Increase/Decrease</SelectItem>
                <SelectItem value="difference">Percentage Difference</SelectItem>
                <SelectItem value="error">Percentage Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromValue">
                {operation === "error" ? "Actual Value" : "Initial Value"}
              </Label>
              <Input
                id="fromValue"
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder={`Enter ${operation === "error" ? "actual" : "initial"} value`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toValue">
                {operation === "error" ? "Expected Value" : "Final Value"}
              </Label>
              <Input
                id="toValue"
                type="number"
                value={toValue}
                onChange={(e) => setToValue(e.target.value)}
                placeholder={`Enter ${operation === "error" ? "expected" : "final"} value`}
              />
            </div>
          </div>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">
                      {operation === "error" ? "Percentage Error" : "Percentage Change"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      From {fromValue} to {toValue}
                    </p>
                  </div>
                  <p className="text-3xl font-bold">
                    {operation !== "error" && result.isIncrease ? "+" : ""}
                    {result.percentageChange.toFixed(2)}%
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Absolute Change</h3>
                    <p className="text-sm text-muted-foreground">
                      {operation === "error" ? "Margin of Error" : "Value Change"}
                    </p>
                  </div>
                  <p className="text-xl font-semibold">
                    {operation !== "error" && result.isIncrease ? "+" : ""}
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
      </CardContent>
    </Card>
  );
}