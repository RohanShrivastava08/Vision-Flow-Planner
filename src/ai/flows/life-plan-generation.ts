
'use server';
/**
 * @fileOverview Generates a detailed life plan, an AI image generator prompt for an infographic, and download instructions.
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
  infographicPrompt: z.string().describe("A detailed prompt for an AI image generator (like DALL·E, Midjourney) to create a clean, colorful infographic-style flowchart of the life plan."),
  downloadInstructions: z.string().describe("A short note explaining how to integrate an export/download feature for the generated infographic (e.g., using libraries like html-to-image if rendering HTML, or handling direct image API responses)."),
});
export type GenerateLifePlanOutput = z.infer<typeof GenerateLifePlanOutputSchema>;

export async function generateLifePlan(input: GenerateLifePlanInput): Promise<GenerateLifePlanOutput> {
  return lifePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lifePlanPrompt',
  input: {schema: GenerateLifePlanInputSchema},
  output: {schema: GenerateLifePlanOutputSchema},
  prompt: `You are a friendly, supportive life coach and visual designer AI. The user will give you:
1. A one-line user goal (e.g. "I want to get fit").
2. Optionally, a timeframe (e.g. "20 days", "3 months", "6 months", "1 year"). If none provided, default to 3 months.

User Goal: {{{goal}}}
{{#if timeframe}}User Timeframe: {{{timeframe}}}{{/if}}

Your task is to generate three things:
1.  A detailed, beginner-friendly life plan text.
2.  A detailed prompt for an AI image generator to create an infographic of the plan.
3.  A short note on how to integrate download functionality for such an infographic.

You MUST determine the timeframe to use (either the user's input or '3 months' default) and state this timeframe in the 'timeframeUsed' output field for the life plan text.

PART 1: DETAILED LIFE PLAN TEXT
Format this part with clear headers, emojis, bullet points, and simple explanations.

Include the following sections for the 'timeframeUsed':

📌 Vision Statement for {{timeframeUsed_placeholder}}
   - Describe what success looks like after the chosen duration. Adjust tone and expectations realistically.

✅ Daily or Monthly Action Plan
   - If timeframe ≤ 1 month: 5–7 specific, doable daily actions. Use simple explanations, emojis.
     (e.g., "✅ Drink 2L water 💧 to stay hydrated.")
   - If timeframe > 1 month: A month-by-month breakdown of evolving habits/goals.
     (e.g., "Month 1: Build habit of 10 min daily walk 🚶")

⛔ What to Avoid (Bad Habits & Pitfalls)
   - Friendly list of what to avoid. (e.g., "❌ Avoid scrolling late at night 🌙")

⏳ Time & Progress Management Tips
   - Realistic scheduling tips. Short-term: daily focus. Long-term: monthly reviews.
     (e.g., "🕒 Set 3 fixed time blocks.")

🧰 Helpful Tools & Methods (Optional)
   - Suggest apps, journaling, alarms, hacks. (e.g., "📱 Use 'Focus To-Do' app.")

🧭 Reflection & Review Prompts
   - Short-term: daily/every-other-day questions. Long-term: weekly/monthly questions.
     (e.g., "Did I follow my plan this week?")

🎯 Motivational Daily Affirmation
   - Short, positive, customized affirmation. (e.g., "I grow stronger every day.")

---

PART 2: AI IMAGE GENERATOR PROMPT (for the 'infographicPrompt' field)
Generate a detailed prompt for an AI image generator (like DALL·E, Midjourney, Stable Diffusion) to create a clean, colorful infographic-style flowchart. This prompt should instruct the AI to generate an image with:
- A bold title: "Your [TimeframeUsed] Life Plan" (replace [TimeframeUsed] with the actual timeframe).
- Three main sections visually arranged with icons:
    - Vision Statement (icon: trophy, mountain peak, or similar success symbol).
    - Action Plan (4-6 key habits or monthly steps, each with a simple related icon like a water droplet for hydration, running shoes for exercise, a clock for time management, an open book for study).
    - Reflection & Review (key bullet questions with a notebook or question mark icon).
- Color Palette: Soft pastel colors (e.g., light blues, greens, peaches, lavenders).
- Font Style: Modern, clean, sans-serif font (e.g., similar to Inter or Open Sans).
- Layout: Minimal and friendly, with arrows or subtle connectors showing a flow: Vision → Action Plan → Reflection.
- Ample white space for clarity and readability.
- Overall Style: Professional but warm and inviting, resembling a coaching worksheet or a motivational poster. Avoid overly complex details. The infographic should be visually appealing and easy to understand at a glance.

---

PART 3: DOWNLOAD INSTRUCTIONS (for the 'downloadInstructions' field)
Provide a short note (2-3 sentences) for a developer on how to integrate an export/download feature for such a generated infographic image. Mention common approaches.
Example: "To make the infographic downloadable, if it's generated and displayed as an HTML element, a library like 'html-to-image' can convert the DOM to a PNG/JPG. If using an image generation API that returns an image URL or Base64 data, provide a download link or button that triggers a browser download of the image file."

---
Replace {{timeframeUsed_placeholder}} in the Vision Statement header with the actual 'timeframeUsed' value.
Ensure all output fields defined in the schema are populated correctly.
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

    