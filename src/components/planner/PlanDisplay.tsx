// src/components/planner/PlanDisplay.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw, Target, ListChecks, HelpCircle } from 'lucide-react';
import PlanSection from './PlanSection';
import type { Plan } from '@/types';

interface PlanDisplayProps {
  plan: Plan;
  onCopy: () => void;
  onStartOver: () => void;
}

export default function PlanDisplay({ plan, onCopy, onStartOver }: PlanDisplayProps) {
  return (
    <div className="w-full max-w-3xl space-y-6 sm:space-y-8 mt-8 animate-in fade-in-0 slide-in-from-bottom-10 duration-500">
      <PlanSection
        title="📌 3-Month Vision"
        icon={Target}
        content={plan.visionStatement}
        iconClassName="text-green-600 dark:text-green-500"
      />
      <PlanSection
        title="🔥 Daily Habits"
        icon={ListChecks}
        content={plan.dailyHabits}
        iconClassName="text-blue-600 dark:text-blue-500"
      />
      <PlanSection
        title="🧠 Weekly Review Questions"
        icon={HelpCircle}
        content={plan.weeklyQuestions}
        iconClassName="text-purple-600 dark:text-purple-500"
      />
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button onClick={onCopy} className="flex-1 text-base py-3 shadow-md hover:shadow-lg transition-shadow">
          <Copy className="mr-2 h-5 w-5" />
          Copy Plan to Clipboard
        </Button>
        <Button onClick={onStartOver} variant="outline" className="flex-1 text-base py-3 shadow-md hover:shadow-lg transition-shadow border-primary/50 hover:bg-primary/5 dark:border-primary/30 dark:hover:bg-primary/10">
          <RotateCcw className="mr-2 h-5 w-5" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
