import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from './firebase';
import type { PortfolioData } from './types';

export async function getPortfolioData(): Promise<PortfolioData | null> {
  try {
    // This assumes a single document holds all portfolio data.
    const q = query(collection(db, 'portfolio'), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No portfolio data found in Firestore.');
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      about: data.about || {},
      skills: data.skills || [],
      projects: data.projects || [],
      certificates: data.certificates || [],
    } as PortfolioData;
  } catch (error) {
    // In a production app, you might want to log this to a service like Sentry
    console.error('Error fetching portfolio data:', error);
    // Return null or throw the error, depending on how you want to handle it upstream
    return null;
  }
}
