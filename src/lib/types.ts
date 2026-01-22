export type SocialLinks = {
  github?: string;
  linkedin?: string;
  twitter?: string;
};

export type AboutData = {
  name: string;
  headline: string;
  introduction: string;
  profilePictureUrl: string;
  socials: SocialLinks;
  contactEmail: string;
  contactPhone?: string;
};

export type Skill = {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'tool';
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl: string;
};

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  certificateUrl?: string;
};

export type PortfolioData = {
  id: string;
  about: AboutData;
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  achievements: Achievement[];
};
