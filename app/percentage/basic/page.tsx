"use client";

import { BasicCalculator } from "@/components/calculators/basic";
import { Card } from "@/components/ui/card";

export default function BasicCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Basic Percentage Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate percentages quickly and accurately
          </p>
        </div>

        <Card className="p-6">
          <BasicCalculator />
        </Card>

        <div className="mt-8 grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>1. Enter the number you want to calculate a percentage of</p>
              <p>2. Enter the percentage value</p>
              <p>3. Get instant results with detailed calculation steps</p>
              <p>4. Copy results or view calculation history</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Common Calculations</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Percentage of a Number</h3>
                <p className="text-sm text-muted-foreground">
                  Example: 25% of 80 = 20
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Percentage Change</h3>
                <p className="text-sm text-muted-foreground">
                  Example: Change from 50 to 75 = 50% increase
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}