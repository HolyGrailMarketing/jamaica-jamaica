"use client";

import { Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Listing } from '@prisma/client';
import { useState } from 'react';
import { ImageSkeleton } from '@/components/features/ImageSkeleton';
import { CategoryType } from '@/components/layout/CategoryRow';
import { cn } from '@/lib/utils';

type ParsedListing = Omit<Listing, 'images' | 'amenities' | 'rules' | 'included'> & {
    images: string[];
    amenities: string[];
    rules: string[] | null;
    included: string[] | null;
};

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function ListingItem({ listing, category }: { listing: ParsedListing; category: CategoryType }) {
    const [isLoading, setIsLoading] = useState(true);
    const badgeType = hashString(listing.id) % 2 === 0 ? '360°' : 'Gallery';
    const distance = (hashString(listing.id) % 50) + 10;

    const priceLabel = category === 'STAY' ? '/ night' : '/ person';
    const tags = listing.amenities?.slice(0, 3) || [];

    return (
        <Link href={`/listing/${listing.id}`} className="group block">
            <div className="relative aspect-[4/3] md:aspect-[5/3] rounded overflow-hidden mb-4 bg-muted">
                {isLoading && <ImageSkeleton className="absolute inset-0 z-10" />}
                <Image
                    src={listing.images[0] || '/placeholder.jpg'}
                    alt={listing.title}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onLoad={() => setIsLoading(false)}
                />
                <div className="absolute top-3 left-3 z-20">
                    <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm hover:bg-white text-foreground font-medium px-2.5 py-1 text-[10px] tracking-wider uppercase rounded-sm">
                        {badgeType}
                    </Badge>
                </div>
                {listing.featured && (
                    <div className="absolute top-3 right-3 z-20">
                        <Badge className="bg-foreground text-background border-none font-medium text-[10px] tracking-wider uppercase rounded-sm">Featured</Badge>
                    </div>
                )}
            </div>

            <h3 className="font-medium text-foreground text-base leading-tight mb-2 group-hover:text-primary transition-colors">
                {listing.title}
            </h3>

            <div className="flex items-center gap-1.5 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                        key={i}
                        className={`w-3 h-3 ${i <= Math.round(listing.rating) ? 'fill-foreground text-foreground' : 'fill-muted text-muted'}`}
                    />
                ))}
                <span className="text-xs font-medium text-foreground">{listing.rating}</span>
                <span className="text-xs text-muted-foreground">({listing.reviewsCount})</span>
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground text-xs">{distance} km</span>
                {listing.priceFrom != null && (
                    <span className="text-foreground">
                        <span className="font-semibold">${listing.priceFrom}</span>
                        <span className="text-muted-foreground font-normal text-xs">{priceLabel}</span>
                    </span>
                )}
            </div>
        </Link>
    );
}

interface ListingsGridProps {
    listings: ParsedListing[];
    category: CategoryType;
    heading: { label: string; title: string };
}

export function ListingsGrid({ listings, category, heading }: ListingsGridProps) {
    const categoryParam = category === 'STAY' ? 'STAY' : category === 'RESTAURANT' ? 'RESTAURANT' : category === 'TOUR' ? 'TOUR' : 'BEACH';

    return (
        <section className={cn(
            "container mx-auto max-w-[1400px] px-6 py-16",
            category === 'TOUR' && "bg-secondary/30"
        )}>
            <div className="flex justify-between items-end mb-10">
                <div>
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">{heading.label}</p>
                    <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">{heading.title}</h2>
                </div>
                <Link
                    href={`/browse?category=${categoryParam}`}
                    className="text-xs font-medium tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground pb-1"
                >
                    View all
                </Link>
            </div>

            {listings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {listings.map((listing) => (
                        <ListingItem key={listing.id} listing={listing} category={category} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <p>No listings in this category yet.</p>
                </div>
            )}
        </section>
    );
}

