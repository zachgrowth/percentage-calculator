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

const formats = [
  { id: "percentage", label: "Percentage (%)" },
  { id: "decimal", label: "Decimal" },
  { id: "fraction", label: "Fraction" },
  { id: "permille", label: "Per mille (‰)" },
  { id: "bps", label: "Basis points (bps)" },
  { id: "ppm", label: "Parts per 10,000 (ppm)" },
];

function fractionToDecimal(fraction: string): number {
  const [numerator, denominator] = fraction.split("/").map(Number);
  if (!denominator) return numerator;
  return numerator / denominator;
}

function decimalToFraction(decimal: number): string {
  const tolerance = 1.0E-6;
  let h1 = 1;
  let h2 = 0;
  let k1 = 0;
  let k2 = 1;
  let b = decimal;
  
  do {
    const a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

  return `${h1}/${k1}`;
}

export function FormatConverter({ onCalculate }: { onCalculate: (result: { input: any; result: any }) => void }) {
  const [value, setValue] = useState("");
  const [fromFormat, setFromFormat] = useState("decimal");
  const [toFormat, setToFormat] = useState("percentage");
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const convert = () => {
    let inputValue = value.trim();
    let numValue: number;

    try {
      if (fromFormat === "fraction") {
        numValue = fractionToDecimal(inputValue);
      } else {
        numValue = parseFloat(inputValue);
      }

      if (isNaN(numValue)) throw new Error("Invalid number");
    } catch (error) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number or fraction.",
        variant: "destructive",
      });
      return;
    }

    let standardValue: number;
    let convertedValue: string;

    // Convert to standard form (decimal)
    switch (fromFormat) {
      case "percentage":
        standardValue = numValue / 100;
        break;
      case "fraction":
        standardValue = numValue;
        break;
      case "permille":
        standardValue = numValue / 1000;
        break;
      case "bps":
        standardValue = numValue / 10000;
        break;
      case "ppm":
        standardValue = numValue / 10000;
        break;
      default:
        standardValue = numValue;
    }

    // Convert from standard form to target format
    switch (toFormat) {
      case "percentage":
        convertedValue = `${(standardValue * 100).toFixed(2)}%`;
        break;
      case "decimal":
        convertedValue = standardValue.toFixed(4);
        break;
      case "fraction":
        convertedValue = decimalToFraction(standardValue);
        break;
      case "permille":
        convertedValue = `${(standardValue * 1000).toFixed(2)}‰`;
        break;
      case "bps":
        convertedValue = `${(standardValue * 10000).toFixed(0)} bps`;
        break;
      case "ppm":
        convertedValue = `${(standardValue * 10000).toFixed(0)} ppm`;
        break;
      default:
        convertedValue = standardValue.toString();
    }

    setResult(convertedValue);
    onCalculate({
      input: { value: inputValue, fromFormat, toFormat },
      result: { convertedValue },
    });
  };

  const getInputPlaceholder = () => {
    switch (fromFormat) {
      case "fraction":
        return "e.g., 3/4 or 0.75";
      case "percentage":
        return "e.g., 75";
      case "permille":
        return "e.g., 750";
      case "bps":
        return "e.g., 7500";
      case "ppm":
        return "e.g., 7500";
      default:
        return "e.g., 0.75";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value) {
      convert();
    }
  };

  const exportResult = () => {
    if (!result) return;

    const data = `Format Conversion
Original Value: ${value} (${formats.find(f => f.id === fromFormat)?.label})
Converted Value: ${result} (${formats.find(f => f.id === toFormat)?.label})`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "format-conversion.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "Conversion has been exported to a file.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>From Format</Label>
              <Select value={fromFormat} onValueChange={setFromFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.id} value={format.id}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>To Format</Label>
              <Select value={toFormat} onValueChange={setToFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.id} value={format.id}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                value={value}
                onChange={handleInputChange}
                placeholder={getInputPlaceholder()}
              />
              <p className="text-sm text-muted-foreground">
                {getInputPlaceholder()}
              </p>
            </div>
          </div>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Converted Value</h3>
                    <p className="text-sm text-muted-foreground">
                      From {formats.find(f => f.id === fromFormat)?.label}
                    </p>
                  </div>
                  <p className="text-3xl font-bold">{result}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={exportResult}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Conversion
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}