// src/components/landing/FaqSection.tsx
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is Vision Flow?",
    answer:
      "Vision Flow is an AI-powered web application that helps you turn a single goal or aspiration into a detailed, actionable life plan. It also generates a visual infographic to help you stay motivated and on track.",
  },
  {
    question: "How is my data used? Is it private?",
    answer:
      "Your privacy is paramount. Vision Flow processes your goal in real-time to generate your plan. We do not require logins or accounts, and your goals or generated plans are not stored on our servers.",
  },
  {
    question: "Can I specify a custom timeframe for my goal?",
    answer:
      "Yes! Our AI is designed to create plans tailored to different timeframes (e.g., 20 days, 3 months, 1 year). While the current UI uses a default if none is specified, the AI can handle custom durations effectively. Future updates may include a UI option to input this directly.",
  },
  {
    question: "What if the generated plan or infographic isn't perfect?",
    answer:
      "AI generation can sometimes vary. If you're not fully satisfied, try rephrasing your goal for different results. You can also use the generated plan as a strong starting point and customize it further to perfectly suit your needs.",
  },
  {
    question: "How does the infographic generation work?",
    answer:
      "After your text plan is created, Vision Flow uses another AI model (Gemini) to generate a visual infographic based on a detailed prompt derived from your plan. This process might take a few extra seconds."
  }
];

export default function FaqSection() {
  return (
    <section className="w-full max-w-3xl mx-auto py-8 sm:py-12">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about Vision Flow.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index} className="border-border bg-card shadow-sm hover:shadow-md transition-shadow rounded-md mb-3">
            <AccordionTrigger className="p-4 sm:p-6 text-left font-medium text-card-foreground hover:no-underline text-base sm:text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="p-4 sm:p-6 pt-0 text-card-foreground/80 text-sm sm:text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
