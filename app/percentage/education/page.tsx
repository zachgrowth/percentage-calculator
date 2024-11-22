"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calculator, BarChart, Trophy } from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    title: "Grade Calculator",
    description: "Calculate final grades and weighted averages",
    icon: GraduationCap,
    href: "/percentage/education/grade-calculator",
  },
  {
    title: "GPA Calculator",
    description: "Convert grades to GPA and calculate cumulative GPA",
    icon: Calculator,
    href: "/percentage/education/gpa-calculator",
  },
  {
    title: "Average Calculator",
    description: "Calculate mean, median, and mode of scores",
    icon: BarChart,
    href: "/percentage/education/average-calculator",
  },
  {
    title: "Ranking Calculator",
    description: "Calculate percentile ranks and standings",
    icon: Trophy,
    href: "/percentage/education/ranking-calculator",
  },
];

export default function EducationHub() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Education Calculator Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Professional grade calculation tools for educators and students
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
                  <h3 className="font-medium">Grade Analysis Package</h3>
                  <p className="text-sm text-muted-foreground">
                    Grade Calculator + Average Calculator
                  </p>
                </div>
                <Button variant="outline">Use Together</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h3 className="font-medium">Academic Performance Suite</h3>
                  <p className="text-sm text-muted-foreground">
                    GPA Calculator + Ranking Calculator
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