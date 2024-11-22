"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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

interface GpaPredictionProps {
  onPredict: (result: { input: any; result: any }) => void;
}

export function GpaPrediction({ onPredict }: GpaPredictionProps) {
  const [currentGpa, setCurrentGpa] = useState("");
  const [remainingSemesters, setRemainingSemesters] = useState("");
  const [targetGpa, setTargetGpa] = useState("");
  const [prediction, setPrediction] = useState<{
    semesterGpas: number[];
    finalGpa: number;
  } | null>(null);
  const { toast } = useToast();

  const calculatePrediction = () => {
    const current = parseFloat(currentGpa);
    const remaining = parseInt(remainingSemesters);
    const target = parseFloat(targetGpa);

    if (isNaN(current) || isNaN(remaining) || isNaN(target) || remaining <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid values for all fields.",
        variant: "destructive",
      });
      return;
    }

    // Calculate required semester GPAs to reach target
    const gpaIncrease = target - current;
    const requiredPerSemester = gpaIncrease / remaining;
    const semesterGpas = Array(remaining)
      .fill(0)
      .map((_, i) => current + requiredPerSemester * (i + 1));

    setPrediction({
      semesterGpas,
      finalGpa: semesterGpas[semesterGpas.length - 1],
    });

    onPredict({
      input: {
        currentGpa: current,
        remainingSemesters: remaining,
        targetGpa: target,
      },
      result: {
        semesterGpas,
        finalGpa: semesterGpas[semesterGpas.length - 1],
      },
    });
  };

  const chartData = prediction
    ? {
        labels: Array(prediction.semesterGpas.length)
          .fill(0)
          .map((_, i) => `Semester ${i + 1}`),
        datasets: [
          {
            label: "Projected GPA",
            data: prediction.semesterGpas,
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
        text: "GPA Projection",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 4,
      },
    },
  };

  const exportPrediction = () => {
    if (!prediction) return;

    const data = `GPA Prediction Analysis
Current GPA: ${currentGpa}
Target GPA: ${targetGpa}
Remaining Semesters: ${remainingSemesters}

Semester-by-Semester Projection:
${prediction.semesterGpas
  .map((gpa, i) => `Semester ${i + 1}: ${gpa.toFixed(2)}`)
  .join("\n")}

Final Projected GPA: ${prediction.finalGpa.toFixed(2)}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gpa-prediction.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "GPA prediction has been exported to a file.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentGpa">Current GPA</Label>
              <Input
                id="currentGpa"
                type="number"
                min="0"
                max="4.0"
                step="0.01"
                value={currentGpa}
                onChange={(e) => setCurrentGpa(e.target.value)}
                placeholder="Enter current GPA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remainingSemesters">Remaining Semesters</Label>
              <Input
                id="remainingSemesters"
                type="number"
                min="1"
                value={remainingSemesters}
                onChange={(e) => setRemainingSemesters(e.target.value)}
                placeholder="Enter remaining semesters"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetGpa">Target GPA</Label>
              <Input
                id="targetGpa"
                type="number"
                min="0"
                max="4.0"
                step="0.01"
                value={targetGpa}
                onChange={(e) => setTargetGpa(e.target.value)}
                placeholder="Enter target GPA"
              />
            </div>
          </div>

          <Button onClick={calculatePrediction} className="w-full">
            Calculate Prediction
          </Button>

          {prediction && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">Final Projected GPA</h3>
                    <p className="text-sm text-muted-foreground">
                      After {remainingSemesters} semesters
                    </p>
                  </div>
                  <p className="text-3xl font-bold">
                    {prediction.finalGpa.toFixed(2)}
                  </p>
                </div>
                {chartData && (
                  <div className="mt-4 h-64">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={exportPrediction}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Prediction
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}