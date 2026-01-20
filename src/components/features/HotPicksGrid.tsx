"use client";

import { Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Listing } from '@prisma/client';
import { useState } from 'react';
import { ImageSkeleton } from '@/components/features/ImageSkeleton';

type ParsedListing = Omit<Listing, 'images' | 'amenities' | 'rules' | 'included'> & {
    images: string[];
    amenities: string[];
    rules: string[] | null;
    included: string[] | null;
};

interface HotPicksGridProps {
    listings: ParsedListing[];
}

function HotPickItem({ listing }: { listing: ParsedListing }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Link href={`/listing/${listing.id}`} className="group cursor-pointer block">
            {/* Image Card */}
            <div className="relative aspect-[5/3] rounded-lg overflow-hidden mb-3 bg-muted">
                {isLoading && <ImageSkeleton className="absolute inset-0 z-10" />}
                <Image
                    src={listing.images[0] || '/placeholder.jpg'}
                    alt={listing.title}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onLoad={() => setIsLoading(false)}
                />
                <div className="absolute top-3 left-3 z-20">
                    <Badge variant="secondary" className="bg-primary/90 text-white font-medium px-2.5 py-1 text-[10px] tracking-wider uppercase rounded-sm">
                        360°
                    </Badge>
                </div>
                {listing.featured && (
                    <div className="absolute top-3 right-3 z-20">
                        <Badge className="bg-foreground text-background border-none font-medium text-[10px] tracking-wider uppercase rounded-sm">
                            Hot Pick
                        </Badge>
                    </div>
                )}
            </div>

            {/* Info */}
            <h3 className="font-medium text-foreground text-base leading-tight mb-1 group-hover:text-primary transition-colors">
                {listing.title}
            </h3>

            <div className="flex items-center gap-1.5 mb-1">
                <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star
                            key={i}
                            className={`w-3 h-3 ${i <= Math.round(listing.rating) ? 'fill-foreground text-foreground' : 'fill-muted text-muted'}`}
                        />
                    ))}
                </div>
                <span className="text-xs font-medium text-foreground">{listing.rating}</span>
                <span className="text-xs text-muted-foreground">({listing.reviewsCount})</span>
            </div>

            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground text-xs capitalize">{listing.category.toLowerCase()}</span>
                {listing.priceFrom && (
                    <span className="text-foreground">
                        <span className="font-semibold">${listing.priceFrom}</span>
                        <span className="text-muted-foreground font-normal text-xs">
                            {listing.category === 'STAY' ? ' / night' : ' / person'}
                        </span>
                    </span>
                )}
            </div>
        </Link>
    );
}

export function HotPicksGrid({ listings }: HotPicksGridProps) {
    if (listings.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto max-w-[1400px] px-6 py-12">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Discover</p>
                    <h2 className="text-2xl md:text-3xl font-light text-foreground tracking-tight">Hot Picks</h2>
                </div>
                <Link 
                    href="/browse" 
                    className="text-xs font-medium tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground pb-1"
                >
                    View all
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                    <HotPickItem key={listing.id} listing={listing} />
                ))}
            </div>
        </section>
    );
}
