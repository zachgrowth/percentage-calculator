"use client";

import { Card } from "@/components/ui/card";

export default function BasicFormula() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Basic Percentage Formulas
          </h1>
          <p className="text-lg text-muted-foreground">
            Master the essential formulas for percentage calculations
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Basic Percentage</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Finding a Percentage</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  To find X% of Y:
                </p>
                <code className="block p-2 bg-background rounded">
                  Result = (X × Y) ÷ 100
                </code>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Percentage of a Number</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  To find what percentage X is of Y:
                </p>
                <code className="block p-2 bg-background rounded">
                  Percentage = (X ÷ Y) × 100
                </code>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Percentage Change</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Increase/Decrease</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  To find the percentage change:
                </p>
                <code className="block p-2 bg-background rounded">
                  % Change = ((New Value - Original Value) ÷ Original Value) × 100
                </code>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Practice Examples</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium">Example 1: Finding 25% of 80</h3>
                <p className="text-sm text-muted-foreground">
                  (25 × 80) ÷ 100 = 20
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium">Example 2: What percentage is 15 of 60?</h3>
                <p className="text-sm text-muted-foreground">
                  (15 ÷ 60) × 100 = 25%
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}