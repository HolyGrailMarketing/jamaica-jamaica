'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share, Star, MapPin, Grid, Wifi, Bed, Utensils } from 'lucide-react';
import Image from 'next/image';

export function FeaturedStayDetails() {
    return (
        <section className="container mx-auto max-w-[1400px] px-6 py-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Stay Details</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

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
                        <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-gray-100">
                            {/* Placeholder until real data */}
                            <img
                                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
                                alt="Featured Stay Interior"
                                className="w-full h-full object-cover"
                            />

                            {/* Continue Tour Button Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <Button className="bg-primary hover:bg-ocean-600 text-white w-full sm:w-auto h-12 px-6 text-base font-semibold shadow-xl border border-white/20 backdrop-blur-sm">
                                    Continue 360° tour
                                </Button>
                            </div>
                        </div>

                        {/* Pagination dots (visual only) */}
                        <div className="flex justify-center gap-2 mt-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                        </div>
                    </div>

                    {/* Right: Stay Info */}
                    <div className="pt-2">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-3xl font-bold text-gray-900">Cozy Cottage</h3>
                        </div>

                        <div className="flex items-center text-gray-500 mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">ST. ANN (20 km from you)</span>
                        </div>

                        <div className="flex items-center gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="font-bold text-lg ml-2">4.9</span>
                            <span className="text-gray-500 text-sm ml-1">(92 reviews)</span>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Rustic cottage in the cool hills of Boston Bay. A perfect getaway for nature lovers seeking peace and tranquility.
                        </p>

                        {/* Amenity Chips */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {['Entire place', '2 beds', 'Wifi', 'Pool', 'Pet friendly'].map((tag) => (
                                <span key={tag} className="px-3 py-1.5 bg-gray-100 rounded-md text-sm font-medium text-gray-700 flex items-center">
                                    {/* Icon logic could be added here */}
                                    {tag}
                                </span>
                            ))}
                            <span className="px-3 py-1.5 bg-ocean-100 text-ocean-600 rounded-md">
                                <span className="font-bold">{'< >'}</span>
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-auto">
                            <Button className="h-12 px-8 bg-primary hover:bg-ocean-600 text-white text-base font-semibold shadow-md active:scale-95 transition-transform">
                                View Listing
                            </Button>
                            <div className="flex items-center border border-gray-200 rounded-lg p-1 ml-auto sm:ml-4">
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500">
                                    <Heart className="w-5 h-5" />
                                </Button>
                                <div className="h-6 w-px bg-gray-200" />
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500">
                                    <MessageCircle className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
