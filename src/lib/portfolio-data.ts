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
    { id: '1', name: 'C', category: 'technical' },
    { id: '2', name: 'Python', category: 'technical' },
    { id: '3', name: 'HTML', category: 'technical' },
    { id: '4', name: 'JavaScript', category: 'technical' },
    { id: '5', name: 'CSS', category: 'technical' },
    { id: '8', name: 'Communication', category: 'soft' },
    { id: '9', name: 'Teamwork', category: 'soft' },
    { id: '10', name: 'Problem Solving', category: 'soft' },
    { id: '11', name: 'VS Code', category: 'tool' },
    { id: '12', name: 'Git', category: 'tool' },
    { id: '13', name: 'GitHub', category: 'tool' },
  ],
  projects: [
    {
      id: '1',
      title: 'Tourist Website – Full-Stack Travel Platform',
      description: `A complete tourist and travel website designed to present destinations, travel information, and user-friendly navigation using a full-stack approach.

Key Responsibilities & Features:
• Designed responsive frontend user interface
• Integrated backend logic for dynamic content
• Structured project for scalability
• Deployed on cloud hosting

Technologies Used:
HTML, CSS, JavaScript, Backend integration, Cloud hosting

What This Project Demonstrates:
• Full-stack understanding
• Frontend–backend integration
• Deployment and production mindset`,
      technologies: [
        'HTML',
        'CSS',
        'JavaScript',
        'Backend integration',
        'Cloud hosting',
      ],
      imageUrl: getPlaceholderImage('project-1'),
      liveUrl: 'https://wanderlyy-updated-vs-code-heo87dbe8.vercel.app/',
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
