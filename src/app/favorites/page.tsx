import Link from 'next/link';
import { getFavorites } from '@/app/actions/favorites';
import { parseListingJson } from '@/lib/repositories/listings';
import { ListingCard } from '@/components/features/ListingCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
    const favorites = await getFavorites();
    const listings = favorites.map(f => parseListingJson(f.listing));

    return (
        <div className="container py-10 min-h-[60vh]">
            <div className="flex items-center gap-3 mb-8">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                <h1 className="text-3xl font-bold">Your Favorites</h1>
            </div>

            {listings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} showDistance />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/30 rounded-lg">
                    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-6">Start exploring and save places you love.</p>
                    <Button asChild>
                        <Link href="/browse">Start Browsing</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
