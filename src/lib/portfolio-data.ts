import type { PortfolioData } from './types';
import { getPlaceholderImage } from './utils';

export const portfolioData: PortfolioData = {
  id: '1',
  about: {
    name: 'Vishnu Morthala',
    headline: 'Full-Stack Developer & AI Enthusiast',
    introduction:
      "I'm a passionate developer with a love for building beautiful and functional web applications. I'm currently exploring the world of AI and how it can be used to create amazing user experiences.",
    profilePictureUrl: getPlaceholderImage('profile'),
    socials: {
      github: 'https://github.com',
      linkedin: 'https://www.linkedin.com/in/morthala-vishnu',
      twitter: 'https://twitter.com',
    },
    contactEmail: 'vishnumorthala2003@gmail.com',
    contactPhone: '7997558445',
  },
  skills: [
    { id: '1', name: 'C', category: 'technical' },
    { id: '2', name: 'Python', category: 'technical' },
    { id: '3', name: 'HTML', category: 'technical' },
    { id: '4', name: 'JavaScript', category: 'technical' },
    { id: '5', name: 'CSS', category: 'technical' },
    { id: '8', name: 'Communication', category: 'soft' },
    { id: '9', name: 'Teamwork', category: 'soft' },
    { id: '10', name: 'Problem Solving', category: 'soft' },
  ],
  projects: [
    {
      id: '1',
      title: 'MovieStream – Movie Streaming Web Platform',
      description: `A movie-streaming-style web application inspired by OTT platforms, focusing on clean UI, categorization, and interactive user experience.

Key Responsibilities & Features:
• Designed OTT-style interface
• Implemented category-based movie browsing
• Built interactive hover effects
• Ensured responsive design

What This Project Demonstrates:
• UI/UX design skills
• Frontend development capability
• Attention to user experience`,
      technologies: ['HTML', 'CSS', 'JavaScript'],
      imageUrl: getPlaceholderImage('project-1'),
      liveUrl: 'https://saikapil-v.github.io/MOVIESTREAM/',
    },
    {
      id: '2',
      title: 'Car Rental System',
      description: `A backend-focused project to manage a car rental service. It includes features for vehicle inventory management, customer reservations, and processing rentals. The system is built with a focus on creating a scalable and efficient backend architecture.

What This Project Demonstrates:
• Backend architecture design
• Database management
• REST API development`,
      technologies: ['Python', 'Flask', 'SQLAlchemy', 'REST APIs'],
      imageUrl: getPlaceholderImage('project-2'),
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
