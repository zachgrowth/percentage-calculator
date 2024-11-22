"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function TaxCalculator() {
  const [amount, setAmount] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [result, setResult] = useState<{
    taxAmount: number;
    totalAmount: number;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (amount && taxRate) {
      calculate();
    }
  }, [amount, taxRate]);

  const calculate = () => {
    const baseAmount = parseFloat(amount);
    const rate = parseFloat(taxRate);
    if (!isNaN(baseAmount) && !isNaN(rate)) {
      const taxAmount = (baseAmount * rate) / 100;
      const totalAmount = baseAmount + taxAmount;
      setResult({ taxAmount, totalAmount });
    }
  };

  const copyToClipboard = () => {
    if (result) {
      const text = `Base Amount: $${amount}
Tax Rate: ${taxRate}%
Tax Amount: $${result.taxAmount.toFixed(2)}
Total Amount: $${result.totalAmount.toFixed(2)}`;
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Tax calculation details copied to clipboard."
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="Enter tax rate"
          />
        </div>
      </div>

      {result && (
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-lg font-semibold">
                Total Amount: ${result.totalAmount.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Tax Amount: ${result.taxAmount.toFixed(2)}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}