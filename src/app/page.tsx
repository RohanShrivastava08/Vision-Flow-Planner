
// src/app/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoalInputForm, { goalFormSchema, type GoalFormValues } from '@/components/forms/GoalInputForm';
import PlanDisplay from '@/components/planner/PlanDisplay';

import { generateLifePlan } from '@/ai/flows/life-plan-generation';
import type { LifePlan } from '@/types';


export default function HomePage() {
  const [plan, setPlan] = useState<LifePlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      goal: '',
    },
  });

  async function onSubmit(values: GoalFormValues) {
    setIsLoading(true);
    setPlan(null); 
    try {
      // Note: Timeframe input is not yet implemented in the UI.
      // The AI flow will use its default (3 months) if timeframe is not provided.
      const result = await generateLifePlan({ goal: values.goal });

      if (!result || !result.timeframeUsed || !result.visionStatement || !result.actionPlan || !result.whatToAvoid || !result.timeManagementTips || !result.reflectionPrompts || !result.dailyAffirmation) {
        throw new Error("Received incomplete data from AI service. Please ensure all plan sections are generated.");
      }
      
      setPlan(result);

    } catch (error) {
      console.error("Error generating plan:", error);
      toast({
        title: "Error Generating Plan",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopyPlan() {
    if (!plan) return;

    const planText = `
📌 Vision Statement for ${plan.timeframeUsed}:
${plan.visionStatement}

✅ Daily or Monthly Action Plan:
${plan.actionPlan.map(item => `- ${item}`).join('\n')}

⛔ What to Avoid:
${plan.whatToAvoid.map(item => `- ${item}`).join('\n')}

⏳ Time & Progress Management Tips:
${plan.timeManagementTips.map(item => `- ${item}`).join('\n')}

${plan.toolsToHelp && plan.toolsToHelp.length > 0 ? `🧰 Helpful Tools:\n${plan.toolsToHelp.map(item => `- ${item}`).join('\n')}\n` : ''}
🧭 Reflection & Review Prompts:
${plan.reflectionPrompts.map(item => `- ${item}`).join('\n')}

🎯 Motivational Daily Affirmation:
${plan.dailyAffirmation}
    `.trim();

    navigator.clipboard.writeText(planText)
      .then(() => {
        toast({
          title: "Plan Copied!",
          description: "Your personalized life plan is now in your clipboard.",
        });
      })
      .catch(err => {
        console.error("Failed to copy plan: ", err);
        toast({
          title: "Copy Failed",
          description: "Could not copy plan to clipboard. Please try again.",
          variant: "destructive",
        });
      });
  }

  function handleStartOver() {
    form.reset({ goal: '' });
    setPlan(null);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <section className="w-full max-w-2xl text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground/70 dark:to-accent-foreground">
            One-Liner Life Planner
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
            Turn your one-liner goal into a detailed, AI-powered life plan.
          </p>
          <GoalInputForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </section>

        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-3 mt-8 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Crafting your personalized life plan... This might take a moment.</p>
          </div>
        )}

        {plan && !isLoading && (
          <PlanDisplay
            plan={plan}
            onCopy={handleCopyPlan}
            onStartOver={handleStartOver}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
