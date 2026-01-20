'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share, Star, MapPin, Grid, Wifi, Bed, Utensils } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function FeaturedStayDetails() {
    return (
        <section className="container mx-auto max-w-[1400px] px-6 py-8 lg:py-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-6 text-gray-900">Featured Stay Details</h2>

            {/* Mobile Layout - Side by side */}
            <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <Link href="/listing/1" className="flex gap-4">
                    {/* Left: Image */}
                    <div className="w-1/3 flex-shrink-0">
                        <div className="aspect-square rounded-lg overflow-hidden relative bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80"
                                alt="Featured Stay Interior"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2">
                                <Badge className="bg-primary/90 text-white text-[8px] px-1.5 py-0.5">360°</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Cozy Cottage</h3>
                        <div className="flex items-center text-gray-500 mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="text-xs">ST. ANN</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="font-bold text-sm ml-1">4.9</span>
                        </div>
                        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                            Rustic cottage in the cool hills of Boston Bay.
                        </p>
                        <span className="text-primary text-xs font-semibold">Tap to view 360° tour</span>
                    </div>
                </Link>
            </div>

            {/* Desktop Layout - Compact view */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="grid grid-cols-2 gap-6">

                    {/* Left: Media Area */}
                    <div className="relative">
                        {/* Tabs */}
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200 cursor-pointer">
                                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                                <span className="font-bold text-sm text-gray-900">360 Photo</span>
                            </div>
                            <button className="bg-white/90 hover:bg-white px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 shadow-sm transition-colors">
                                Photos
                            </button>
                            <button className="bg-white/90 hover:bg-white px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 shadow-sm transition-colors">
                                Video
                            </button>
                        </div>

                        {/* Main Image */}
                        <div className="aspect-[5/3] rounded-xl overflow-hidden relative bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
                                alt="Featured Stay Interior"
                                className="w-full h-full object-cover"
                            />

                            {/* Continue Tour Button Overlay */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <Button className="bg-primary hover:bg-ocean-600 text-white w-auto h-10 px-5 text-sm font-semibold shadow-xl border border-white/20 backdrop-blur-sm">
                                    Continue 360° tour
                                </Button>
                            </div>
                        </div>

                        {/* Pagination dots (visual only) */}
                        <div className="flex justify-center gap-2 mt-3">
                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                        </div>
                    </div>

                    {/* Right: Stay Info */}
                    <div className="pt-1">
                        <div className="flex justify-between items-start mb-1.5">
                            <h3 className="text-2xl font-bold text-gray-900">Cozy Cottage</h3>
                        </div>

                        <div className="flex items-center text-gray-500 mb-3">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            <span className="text-xs">ST. ANN (20 km from you)</span>
                        </div>

                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="font-bold text-base ml-1.5">4.9</span>
                            <span className="text-gray-500 text-xs ml-1">(92 reviews)</span>
                        </div>

                        <p className="text-gray-600 mb-5 text-sm leading-relaxed line-clamp-2">
                            Rustic cottage in the cool hills of Boston Bay. A perfect getaway for nature lovers seeking peace and tranquility.
                        </p>

                        {/* Amenity Chips */}
                        <div className="flex flex-wrap gap-2 mb-5">
                            {['Entire place', '2 beds', 'Wifi', 'Pool', 'Pet friendly'].map((tag) => (
                                <span key={tag} className="px-2.5 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700 flex items-center">
                                    {tag}
                                </span>
                            ))}
                            <span className="px-2.5 py-1 bg-ocean-100 text-ocean-600 rounded-md text-xs">
                                <span className="font-bold">{'< >'}</span>
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-auto">
                            <Button className="h-10 px-6 bg-primary hover:bg-ocean-600 text-white text-sm font-semibold shadow-md active:scale-95 transition-transform">
                                View Listing
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
