"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatisticalAnalysisProps {
  onCalculate: (result: { input: any; result: any }) => void;
}

export function StatisticalAnalysis({ onCalculate }: StatisticalAnalysisProps) {
  const [values, setValues] = useState<string[]>([""]);
  const [result, setResult] = useState<{
    mean: number;
    median: number;
    standardDeviation: number;
    percentiles: { [key: number]: number };
  } | null>(null);
  const { toast } = useToast();

  const addValue = () => {
    setValues([...values, ""]);
  };

  const removeValue = (index: number) => {
    if (values.length > 1) {
      setValues(values.filter((_, i) => i !== index));
    }
  };

  const updateValue = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const calculateStatistics = () => {
    const numbers = values
      .map((v) => parseFloat(v))
      .filter((v) => !isNaN(v));

    if (numbers.length === 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers.",
        variant: "destructive",
      });
      return;
    }

    // Calculate mean
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;

    // Calculate median
    const sorted = [...numbers].sort((a, b) => a - b);
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

    // Calculate standard deviation
    const variance =
      numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      numbers.length;
    const standardDeviation = Math.sqrt(variance);

    // Calculate percentiles
    const percentiles: { [key: number]: number } = {};
    [10, 25, 50, 75, 90].forEach((p) => {
      const index = Math.ceil((p / 100) * sorted.length) - 1;
      percentiles[p] = sorted[index];
    });

    const stats = {
      mean,
      median,
      standardDeviation,
      percentiles,
    };

    setResult(stats);
    onCalculate({
      input: { dataset: numbers },
      result: { statistics: stats },
    });
  };

  const chartData = result
    ? {
        labels: ["10%", "25%", "50%", "75%", "90%"],
        datasets: [
          {
            label: "Percentile Distribution",
            data: Object.values(result.percentiles),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Percentile Distribution",
      },
    },
  };

  const exportResults = () => {
    if (!result) return;

    const data = `Statistical Analysis Results

Dataset: ${values.filter((v) => v !== "").join(", ")}

Basic Statistics:
Mean: ${result.mean.toFixed(2)}
Median: ${result.median.toFixed(2)}
Standard Deviation: ${result.standardDeviation.toFixed(2)}

Percentiles:
10th: ${result.percentiles[10].toFixed(2)}
25th: ${result.percentiles[25].toFixed(2)}
50th: ${result.percentiles[50].toFixed(2)}
75th: ${result.percentiles[75].toFixed(2)}
90th: ${result.percentiles[90].toFixed(2)}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "statistical-analysis.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "Statistical analysis has been exported to a file.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            {values.map((value, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => updateValue(index, e.target.value)}
                  placeholder="Enter value"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeValue(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={addValue}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Value
            </Button>
          </div>

          <Button onClick={calculateStatistics} className="w-full">
            Calculate Statistics
          </Button>

          {result && (
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Basic Statistics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mean:</span>
                      <span>{result.mean.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Median:</span>
                      <span>{result.median.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Standard Deviation:</span>
                      <span>{result.standardDeviation.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Percentiles</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(result.percentiles).map(([p, v]) => (
                      <div key={p} className="flex justify-between">
                        <span>{p}th Percentile:</span>
                        <span>{v.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {chartData && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="h-64">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={exportResults}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}