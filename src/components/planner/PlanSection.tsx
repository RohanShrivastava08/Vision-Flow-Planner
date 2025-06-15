// src/components/planner/PlanSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface PlanSectionProps {
  title: string;
  icon: LucideIcon;
  content: string | string[];
  iconClassName?: string;
  delay?: number; // Optional delay for staggered animation
}

export default function PlanSection({ title, icon: Icon, content, iconClassName = "text-primary", delay = 0 }: PlanSectionProps) {
  return (
    <Card 
      className="w-full shadow-lg bg-card border-border transition-all duration-300 hover:shadow-xl animate-in fade-in-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center space-x-4 pb-3 pt-5 px-5">
        <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${iconClassName} shrink-0`} aria-hidden="true" />
        <CardTitle className="text-xl sm:text-2xl font-headline text-card-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-base sm:text-lg text-card-foreground/90 px-5 pb-5">
        {Array.isArray(content) ? (
          <ul className="space-y-2">
            {content.map((item, index) => (
              <li key={index} className="flex items-start">
                <span 
                  className={`mr-3 mt-1.5 shrink-0 h-2 w-2 rounded-full ${
                    iconClassName?.includes('text-destructive') ? 'bg-destructive' : 
                    iconClassName?.includes('text-accent') ? 'bg-accent' : 
                    iconClassName?.includes('opacity-70') ? 'bg-primary/70' : // for infographic prompt icon
                    'bg-primary' 
                  }`} 
                  aria-hidden="true"></span>
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
