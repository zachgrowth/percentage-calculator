"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gradePoints } from "./index";

interface CumulativeGpaProps {
  onCalculate: (result: { input: any; result: any }) => void;
}

export function CumulativeGpa({ onCalculate }: CumulativeGpaProps) {
  const [currentGpa, setCurrentGpa] = useState("");
  const [totalCredits, setTotalCredits] = useState("");
  const [newCredits, setNewCredits] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const current = parseFloat(currentGpa);
    const totalCred = parseFloat(totalCredits);
    const newCred = parseFloat(newCredits);
    const gradePoint = gradePoints.find((gp) => gp.letter === newGrade);

    if (
      isNaN(current) ||
      isNaN(totalCred) ||
      isNaN(newCred) ||
      !gradePoint ||
      current < 0 ||
      current > 4.0 ||
      totalCred <= 0 ||
      newCred <= 0
    ) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid values for all fields.",
        variant: "destructive",
      });
      return;
    }

    const currentPoints = current * totalCred;
    const newPoints = gradePoint.points * newCred;
    const newGpa = (currentPoints + newPoints) / (totalCred + newCred);

    setResult(newGpa);
    onCalculate({
      input: {
        currentGpa: current,
        totalCredits: totalCred,
        newCredits: newCred,
        newGrade,
      },
      result: { gpa: newGpa },
    });
  };

  const exportResult = () => {
    if (result === null) return;

    const data = `Cumulative GPA Calculation
Current GPA: ${currentGpa}
Total Credits: ${totalCredits}
New Course Credits: ${newCredits}
New Course Grade: ${newGrade}
New Cumulative GPA: ${result.toFixed(2)}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cumulative-gpa.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "GPA calculation has been exported to a file.",
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
              <Label htmlFor="totalCredits">Total Credits Completed</Label>
              <Input
                id="totalCredits"
                type="number"
                min="0"
                value={totalCredits}
                onChange={(e) => setTotalCredits(e.target.value)}
                placeholder="Enter total credits"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newCredits">New Course Credits</Label>
              <Input
                id="newCredits"
                type="number"
                min="0"
                value={newCredits}
                onChange={(e) => setNewCredits(e.target.value)}
                placeholder="Enter new course credits"
              />
            </div>
            <div className="space-y-2">
              <Label>New Course Grade</Label>
              <Select value={newGrade} onValueChange={setNewGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradePoints.map((gp) => (
                    <SelectItem key={gp.letter} value={gp.letter}>
                      {gp.letter} ({gp.points.toFixed(1)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate New GPA
          </Button>

          {result !== null && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">New Cumulative GPA</h3>
                    <p className="text-sm text-muted-foreground">
                      Including new course
                    </p>
                  </div>
                  <p className="text-3xl font-bold">{result.toFixed(2)}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={exportResult}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Calculation
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}