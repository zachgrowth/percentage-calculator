import { Calculator as CalculatorIcon, Mail } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalculatorIcon className="h-4 w-4" />
            <p>©2024 calculatorhub.tools. All rights reserved.</p>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="mailto:info@calculatorhub.tools" className="hover:text-primary transition-colors flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>info@calculatorhub.tools</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}