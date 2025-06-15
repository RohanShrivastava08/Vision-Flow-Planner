'use server';
/**
 * @fileOverview Generates a detailed life plan based on a user's one-line goal.
 *
 * - generateLifePlan - A function that handles the life plan generation process.
 * - GenerateLifePlanInput - The input type for the generateLifePlan function.
 * - GenerateLifePlanOutput - The return type for the generateLifePlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLifePlanInputSchema = z.object({
  goal: z.string().describe('The user-provided one-line goal or aspiration.'),
});
export type GenerateLifePlanInput = z.infer<typeof GenerateLifePlanInputSchema>;

const GenerateLifePlanOutputSchema = z.object({
  threeMonthVision: z.string().describe("A 3-Month Vision describing how the person will feel, live, and benefit. Encouraging and friendly tone. No jargon."),
  whatToDoDaily: z.array(z.string()).describe("5-7 specific, doable daily actions. Simple explanations with emojis. Example: ✅ 'Drink 2L water 💧 to stay hydrated and feel fresh.'"),
  whatToAvoid: z.array(z.string()).describe("List of bad habits or time-wasters to avoid. Gentle but clear with emojis. Example: ❌ 'Avoid scrolling late at night 🌙 — it steals your sleep.'"),
  timeManagementTips: z.array(z.string()).describe("Tips on how to make time and organize schedules, with emojis. Example: 🕒 'Set 3 fixed time blocks: Morning Focus, Afternoon Chill, Evening Plan'"),
  toolsToHelp: z.array(z.string()).optional().describe("Optional recommendations for tools, apps, methods, or hacks with emojis. Example: 📱 'Use a Pomodoro timer like ‘Focus To-Do’ for study sessions.'"),
  weeklyReflectionQuestions: z.array(z.string()).describe("3-4 simple questions for weekly self-reflection. Example: 'Did I follow my daily plan this week?'"),
  dailyAffirmation: z.string().describe("A short, clear one-line daily affirmation. Example: 'I grow stronger and more focused every day.'"),
});
export type GenerateLifePlanOutput = z.infer<typeof GenerateLifePlanOutputSchema>;

export async function generateLifePlan(input: GenerateLifePlanInput): Promise<GenerateLifePlanOutput> {
  return lifePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lifePlanPrompt',
  input: {schema: GenerateLifePlanInputSchema},
  output: {schema: GenerateLifePlanOutputSchema},
  prompt: `You are a friendly, supportive life coach for young adults. A user will give you one sentence about their goal or aspiration.
Goal: {{{goal}}}

Your job is to turn that single-line goal into a well-organized, easy-to-understand, and motivating personal guide. Your output must include the following sections. Ensure bulleted lists are returned as arrays of strings. Use emojis as specified in the descriptions for each section.

📌 **1. 3-Month Vision**
(Describe how the person will feel, live, and benefit after following this plan for 3 months. Use encouraging and friendly tone. No jargon.)

🧠 **2. What to Do Daily (Bullet List)**
(Return as an array of strings. 5–7 specific, doable daily actions that are repeatable and practical. Use simple explanations (like teaching a kid). Add emojis and clarity like: ✅ "Drink 2L water 💧 to stay hydrated and feel fresh." or ✅ "10-minute morning stretch 🧘 to wake your body.")

⛔ **3. What to Avoid (Bullet List)**
(Return as an array of strings. List bad habits, time-wasters, or things that will hurt the goal. Keep it gentle but clear, like: ❌ "Avoid scrolling late at night 🌙 — it steals your sleep." or ❌ "Don't skip meals if your goal is fitness.")

⏳ **4. Time Management Tips (Bullet List)**
(Return as an array of strings. How to make time in a busy schedule. How to organize morning, evening, or study blocks. Example: 🕒 "Set 3 fixed time blocks: Morning Focus, Afternoon Chill, Evening Plan" or 🔕 "Put your phone in another room during deep work.")

🧰 **5. Tools to Help (Optional Apps, Methods, or Hacks - Bullet List)**
(Return as an array of strings if applicable, otherwise can be omitted. Recommend tools like Notion, Google Calendar, alarms, physical journals, or simple tricks. Example: 📱 "Use a Pomodoro timer like ‘Focus To-Do’ for study sessions." or ✍️ "Write in a mini notebook before bed — it clears your mind.")

🧭 **6. Weekly Reflection Questions (Bullet List)**
(Return as an array of strings. Give 3–4 simple questions the user can ask themselves every Sunday to track progress and mindset. Example: "Did I follow my daily plan this week?", "What felt easy? What was hard?", "What made me proud this week?")

🎯 **7. One-Line Daily Affirmation (Motivational)**
(A short, clear line the user can repeat every morning. Example: “I grow stronger and more focused every day.”)
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
