import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import MapWrapper from '@/components/features/MapWrapper';

export default async function MapPage() {
    const listings = await listingsRepository.getAll();
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

    return (
        <div className="relative w-full" style={{ height: 'calc(100vh - 160px)', minHeight: '600px' }}>
            <MapWrapper listings={mapListings} height="100%" />
        </div>
    );
}
