"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, HelpCircle, FileText } from "lucide-react";
import Link from "next/link";

const tutorials = [
  {
    title: "Basic Formulas",
    description: "Learn the fundamental percentage calculation formulas",
    icon: Book,
    href: "/percentage/learn/basic-formula",
  },
  {
    title: "Common Questions",
    description: "Find answers to frequently asked percentage questions",
    icon: HelpCircle,
    href: "/percentage/learn/common-questions",
  },
  {
    title: "Practical Examples",
    description: "Real-world examples and applications",
    icon: FileText,
    href: "/percentage/learn/examples",
  },
];

export default function LearnHub() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Percentage Calculation Tutorials
          </h1>
          <p className="text-lg text-muted-foreground">
            Master the fundamentals of percentage calculations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.title} className="group hover:shadow-lg transition-shadow">
              <Link href={tutorial.href}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <tutorial.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tutorial.description}
                    </p>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-6">
          <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
          <div className="grid gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Step-by-Step Guides</h3>
              <p className="text-sm text-muted-foreground">
                Detailed explanations and visual aids to help you understand percentage calculations.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Practice Problems</h3>
              <p className="text-sm text-muted-foreground">
                Interactive exercises with solutions to reinforce your learning.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}