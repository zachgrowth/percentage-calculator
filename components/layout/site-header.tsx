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
          <Link href="/" className="flex items-center gap-2">
            <CalculatorIcon className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">calculatorhub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname?.startsWith(item.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}