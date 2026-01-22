import type { PortfolioData } from './types';
import { getPlaceholderImage } from './utils';

export const portfolioData: PortfolioData = {
  id: '1',
  about: {
    name: 'Alex Doe',
    headline: 'Full-Stack Developer & AI Enthusiast',
    introduction:
      "I'm a passionate developer with a love for building beautiful and functional web applications. I'm currently exploring the world of AI and how it can be used to create amazing user experiences.",
    profilePictureUrl: getPlaceholderImage('profile'),
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    contactEmail: 'hello@example.com',
  },
  skills: [
    { id: '1', name: 'React', category: 'technical' },
    { id: '2', name: 'Next.js', category: 'technical' },
    { id: '3', name: 'TypeScript', category: 'technical' },
    { id: '4', name: 'Node.js', category: 'technical' },
    { id: '5', name: 'Genkit', category: 'technical' },
    { id: '6', name: 'Firebase', category: 'technical' },
    { id: '7', name: 'Tailwind CSS', category: 'technical' },
    { id: '8', name: 'Communication', category: 'soft' },
    { id: '9', name: 'Teamwork', category: 'soft' },
    { id: '10', name: 'Problem Solving', category: 'soft' },
  ],
  projects: [
    {
      id: '1',
      title: 'AI-Powered Portfolio Generator',
      description:
        'A web app that uses generative AI to help users create a professional portfolio website in minutes. Built with Next.js, Genkit, and Firebase.',
      technologies: ['Next.js', 'React', 'Genkit', 'Firebase'],
      imageUrl: getPlaceholderImage('project-1'),
      liveUrl: '#',
      repoUrl: '#',
    },
    {
      id: '2',
      title: 'E-commerce Platform',
      description:
        'A full-featured e-commerce platform with a custom CMS, payment integration, and a recommendation engine. Increased sales by 20% in the first quarter.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      imageUrl: getPlaceholderImage('project-2'),
      liveUrl: '#',
      repoUrl: '#',
    },
    {
      id: '3',
      title: 'Open Source Contributor',
      description:
        'Actively contributed to several open-source projects, including documentation, bug fixes, and new features for a popular UI library.',
      technologies: ['TypeScript', 'Open Source', 'Community'],
      imageUrl: getPlaceholderImage('project-3'),
      liveUrl: '#',
      repoUrl: '#',
    },
  ],
  certificates: [
    {
      id: '1',
      name: 'Google AI Essentials',
      issuer: 'Google',
      date: '2023',
      credentialUrl: '#',
    },
    {
      id: '2',
      name: 'Full-Stack Web Development',
      issuer: 'Coursera',
      date: '2022',
      credentialUrl: '#',
    },
  ],
};
