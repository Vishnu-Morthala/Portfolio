import { PortfolioForm } from './components/PortfolioForm';
import { getPortfolioData } from '@/lib/data';

export const revalidate = 0; // Disable caching for admin page

export default async function AdminPage() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="container mx-auto py-10">
      <PortfolioForm initialData={portfolioData} />
    </div>
  );
}
