'use server';

/**
 * @fileOverview An AI-powered tool to generate initial content for a student's portfolio.
 *
 * - generatePortfolioContent - A function that generates portfolio content based on a text prompt.
 * - GeneratePortfolioContentInput - The input type for the generatePortfolioContent function.
 * - GeneratePortfolioContentOutput - The return type for the generatePortfolioContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePortfolioContentInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired portfolio content.'),
});
export type GeneratePortfolioContentInput = z.infer<typeof GeneratePortfolioContentInputSchema>;

const GeneratePortfolioContentOutputSchema = z.object({
  aboutMe: z.string().describe('Generated content for the About Me section.'),
  skillsSummary: z.string().describe('Generated content for the Skills Summary section.'),
  projectDescriptions: z.string().describe('Generated content for the Project Descriptions section.'),
  certificatesList: z.string().describe('Generated content for the Certificates List section.'),
});
export type GeneratePortfolioContentOutput = z.infer<typeof GeneratePortfolioContentOutputSchema>;

export async function generatePortfolioContent(input: GeneratePortfolioContentInput): Promise<GeneratePortfolioContentOutput> {
  return generatePortfolioContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePortfolioContentPrompt',
  input: {schema: GeneratePortfolioContentInputSchema},
  output: {schema: GeneratePortfolioContentOutputSchema},
  prompt: `You are an AI assistant specialized in generating content for student portfolios.

  Based on the provided prompt, generate content for the following sections:

  - About Me: A brief introduction of the student.
  - Skills Summary: A summary of the student's technical and soft skills.
  - Project Descriptions: Descriptions of the student's completed projects.
  - Certificates List: A list of the student's earned certificates and credentials.

  Ensure the generated content is engaging, informative, and tailored to the prompt.

  Prompt: {{{prompt}}}

  Output the content in a structured format that is easily adaptable for a portfolio website.

  About Me:
  {{aboutMe}}

  Skills Summary:
  {{skillsSummary}}

  Project Descriptions:
  {{projectDescriptions}}

  Certificates List:
  {{certificatesList}}`,
});

const generatePortfolioContentFlow = ai.defineFlow(
  {
    name: 'generatePortfolioContentFlow',
    inputSchema: GeneratePortfolioContentInputSchema,
    outputSchema: GeneratePortfolioContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
