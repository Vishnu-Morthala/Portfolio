import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CertificatesSection } from '@/components/sections/CertificatesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { getPortfolioData } from '@/lib/data';

export const revalidate = 3600; // Revalidate data every hour

export default async function Home() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection data={portfolioData.about} />
        <SkillsSection data={portfolioData.skills} />
        <ProjectsSection data={portfolioData.projects} />
        <CertificatesSection data={portfolioData.certificates} />
        <ContactSection data={portfolioData.about} />
      </main>
      <Footer data={portfolioData.about} />
    </div>
  );
}
