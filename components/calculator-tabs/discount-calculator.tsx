"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [result, setResult] = useState<{
    discountAmount: number;
    finalPrice: number;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (originalPrice && discountPercent) {
      calculate();
    }
  }, [originalPrice, discountPercent]);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);
    if (!isNaN(price) && !isNaN(discount)) {
      const discountAmount = (price * discount) / 100;
      const finalPrice = price - discountAmount;
      setResult({ discountAmount, finalPrice });
    }
  };

  const copyToClipboard = () => {
    if (result) {
      const text = `Original Price: $${originalPrice}
Discount: ${discountPercent}%
You Save: $${result.discountAmount.toFixed(2)}
Final Price: $${result.finalPrice.toFixed(2)}`;
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Discount calculation details copied to clipboard."
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="originalPrice">Original Price ($)</Label>
          <Input
            id="originalPrice"
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter original price"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="discountPercent">Discount Percentage</Label>
          <Input
            id="discountPercent"
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="Enter discount percentage"
          />
        </div>
      </div>

      {result && (
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-lg font-semibold">
                Final Price: ${result.finalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                You Save: ${result.discountAmount.toFixed(2)}
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