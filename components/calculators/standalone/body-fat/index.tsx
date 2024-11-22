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

interface Measurements {
  weight: string;
  height: string;
  neck: string;
  waist: string;
  hip: string;
}

export function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [measurements, setMeasurements] = useState<Measurements>({
    weight: "",
    height: "",
    neck: "",
    waist: "",
    hip: "",
  });
  const [result, setResult] = useState<{
    bodyFatPercentage: number;
    category: string;
  } | null>(null);
  const { toast } = useToast();

  const getCategory = (percentage: number, gender: "male" | "female") => {
    if (gender === "male") {
      if (percentage < 6) return "Essential Fat";
      if (percentage < 14) return "Athletes";
      if (percentage < 18) return "Fitness";
      if (percentage < 25) return "Average";
      return "Above Average";
    } else {
      if (percentage < 14) return "Essential Fat";
      if (percentage < 21) return "Athletes";
      if (percentage < 25) return "Fitness";
      if (percentage < 32) return "Average";
      return "Above Average";
    }
  };

  const calculate = () => {
    const { weight, height, neck, waist, hip } = measurements;
    const values = [weight, height, neck, waist];
    if (gender === "female") values.push(hip);

    if (values.some((v) => v === "" || isNaN(parseFloat(v)))) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for all measurements.",
        variant: "destructive",
      });
      return;
    }

    // U.S. Navy Method
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const h = parseFloat(height);

    let bodyFatPercentage: number;
    if (gender === "male") {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      const hipMeasurement = parseFloat(hip);
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(w + hipMeasurement - n) + 0.22100 * Math.log10(h)) - 450;
    }

    const category = getCategory(bodyFatPercentage, gender);
    setResult({ bodyFatPercentage, category });
  };

  const exportResult = () => {
    if (!result) return;

    const data = `Body Fat Percentage Calculation
Gender: ${gender === "male" ? "Male" : "Female"}
Weight: ${measurements.weight} kg
Height: ${measurements.height} cm
Neck: ${measurements.neck} cm
Waist: ${measurements.waist} cm
${gender === "female" ? `Hip: ${measurements.hip} cm\n` : ""}
Body Fat Percentage: ${result.bodyFatPercentage.toFixed(1)}%
Category: ${result.category}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "body-fat-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "Body fat calculation has been exported to a file.",
    });
  };

  const handleInputChange = (field: keyof Measurements, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select
            value={gender}
            onValueChange={(value: "male" | "female") => setGender(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={measurements.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              placeholder="Enter weight"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={measurements.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              placeholder="Enter height"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="neck">Neck (cm)</Label>
            <Input
              id="neck"
              type="number"
              value={measurements.neck}
              onChange={(e) => handleInputChange("neck", e.target.value)}
              placeholder="Enter neck circumference"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waist">Waist (cm)</Label>
            <Input
              id="waist"
              type="number"
              value={measurements.waist}
              onChange={(e) => handleInputChange("waist", e.target.value)}
              placeholder="Enter waist circumference"
            />
          </div>
        </div>

        {gender === "female" && (
          <div className="space-y-2">
            <Label htmlFor="hip">Hip (cm)</Label>
            <Input
              id="hip"
              type="number"
              value={measurements.hip}
              onChange={(e) => handleInputChange("hip", e.target.value)}
              placeholder="Enter hip circumference"
            />
          </div>
        )}
      </div>

      <Button onClick={calculate} className="w-full">
        Calculate Body Fat
      </Button>

      {result && (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Body Fat Percentage</h3>
                <p className="text-sm text-muted-foreground">
                  {result.category}
                </p>
              </div>
              <p className="text-3xl font-bold">
                {result.bodyFatPercentage.toFixed(1)}%
              </p>
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
  );
}