'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Maximize2, Volume2, Plus, RotateCcw, Compass } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CategoryType } from '@/components/layout/CategoryRow';
// @ts-ignore
import 'pannellum/build/pannellum.css';

declare global {
    interface Window {
        pannellum: any;
    }
}

export interface FeaturedListing {
    id: string;
    title: string;
    parish: string;
    rating: number;
    description: string;
    panoramaUrl?: string;
}

interface Hero360Props {
    category?: CategoryType;
    featuredListing?: FeaturedListing | null;
}

const categoryLabels: Record<CategoryType, string> = {
    'STAY': 'Featured Stay',
    'RESTAURANT': 'Featured Restaurant',
    'TOUR': 'Featured Tour',
    'BEACH': 'Featured Beach',
};

const defaultPanorama = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/small_empty_room_1.jpg';

export function Hero360({ category = 'STAY', featuredListing }: Hero360Props) {
    const panoRef = useRef<HTMLDivElement>(null);
    const [viewer, setViewer] = useState<any>(null);
    const [isHoveringText, setIsHoveringText] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const panoramaUrl = featuredListing?.panoramaUrl || defaultPanorama;

    useEffect(() => {
        // Dynamic import to avoid SSR issues with Pannellum
        const initPannellum = async () => {
            if (typeof window !== 'undefined' && panoRef.current) {
                // Destroy existing viewer if any
                if (viewer) {
                    try {
                        viewer.destroy();
                    } catch (e) {
                        // Ignore cleanup errors
                    }
                }

                setIsLoading(true);
                
                // We need to require pannellum here to ensure window object exists
                require('pannellum');

                const p = window.pannellum.viewer(panoRef.current, {
                    type: 'equirectangular',
                    panorama: panoramaUrl,
                    autoLoad: true,
                    compass: false,
                    showControls: false, // Custom controls
                    mouseZoom: false,
                    hfov: 100,
                    pitch: 0,
                    yaw: 180,
                });

                p.on('load', () => {
                    setIsLoading(false);
                });

                setViewer(p);
            }
        };

        initPannellum();

        return () => {
            // proper cleanup if possible, though Pannellum destroy might be tricky in React 18 strict mode
            // relying on clean unmount
        };
    }, [panoramaUrl]);

    return (
        <div className="relative w-full h-[65vh] md:h-[70vh] bg-gray-900 overflow-hidden group">
            {/* 360 Viewer Container */}
            <div ref={panoRef} className="w-full h-full absolute inset-0 z-0" />

            {/* Loading Overlay */}
            <div
                className={cn(
                    "absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 transition-opacity duration-1000",
                    isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="relative">
                    <Compass className="w-16 h-16 text-white/20 animate-[spin_4s_linear_infinite]" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
                    </div>
                </div>
                <p className="mt-6 text-white/60 text-[10px] font-medium tracking-[0.3em] uppercase animate-pulse">
                    Loading Experience
                </p>
            </div>

            {/* Overlay Gradient for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-10" />

            {/* Center Text */}
            <div
                className={cn(
                    "absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none cursor-default transition-all duration-500",
                    isHoveringText ? "opacity-0" : "opacity-100"
                )}
            >
                <div className="flex flex-col items-center text-center cursor-default">
                    <div
                        className="bg-white/10 backdrop-blur-md px-5 py-1.5 rounded-sm mb-6 border border-white/20 pointer-events-auto cursor-default"
                        onMouseEnter={() => setIsHoveringText(true)}
                        onMouseLeave={() => setIsHoveringText(false)}
                    >
                        <span className="text-white text-[10px] font-medium tracking-[0.2em] uppercase cursor-default">{categoryLabels[category]}</span>
                    </div>
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-2 drop-shadow-lg tracking-wide pointer-events-auto cursor-default"
                        onMouseEnter={() => setIsHoveringText(true)}
                        onMouseLeave={() => setIsHoveringText(false)}
                    >
                        Explore in 360°
                    </h1>
                </div>
            </div>

            {/* Drag Hint (Bottom Center) */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-white text-xs font-medium">Drag to explore</span>
                </div>
            </div>

            {/* Controls (Bottom Right of viewport, distinct from card) */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                <Button size="icon" variant="secondary" className="h-10 w-10 rounded-lg bg-white/90 shadow-lg hover:bg-white text-gray-800">
                    <Plus className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="secondary" className="h-10 w-10 rounded-lg bg-white/90 shadow-lg hover:bg-white text-gray-800">
                    <Volume2 className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="secondary" className="h-10 w-10 rounded-lg bg-white/90 shadow-lg hover:bg-white text-gray-800">
                    <Maximize2 className="h-5 w-5" />
                </Button>
            </div>

            {/* Featured Listing Card (Anchored Bottom Right, slightly overlapping hero) - Hidden on mobile */}
            {featuredListing && (
                <div className="hidden md:block absolute bottom-0 right-0 z-30 m-4 lg:m-8 translate-y-0 w-auto max-w-[calc(100vw-2rem)] lg:max-w-sm">
                    <div className="bg-white/75 backdrop-blur-md rounded-xl shadow-2xl p-4 lg:p-5 w-full border border-white/50">
                        <Badge className="bg-primary hover:bg-ocean-600 text-white border-0 mb-3 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                            360° Photo
                        </Badge>

                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight uppercase">{featuredListing.title}</h3>
                            <div className="bg-white/60 p-2 rounded-full">
                                <RotateCcw className="w-4 h-4 text-foreground/60" strokeWidth={2} />
                            </div>
                        </div>

                        <div className="flex items-center text-gray-600 text-sm mb-3 font-medium uppercase tracking-wide">
                            {featuredListing.parish} <span className="normal-case ml-1 text-gray-500 font-normal">(5 km from you)</span>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className={`w-4 h-4 ${i <= Math.round(featuredListing.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                            ))}
                            <span className="font-bold text-gray-900 ml-1">{featuredListing.rating.toFixed(1)}</span>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                            {featuredListing.description}
                        </p>

                        <div className="flex items-center justify-between gap-3">
                            <Link href={`/listing/${featuredListing.id}`} className="flex items-center text-primary font-bold text-sm hover:text-ocean-600 transition-colors group/link">
                                View Listing
                                <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                            <Button className="bg-primary hover:bg-ocean-600 text-white text-xs font-semibold px-4 h-9" asChild>
                                <Link href={`/booking/${featuredListing.id}`}>Book Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
