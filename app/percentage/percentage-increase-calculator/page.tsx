"use client";

import { PercentageIncreaseCalculator } from "@/components/calculators/standalone/percentage-increase";
import { Card } from "@/components/ui/card";

export default function PercentageIncreasePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Percentage Increase Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate the percentage increase or growth from one value to another
          </p>
        </div>

        <Card className="p-6">
          <PercentageIncreaseCalculator />
        </Card>

        <div className="mt-8 grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Understanding Percentage Increase</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Percentage increase shows how much a value has grown relative to its original amount.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                % Increase = (New Value - Original Value) ÷ Original Value × 100
              </div>
              <p>
                A positive result indicates growth, while a negative result indicates a decrease.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Common Applications</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Business Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Track sales growth, revenue increases, and market expansion.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Population Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor demographic shifts and population growth rates.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}