// src/components/landing/TestimonialsSection.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role?: string; 
  avatarSrc: string;
  avatarHint: string;
  review: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    name: "Alex P.",
    role: "Aspiring Entrepreneur",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarHint: "smiling person",
    review: "Vision Flow turned my vague idea of 'getting healthier' into a concrete daily plan. The infographic is a game-changer for staying motivated!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    role: "University Student",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarHint: "focused student",
    review: "I was struggling to balance study and personal projects. The AI's time management tips were surprisingly insightful. Highly recommend!",
    rating: 5,
  },
  {
    name: "Mike R.",
    role: "Freelance Designer",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarHint: "creative professional",
    review: "As a freelancer, structuring my long-term goals felt overwhelming. Vision Flow helped me break it down into manageable steps. Love the simplicity.",
    rating: 4,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`}
        />
      ))}
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-5xl mx-auto py-8 sm:py-12">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-3">
          Loved by Goal-Getters
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Hear what others have to say about achieving their dreams with Vision Flow.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {testimonialsData.map((testimonial, index) => (
          <Card 
            key={index} 
            className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col rounded-lg border-border animate-in fade-in-0 zoom-in-95"
            style={{ animationDelay: `${index * 100 + 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-3 pt-5 px-5">
              <Avatar className="h-12 w-12 border-2 border-primary/30">
                <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-semibold text-card-foreground">{testimonial.name}</CardTitle>
                {testimonial.role && <CardDescription className="text-xs text-muted-foreground -mt-0.5">{testimonial.role}</CardDescription>}
              </div>
            </CardHeader>
            <CardContent className="text-sm text-card-foreground/80 px-5 pb-5 flex-grow">
              <p className="mb-3">&ldquo;{testimonial.review}&rdquo;</p>
            </CardContent>
            <div className="mt-auto px-5 pb-5">
              <StarRating rating={testimonial.rating} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
