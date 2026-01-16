import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import { CategoryRow } from '@/components/layout/CategoryRow';
import { Hero360 } from '@/components/home/Hero360';
import { FeaturedStayDetails } from '@/components/home/FeaturedStayDetails';
import { PlacesToStayRow } from '@/components/home/PlacesToStayRow';
import { ToursRow } from '@/components/home/ToursRow';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [stays, tours] = await Promise.all([
    listingsRepository.getByCategory('STAY', 4),
    listingsRepository.getByCategory('TOUR', 3),
  ]);

  const parsedStays = stays.map(parseListingJson);
  const parsedTours = tours.map(parseListingJson);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Category Navigation */}
      <CategoryRow />

      {/* Hero Section */}
      <Hero360 />

      {/* Featured Details */}
      <FeaturedStayDetails />

      {/* Listings */}
      <PlacesToStayRow listings={parsedStays} />
      <ToursRow listings={parsedTours} />

      {/* Footer (Placeholder usually, but keeping page clean as per request scope) */}
      <div className="h-20" />
    </div>
  );
}
