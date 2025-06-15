
// src/components/planner/PlanDisplay.tsx
'use client';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, RotateCcw, Download, Target, ListChecks, Ban, Clock, Wrench, HelpCircle, Sparkle, Image as ImageIcon, Loader2, DownloadCloud } from 'lucide-react';
import PlanSection from './PlanSection';
import type { LifePlan } from '@/types';
import { useToast } from "@/hooks/use-toast";

interface PlanDisplayProps {
  plan: LifePlan;
  onCopy: () => void;
  onStartOver: () => void;
  generatedInfographicUrl: string | null;
  isGeneratingInfographic: boolean;
}

export default function PlanDisplay({ plan, onCopy, onStartOver, generatedInfographicUrl, isGeneratingInfographic }: PlanDisplayProps) {
  const { toast } = useToast();
  const planToSaveRef = useRef<HTMLDivElement>(null);

  const handleDownloadGeneratedImage = async () => {
    if (!generatedInfographicUrl) {
      toast({
        title: "Download Error",
        description: "Infographic image is not available for download.",
        variant: "destructive",
      });
      return;
    }
    try {
      const link = document.createElement('a');
      link.href = generatedInfographicUrl;
      const filename = plan.goal ? plan.goal.toLowerCase().replace(/\s+/g, '-').substring(0, 30) + '-infographic.png' : 'life-plan-infographic.png';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Infographic Downloaded!",
        description: "Your AI-generated infographic has been saved.",
      });
    } catch (err) {
      console.error("Failed to download AI infographic", err);
      toast({
        title: "Download Failed",
        description: "Could not download the AI infographic. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleSaveFullPlanAsPng = async () => {
    if (!planToSaveRef.current) {
      toast({
        title: 'Error Saving Image',
        description: 'Could not capture the plan content for image export.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await document.fonts.ready;

      const isDarkMode = document.documentElement.classList.contains('dark');
      // Light: hsl(30, 60%, 97%) -> #fcfaf7
      // Dark: hsl(220, 20%, 10%) -> #14171f
      const bgColor = isDarkMode ? '#14171f' : '#fcfaf7';

      const dataUrl = await toPng(planToSaveRef.current, {
        cacheBust: true, 
        quality: 0.95,   
        pixelRatio: 2,   
        backgroundColor: bgColor,
      });
      
      const link = document.createElement('a');
      const filename = plan.goal ? plan.goal.toLowerCase().replace(/\s+/g, '-').substring(0,30) + '-full-plan.png' : 'vision-flow-plan.png';
      link.download = filename;
      link.href = dataUrl;
      link.click();
      toast({
        title: 'Full Plan Saved!',
        description: 'Your complete plan image has been downloaded.',
      });
    } catch (error) {
      console.error('Error saving full plan as PNG:', error);
      let description = 'An unexpected error occurred while saving the image.';
      if (error instanceof Error) {
        if (error.message.includes('Cannot access rules') || error.message.includes('error loading CSS')) {
          description = 'Could not fully process styles for image export, possibly due to external fonts or CORS. The image might have rendering issues with custom fonts.';
        } else {
          description = error.message;
        }
      }
      toast({
        title: 'Error Saving Image',
        description: description,
        variant: 'destructive',
      });
    }
  };


  return (
    <div ref={planToSaveRef} className="w-full max-w-3xl space-y-6 sm:space-y-8 mt-8 animate-in fade-in-0 slide-in-from-bottom-10 duration-500 p-4 bg-background">
      <PlanSection
        title={`📌 Vision Statement for ${plan.timeframeUsed}`}
        icon={Target}
        content={plan.visionStatement}
        iconClassName="text-primary"
        delay={100}
      />
      <PlanSection
        title="✅ Daily or Monthly Action Plan"
        icon={ListChecks}
        content={plan.actionPlan}
        iconClassName="text-primary"
        delay={200}
      />
      <PlanSection
        title="⛔ What to Avoid"
        icon={Ban}
        content={plan.whatToAvoid}
        iconClassName="text-destructive"
        delay={300}
      />
      <PlanSection
        title="⏳ Time & Progress Management Tips"
        icon={Clock}
        content={plan.timeManagementTips}
        iconClassName="text-primary"
        delay={400}
      />
      {plan.toolsToHelp && plan.toolsToHelp.length > 0 && (
        <PlanSection
          title="🧰 Helpful Tools"
          icon={Wrench}
          content={plan.toolsToHelp}
          iconClassName="text-accent-foreground dark:text-accent"
          delay={500}
        />
      )}
      <PlanSection
        title="🧭 Reflection & Review Prompts"
        icon={HelpCircle}
        content={plan.reflectionPrompts}
        iconClassName="text-primary"
        delay={600}
      />
      <PlanSection
        title="🎯 Motivational Daily Affirmation"
        icon={Sparkle}
        content={plan.dailyAffirmation}
        iconClassName="text-primary"
        delay={700}
      />

      <Card className="w-full shadow-lg bg-card border-border transition-all duration-300 hover:shadow-xl relative animate-in fade-in-0 delay-[800ms] duration-500">
        <CardHeader className="flex flex-row items-center justify-between space-x-4 pb-3 pt-5 px-5">
          <div className="flex items-center space-x-4">
            <ImageIcon className="h-7 w-7 sm:h-8 sm:w-8 text-primary shrink-0" aria-hidden="true" />
            <CardTitle className="text-xl sm:text-2xl font-headline text-card-foreground">Your AI-Generated Infographic</CardTitle>
          </div>
          {!isGeneratingInfographic && generatedInfographicUrl && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownloadGeneratedImage}
              className="h-9 w-9 border-primary/30 hover:bg-primary/10"
              aria-label="Download AI Infographic"
            >
              <DownloadCloud className="h-4 w-4 text-primary" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="text-base sm:text-lg text-card-foreground/90 px-5 pb-5">
          {isGeneratingInfographic && (
            <div className="flex flex-col items-center justify-center space-y-2 py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating your visual infographic...</p>
            </div>
          )}
          {!isGeneratingInfographic && generatedInfographicUrl && (
            <img 
              src={generatedInfographicUrl} 
              alt="AI Generated Life Plan Infographic" 
              className="w-full h-auto rounded-md border border-border shadow-sm"
              data-ai-hint="infographic lifestyle" 
            />
          )}
          {!isGeneratingInfographic && !generatedInfographicUrl && (
            <p className="text-muted-foreground text-center py-10">Infographic could not be generated at this time. You can still use the text plan and copy the prompt below for manual generation.</p>
          )}
        </CardContent>
      </Card>
      
       <PlanSection
          title="🖼️ AI Infographic Prompt (for reference)"
          icon={ImageIcon}
          content={plan.infographicPrompt}
          iconClassName="text-primary opacity-70"
          delay={900}
        />

      <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in-0 delay-[1000ms] duration-500">
        <Button onClick={onCopy} className="flex-1 text-base py-3 shadow-md hover:shadow-lg transition-shadow">
          <Copy className="mr-2 h-5 w-5" />
          Copy Plan Text
        </Button>
        <Button 
          onClick={handleSaveFullPlanAsPng} 
          variant="secondary" 
          className="flex-1 text-base py-3 shadow-md hover:shadow-lg transition-shadow"
        >
          <Download className="mr-2 h-5 w-5" />
          Save Full Plan Image
        </Button>
        <Button onClick={onStartOver} variant="outline" className="flex-1 text-base py-3 shadow-md hover:shadow-lg transition-shadow border-primary/50 hover:bg-primary/5 dark:border-primary/30 dark:hover:bg-primary/10">
          <RotateCcw className="mr-2 h-5 w-5" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
