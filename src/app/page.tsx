import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import { HomeContent } from '@/components/home/HomeContent';
import { FeaturedListing } from '@/components/home/Hero360';
import { CategoryType } from '@/components/layout/CategoryRow';

export const dynamic = 'force-dynamic';

const CATEGORIES: CategoryType[] = ['STAY', 'RESTAURANT', 'TOUR', 'BEACH'];

function toFeaturedListing(parsed: ReturnType<typeof parseListingJson>): FeaturedListing {
  return {
    id: parsed.id,
    title: parsed.title,
    parish: parsed.parish,
    rating: parsed.rating,
    description: parsed.description || `Explore this amazing ${parsed.category.toLowerCase()} in ${parsed.parish}.`,
    panoramaUrl: undefined,
    amenities: parsed.amenities?.slice(0, 6) || [],
  };
}

export default async function Home() {
  // Fetch listings for all categories (4+ per category for grid; 4 featured for slideshow)
  const [stays, tours, restaurants, beaches] = await Promise.all([
    listingsRepository.getByCategory('STAY', 8),
    listingsRepository.getByCategory('TOUR', 6),
    listingsRepository.getByCategory('RESTAURANT', 6),
    listingsRepository.getByCategory('BEACH', 6),
  ]);

  const parsedStays = stays.map(parseListingJson);
  const parsedTours = tours.map(parseListingJson);
  const parsedRestaurants = restaurants.map(parseListingJson);
  const parsedBeaches = beaches.map(parseListingJson);

  const listingsByCategory: Record<CategoryType, ReturnType<typeof parseListingJson>[]> = {
    STAY: parsedStays,
    RESTAURANT: parsedRestaurants,
    TOUR: parsedTours,
    BEACH: parsedBeaches,
  };

  // Featured: first featured or first available, for hero
  const getFeatured = (listings: any[]): FeaturedListing | null => {
    const featured = listings.find((l: any) => l.featured) || listings[0];
    if (!featured) return null;
    return toFeaturedListing(parseListingJson(featured));
  };

  // Featured for slideshow: up to 4 per category (featured first, then by rating)
  const getFeaturedForSlideshow = (listings: any[]): ReturnType<typeof parseListingJson>[] => {
    const parsed = listings.map(parseListingJson);
    const featured = parsed.filter((l) => (l as any).featured);
    const rest = parsed.filter((l) => !(l as any).featured);
    return [...featured, ...rest].slice(0, 4);
  };

  const featuredByCategory: Record<CategoryType, FeaturedListing | null> = {
    STAY: getFeatured(stays),
    TOUR: getFeatured(tours),
    RESTAURANT: getFeatured(restaurants),
    BEACH: getFeatured(beaches),
  };

  const featuredSlideshowByCategory: Record<CategoryType, ReturnType<typeof parseListingJson>[]> = {
    STAY: getFeaturedForSlideshow(stays),
    RESTAURANT: getFeaturedForSlideshow(restaurants),
    TOUR: getFeaturedForSlideshow(tours),
    BEACH: getFeaturedForSlideshow(beaches),
  };

  return (
    <HomeContent
      listingsByCategory={listingsByCategory}
      featuredByCategory={featuredByCategory}
      featuredSlideshowByCategory={featuredSlideshowByCategory}
    />
  );
}
