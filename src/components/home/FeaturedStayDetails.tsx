'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Listing } from '@prisma/client';
import { CategoryType } from '@/components/layout/CategoryRow';
import { cn } from '@/lib/utils';

type ParsedListing = Omit<Listing, 'images' | 'amenities' | 'rules' | 'included'> & {
    images: string[];
    amenities: string[];
    rules: string[] | null;
    included: string[] | null;
};

interface FeaturedStayDetailsProps {
    listings: ParsedListing[];
    category: CategoryType;
    heading: { label: string; title: string };
}

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash);
}

export function FeaturedStayDetails({ listings, category, heading }: FeaturedStayDetailsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (listings.length === 0) return null;

    const listing = listings[currentIndex];
    const distance = (hashString(listing.id) % 50) + 10;
    const tags = listing.amenities?.slice(0, 6) || [];

    const goNext = () => setCurrentIndex((i) => (i + 1) % listings.length);
    const goPrev = () => setCurrentIndex((i) => (i - 1 + listings.length) % listings.length);

    useEffect(() => {
        if (listings.length <= 1) return;

        const interval = setInterval(() => {
            goNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [listings.length]);

    return (
        <section className="container mx-auto max-w-[1400px] px-6 py-8 lg:py-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-900">
                Featured {heading.title}
            </h2>

            {/* Mobile Layout - Side by side */}
            <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <Link href={`/listing/${listing.id}`} className="flex gap-4">
                    <div className="w-1/3 flex-shrink-0">
                        <div className="aspect-square rounded-lg overflow-hidden relative bg-gray-100">
                            <img
                                src={listing.images[0] || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80'}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2">
                                <Badge className="bg-primary/90 text-white text-[8px] px-1.5 py-0.5">360°</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{listing.title}</h3>
                        <div className="flex items-center text-gray-500 mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="text-xs">{listing.parish}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="font-bold text-sm ml-1">{listing.rating}</span>
                        </div>
                        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                            {listing.description || `Explore in ${listing.parish}.`}
                        </p>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                                {tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-medium text-gray-600">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <span className="text-primary text-xs font-semibold">Tap to view 360° tour</span>
                    </div>
                </Link>
                {listings.length > 1 && (
                    <div className="flex justify-center gap-2 mt-3">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); goPrev(); }}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); goNext(); }}>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Desktop Layout - Slideshow */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="grid grid-cols-2 gap-6">
                    <div className="relative">
                        <div className="aspect-[5/3] rounded-xl overflow-hidden relative bg-gray-100">
                            <img
                                src={listing.images[0] || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200">
                                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                                    <span className="font-bold text-sm text-gray-900">360 Photo</span>
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <Button className="bg-primary hover:bg-ocean-600 text-white w-auto h-10 px-5 text-sm font-semibold shadow-xl border border-white/20 backdrop-blur-sm" asChild>
                                    <Link href={`/listing/${listing.id}`}>Continue 360° tour</Link>
                                </Button>
                            </div>
                        </div>

                        {listings.length > 1 && (
                            <>
                                <div className="flex justify-center gap-2 mt-3">
                                    {listings.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            className={cn(
                                                "w-2.5 h-2.5 rounded-full transition-colors",
                                                i === currentIndex ? "bg-primary" : "bg-gray-300"
                                            )}
                                        />
                                    ))}
                                </div>
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
                                    <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full shadow-md" onClick={goPrev}>
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full shadow-md" onClick={goNext}>
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="pt-1">
                        <div className="flex justify-between items-start mb-1.5">
                            <h3 className="text-2xl font-bold text-gray-900">{listing.title}</h3>
                        </div>

                        <div className="flex items-center text-gray-500 mb-3">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            <span className="text-xs">{listing.parish} ({distance} km from you)</span>
                        </div>

                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="font-bold text-base ml-1.5">{listing.rating}</span>
                            <span className="text-gray-500 text-xs ml-1">({listing.reviewsCount} reviews)</span>
                        </div>

                        <p className="text-gray-600 mb-5 text-sm leading-relaxed line-clamp-2">
                            {listing.description || `Explore this amazing ${category.toLowerCase()} in ${listing.parish}.`}
                        </p>

                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5">
                                {tags.map((tag) => (
                                    <span key={tag} className="px-2.5 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                                        {tag}
                                    </span>
                                ))}
                                <span className="px-2.5 py-1 bg-ocean-100 text-ocean-600 rounded-md text-xs">
                                    <span className="font-bold">{'< >'}</span>
                                </span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 mt-auto">
                            <Button className="h-10 px-6 bg-primary hover:bg-ocean-600 text-white text-sm font-semibold shadow-md active:scale-95 transition-transform" asChild>
                                <Link href={`/listing/${listing.id}`}>View Listing</Link>
                            </Button>
                            <div className="flex items-center border border-gray-200 rounded-lg p-1 ml-auto">
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500">
                                    <Heart className="w-4 h-4" />
                                </Button>
                                <div className="h-5 w-px bg-gray-200" />
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500">
                                    <MessageCircle className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
