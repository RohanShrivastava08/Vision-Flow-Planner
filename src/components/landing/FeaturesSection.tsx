// src/components/landing/FeaturesSection.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Image as ImageIcon, CalendarDays, Download, ShieldCheck, Copy } from "lucide-react";

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description, delay }) => (
  <Card 
    className="text-center p-6 bg-card hover:shadow-xl transition-all duration-300 h-full flex flex-col rounded-lg border-border animate-in fade-in-0 zoom-in-95"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="mb-4 text-primary flex justify-center">
      <Icon className="h-10 w-10" />
    </div>
    <h3 className="text-xl font-headline font-semibold text-card-foreground mb-2">{title}</h3>
    <p className="text-card-foreground/80 text-sm flex-grow">{description}</p>
  </Card>
);

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Leverage advanced AI to transform your simple goals into comprehensive, actionable life plans.",
    },
    {
      icon: ImageIcon,
      title: "Visual Infographics",
      description: "Get a visually appealing infographic generated from your plan, perfect for quick reference and motivation.",
    },
    {
      icon: CalendarDays,
      title: "Timeframe Flexible",
      description: "Our AI adapts to generate suitable plans whether your goal is short-term (e.g., 20 days) or long-term (e.g., 1 year).",
    },
    {
      icon: Download,
      title: "Easy Export Options",
      description: "Download your full textual plan as an image or the generated infographic to keep or share.",
    },
    {
      icon: Copy,
      title: "Copy to Clipboard",
      description: "Quickly copy the full text of your life plan for easy pasting into your favorite notes app or document.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy First",
      description: "No logins, no accounts. Your goals are processed in real-time and not stored on our servers.",
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto py-8 sm:py-12">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-3">
          Why Choose Vision Flow?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the features that make achieving your goals simpler and more inspiring.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <FeatureItem key={feature.title} {...feature} delay={index * 100 + 100} />
        ))}
      </div>
    </section>
  );
}
