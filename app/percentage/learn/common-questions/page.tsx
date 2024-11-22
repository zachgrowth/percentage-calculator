"use client";

import { Card } from "@/components/ui/card";

export default function CommonQuestions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Common Questions About Percentages
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to frequently asked questions about percentage calculations
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Basic Concepts</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">What is a percentage?</h3>
                <p className="text-sm text-muted-foreground">
                  A percentage is a number expressed as a fraction of 100. The word comes from the Latin "per centum" meaning "out of 100."
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Why do we use percentages?</h3>
                <p className="text-sm text-muted-foreground">
                  Percentages make it easier to compare relative amounts and express parts of a whole in a standardized way.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Common Calculations</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">How do I calculate a tip?</h3>
                <p className="text-sm text-muted-foreground">
                  To calculate a 15% tip on a $100 bill, multiply 100 by 0.15 (or 15/100) = $15
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">How do I calculate a discount?</h3>
                <p className="text-sm text-muted-foreground">
                  For a 20% discount on $80, multiply 80 by 0.20 = $16 discount. Subtract from original price: $80 - $16 = $64
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Advanced Topics</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">What is compound percentage?</h3>
                <p className="text-sm text-muted-foreground">
                  Compound percentage occurs when percentages are applied successively, such as in compound interest calculations.
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">How do I handle percentage points?</h3>
                <p className="text-sm text-muted-foreground">
                  Percentage points represent the arithmetic difference between two percentages, rather than the relative change.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}