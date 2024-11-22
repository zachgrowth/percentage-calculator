"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, TrendingUp, Receipt } from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    title: "Discount Calculator",
    description: "Calculate discounts and final prices",
    icon: DollarSign,
    href: "/percentage/business/discount-calculator",
  },
  {
    title: "Markup Calculator",
    description: "Calculate markup and selling prices",
    icon: Percent,
    href: "/percentage/business/markup-calculator",
  },
  {
    title: "Profit Calculator",
    description: "Calculate profit margins and ratios",
    icon: TrendingUp,
    href: "/percentage/business/profit-calculator",
  },
  {
    title: "Tax Calculator",
    description: "Calculate tax rates and amounts",
    icon: Receipt,
    href: "/percentage/business/tax-calculator",
  },
];

export default function BusinessHub() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Business Calculator Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Professional financial calculation tools for business operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {calculators.map((calc) => (
            <Card key={calc.title} className="group hover:shadow-lg transition-shadow">
              <Link href={calc.href}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <calc.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{calc.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {calc.description}
                    </p>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Common Tool Combinations</h2>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h3 className="font-medium">Pricing Strategy Package</h3>
                  <p className="text-sm text-muted-foreground">
                    Markup Calculator + Profit Calculator
                  </p>
                </div>
                <Button variant="outline">Use Together</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h3 className="font-medium">Sales Analysis Suite</h3>
                  <p className="text-sm text-muted-foreground">
                    Discount Calculator + Tax Calculator
                  </p>
                </div>
                <Button variant="outline">Use Together</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}