import { ReactNode } from 'react';
import { Card } from "@/components/ui/card";

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
}

export function OnboardingLayout({ children, step, totalSteps }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full ${
                  index < step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Paso {step} de {totalSteps}
          </div>
        </div>
        {children}
      </Card>
    </div>
  );
}