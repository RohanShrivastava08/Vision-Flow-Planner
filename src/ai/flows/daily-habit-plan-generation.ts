'use server';
/**
 * @fileOverview Generates a set of 3-5 simple, repeatable daily habits aligned with the user's goal.
 *
 * - generateDailyHabitPlan - A function that handles the daily habit plan generation process.
 * - GenerateDailyHabitPlanInput - The input type for the generateDailyHabitPlan function.
 * - GenerateDailyHabitPlanOutput - The return type for the generateDailyHabitPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyHabitPlanInputSchema = z.object({
  goal: z.string().describe('The user-provided goal or aspiration.'),
});
export type GenerateDailyHabitPlanInput = z.infer<typeof GenerateDailyHabitPlanInputSchema>;

const GenerateDailyHabitPlanOutputSchema = z.object({
  habits: z.array(z.string()).describe('A list of 3-5 simple, repeatable daily habits aligned with the goal.'),
});
export type GenerateDailyHabitPlanOutput = z.infer<typeof GenerateDailyHabitPlanOutputSchema>;

export async function generateDailyHabitPlan(input: GenerateDailyHabitPlanInput): Promise<GenerateDailyHabitPlanOutput> {
  return generateDailyHabitPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyHabitPlanPrompt',
  input: {schema: GenerateDailyHabitPlanInputSchema},
  output: {schema: GenerateDailyHabitPlanOutputSchema},
  prompt: `You are a motivational planning assistant. A user will give you a single-line life goal or aspiration. Based on that input, generate a set of 3-5 simple, repeatable daily habits aligned with the goal.\n\nGoal: {{{goal}}}`,
});

const generateDailyHabitPlanFlow = ai.defineFlow(
  {
    name: 'generateDailyHabitPlanFlow',
    inputSchema: GenerateDailyHabitPlanInputSchema,
    outputSchema: GenerateDailyHabitPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
