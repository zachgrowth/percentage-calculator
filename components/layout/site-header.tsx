"use client";

import { Calculator as CalculatorIcon, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  {
    title: "Basic Calculator",
    href: "/percentage/basic",
  },
  {
    title: "Education Hub",
    href: "/percentage/education",
  },
  {
    title: "Business Hub",
    href: "/percentage/business",
  },
  {
    title: "Conversion Tools",
    href: "/percentage/convert",
  },
  {
    title: "Basic Tutorials",
    href: "/percentage/learn",
  },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <CalculatorIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-semibold text-lg text-foreground">calculatorhub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all hover:text-primary hover:scale-105",
                  pathname?.startsWith(item.href)
                    ? "text-primary font-semibold"
                    : "text-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
              asChild
            >
              <a 
                href="https://github.com/zachgrowth/percentage-calculator" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View source code on GitHub"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">View source code on GitHub</span>
              </a>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}