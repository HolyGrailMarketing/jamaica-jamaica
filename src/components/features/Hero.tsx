'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Hero() {
    const router = useRouter();
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/browse?q=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <section className="relative h-[85vh] w-full overflow-hidden bg-black text-white">
            {/* Background Image (360 Simulation with subtle pan) */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[25s] ease-linear animate-slow-pan"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2664&auto=format&fit=crop")',
                    backgroundSize: '120%',
                }}
                aria-label="Panoramic view of Jamaica"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </div>

            {/* Text Overlay Container - Group for hover detection */}
            {/* pointer-events-none on container, pointer-events-auto on interactive children */}
            <div
                className="group absolute inset-0 pointer-events-none z-10"
            >
                {/* Heading Overlay - Animates on group-hover (desktop) or state toggle (mobile) */}
                <div
                    className={`
                        absolute inset-0 flex flex-col items-center justify-center p-4
                        pointer-events-auto
                        
                        /* Base transition - 300ms ease-in-out as specified */
                        transition-all duration-300 ease-in-out
                        
                        /* Mobile visibility toggle */
                        ${!isOverlayVisible ? 'opacity-0 -translate-x-full scale-90 pointer-events-none' : 'opacity-100 translate-x-0 scale-100'}
                        
                        /* Desktop: On hover, slide left, fade, and shrink */
                        md:group-hover:-translate-x-[60%]
                        md:group-hover:-translate-y-[10%]
                        md:group-hover:opacity-30
                        md:group-hover:scale-[0.85]
                    `}
                >
                    <div className="max-w-3xl text-center space-y-6">
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
                            Explore Jamaica in 360
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
                            Immerse yourself in the rhythm, culture, and beauty of the island.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <Button
                                variant="outline"
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                                onClick={() => router.push('/browse?category=stay')}
                            >
                                Places to Stay
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                                onClick={() => router.push('/browse?category=tour')}
                            >
                                Tours & Experiences
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                                onClick={() => router.push('/browse?category=restaurant')}
                            >
                                Eats
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar - Fixed at the BOTTOM, always interactive */}
            <div className={`
                absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-20
                transition-opacity duration-300
                ${!isOverlayVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}>
                <form
                    onSubmit={handleSearch}
                    className="flex w-full items-center space-x-2 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-2xl"
                >
                    <Search className="ml-3 h-5 w-5 text-white/70" />
                    <input
                        type="text"
                        placeholder="Where to?"
                        className="flex-1 bg-transparent border-none text-white placeholder:text-white/70 focus:outline-none px-2 h-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" size="default" className="rounded-full px-6">
                        Go
                    </Button>
                </form>
            </div>

            {/* Mobile Toggle Button - Only visible on mobile */}
            <div className="absolute bottom-6 right-6 z-30 md:hidden">
                <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full shadow-lg bg-white/90 backdrop-blur text-foreground hover:bg-white gap-2"
                    onClick={() => setIsOverlayVisible(!isOverlayVisible)}
                >
                    {isOverlayVisible ? (
                        <>
                            <EyeOff className="h-4 w-4" />
                            <span className="text-xs">Hide text</span>
                        </>
                    ) : (
                        <>
                            <Eye className="h-4 w-4" />
                            <span className="text-xs">Show text</span>
                        </>
                    )}
                </Button>
            </div>

            {/* Subtle hint for desktop users */}
            <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs animate-pulse pointer-events-none z-10">
                Hover for immersive view
            </div>
        </section>
    );
}
