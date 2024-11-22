"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function RoiCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [roi, setRoi] = useState<number | null>(null);

  const calculateRoi = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);

    if (!isNaN(initial) && !isNaN(final) && initial !== 0) {
      const roiValue = ((final - initial) / initial) * 100;
      setRoi(roiValue);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="initialInvestment">Initial Investment</Label>
          <Input
            id="initialInvestment"
            type="number"
            placeholder="Enter initial investment amount"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="finalValue">Final Value</Label>
          <Input
            id="finalValue"
            type="number"
            placeholder="Enter final value"
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={calculateRoi} className="w-full">
        Calculate ROI
      </Button>

      {roi !== null && (
        <Card className="p-4 text-center">
          <div className="text-lg font-semibold">ROI</div>
          <div className="text-3xl font-bold text-primary">
            {roi.toFixed(2)}%
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {roi >= 0 ? "Profit" : "Loss"}
          </div>
        </Card>
      )}
    </div>
  );
}
