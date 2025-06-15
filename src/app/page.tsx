
// src/app/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoalInputForm, { goalFormSchema, type GoalFormValues } from '@/components/forms/GoalInputForm';
import PlanDisplay from '@/components/planner/PlanDisplay';
import AboutSection from '@/components/landing/AboutSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import DemoSection from '@/components/landing/DemoSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FaqSection from '@/components/landing/FaqSection';
import LoadingModal from '@/components/layout/LoadingModal'; // Import the new modal
import { Separator } from '@/components/ui/separator';

import { generateLifePlan } from '@/ai/flows/life-plan-generation';
import { generateImage } from '@/ai/flows/image-generation-flow';
import type { LifePlan } from '@/types';


export default function HomePage() {
  const [plan, setPlan] = useState<LifePlan | null>(null);
  const [isLoadingTextPlan, setIsLoadingTextPlan] = useState(false);
  const [isGeneratingInfographic, setIsGeneratingInfographic] = useState(false);
  const [generatedInfographicUrl, setGeneratedInfographicUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      goal: '',
    },
  });

  async function onSubmit(values: GoalFormValues) {
    setIsLoadingTextPlan(true);
    setIsGeneratingInfographic(false); // Reset infographic loading state specifically
    setPlan(null);
    setGeneratedInfographicUrl(null);

    try {
      const textResult = await generateLifePlan({ goal: values.goal });

      if (!textResult || !textResult.timeframeUsed || !textResult.visionStatement || !textResult.actionPlan || !textResult.whatToAvoid || !textResult.timeManagementTips || !textResult.reflectionPrompts || !textResult.dailyAffirmation || !textResult.infographicPrompt) {
        throw new Error("Received incomplete data from AI for the text plan. Please ensure all plan sections and infographic prompt are generated.");
      }
      
      setPlan(textResult);
      setIsLoadingTextPlan(false); // Text plan loading finished

      // Start infographic generation if prompt is available
      if (textResult.infographicPrompt) {
        setIsGeneratingInfographic(true); // Now set infographic loading to true
        try {
          const imageResult = await generateImage({ prompt: textResult.infographicPrompt });
          if (imageResult && imageResult.imageUrl) {
            setGeneratedInfographicUrl(imageResult.imageUrl);
          } else {
            toast({
              title: "Infographic Generation Issue",
              description: "Could not generate the infographic image, but your text plan is ready.",
              variant: "default",
            });
          }
        } catch (imgError) {
          console.error("Error generating infographic:", imgError);
          toast({
            title: "Infographic Generation Failed",
            description: imgError instanceof Error ? imgError.message : "An unexpected error occurred while generating the infographic.",
            variant: "default",
          });
        } finally {
          setIsGeneratingInfographic(false); // Infographic generation finished (success or fail)
        }
      }

    } catch (error) {
      console.error("Error generating plan:", error);
      toast({
        title: "Error Generating Plan",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoadingTextPlan(false);
      setIsGeneratingInfographic(false); // Ensure all loading states are false on error
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

🖼️ AI Infographic Prompt (for reference):
${plan.infographicPrompt}
    `.trim();

    navigator.clipboard.writeText(planText)
      .then(() => {
        toast({
          title: "Plan Copied!",
          description: "Your personalized life plan text and infographic prompt are now in your clipboard.",
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
    setPlan(null);
    setGeneratedInfographicUrl(null);
    setIsLoadingTextPlan(false);
    setIsGeneratingInfographic(false);
    form.reset(); 
  }

  // Combined loading state for the modal
  const showLoadingIndicator = isLoadingTextPlan || isGeneratingInfographic;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        
        <section className="w-full max-w-3xl text-center mb-10 sm:mb-12 animate-in fade-in-0 slide-in-from-top-10 duration-700">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground/80 dark:to-accent">
            Vision Flow
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10">
            Transform your goals into actionable AI-powered life plans and visual infographics. <br className="hidden sm:block" />
            Start with one line, achieve with a clear vision.
          </p>
          <div className="max-w-2xl mx-auto">
            <GoalInputForm form={form} onSubmit={onSubmit} isLoading={isLoadingTextPlan || isGeneratingInfographic} />
          </div>
        </section>

        <LoadingModal
          isOpen={showLoadingIndicator}
          title={isLoadingTextPlan ? "Crafting Your Plan..." : "Generating Infographic..."}
          description={
            isLoadingTextPlan 
              ? "Our AI is working on your personalized life plan. This might take a moment." 
              : "Your visual infographic is being created. This could take a few extra seconds."
          }
        />

        {!showLoadingIndicator && plan && (
          <PlanDisplay
            plan={plan}
            onCopy={handleCopyPlan}
            onStartOver={handleStartOver}
            generatedInfographicUrl={generatedInfographicUrl}
            isGeneratingInfographic={false} // Modal handles infographic loading display now
          />
        )}
        
        {/* Landing page sections are now always rendered unless a plan is actively being displayed and loaded */}
        <div className="w-full space-y-12 sm:space-y-16 animate-in fade-in-0 delay-300 duration-700 mt-8">
          <DemoSection />
          <Separator className="my-12 sm:my-16" />
          <AboutSection />
          <Separator className="my-12 sm:my-16" />
          <HowItWorksSection />
          <Separator className="my-12 sm:my-16" />
          <FeaturesSection />
          <Separator className="my-12 sm:my-16" />
          <TestimonialsSection />
          <Separator className="my-12 sm:my-16" />
          <FaqSection />
        </div>

      </main>
      <Footer />
    </div>
  );
}
