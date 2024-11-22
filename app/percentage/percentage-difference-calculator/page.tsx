"use client";

import { PercentageDifferenceCalculator } from "@/components/calculators/standalone/percentage-difference";
import { Card } from "@/components/ui/card";

export default function PercentageDifferencePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Percentage Difference Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate the percentage difference between two values
          </p>
        </div>

        <Card className="p-6">
          <PercentageDifferenceCalculator />
        </Card>

        <div className="mt-8 grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Understanding Percentage Difference</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Percentage difference measures the relative difference between two values, expressed as a percentage of their average.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                % Difference = |Value1 - Value2| ÷ ((Value1 + Value2) ÷ 2) × 100
              </div>
              <p>
                This calculation is particularly useful when comparing two values without designating either as a reference point.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Common Applications</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Scientific Measurements</h3>
                <p className="text-sm text-muted-foreground">
                  Compare experimental results or measurements to determine their relative difference.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Data Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Compare datasets or values to identify significant variations.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}