
// src/components/planner/PlanDisplay.tsx
'use client';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw, Download, Target, ListChecks, Ban, Clock, Wrench, HelpCircle, Sparkle } from 'lucide-react';
import PlanSection from './PlanSection';
import type { LifePlan } from '@/types';
import { toPng } from 'html-to-image';
import { useToast } from "@/hooks/use-toast";

interface PlanDisplayProps {
  plan: LifePlan;
  onCopy: () => void;
  onStartOver: () => void;
}

export default function PlanDisplay({ plan, onCopy, onStartOver }: PlanDisplayProps) {
  const planRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSaveAsPng = async () => {
    if (planRef.current === null) {
      toast({
        title: "Error Saving PNG",
        description: "Could not find the plan content to save.",
        variant: "destructive",
      });
      return;
    }
    try {
      // Wait for all fonts to be loaded and ready
      await document.fonts.ready;

      const rootStyle = getComputedStyle(document.documentElement);
      const bgCssValue = rootStyle.getPropertyValue('--background').trim();
      // Check if the dark mode specific HSL value for --background is present
      const isDarkModeActive = bgCssValue.includes('230 15% 12%'); 
      const imageBgColor = isDarkModeActive ? '#1E2124' : '#F0F0F5';
      
      const dataUrl = await toPng(planRef.current, { 
        cacheBust: true, 
        quality: 0.95, 
        backgroundColor: imageBgColor,
      });
      const link = document.createElement('a');
      link.download = 'my-life-plan.png';
      link.href = dataUrl;
      link.click();
      toast({
        title: "Plan Saved as PNG!",
        description: "Your personalized plan image has been downloaded.",
      });
    } catch (err) {
      console.error("Failed to save as PNG", err);
      let description = "Could not save the plan as an image. Please try again.";
      if (err instanceof Error && err.message.includes("CSSStyleSheet")) {
        description = "Could not save the plan as an image due to a font loading issue. Please try again. If the problem persists, ensure your browser allows access to Google Fonts."
      } else if (err instanceof Error) {
        description = err.message;
      }
      toast({
        title: "Error Saving PNG",
        description: description,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-6 sm:space-y-8 mt-8 animate-in fade-in-0 slide-in-from-bottom-10 duration-500">
      <div ref={planRef} className="w-full space-y-6 sm:space-y-8 bg-background p-px"> {/* Added p-px for html-to-image to capture bg */}
        <PlanSection
          title="📌 3-Month Vision"
          icon={Target}
          content={plan.threeMonthVision}
          iconClassName="text-primary"
        />
        <PlanSection
          title="🧠 What to Do Daily"
          icon={ListChecks}
          content={plan.whatToDoDaily}
          iconClassName="text-primary"
        />
        <PlanSection
          title="⛔ What to Avoid"
          icon={Ban}
          content={plan.whatToAvoid}
          iconClassName="text-destructive"
        />
        <PlanSection
          title="⏳ Time Management Tips"
          icon={Clock}
          content={plan.timeManagementTips}
          iconClassName="text-primary"
        />
        {plan.toolsToHelp && plan.toolsToHelp.length > 0 && (
          <PlanSection
            title="🧰 Tools to Help"
            icon={Wrench}
            content={plan.toolsToHelp}
            iconClassName="text-accent-foreground"
          />
        )}
        <PlanSection
          title="🧭 Weekly Reflection Questions"
          icon={HelpCircle}
          content={plan.weeklyReflectionQuestions}
          iconClassName="text-primary"
        />
        <PlanSection
          title="🎯 One-Line Daily Affirmation"
          icon={Sparkle}
          content={plan.dailyAffirmation}
          iconClassName="text-primary"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button onClick={onCopy} className="flex-1 text-base py-3 shadow-md hover:shadow-lg transition-shadow">
          <Copy className="mr-2 h-5 w-5" />
          Copy Plan to Clipboard
        </Button>
        <Button onClick={handleSaveAsPng} variant="secondary" className="flex-1 text-base py-3 shadow-md hover:shadow-lg transition-shadow">
          <Download className="mr-2 h-5 w-5" />
          Save as PNG
        </Button>
        <Button onClick={onStartOver} variant="outline" className="flex-1 text-base py-3 shadow-md hover:shadow-lg transition-shadow border-primary/50 hover:bg-primary/5 dark:border-primary/30 dark:hover:bg-primary/10">
          <RotateCcw className="mr-2 h-5 w-5" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
