"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AnnualizedRoiProps {
  onCalculate: (result: { input: any; result: any }) => void;
}

export function AnnualizedRoi({ onCalculate }: AnnualizedRoiProps) {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    totalRoi: number;
    annualizedRoi: number;
  } | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const period = parseFloat(years);

    if (isNaN(initial) || isNaN(final) || isNaN(period) || initial <= 0 || period <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for all fields.",
        variant: "destructive",
      });
      return;
    }

    const totalRoi = ((final - initial) / initial) * 100;
    const annualizedRoi = (Math.pow(final / initial, 1 / period) - 1) * 100;

    setResult({ totalRoi, annualizedRoi });
    onCalculate({
      input: { initialInvestment: initial, finalValue: final, timePeriod: period },
      result: { totalRoi, annualizedRoi },
    });
  };

  const exportResult = () => {
    if (!result) return;

    const data = `Annualized ROI Calculation Summary
Initial Investment: $${parseFloat(initialInvestment).toFixed(2)}
Final Value: $${parseFloat(finalValue).toFixed(2)}
Time Period: ${years} years
Total ROI: ${result.totalRoi.toFixed(2)}%
Annualized ROI: ${result.annualizedRoi.toFixed(2)}%

Total ${result.totalRoi >= 0 ? "Profit" : "Loss"}: $${Math.abs(parseFloat(finalValue) - parseFloat(initialInvestment)).toFixed(2)}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "annualized-roi-calculation.txt";
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
            <div className="space-y-2">
              <Label htmlFor="years">Time Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="Enter time period in years"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Annualized ROI
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Total ROI</h3>
                    <p className="text-sm text-muted-foreground">
                      Over {years} years
                    </p>
                  </div>
                  <p className="text-2xl font-bold">{result.totalRoi.toFixed(2)}%</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Annualized ROI</h3>
                    <p className="text-sm text-muted-foreground">
                      Year over year
                    </p>
                  </div>
                  <p className="text-2xl font-bold">{result.annualizedRoi.toFixed(2)}%</p>
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