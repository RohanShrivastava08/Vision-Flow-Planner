'use server';

/**
 * @fileOverview Generates a personalized 3-month vision statement from a one-line goal.
 *
 * - generateVisionStatement - A function that generates the vision statement.
 * - VisionStatementInput - The input type for the generateVisionStatement function.
 * - VisionStatementOutput - The return type for the generateVisionStatement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisionStatementInputSchema = z.object({
  goal: z
    .string()
    .describe('A one-line goal or aspiration that the user wants to achieve.'),
});
export type VisionStatementInput = z.infer<typeof VisionStatementInputSchema>;

const VisionStatementOutputSchema = z.object({
  visionStatement: z
    .string()
    .describe('A personalized and motivating 3-month vision statement.'),
});
export type VisionStatementOutput = z.infer<typeof VisionStatementOutputSchema>;

export async function generateVisionStatement(
  input: VisionStatementInput
): Promise<VisionStatementOutput> {
  return visionStatementFlow(input);
}

const visionStatementPrompt = ai.definePrompt({
  name: 'visionStatementPrompt',
  input: {schema: VisionStatementInputSchema},
  output: {schema: VisionStatementOutputSchema},
  prompt: `You are a motivational planning assistant. A user will give you a single-line life goal or aspiration.
Based on that input, generate a 3-month vision statement: a motivating, clear description of what success looks like after 3 months.

Keep it clear, motivating, and personalized.

Goal: {{{goal}}}

Vision Statement:`, // Removed Format: since only the statement is returned
});

const visionStatementFlow = ai.defineFlow(
  {
    name: 'visionStatementFlow',
    inputSchema: VisionStatementInputSchema,
    outputSchema: VisionStatementOutputSchema,
  },
  async input => {
    const {output} = await visionStatementPrompt(input);
    return output!;
  }
);
