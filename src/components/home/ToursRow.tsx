"use client";

import { Star, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Listing } from '@prisma/client';
import { useState } from 'react';
import { ImageSkeleton } from '@/components/features/ImageSkeleton';

type ParsedListing = Omit<Listing, 'images' | 'amenities' | 'rules' | 'included'> & {
    images: string[];
    amenities: string[];
    rules: string[] | null;
    included: string[] | null;
};

interface ToursRowProps {
    listings: ParsedListing[];
}

function TourItem({ tour }: { tour: ParsedListing }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="bg-card rounded p-5 border border-border/60 hover:shadow-lg hover:border-border transition-all duration-300">
            {/* Image */}
            <div className="aspect-video rounded overflow-hidden mb-5 bg-muted relative">
                {isLoading && <ImageSkeleton className="absolute inset-0 z-10" />}
                <Image
                    src={tour.images[0] || '/placeholder.jpg'}
                    alt={tour.title}
                    fill
                    className={`object-cover hover:scale-105 transition-transform duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onLoad={() => setIsLoading(false)}
                />
            </div>

            {/* Content */}
            <h3 className="font-medium text-foreground text-lg mb-3 line-clamp-1">{tour.title}</h3>

            <div className="flex items-center gap-1.5 mb-4">
                <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i <= Math.round(tour.rating) ? 'fill-foreground text-foreground' : 'fill-muted text-muted'}`}
                        />
                    ))}
                </div>
                <span className="font-medium text-foreground text-sm">{tour.rating}</span>
                <span className="text-muted-foreground text-xs">({tour.reviewsCount})</span>
            </div>

            <div className="flex items-center justify-between mb-5">
                <span className="text-foreground">
                    <span className="font-semibold text-xl">${tour.priceFrom}</span>
                    <span className="text-sm text-muted-foreground"> / person</span>
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button variant="default" className="w-full text-xs tracking-wider uppercase">
                    View times
                </Button>
                <Button variant="outline" className="w-full text-xs tracking-wider uppercase flex items-center gap-2">
                    Book <ArrowUpDown className="w-3 h-3" />
                </Button>
            </div>
        </div>
    );
}

export function ToursRow({ listings }: ToursRowProps) {
    return (
        <section className="container mx-auto max-w-[1400px] px-6 py-16 pb-24 bg-secondary/30">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Experiences</p>
                    <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">Tours & Activities</h2>
                </div>
                <Link href="/browse?category=TOUR" className="text-xs font-medium tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground pb-1">
                    View all
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.map(tour => (
                    <TourItem key={tour.id} tour={tour} />
                ))}
            </div>
        </section>
    );
}
