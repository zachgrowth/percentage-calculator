"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TargetGpaProps {
  onCalculate: (result: { input: any; result: any }) => void;
}

export function TargetGpa({ onCalculate }: TargetGpaProps) {
  const [currentGpa, setCurrentGpa] = useState("");
  const [targetGpa, setTargetGpa] = useState("");
  const [completedCredits, setCompletedCredits] = useState("");
  const [remainingCredits, setRemainingCredits] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const current = parseFloat(currentGpa);
    const target = parseFloat(targetGpa);
    const completed = parseFloat(completedCredits);
    const remaining = parseFloat(remainingCredits);

    if (
      isNaN(current) ||
      isNaN(target) ||
      isNaN(completed) ||
      isNaN(remaining) ||
      current < 0 ||
      current > 4.0 ||
      target < 0 ||
      target > 4.0 ||
      completed < 0 ||
      remaining < 0
    ) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid values for all fields.",
        variant: "destructive",
      });
      return;
    }

    const totalCredits = completed + remaining;
    const requiredGpa =
      (target * totalCredits - current * completed) / remaining;

    if (requiredGpa > 4.0) {
      toast({
        title: "Target Not Achievable",
        description: "The required GPA exceeds 4.0. Consider adjusting your target.",
        variant: "destructive",
      });
      return;
    }

    if (requiredGpa < 0) {
      toast({
        title: "Target Already Achieved",
        description: "Your current GPA is already higher than the target.",
        variant: "destructive",
      });
      return;
    }

    setResult(requiredGpa);
    onCalculate({
      input: {
        currentGpa: current,
        targetGpa: target,
        completedCredits: completed,
        remainingCredits: remaining,
      },
      result: { requiredGpa },
    });
  };

  const exportResult = () => {
    if (result === null) return;

    const data = `Target GPA Calculation
Current GPA: ${currentGpa}
Target GPA: ${targetGpa}
Completed Credits: ${completedCredits}
Remaining Credits: ${remainingCredits}
Required GPA for Remaining Credits: ${result.toFixed(2)}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "target-gpa.txt";
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
            <div className="space-y-2">
              <Label htmlFor="completedCredits">Completed Credits</Label>
              <Input
                id="completedCredits"
                type="number"
                min="0"
                value={completedCredits}
                onChange={(e) => setCompletedCredits(e.target.value)}
                placeholder="Enter completed credits"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remainingCredits">Remaining Credits</Label>
              <Input
                id="remainingCredits"
                type="number"
                min="0"
                value={remainingCredits}
                onChange={(e) => setRemainingCredits(e.target.value)}
                placeholder="Enter remaining credits"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Required GPA
          </Button>

          {result !== null && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Required GPA</h3>
                    <p className="text-sm text-muted-foreground">
                      For remaining credits
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