"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceTrackingProps {
  history: {
    semester: string;
    gpa: number;
    courses: {
      name: string;
      credits: number;
      grade: string;
      category: string;
    }[];
  }[];
}

export function PerformanceTracking({ history }: PerformanceTrackingProps) {
  const { toast } = useToast();

  const chartData = {
    labels: history.map((h) => h.semester),
    datasets: [
      {
        label: "Semester GPA",
        data: history.map((h) => h.gpa),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "GPA Trend",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 4,
      },
    },
  };

  const calculateCategoryBreakdown = () => {
    const categories: { [key: string]: { total: number; count: number } } = {};

    history.forEach((semester) => {
      semester.courses.forEach((course) => {
        if (!categories[course.category]) {
          categories[course.category] = { total: 0, count: 0 };
        }
        const gradePoints = parseFloat(course.grade) || 0;
        categories[course.category].total += gradePoints;
        categories[course.category].count += 1;
      });
    });

    return Object.entries(categories).map(([category, data]) => ({
      category,
      averageGpa: data.total / data.count,
    }));
  };

  const categoryData = {
    labels: calculateCategoryBreakdown().map((c) => c.category),
    datasets: [
      {
        label: "Average GPA by Category",
        data: calculateCategoryBreakdown().map((c) => c.averageGpa),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1,
      },
    ],
  };

  const exportAnalysis = () => {
    const data = `Academic Performance Analysis

Semester-by-Semester GPA:
${history
  .map(
    (h) =>
      `${h.semester}: ${h.gpa.toFixed(2)} (${h.courses.length} courses)`
  )
  .join("\n")}

Category Breakdown:
${calculateCategoryBreakdown()
  .map((c) => `${c.category}: ${c.averageGpa.toFixed(2)}`)
  .join("\n")}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "academic-performance.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "Performance analysis has been exported to a file.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-4">GPA Trend Analysis</h3>
              <div className="h-64">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-4">Category Performance</h3>
              <div className="h-64">
                <Bar data={categoryData} options={chartOptions} />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Performance Summary</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Total Semesters: {history.length}
                </p>
                <p>
                  Average GPA:{" "}
                  {(
                    history.reduce((sum, h) => sum + h.gpa, 0) / history.length
                  ).toFixed(2)}
                </p>
                <p>
                  Total Courses:{" "}
                  {history.reduce((sum, h) => sum + h.courses.length, 0)}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={exportAnalysis}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}