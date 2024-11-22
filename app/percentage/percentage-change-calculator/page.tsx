"use client";

import { PercentageChangeCalculator } from "@/components/calculators/standalone/percentage-change";
import { Card } from "@/components/ui/card";

export default function PercentageChangePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Percentage Change Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate the percentage change between old and new values
          </p>
        </div>

        <Card className="p-6">
          <PercentageChangeCalculator />
        </Card>

        <div className="mt-8 grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Understanding Percentage Change</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Percentage change measures the relative change between two values, showing both increases and decreases.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                % Change = (New Value - Old Value) ÷ |Old Value| × 100
              </div>
              <p>
                The result indicates both the direction (positive/negative) and magnitude of the change.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Common Applications</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Financial Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Track changes in stock prices, market values, and investment returns.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Performance Metrics</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor changes in KPIs, sales figures, and growth rates.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}