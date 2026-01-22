import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { getPortfolioData } from '@/lib/data';

export const revalidate = 3600; // Revalidate data every hour

export default async function AchievementsPage() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AchievementsSection data={portfolioData.achievements} />
      </main>
      <Footer data={portfolioData.about} />
    </div>
  );
}
