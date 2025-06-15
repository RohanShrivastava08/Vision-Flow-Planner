'use server';
/**
 * @fileOverview AI agent that generates weekly review questions based on a user's goal.
 *
 * - generateWeeklyReviewQuestions - A function that generates weekly review questions.
 * - WeeklyReviewQuestionsInput - The input type for the generateWeeklyReviewQuestions function.
 * - WeeklyReviewQuestionsOutput - The return type for the generateWeeklyReviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeeklyReviewQuestionsInputSchema = z.object({
  goal: z.string().describe('The user-defined goal or aspiration in one line.'),
});
export type WeeklyReviewQuestionsInput = z.infer<typeof WeeklyReviewQuestionsInputSchema>;

const WeeklyReviewQuestionsOutputSchema = z.object({
  weeklyReviewQuestions: z
    .array(z.string())
    .describe('A list of 3 weekly reflection questions tailored to the user goal.'),
});
export type WeeklyReviewQuestionsOutput = z.infer<typeof WeeklyReviewQuestionsOutputSchema>;

export async function generateWeeklyReviewQuestions(
  input: WeeklyReviewQuestionsInput
): Promise<WeeklyReviewQuestionsOutput> {
  return weeklyReviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weeklyReviewQuestionsPrompt',
  input: {schema: WeeklyReviewQuestionsInputSchema},
  output: {schema: WeeklyReviewQuestionsOutputSchema},
  prompt: `You are a motivational planning assistant. You will generate a list of weekly reflection questions tailored to the user's goal.

User Goal: {{{goal}}}

Generate 3 weekly reflection questions the user can answer every Sunday to check progress, mindset, and consistency.
Ensure the questions are clear, motivating, and personalized to help the user continuously improve.

Format:
- Question 1
- Question 2
- Question 3`,
});

const weeklyReviewQuestionsFlow = ai.defineFlow(
  {
    name: 'weeklyReviewQuestionsFlow',
    inputSchema: WeeklyReviewQuestionsInputSchema,
    outputSchema: WeeklyReviewQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
