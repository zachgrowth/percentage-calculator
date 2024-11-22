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

interface SimplePercentageProps {
  onCalculate: (result: { input: any; result: any }) => void;
}

export function SimplePercentage({ onCalculate }: SimplePercentageProps) {
  const [calculationType, setCalculationType] = useState("percentOf");
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState<{
    value: number;
    formula: string;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (number1 && number2) {
      calculate();
    }
  }, [number1, number2, calculationType]);

  const calculate = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    if (isNaN(num1) || isNaN(num2)) {
      return;
    }

    let value: number;
    let formula: string;

    switch (calculationType) {
      case "percentOf":
        value = (num1 * num2) / 100;
        formula = `${num2}% of ${num1} = ${value.toFixed(2)}`;
        break;
      case "isWhatPercent":
        if (num2 === 0) {
          toast({
            title: "Invalid Input",
            description: "Cannot divide by zero.",
            variant: "destructive",
          });
          return;
        }
        value = (num1 / num2) * 100;
        formula = `${num1} is ${value.toFixed(2)}% of ${num2}`;
        break;
      case "increaseBy":
        value = num1 + (num1 * num2) / 100;
        formula = `${num1} + ${num2}% = ${value.toFixed(2)}`;
        break;
      case "decreaseBy":
        value = num1 - (num1 * num2) / 100;
        formula = `${num1} - ${num2}% = ${value.toFixed(2)}`;
        break;
      default:
        return;
    }

    const calculatedResult = { value, formula };
    setResult(calculatedResult);
    onCalculate({
      input: { number1: num1, number2: num2, type: calculationType },
      result: calculatedResult,
    });
  };

  const getInputLabels = () => {
    switch (calculationType) {
      case "percentOf":
        return { first: "Number", second: "Percentage" };
      case "isWhatPercent":
        return { first: "Number", second: "Total" };
      case "increaseBy":
        return { first: "Number", second: "Increase by %" };
      case "decreaseBy":
        return { first: "Number", second: "Decrease by %" };
      default:
        return { first: "Number 1", second: "Number 2" };
    }
  };

  const exportResult = () => {
    if (!result) return;

    const data = `Percentage Calculation
Type: ${calculationType}
${getInputLabels().first}: ${number1}
${getInputLabels().second}: ${number2}
Result: ${result.formula}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "percentage-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "Calculation has been exported to a file.",
    });
  };

  const labels = getInputLabels();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Calculation Type</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentOf">Calculate percentage of a number</SelectItem>
                <SelectItem value="isWhatPercent">What percentage is X of Y</SelectItem>
                <SelectItem value="increaseBy">Increase by percentage</SelectItem>
                <SelectItem value="decreaseBy">Decrease by percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="number1">{labels.first}</Label>
              <Input
                id="number1"
                type="number"
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
                placeholder={`Enter ${labels.first.toLowerCase()}`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number2">{labels.second}</Label>
              <Input
                id="number2"
                type="number"
                value={number2}
                onChange={(e) => setNumber2(e.target.value)}
                placeholder={`Enter ${labels.second.toLowerCase()}`}
              />
            </div>
          </div>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Result</h3>
                    <p className="text-sm text-muted-foreground">
                      {result.formula}
                    </p>
                  </div>
                  <p className="text-3xl font-bold">
                    {result.value.toFixed(2)}
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