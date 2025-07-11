
// src/components/landing/AboutSection.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Goal, Eye, ListTodo } from "lucide-react";

interface AboutItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  imageSrc: string;
  delay: number;
}

const AboutItem: React.FC<AboutItemProps> = ({ icon: Icon, title, description, imageSrc, delay }) => (
  <Card 
    className="bg-card hover:shadow-xl transition-all duration-300 h-full flex flex-col rounded-lg border-border overflow-hidden animate-in fade-in-0 zoom-in-95"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="relative w-full h-48 sm:h-56">
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <CardHeader className="pb-3 pt-5">
      <div className="flex items-center space-x-3 mb-2">
        <Icon className="h-7 w-7 text-primary" />
        <CardTitle className="text-xl font-headline font-semibold text-card-foreground">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="text-sm text-card-foreground/80 flex-grow">
      <p>{description}</p>
    </CardContent>
  </Card>
);

export default function AboutSection() {
  const aboutItems = [
    {
      icon: Goal,
      title: "Empowering Your Goals",
      description: "We believe that every great achievement starts with a single, clear goal. Vision Flow is designed to take that initial spark and help you nurture it into a fully-fledged plan for success.",
      imageSrc: "https://plus.unsplash.com/premium_photo-1683749810427-9f460939f702?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdvYWxzfGVufDB8fDB8fHww",
      delay: 100,
    },
    {
      icon: Eye,
      title: "Cultivating Clear Vision",
      description: "A clear vision is the roadmap to your aspirations. Our AI helps you articulate this vision, breaking down complexities into understandable and inspiring milestones for any timeframe.",
      imageSrc: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D",
      delay: 200,
    },
    {
      icon: ListTodo,
      title: "Fostering Actionable Plans",
      description: "Ideas are powerful, but action is transformative. Vision Flow provides you with structured, actionable steps, practical tips, and motivational support to turn your vision into reality.",
      imageSrc: "https://images.unsplash.com/photo-1654931799020-ce7cf3f4a2c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWN0aW9uJTIwcGxhbnN8ZW58MHx8MHx8fDA%3D",
      delay: 300,
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto py-8 sm:py-12">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-3">
          Our Vision & Mission
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          At Vision Flow, we&apos;re dedicated to helping you bridge the gap between your aspirations and achievements.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {aboutItems.map((item) => (
          <AboutItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
