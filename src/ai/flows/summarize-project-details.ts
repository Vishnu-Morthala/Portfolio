'use server';

/**
 * @fileOverview A flow that summarizes project details using AI.
 *
 * - summarizeProjectDetails - A function that summarizes lengthy project descriptions into concise summaries.
 * - SummarizeProjectDetailsInput - The input type for the summarizeProjectDetails function.
 * - SummarizeProjectDetailsOutput - The return type for the summarizeProjectDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProjectDetailsInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The lengthy description or documentation of the project.'),
});

export type SummarizeProjectDetailsInput = z.infer<
  typeof SummarizeProjectDetailsInputSchema
>;

const SummarizeProjectDetailsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the project description.'),
});

export type SummarizeProjectDetailsOutput = z.infer<
  typeof SummarizeProjectDetailsOutputSchema
>;

export async function summarizeProjectDetails(
  input: SummarizeProjectDetailsInput
): Promise<SummarizeProjectDetailsOutput> {
  return summarizeProjectDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProjectDetailsPrompt',
  input: {schema: SummarizeProjectDetailsInputSchema},
  output: {schema: SummarizeProjectDetailsOutputSchema},
  prompt: `You are an expert project summarizer.  Your goal is to create a concise and informative summary of a project description. The summary should capture the essence of the project, highlighting key features, technologies used, and outcomes.

Project Description: {{{projectDescription}}}`,
});

const summarizeProjectDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeProjectDetailsFlow',
    inputSchema: SummarizeProjectDetailsInputSchema,
    outputSchema: SummarizeProjectDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
