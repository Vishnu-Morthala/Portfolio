import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CertificatesSection } from '@/components/sections/CertificatesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { getPortfolioData } from '@/lib/data';
import type { PortfolioData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function Home() {
  const portfolioData: PortfolioData | null = await getPortfolioData();

  if (!portfolioData) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-foreground font-headline">Welcome to Portfolify</h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            It looks like this portfolio hasn't been set up yet. If you're the owner, please log in to the admin panel to add your content.
          </p>
          <Button asChild className="mt-6">
            <Link href="/login">Admin Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection data={portfolioData.about} />
        <SkillsSection data={portfolioData.skills} />
        <ProjectsSection data={portfolioData.projects} />
        <CertificatesSection data={portfolioData.certificates} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
