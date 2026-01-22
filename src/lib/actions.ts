'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import type { PortfolioData, Skill, Project, Certificate } from './types';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const skillSchema: z.ZodType<Skill> = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(['technical', 'soft']),
});

const projectSchema: z.ZodType<Project> = z.object({
  id: z.string(),
  title: z.string().min(1, 'Project title is required'),
  description: z.string().min(1, 'Project description is required'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  liveUrl: z.string().url().optional().or(z.literal('')),
  repoUrl: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().url('A valid image URL is required'),
});

const certificateSchema: z.ZodType<Certificate> = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certificate name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().min(1, 'Date is required'),
  credentialUrl: z.string().url().optional().or(z.literal('')),
});

const portfolioSchema: z.ZodType<Omit<PortfolioData, 'id'>> = z.object({
  about: z.object({
    name: z.string().min(1, 'Name is required'),
    headline: z.string().min(1, 'Headline is required'),
    introduction: z.string().min(1, 'Introduction is required'),
    profilePictureUrl: z.string().url('A valid profile picture URL is required'),
  }),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
  certificates: z.array(certificateSchema),
});


export async function savePortfolioData(payload: Omit<PortfolioData, 'id'> & { id?: string }) {
  const validation = portfolioSchema.safeParse(payload);

  if (!validation.success) {
    return { success: false, message: 'Invalid data.', errors: validation.error.flatten().fieldErrors };
  }

  try {
    const { id, ...data } = payload;
    const docRef = id ? doc(db, 'portfolio', id) : doc(collection(db, 'portfolio'));
    await setDoc(docRef, data, { merge: true });
    
    revalidatePath('/');
    revalidatePath('/admin');
    
    return { success: true, message: 'Portfolio updated successfully!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to update portfolio.' };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function sendContactMessage(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validation = contactSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, message: 'Invalid form data.', errors: validation.error.flatten().fieldErrors };
  }

  try {
    await addDoc(collection(db, 'messages'), {
      ...validation.data,
      sentAt: new Date(),
    });
    return { success: true, message: 'Your message has been sent successfully!' };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, message: 'Something went wrong. Please try again later.' };
  }
}
