import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import { isFavorite } from '@/app/actions/favorites';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ListingCard } from '@/components/features/ListingCard';
import { FavoriteButton } from '@/components/features/FavoriteButton';
import { ListingGallery } from '@/components/features/ListingGallery';
import { ReviewsSection } from '@/components/features/ReviewsSection';
import MapWrapper from '@/components/features/MapWrapper';
import { MapPin, Star, Share, CheckCircle, Info } from 'lucide-react';

export default async function ListingPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const listing = await listingsRepository.getById(id);

    if (!listing) {
        notFound();
    }

    const parsed = parseListingJson(listing);
    const similar = await listingsRepository.getSimilar(listing);
    const reviews = await listingsRepository.getReviews(id);
    const isFav = await isFavorite(id);

    const priceLabel = listing.category === 'STAY' ? 'night' : 'person';
    const ctaLabel = listing.category === 'STAY' ? 'Request to Book' : 'Book Now';

    return (
        <div className="container py-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <Link href="/browse" className="text-sm text-muted-foreground hover:text-black mb-4 inline-block">&larr; Back to browsing</Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {listing.locationText}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <FavoriteButton listingId={listing.id} initialFavorite={isFav} />
                        <Button variant="outline" size="icon"><Share className="w-4 h-4" /></Button>
                    </div>
                </div>
            </div>

            {/* Gallery */}
            <ListingGallery images={parsed.images} title={listing.title} />

            <div className="grid md:grid-cols-3 gap-12 mt-8">
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
                        <div className="bg-muted rounded-lg h-64 w-full relative overflow-hidden z-0">
                            <MapWrapper
                                singleListing={{
                                    id: listing.id,
                                    title: listing.title,
                                    category: listing.category,
                                    images: parsed.images,
                                    priceFrom: listing.priceFrom,
                                    lat: listing.lat,
                                    lng: listing.lng
                                }}
                                height="100%"
                            />
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

            {/* Reviews Section */}
            <ReviewsSection
                reviews={reviews}
                rating={listing.rating}
                reviewsCount={listing.reviewsCount}
            />

            {/* Similar Places */}
            {similar.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Similar offerings nearby</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {similar.map((item) => (
                            <ListingCard key={item.id} listing={parseListingJson(item)} showDistance />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
