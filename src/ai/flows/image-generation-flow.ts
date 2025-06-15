
'use server';
/**
 * @fileOverview Generates an image from a text prompt using an AI model.
 * - generateImage - Generates an image.
 * - GenerateImageInput - Input type for image generation.
 * - GenerateImageOutput - Output type for image generation.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt for image generation.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image. Can be an empty string if generation fails.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return imageGenerationFlow(input);
}

const imageGenerationFlow = ai.defineFlow(
  {
    name: 'imageGenerationFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    try {
      // Add a safety net for empty prompts, though the life-plan prompt should usually be rich.
      if (!input.prompt.trim()) {
        console.warn("Image generation requested with an empty prompt. Skipping.");
        return { imageUrl: "" };
      }

      const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', 
        prompt: input.prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
          // Optional: Add safety settings if needed, though defaults are usually fine.
          // safetySettings: [
          //   { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
          // ],
        },
      });

      if (!media || !media.url) {
        console.error('Image generation failed or returned no media URL.');
        return { imageUrl: "" };
      }
      return { imageUrl: media.url };
    } catch (error) {
      console.error("Error in imageGenerationFlow:", error);
      // It's crucial to return the schema-compatible output even in case of error.
      return { imageUrl: "" }; 
    }
  }
);
