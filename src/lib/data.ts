import { portfolioData } from './portfolio-data';
import type { PortfolioData } from './types';

export async function getPortfolioData(): Promise<PortfolioData> {
  // In a real app, this could be a fetch to a CMS or a static file read.
  // We use a promise to simulate async fetching.
  return Promise.resolve(portfolioData);
}
