"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { savePortfolioData } from '@/lib/actions';
import { generatePortfolioContent } from '@/ai/flows/generate-portfolio-content';
import { summarizeProjectDetails } from '@/ai/flows/summarize-project-details';
import type { PortfolioData } from '@/lib/types';
import { Loader2, PlusCircle, Sparkles, Trash2, Wand2 } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const aboutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  headline: z.string().min(1, "Headline is required"),
  introduction: z.string().min(1, "Introduction is required"),
  profilePictureUrl: z.string().url("Must be a valid URL"),
});

const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  category: z.enum(['technical', 'soft']),
});

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  liveUrl: z.string().url().optional().or(z.literal('')),
  repoUrl: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().url("Must be a valid URL"),
});

const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certificate name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  credentialUrl: z.string().url().optional().or(z.literal('')),
});

const formSchema = z.object({
  about: aboutSchema,
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
  certificates: z.array(certificateSchema),
});

type FormValues = z.infer<typeof formSchema>;

export function PortfolioForm({ initialData }: { initialData: PortfolioData | null }) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [summarizingIndex, setSummarizingIndex] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      about: initialData?.about ?? { name: '', headline: '', introduction: '', profilePictureUrl: getPlaceholderImage('profile') },
      skills: initialData?.skills ?? [],
      projects: initialData?.projects ?? [],
      certificates: initialData?.certificates ?? [],
    },
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: "skills" });
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control: form.control, name: "projects" });
  const { fields: certificateFields, append: appendCertificate, remove: removeCertificate } = useFieldArray({ control: form.control, name: "certificates" });

  const onSubmit = async (data: FormValues) => {
    const payload = { ...data, id: initialData?.id };
    const result = await savePortfolioData(payload);
    if (result.success) {
      toast({ title: 'Success!', description: result.message });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message });
    }
  };

  const handleGenerateContent = async () => {
    const prompt = window.prompt("Enter a brief description of yourself, your skills, and projects.");
    if (!prompt) return;

    setIsGenerating(true);
    try {
      const result = await generatePortfolioContent({ prompt });
      form.setValue('about.introduction', result.aboutMe);
      form.setValue('about.headline', result.skillsSummary);
      form.setValue(`projects.0.description`, result.projectDescriptions, { shouldValidate: true });
      toast({ title: 'Content generated!', description: 'Review and save the changes.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'AI Generation Failed', description: 'Could not generate content.' });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSummarizeProject = async (index: number) => {
    const description = form.getValues(`projects.${index}.description`);
    if (!description) {
      toast({ variant: 'destructive', title: 'Nothing to summarize', description: 'Please enter a project description first.' });
      return;
    }
    setSummarizingIndex(index);
    try {
      const result = await summarizeProjectDetails({ projectDescription: description });
      form.setValue(`projects.${index}.description`, result.summary, { shouldValidate: true });
      toast({ title: 'Project summarized!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'AI Summarization Failed', description: 'Could not summarize the description.' });
    } finally {
      setSummarizingIndex(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold font-headline">Edit Portfolio</h1>
            <div className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button" variant="outline" disabled={isGenerating}>
                      {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Generate with AI
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Generate Content with AI</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will generate content for some sections based on a prompt. Existing content in those fields may be overwritten.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleGenerateContent}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Save Changes
                </Button>
            </div>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader><CardTitle>About Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <FormField name="about.name" control={form.control} render={({ field }) => <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="about.headline" control={form.control} render={({ field }) => <FormItem><FormLabel>Headline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="about.introduction" control={form.control} render={({ field }) => <FormItem><FormLabel>Introduction</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="about.profilePictureUrl" control={form.control} render={({ field }) => <FormItem><FormLabel>Profile Picture URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
            <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add your technical and soft skills.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {skillFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-end p-4 border rounded-lg">
                        <FormField name={`skills.${index}.name`} control={form.control} render={({ field }) => <FormItem className="flex-1"><FormLabel>Skill Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <Controller
                            control={form.control}
                            name={`skills.${index}.category`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="technical">Technical</SelectItem>
                                        <SelectItem value="soft">Soft</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendSkill({ id: crypto.randomUUID(), name: '', category: 'technical' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
            </CardContent>
        </Card>
        
        {/* Projects Section */}
        <Card>
            <CardHeader><CardTitle>Projects</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {projectFields.map((field, index) => (
                    <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Project {index + 1}</h3>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeProject(index)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        <FormField name={`projects.${index}.title`} control={form.control} render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <div className="relative">
                                <Textarea {...form.register(`projects.${index}.description`)} rows={5} />
                                <Button type="button" size="sm" variant="outline" className="absolute bottom-2 right-2" onClick={() => handleSummarizeProject(index)} disabled={summarizingIndex === index}>
                                    {summarizingIndex === index ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                    Summarize
                                </Button>
                            </div>
                            <FormMessage>{form.formState.errors.projects?.[index]?.description?.message}</FormMessage>
                        </FormItem>
                        <FormField name={`projects.${index}.technologies`} control={form.control} render={({ field }) => <FormItem><FormLabel>Technologies (comma-separated)</FormLabel><FormControl><Input {...field} onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))} value={Array.isArray(field.value) ? field.value.join(', ') : ''} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`projects.${index}.imageUrl`} control={form.control} render={({ field }) => <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`projects.${index}.liveUrl`} control={form.control} render={({ field }) => <FormItem><FormLabel>Live URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`projects.${index}.repoUrl`} control={form.control} render={({ field }) => <FormItem><FormLabel>Repo URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendProject({ id: crypto.randomUUID(), title: '', description: '', technologies: [], imageUrl: getPlaceholderImage('project-1'), liveUrl: '', repoUrl: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Project</Button>
            </CardContent>
        </Card>
        
        {/* Certificates Section */}
        <Card>
            <CardHeader><CardTitle>Certificates</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {certificateFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end p-4 border rounded-lg">
                        <FormField name={`certificates.${index}.name`} control={form.control} render={({ field }) => <FormItem className="lg:col-span-2"><FormLabel>Certificate Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`certificates.${index}.issuer`} control={form.control} render={({ field }) => <FormItem><FormLabel>Issuer</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`certificates.${index}.date`} control={form.control} render={({ field }) => <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`certificates.${index}.credentialUrl`} control={form.control} render={({ field }) => <FormItem className="lg:col-span-3"><FormLabel>Credential URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <Button type="button" variant="destructive" className="w-full" onClick={() => removeCertificate(index)}><Trash2 className="mr-2 h-4 w-4" /> Remove</Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendCertificate({ id: crypto.randomUUID(), name: '', issuer: '', date: '', credentialUrl: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Certificate</Button>
            </CardContent>
        </Card>

      </form>
    </Form>
  );
}
