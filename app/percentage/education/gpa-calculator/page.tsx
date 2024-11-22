"use client";

import { GpaCalculator } from "@/components/calculators/education/gpa-calculator";
import { Card } from "@/components/ui/card";

export default function GpaCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            GPA Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate your term GPA, cumulative GPA, and plan your academic targets
          </p>
        </div>

        <Card className="p-6">
          <GpaCalculator />
        </Card>

        <div className="mt-8 grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">GPA Scale Reference</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Letter Grades to GPA Points</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                  <div>A+ = 4.0</div>
                  <div>B+ = 3.3</div>
                  <div>C+ = 2.3</div>
                  <div>D+ = 1.3</div>
                  <div>A  = 4.0</div>
                  <div>B  = 3.0</div>
                  <div>C  = 2.0</div>
                  <div>D  = 1.0</div>
                  <div>A- = 3.7</div>
                  <div>B- = 2.7</div>
                  <div>C- = 1.7</div>
                  <div>F  = 0.0</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">GPA Calculation Formula</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>GPA = Sum of (Credit Hours × Grade Points) / Total Credit Hours</p>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Example</h3>
                <p className="text-sm">
                  Course 1: 3 credits × 4.0 (A) = 12.0<br />
                  Course 2: 4 credits × 3.0 (B) = 12.0<br />
                  Total: 24.0 / 7 credits = 3.43 GPA
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}