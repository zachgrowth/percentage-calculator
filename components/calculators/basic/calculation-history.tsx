"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Calculation } from "./index";

interface CalculationHistoryProps {
  history: Calculation[];
  onClear: () => void;
}

export function CalculationHistory({ history, onClear }: CalculationHistoryProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatResult = (entry: Calculation) => {
    try {
      switch (entry.type) {
        case "simple":
          return `${entry.input.percentage}% of ${entry.input.number} = ${entry.result.value?.toFixed(2)}`;
        case "change":
          return `${entry.result.isIncrease ? "+" : "-"}${entry.result.percentageChange?.toFixed(2)}% (${entry.input.fromValue} → ${entry.input.toValue})`;
        case "convert":
          return `${entry.input.value} ${entry.input.fromFormat} = ${entry.result.convertedValue} ${entry.input.toFormat}`;
        default:
          return "Calculation completed";
      }
    } catch (error) {
      console.error("Error formatting history entry:", error);
      return "Calculation completed";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">History</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          disabled={history.length === 0}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No calculations yet
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="text-sm border-b pb-2 last:border-0"
              >
                <p className="font-medium">{formatResult(entry)}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(entry.timestamp)}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}