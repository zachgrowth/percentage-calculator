"use client";

import { BodyFatCalculator } from "@/components/calculators/standalone/body-fat";
import { Card } from "@/components/ui/card";

export default function BodyFatCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Body Fat Percentage Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate your body fat percentage using standard measurements
          </p>
        </div>

        <Card className="p-6">
          <BodyFatCalculator />
        </Card>

        <div className="mt-8 grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Understanding Body Fat Percentage</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Body fat percentage is the amount of body fat as a proportion of total body weight.
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Healthy Ranges</h3>
                <div className="space-y-2 text-sm">
                  <p>Men: 10-20%</p>
                  <p>Women: 18-28%</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Measurement Tips</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Taking Measurements</h3>
                <p className="text-sm text-muted-foreground">
                  Use a flexible measuring tape and measure in a relaxed state.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Best Time</h3>
                <p className="text-sm text-muted-foreground">
                  Measure first thing in the morning before eating or drinking.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}