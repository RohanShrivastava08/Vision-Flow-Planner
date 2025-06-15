// src/components/planner/PlanSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface PlanSectionProps {
  title: string;
  icon: LucideIcon;
  content: string | string[];
  iconClassName?: string; 
}

export default function PlanSection({ title, icon: Icon, content, iconClassName = "text-primary" }: PlanSectionProps) {
  return (
    <Card className="w-full shadow-lg bg-card border-border transition-all duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center space-x-4 pb-3 pt-5 px-5">
        <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${iconClassName} shrink-0`} aria-hidden="true" />
        <CardTitle className="text-xl sm:text-2xl font-headline text-card-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-base sm:text-lg text-card-foreground/90 px-5 pb-5">
        {Array.isArray(content) ? (
          <ul className="space-y-2">
            {content.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className={`mr-3 mt-1.5 shrink-0 h-2 w-2 rounded-full ${iconClassName?.replace('text-','bg-') || 'bg-primary'}`} aria-hidden="true"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
      </CardContent>
    </Card>
  );
}
