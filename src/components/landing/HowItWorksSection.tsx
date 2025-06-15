// src/components/landing/HowItWorksSection.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb, BrainCircuit, Wand2, TrendingUp, CheckCircle, FileText, Image as ImageIcon } from "lucide-react";

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Lightbulb, // Changed from Target for "Define" step
    title: "1. Share Your Vision",
    description: "Start with your one-line goal. What dream or aspiration do you want to bring to life?",
  },
  {
    icon: BrainCircuit, // Combines Brain and Wand2 ideas
    title: "2. Get Your AI Plan",
    description: "Our AI crafts a personalized, step-by-step life plan and a prompt for your visual infographic.",
  },
  {
    icon: TrendingUp, // Changed from CheckCircle for more dynamic feel
    title: "3. Visualize & Achieve",
    description: "Use your detailed text plan and the AI-generated infographic to stay on track and make consistent progress.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full max-w-5xl mx-auto py-8 sm:py-12">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-3">
          Simple Steps to Success
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transforming your goals into reality is easier than you think. Here’s how Vision Flow works:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="text-center bg-card hover:shadow-lg transition-shadow duration-300 flex flex-col rounded-lg border-border p-2">
            <CardHeader className="items-center pb-3 pt-5">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4 inline-block">
                <step.icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-headline font-semibold text-card-foreground">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-card-foreground/80 flex-grow">
              <p>{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
