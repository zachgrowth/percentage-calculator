"use client";

import { Card } from "@/components/ui/card";

export default function Examples() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Practical Percentage Examples
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-world applications and examples of percentage calculations
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Shopping and Discounts</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Sale Price Calculation</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Original Price: $80</p>
                  <p className="text-sm text-muted-foreground">Discount: 25%</p>
                  <p className="text-sm text-muted-foreground">Calculation: $80 × 0.75 = $60</p>
                  <p className="text-sm font-medium">Final Price: $60</p>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Multiple Discounts</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Original Price: $100</p>
                  <p className="text-sm text-muted-foreground">First Discount: 20%</p>
                  <p className="text-sm text-muted-foreground">Additional Discount: 10%</p>
                  <p className="text-sm text-muted-foreground">Calculation: $100 × 0.8 × 0.9 = $72</p>
                  <p className="text-sm font-medium">Final Price: $72</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Business Applications</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Profit Margin</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Cost: $50</p>
                  <p className="text-sm text-muted-foreground">Selling Price: $75</p>
                  <p className="text-sm text-muted-foreground">Calculation: ($75 - $50) ÷ $50 × 100 = 50%</p>
                  <p className="text-sm font-medium">Profit Margin: 50%</p>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Sales Growth</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Last Year: $100,000</p>
                  <p className="text-sm text-muted-foreground">This Year: $125,000</p>
                  <p className="text-sm text-muted-foreground">Calculation: ($125,000 - $100,000) ÷ $100,000 × 100 = 25%</p>
                  <p className="text-sm font-medium">Growth Rate: 25%</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Academic Examples</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Grade Calculation</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Points Earned: 85</p>
                  <p className="text-sm text-muted-foreground">Total Points: 100</p>
                  <p className="text-sm text-muted-foreground">Calculation: 85 ÷ 100 × 100 = 85%</p>
                  <p className="text-sm font-medium">Final Grade: 85% (B)</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}