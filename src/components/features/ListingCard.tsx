import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ListingData {
    id: string;
    category: string;
    title: string;
    parish: string;
    locationText: string;
    rating: number;
    reviewsCount: number;
    priceFrom: number | null;
    images: string[];
    lat?: number | null;
    lng?: number | null;
}

interface ListingCardProps {
    listing: ListingData;
    showDistance?: boolean;
}

// Fake user location (Kingston)
const USER_LAT = 17.9714;
const USER_LNG = -76.7920;

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function ListingCard({ listing, showDistance = false }: ListingCardProps) {
    const imageUrl = listing.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80';

    let distance: string | null = null;
    if (showDistance && listing.lat && listing.lng) {
        const km = calculateDistance(USER_LAT, USER_LNG, listing.lat, listing.lng);
        distance = km < 10 ? `${km.toFixed(1)} km away` : `${Math.round(km)} km away`;
    }

    const priceLabel = listing.category === 'STAY' ? '/night' : listing.category === 'TOUR' ? '/person' : '/person';

    return (
        <Link href={`/listing/${listing.id}`}>
            <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full capitalize">
                            {listing.category.toLowerCase()}
                        </span>
                    </div>
                </div>

                <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                            {listing.title}
                        </h3>
                        <div className="flex items-center gap-1 shrink-0">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium">{listing.rating.toFixed(1)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{listing.parish}</span>
                        {distance && (
                            <span className="text-xs ml-1">• {distance}</span>
                        )}
                    </div>

                    {listing.priceFrom && (
                        <div className="pt-2 border-t">
                            <span className="font-bold text-lg">${listing.priceFrom}</span>
                            <span className="text-muted-foreground text-sm"> {priceLabel}</span>
                        </div>
                    )}
                </div>
            </Card>
        </Link>
    );
}
