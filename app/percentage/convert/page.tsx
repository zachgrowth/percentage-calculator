"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ArrowLeftRight, Percent } from "lucide-react";
import Link from "next/link";

const converters = [
  {
    title: "Decimal to Percentage",
    description: "Convert decimal numbers to percentages",
    icon: Calculator,
    href: "/percentage/convert/decimal",
  },
  {
    title: "Fraction to Percentage",
    description: "Convert fractions to percentages",
    icon: ArrowLeftRight,
    href: "/percentage/convert/fraction",
  },
  {
    title: "Ratio to Percentage",
    description: "Convert ratios to percentages",
    icon: Percent,
    href: "/percentage/convert/ratio",
  },
];

export default function ConversionTools() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Percentage Conversion Tools
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert between different numerical formats and percentages
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {converters.map((converter) => (
            <Card key={converter.title} className="group hover:shadow-lg transition-shadow">
              <Link href={converter.href}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <converter.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{converter.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {converter.description}
                    </p>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-6">
          <h2 className="text-2xl font-semibold mb-4">Common Conversions</h2>
          <div className="grid gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Decimal to Percentage</h3>
              <p className="text-sm text-muted-foreground">
                0.75 = 75% (Multiply by 100)
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Fraction to Percentage</h3>
              <p className="text-sm text-muted-foreground">
                3/4 = 75% (Divide and multiply by 100)
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Ratio to Percentage</h3>
              <p className="text-sm text-muted-foreground">
                3:4 = 75% (Divide first by second, multiply by 100)
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}