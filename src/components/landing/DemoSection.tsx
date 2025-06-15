
// src/components/landing/DemoSection.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, ListChecks, Sparkles, BarChart3 } from "lucide-react";
import Image from 'next/image';

export default function DemoSection() {
  const demoGoal = "Master the basics of Python programming in 90 days.";
  const demoVision = "In 90 days, I'll confidently write simple Python scripts, understand core programming concepts, and be ready to tackle my first small project! 🚀";
  const demoActionPlan = [
    "📚 Dedicate 1 hour daily to a Python course (e.g., Codecademy, Udemy).",
    "💻 Practice coding challenges on platforms like HackerRank or LeetCode for 30 mins.",
    "📝 Build one mini-project every two weeks (e.g., a calculator, a to-do list app).",
  ];
  const demoAffirmation = "I am a capable learner, and I build my Python skills every day.";

  return (
    <section className="w-full max-w-4xl mx-auto py-8 sm:py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-3">
          See Vision Flow in Action
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Curious how it works? Here's a glimpse of a plan generated for a sample goal.
        </p>
      </div>

      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card border-border overflow-hidden animate-in fade-in-0 zoom-in-95 delay-100">
        <CardHeader className="bg-muted/50 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Lightbulb className="h-7 w-7 text-primary" />
            <p className="text-sm font-semibold text-primary tracking-wide uppercase">Your Goal</p>
          </div>
          <CardTitle className="text-2xl font-headline font-semibold text-card-foreground">{demoGoal}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Target className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-headline font-semibold text-accent">📌 Vision for 90 Days</h3>
            </div>
            <p className="text-card-foreground/90 ml-9">{demoVision}</p>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-3">
              <ListChecks className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-headline font-semibold text-accent">✅ Action Plan Snippet</h3>
            </div>
            <ul className="space-y-2 ml-9">
              {demoActionPlan.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 mt-1.5 shrink-0 h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
                  <span className="text-card-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-headline font-semibold text-accent">🎯 Daily Affirmation</h3>
            </div>
            <p className="text-card-foreground/90 ml-9 italic">{demoAffirmation}</p>
          </div>

          <div className="pt-2">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-headline font-semibold text-accent">📊 Sample Infographic Preview</h3>
            </div>
            <div className="ml-9">
              <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden border border-border shadow-sm mb-2">
                <Image
                  src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-c7b4-61f7-bdd6-1e434ee2f36a/raw?se=2025-06-15T18%3A22%3A28Z&sp=r&sv=2024-08-04&sr=b&scid=db8f6eb1-43c7-558f-bfb6-ea810df36285&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-15T01%3A17%3A27Z&ske=2025-06-16T01%3A17%3A27Z&sks=b&skv=2024-08-04&sig=27FB3XtZMJgGypAJ8uMBUOPOmoB3%2B4eTWQuPXl7rWME%3D"
                  alt="Sample Vision Flow Infographic of a Python learning plan"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-xs text-card-foreground/70">
                Vision Flow also generates a visual infographic like this to help you track your progress at a glance.
              </p>
            </div>
          </div>

          <CardDescription className="text-center text-sm text-muted-foreground pt-6">
            This is just a brief example. Your actual plan will be more detailed with sections like "What to Avoid," "Time Management Tips," and "Reflection Prompts," plus your personalized infographic!
          </CardDescription>
        </CardContent>
      </Card>
    </section>
  );
}
