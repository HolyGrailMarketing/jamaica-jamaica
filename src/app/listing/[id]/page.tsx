import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import { isFavorite } from '@/app/actions/favorites';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ListingCard } from '@/components/features/ListingCard';
import { FavoriteButton } from '@/components/features/FavoriteButton';
import { Star, MapPin, CheckCircle, Info, Share2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ListingPageProps {
    params: Promise<{ id: string }>;
}

export default async function ListingPage({ params }: ListingPageProps) {
    const { id } = await params;

    const listing = await listingsRepository.getById(id);
    if (!listing) {
        notFound();
    }

    const parsed = parseListingJson(listing);
    const [similar, isFav] = await Promise.all([
        listingsRepository.getSimilar(listing, 3).then(items => items.map(parseListingJson)),
        isFavorite(id),
    ]);

    const priceLabel = listing.category === 'STAY' ? 'night' : 'person';
    const ctaLabel = listing.category === 'RESTAURANT' ? 'Reserve Table' : 'Request Booking';

    return (
        <div className="container py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{listing.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                        <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" /> {listing.locationText}, {listing.parish}
                        </span>
                        <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-amber-400 text-amber-400" />
                            {listing.rating.toFixed(1)} ({listing.reviewsCount} reviews)
                        </span>
                        <span className="capitalize px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
                            {listing.category.toLowerCase()}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                    <FavoriteButton listingId={id} initialFavorite={isFav} />
                </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[400px] mb-8 rounded-xl overflow-hidden">
                <div className="md:col-span-2 relative h-full bg-muted">
                    <Image
                        src={parsed.images[0]}
                        alt={listing.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="hidden md:flex flex-col gap-2 h-full">
                    <div className="relative flex-1 bg-muted">
                        <Image
                            src={parsed.images[1] || parsed.images[0]}
                            alt="Gallery"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative flex-1 bg-muted">
                        <Image
                            src={parsed.images[2] || parsed.images[0]}
                            alt="Gallery"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                {/* Left Col: Details */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">About this {listing.category.toLowerCase()}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">{listing.description}</p>
                    </section>

                    <hr />

                    {/* Amenities */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {parsed.amenities.map((amenity, i) => (
                                <div key={i} className="flex items-center text-muted-foreground">
                                    <CheckCircle className="w-5 h-5 mr-3 text-primary" />
                                    {amenity}
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr />

                    {/* Rules (for stays) */}
                    {listing.category === 'STAY' && parsed.rules && (
                        <section>
                            <h2 className="text-xl font-semibold mb-4">House Rules</h2>
                            <ul className="space-y-2">
                                {parsed.rules.map((rule, i) => (
                                    <li key={i} className="flex items-start">
                                        <Info className="w-5 h-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Included (for tours/restaurants) */}
                    {listing.category !== 'STAY' && parsed.included && (
                        <section>
                            <h2 className="text-xl font-semibold mb-4">What&apos;s Included</h2>
                            <ul className="space-y-2">
                                {parsed.included.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <hr />

                    {/* Location */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Where you&apos;ll be</h2>
                        <div className="bg-muted rounded-lg h-64 w-full flex items-center justify-center relative overflow-hidden">
                            <div className="text-center p-4">
                                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                                <p className="font-semibold">{listing.parish}, Jamaica</p>
                                {listing.lat && listing.lng && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {listing.lat.toFixed(4)}, {listing.lng.toFixed(4)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Col: Booking Card */}
                <div className="md:col-span-1">
                    <div className="sticky top-24">
                        <Card className="p-6 shadow-xl border-t-4 border-t-primary">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <span className="text-2xl font-bold">${listing.priceFrom || 0}</span>
                                    <span className="text-muted-foreground text-sm"> / {priceLabel}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                                    <span className="font-medium">{listing.rating.toFixed(1)}</span>
                                </div>
                            </div>

                            <Button className="w-full h-12 text-lg font-semibold" asChild>
                                <Link href={`/booking/${id}`}>{ctaLabel}</Link>
                            </Button>

                            <p className="text-center text-xs text-muted-foreground mt-4">
                                You won&apos;t be charged yet
                            </p>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Similar Listings */}
            {similar.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Similar offerings nearby</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {similar.map((item) => (
                            <ListingCard key={item.id} listing={item} showDistance />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
