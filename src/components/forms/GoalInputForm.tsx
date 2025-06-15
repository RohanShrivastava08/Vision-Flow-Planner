// src/components/forms/GoalInputForm.tsx
'use client';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';

export const goalFormSchema = z.object({
  goal: z.string()
    .min(10, { message: 'Your goal should be at least 10 characters long.' })
    .max(200, { message: 'Your goal should not exceed 200 characters. Keep it concise!' }),
});

export type GoalFormValues = z.infer<typeof goalFormSchema>;

interface GoalInputFormProps {
  form: UseFormReturn<GoalFormValues>;
  onSubmit: (values: GoalFormValues) => void;
  isLoading: boolean;
}

export default function GoalInputForm({ form, onSubmit, isLoading }: GoalInputFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="goal-input" className="sr-only">Your Goal</FormLabel>
              <FormControl>
                <Textarea
                  id="goal-input"
                  placeholder="Enter your goal or aspiration in one line (e.g., I want to get fit...)"
                  className="min-h-[100px] text-base sm:text-lg resize-none bg-card p-4 shadow-sm focus-visible:ring-primary focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full text-lg py-6 shadow-md hover:shadow-lg transition-shadow">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Plan...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate My Plan
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
