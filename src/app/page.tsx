import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import { HomeContent } from '@/components/home/HomeContent';
import { FeaturedListing } from '@/components/home/Hero360';
import { CategoryType } from '@/components/layout/CategoryRow';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch listings for each category
  const [stays, tours, restaurants, beaches] = await Promise.all([
    listingsRepository.getByCategory('STAY', 4),
    listingsRepository.getByCategory('TOUR', 3),
    listingsRepository.getByCategory('RESTAURANT', 1),
    listingsRepository.getByCategory('BEACH', 1),
  ]);

  const parsedStays = stays.map(parseListingJson);
  const parsedTours = tours.map(parseListingJson);

  // Get featured listing for each category (first featured or first available)
  const getFeatured = (listings: any[]): FeaturedListing | null => {
    const featured = listings.find(l => l.featured) || listings[0];
    if (!featured) return null;
    const parsed = parseListingJson(featured);
    return {
      id: parsed.id,
      title: parsed.title,
      parish: parsed.parish,
      rating: parsed.rating,
      description: parsed.description || `Explore this amazing ${parsed.category.toLowerCase()} in ${parsed.parish}.`,
      panoramaUrl: undefined, // Could add 360 URLs to listing data later
    };
  };

  const featuredByCategory: Record<CategoryType, FeaturedListing | null> = {
    'STAY': getFeatured(stays),
    'TOUR': getFeatured(tours),
    'RESTAURANT': getFeatured(restaurants),
    'BEACH': getFeatured(beaches),
  };

  return (
    <HomeContent 
      stays={parsedStays} 
      tours={parsedTours} 
      featuredByCategory={featuredByCategory}
    />
  );
}
