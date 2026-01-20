import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import MapWrapper from '@/components/features/MapWrapper';
import { HotPicksGrid } from '@/components/features/HotPicksGrid';

export const dynamic = 'force-dynamic';

export default async function MapPage() {
    const [listings, featuredTours] = await Promise.all([
        listingsRepository.getAll(),
        listingsRepository.getFeatured(6),
    ]);
    
    const parsedListings = listings.map(l => parseListingJson(l));

    // Filter out listings without coordinates
    const mapListings = parsedListings.filter(l => l.lat && l.lng).map(l => ({
        id: l.id,
        title: l.title,
        category: l.category,
        images: l.images,
        priceFrom: l.priceFrom,
        lat: l.lat,
        lng: l.lng,
    }));

    // Parse featured tours for Hot Picks section
    const parsedFeaturedTours = featuredTours.map(l => parseListingJson(l));

    return (
        <div className="flex flex-col">
            {/* Map Section */}
            <div className="relative w-full" style={{ height: '60vh', minHeight: '400px' }}>
                <MapWrapper listings={mapListings} height="100%" />
            </div>

            {/* Hot Picks Section */}
            <HotPicksGrid listings={parsedFeaturedTours} />
        </div>
    );
}
