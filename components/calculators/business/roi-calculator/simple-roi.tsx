"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SimpleRoiProps {
  onCalculate: (result: { input: any; result: any }) => void;
}

export function SimpleRoi({ onCalculate }: SimpleRoiProps) {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);

    if (isNaN(initial) || isNaN(final) || initial <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for both fields.",
        variant: "destructive",
      });
      return;
    }

    const roi = ((final - initial) / initial) * 100;
    setResult(roi);
    onCalculate({
      input: { initialInvestment: initial, finalValue: final },
      result: { roi },
    });
  };

  const exportResult = () => {
    if (result === null) return;

    const data = `ROI Calculation Summary
Initial Investment: $${parseFloat(initialInvestment).toFixed(2)}
Final Value: $${parseFloat(finalValue).toFixed(2)}
ROI: ${result.toFixed(2)}%

${result >= 0 ? "Profit" : "Loss"}: $${Math.abs(parseFloat(finalValue) - parseFloat(initialInvestment)).toFixed(2)}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roi-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "ROI calculation has been exported to a file.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="Enter initial investment amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalValue">Final Value ($)</Label>
              <Input
                id="finalValue"
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                placeholder="Enter final value"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate ROI
          </Button>

          {result !== null && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Return on Investment</h3>
                    <p className="text-sm text-muted-foreground">
                      {result >= 0 ? "Profit" : "Loss"}: $
                      {Math.abs(parseFloat(finalValue) - parseFloat(initialInvestment)).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{result.toFixed(2)}%</p>
                    <p className="text-sm text-muted-foreground">
                      {result >= 0 ? "Gain" : "Loss"}
                    </p>
                  </div>
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