"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function BasicCalculator() {
  const [number, setNumber] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (number && percentage) {
      calculate();
    }
  }, [number, percentage]);

  const calculate = () => {
    const num = parseFloat(number);
    const perc = parseFloat(percentage);
    if (!isNaN(num) && !isNaN(perc)) {
      const result = (num * perc) / 100;
      setResult(result.toFixed(2));
      setSteps([
        `1. Convert percentage to decimal: ${perc}% = ${perc}/100 = ${perc/100}`,
        `2. Multiply number by decimal: ${num} × ${perc/100} = ${result.toFixed(2)}`
      ]);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied to clipboard",
        description: `Result ${result} has been copied to your clipboard.`
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="number">Number</Label>
          <Input
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter number"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="percentage">Percentage</Label>
          <Input
            id="percentage"
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Enter percentage"
          />
        </div>
      </div>

      {result !== null && (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">
                {percentage}% of {number} is {result}
              </p>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Calculation Steps:</p>
            {steps.map((step, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                {step}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}