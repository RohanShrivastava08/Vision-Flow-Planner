
'use server';
/**
 * @fileOverview Generates a detailed life plan based on a user's one-line goal and an optional timeframe.
 *
 * - generateLifePlan - A function that handles the life plan generation process.
 * - GenerateLifePlanInput - The input type for the generateLifePlan function.
 * - GenerateLifePlanOutput - The return type for the generateLifePlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLifePlanInputSchema = z.object({
  goal: z.string().describe('The user-provided one-line goal or aspiration.'),
  timeframe: z.string().optional().describe('Optional timeframe for the goal, e.g., "20 days", "3 months". Defaults to 3 months if not provided.'),
});
export type GenerateLifePlanInput = z.infer<typeof GenerateLifePlanInputSchema>;

const GenerateLifePlanOutputSchema = z.object({
  timeframeUsed: z.string().describe("The timeframe (e.g., '3 months', '20 days') that was used to generate this plan. This should reflect the user's input or the default if none was provided."),
  visionStatement: z.string().describe("The content of the vision statement for the specified timeframe. Encouraging and friendly tone, no jargon. Expectations adjusted for timeframe length."),
  actionPlan: z.array(z.string()).describe("The content for the action plan. If timeframe <= 1 month, a list of 5-7 detailed daily habits. If timeframe > 1 month, a month-by-month breakdown of evolving habits/goals. Simple explanations with emojis."),
  whatToAvoid: z.array(z.string()).describe("The content for what to avoid. A friendly list of bad habits, time-wasters, or pitfalls."),
  timeManagementTips: z.array(z.string()).describe("The content for time management tips. Realistic scheduling tips tailored to timeframe (daily focus for short-term, monthly reviews for long-term)."),
  toolsToHelp: z.array(z.string()).optional().describe("The content for helpful tools. Optional recommendations for tools, apps, methods, or hacks."),
  reflectionPrompts: z.array(z.string()).describe("The content for reflection prompts. For short-term: daily/every-other-day quick checks. For long-term: weekly and monthly prompts."),
  dailyAffirmation: z.string().describe("The content for the daily affirmation. A short, clear, positive one-line daily affirmation, customized."),
});
export type GenerateLifePlanOutput = z.infer<typeof GenerateLifePlanOutputSchema>;

export async function generateLifePlan(input: GenerateLifePlanInput): Promise<GenerateLifePlanOutput> {
  return lifePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lifePlanPrompt',
  input: {schema: GenerateLifePlanInputSchema},
  output: {schema: GenerateLifePlanOutputSchema},
  prompt: `You are a friendly, supportive life coach for users of all backgrounds. The user will give you:
1. A single-line goal or aspiration.
2. Optionally, a timeframe they want to achieve it in. If no timeframe is given, assume 3 months by default.

User Goal: {{{goal}}}
{{#if timeframe}}User Timeframe: {{{timeframe}}}{{/if}}

Your task:
Create a detailed, beginner-friendly, and motivating life plan customized to the specified timeframe.
You MUST determine the timeframe to use (either the user's input or '3 months' default) and state this timeframe in the 'timeframeUsed' output field.

The plan must include the following sections. Generate content for each field as described:

1.  **Vision Statement Content** (for the \`visionStatement\` field)
    *   Write a clear, inspiring vision describing what success looks like after the chosen duration (e.g., after 20 days, 3 months, 6 months, or 1 year).
    *   Adjust the tone and expectations realistically based on the length.

2.  **Action Plan Content** (for the \`actionPlan\` field as an array of strings)
    *   If timeframe ≤ 1 month, create detailed daily habits (5–7 actionable items), focusing on consistency and small wins.
    *   If timeframe > 1 month, create a month-by-month breakdown, explaining how habits or goals evolve each month to build momentum.
    *   Include simple explanations and emojis for clarity, e.g.,
        *   “Month 1: Build habit of 10 min daily walk 🚶”
        *   “Month 3: Add strength training twice a week 🏋️”

3.  **What to Avoid Content** (for the \`whatToAvoid\` field as an array of strings)
    *   Provide a friendly list of what to avoid (bad habits, pitfalls) to keep progress smooth.

4.  **Time Management Tips Content** (for the \`timeManagementTips\` field as an array of strings)
    *   Suggest realistic scheduling tips tailored to the timeframe.
    *   For short-term (≤1 month), focus on daily time-blocking and focus habits.
    *   For long-term (>1 month), include monthly review points, habit stacking, and adjustment tips.

5.  **Helpful Tools Content** (for the \`toolsToHelp\` field as an array of strings, optional)
    *   Suggest apps, journaling techniques, alarms, or simple hacks to support planning and tracking.

6.  **Reflection Prompts Content** (for the \`reflectionPrompts\` field as an array of strings)
    *   For short-term: Provide daily or every-other-day quick check questions.
    *   For long-term: Provide weekly and monthly reflection questions to adjust and stay motivated.

7.  **Motivational Daily Affirmation Content** (for the \`dailyAffirmation\` field as a string)
    *   A short, positive affirmation customized to the goal and timeframe.

Make sure explanations are simple, friendly, and motivating—like teaching a kid.
Adjust tone and detail density based on timeframe length to be encouraging but realistic.
The output should be suitable for the defined Zod schema.
The \`timeframeUsed\` field in your output MUST accurately reflect the timeframe you based the plan on.
`,
});

const lifePlanFlow = ai.defineFlow(
  {
    name: 'lifePlanFlow',
    inputSchema: GenerateLifePlanInputSchema,
    outputSchema: GenerateLifePlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
