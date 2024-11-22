"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course, gradePoints } from "./index";

interface TermGpaProps {
  onCalculate: (result: { input: any; result: any }) => void;
}

export function TermGpa({ onCalculate }: TermGpaProps) {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "", credits: 0, grade: "" },
  ]);
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        credits: 0,
        grade: "",
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const calculate = () => {
    const invalidCourses = courses.filter(
      (course) => !course.name || !course.credits || !course.grade
    );

    if (invalidCourses.length > 0) {
      toast({
        title: "Invalid Input",
        description: "Please complete all course information.",
        variant: "destructive",
      });
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const gradePoint = gradePoints.find((gp) => gp.letter === course.grade);
      if (gradePoint) {
        totalPoints += gradePoint.points * course.credits;
        totalCredits += course.credits;
      }
    });

    const gpa = totalPoints / totalCredits;
    setResult(gpa);
    onCalculate({
      input: { courses },
      result: { gpa },
    });
  };

  const exportResult = () => {
    if (result === null) return;

    const data = `Term GPA Calculation\n\nCourses:\n${courses
      .map(
        (course) =>
          `${course.name}: ${course.credits} credits, Grade: ${course.grade}`
      )
      .join("\n")}\n\nTerm GPA: ${result.toFixed(2)}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "term-gpa.txt";
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
          {courses.map((course) => (
            <div key={course.id} className="grid gap-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`name-${course.id}`}>Course Name</Label>
                  <Input
                    id={`name-${course.id}`}
                    value={course.name}
                    onChange={(e) =>
                      updateCourse(course.id, "name", e.target.value)
                    }
                    placeholder="Enter course name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`credits-${course.id}`}>Credits</Label>
                  <Input
                    id={`credits-${course.id}`}
                    type="number"
                    min="0"
                    value={course.credits || ""}
                    onChange={(e) =>
                      updateCourse(course.id, "credits", parseInt(e.target.value) || 0)
                    }
                    placeholder="Credits"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Grade</Label>
                  <Select
                    value={course.grade}
                    onValueChange={(value) =>
                      updateCourse(course.id, "grade", value)
                    }
                  >
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
              {courses.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCourse(course.id)}
                  className="ml-auto"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={addCourse}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>

          <Button onClick={calculate} className="w-full">
            Calculate Term GPA
          </Button>

          {result !== null && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Term GPA</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on {courses.length} course{courses.length !== 1 ? "s" : ""}
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