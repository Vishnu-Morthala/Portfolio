import type { PortfolioData } from './types';
import { getPlaceholderImage } from './utils';

export const portfolioData: PortfolioData = {
  id: '1',
  about: {
    name: 'Vishnu Morthala',
    headline: 'Full-Stack Developer & AI Enthusiast',
    introduction:
      "I'm a passionate developer with a love for building beautiful and functional web applications. I'm currently exploring the world of AI and how it can be used to create amazing user experiences.",
    profilePictureUrl: 'https://drive.google.com/uc?export=view&id=1XR6uu-sw-BNP4q4Pl0SY_1WkfGzNckVr',
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
    { id: '11', name: 'VS Code', category: 'tool' },
    { id: '12', name: 'Git', category: 'tool' },
    { id: '13', name: 'GitHub', category: 'tool' },
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
      liveUrl: 'https://portfolio-cd1p3zi08-2303a51232s-projects.vercel.app/',
      repoUrl: 'https://portfolio-cd1p3zi08-2303a51232s-projects.vercel.app/',
    },
  ],
  certificates: [
    {
      id: '1',
      name: 'Database Management System – Part 1',
      issuer: 'Infosys Springboard',
      date: '2023',
      credentialUrl: 'https://drive.google.com/file/d/15nCKpmi5SUnSt-87sbMlGgsLpJfXPWnJ/view?usp=sharing',
      description: 'I successfully completed the Database Management System – Part 1 course from Infosys Springboard. This course helped me understand core DBMS concepts, relational databases, and SQL fundamentals. It was a great learning experience that strengthened my technical foundation and analytical thinking.',
    },
    {
      id: '2',
      name: 'AWS Academy Cloud Foundations',
      issuer: 'AWS Academy',
      date: '2023',
      credentialUrl: 'https://drive.google.com/file/d/1I5YYaE1PlIARXKflOyg4pjSjafg0F_ov/view?usp=sharing',
      description: 'Hands-on experience in cloud computing and web application development gained through projects and certified AWS training. Familiar with building, deploying, and securing cloud-based applications while applying core programming and problem-solving skills. Continuously learning new technologies and improving practical knowledge to deliver efficient and reliable solutions.',
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'NCC Certificate',
      description:
        'Actively participated in the National Cadet Corps (NCC), gaining hands-on training in discipline, leadership, teamwork, and social responsibility. Developed qualities such as confidence, time management, and commitment, along with basic training in drill, physical fitness, and community service.',
      imageUrl: 'https://drive.google.com/uc?export=view&id=1W4myC45dvPwAqU16_Qu2OKI5Zr5ZrJ_c',
      credentialUrl: 'https://drive.google.com/file/d/11LA6Rhl3mWqAhmQKs4BnNjuJcMcK41c9/view?usp=sharing',
    },
    {
      id: '2',
      title: 'AICTE EDUSKILLS VIRTUAL INTERNSHIP',
      description: 'Completed a virtual internship focused on AI and Machine Learning, gaining practical experience and skills in the field.',
      imageUrl: 'https://drive.google.com/uc?export=view&id=1APWonXYjBtqr7L1KEYYgx0pKpqidKoX0',
      credentialUrl: 'https://drive.google.com/file/d/1adLyVEzEQpTgIXg_vQ9D3ye1MCJpBwcP/view?usp=sharing',
    },
  ],
};
