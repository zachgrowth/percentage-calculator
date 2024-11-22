"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Investment {
  id: string;
  name: string;
  initialInvestment: string;
  finalValue: string;
}

interface RoiComparisonProps {
  onCalculate: (result: { input: any; result: any }) => void;
}

export function RoiComparison({ onCalculate }: RoiComparisonProps) {
  const [investments, setInvestments] = useState<Investment[]>([
    { id: "1", name: "Investment 1", initialInvestment: "", finalValue: "" },
    { id: "2", name: "Investment 2", initialInvestment: "", finalValue: "" },
  ]);
  const [results, setResults] = useState<Array<{ name: string; roi: number }> | null>(null);
  const { toast } = useToast();

  const addInvestment = () => {
    setInvestments([
      ...investments,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: `Investment ${investments.length + 1}`,
        initialInvestment: "",
        finalValue: "",
      },
    ]);
  };

  const removeInvestment = (id: string) => {
    if (investments.length > 2) {
      setInvestments(investments.filter((inv) => inv.id !== id));
    }
  };

  const updateInvestment = (id: string, field: keyof Investment, value: string) => {
    setInvestments(
      investments.map((inv) =>
        inv.id === id ? { ...inv, [field]: value } : inv
      )
    );
  };

  const calculate = () => {
    const calculatedResults = investments.map((inv) => {
      const initial = parseFloat(inv.initialInvestment);
      const final = parseFloat(inv.finalValue);

      if (isNaN(initial) || isNaN(final) || initial <= 0) {
        return { name: inv.name, roi: 0 };
      }

      const roi = ((final - initial) / initial) * 100;
      return { name: inv.name, roi };
    });

    setResults(calculatedResults);
    onCalculate({
      input: {
        investments: investments.map((inv) => ({
          name: inv.name,
          initialInvestment: parseFloat(inv.initialInvestment),
          finalValue: parseFloat(inv.finalValue),
        })),
      },
      result: {
        comparison: calculatedResults,
      },
    });
  };

  const exportResults = () => {
    if (!results) return;

    const data = `ROI Comparison Summary\n\n${results
      .map(
        (result, index) => `${result.name}:
Initial Investment: $${investments[index].initialInvestment}
Final Value: $${investments[index].finalValue}
ROI: ${result.roi.toFixed(2)}%
`
      )
      .join("\n")}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roi-comparison.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "ROI comparison has been exported to a file.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {investments.map((investment) => (
            <div key={investment.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>{investment.name}</Label>
                {investments.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInvestment(investment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Initial Investment ($)</Label>
                  <Input
                    type="number"
                    value={investment.initialInvestment}
                    onChange={(e) =>
                      updateInvestment(investment.id, "initialInvestment", e.target.value)
                    }
                    placeholder="Enter initial amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Final Value ($)</Label>
                  <Input
                    type="number"
                    value={investment.finalValue}
                    onChange={(e) =>
                      updateInvestment(investment.id, "finalValue", e.target.value)
                    }
                    placeholder="Enter final value"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={addInvestment}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Investment
          </Button>

          <Button onClick={calculate} className="w-full">
            Compare ROI
          </Button>

          {results && (
            <div className="space-y-4">
              <div className="space-y-2">
                {results.map((result) => (
                  <div
                    key={result.name}
                    className="p-4 bg-muted rounded-lg flex justify-between items-center"
                  >
                    <span className="font-medium">{result.name}</span>
                    <span className="text-xl font-bold">
                      {result.roi.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={exportResults}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Comparison
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}