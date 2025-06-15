// src/components/landing/HowItWorksSection.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, BrainCircuit, TrendingUp } from "lucide-react";
import Image from 'next/image';

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  imageSrc: string;
  imageHint: string;
}

const steps: Step[] = [
  {
    icon: Lightbulb, 
    title: "1. Share Your Vision",
    description: "Start with your one-line goal. What dream or aspiration do you want to bring to life?",
    imageSrc: "https://source.unsplash.com/600x400/?idea,lightbulb,inspiration",
    imageHint: "inspiration lightbulb",
  },
  {
    icon: BrainCircuit, 
    title: "2. Get Your AI Plan",
    description: "Our AI crafts a personalized, step-by-step life plan and a prompt for your visual infographic.",
    imageSrc: "https://source.unsplash.com/600x400/?ai,planning,strategy",
    imageHint: "ai planning",
  },
  {
    icon: TrendingUp, 
    title: "3. Visualize & Achieve",
    description: "Use your detailed text plan and the AI-generated infographic to stay on track and make consistent progress.",
    imageSrc: "https://source.unsplash.com/600x400/?success,achievement,growth",
    imageHint: "growth achievement",
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
          <Card 
            key={index} 
            className="bg-card hover:shadow-xl transition-all duration-300 flex flex-col rounded-lg border-border overflow-hidden animate-in fade-in-0 zoom-in-95"
            style={{ animationDelay: `${index * 100 + 100}ms` }}
          >
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src={step.imageSrc}
                alt={step.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardHeader className="items-center text-center pb-3 pt-5">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-3 inline-block">
                <step.icon className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl font-headline font-semibold text-card-foreground">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-card-foreground/80 flex-grow text-center px-4 pb-5">
              <p>{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
