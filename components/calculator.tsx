"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BasicCalculator } from "./calculator-tabs/basic-calculator";
import { DiscountCalculator } from "./calculator-tabs/discount-calculator";
import { TaxCalculator } from "./calculator-tabs/tax-calculator";
import { Percent, Tag, Receipt } from "lucide-react";

export function Calculator() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              <span>Basic</span>
            </TabsTrigger>
            <TabsTrigger value="discount" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>Discount</span>
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              <span>Tax</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="basic">
              <BasicCalculator />
            </TabsContent>

            <TabsContent value="discount">
              <DiscountCalculator />
            </TabsContent>

            <TabsContent value="tax">
              <TaxCalculator />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}