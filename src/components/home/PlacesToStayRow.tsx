import { Star } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Listing } from '@prisma/client';

// Helper for parsed listing type
type ParsedListing = Omit<Listing, 'images' | 'amenities' | 'rules' | 'included'> & {
    images: string[];
    amenities: string[];
    rules: string[] | null;
    included: string[] | null;
};

interface PlacesToStayRowProps {
    listings: ParsedListing[];
}

export function PlacesToStayRow({ listings }: PlacesToStayRowProps) {
    return (
        <section className="container mx-auto max-w-[1400px] px-6 py-16">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Curated Collection</p>
                    <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">Places to Stay</h2>
                </div>
                <Link href="/browse?category=STAY" className="text-xs font-medium tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground pb-1">
                    View all
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {listings.map((listing) => (
                    <div key={listing.id} className="group cursor-pointer">
                        {/* Image Card */}
                        <div className="relative aspect-[4/3] rounded overflow-hidden mb-4 bg-muted">
                            <img
                                src={listing.images[0] || '/placeholder.jpg'}
                                alt={listing.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                                <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm hover:bg-white text-foreground font-medium px-2.5 py-1 text-[10px] tracking-wider uppercase rounded-sm">
                                    {Math.random() > 0.5 ? '360°' : 'Gallery'}
                                </Badge>
                            </div>
                            {listing.featured && (
                                <div className="absolute top-3 right-3">
                                    <Badge className="bg-foreground text-background border-none font-medium text-[10px] tracking-wider uppercase rounded-sm">Featured</Badge>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <h3 className="font-medium text-foreground text-base leading-tight mb-2 group-hover:text-primary transition-colors">
                            {listing.title}
                        </h3>

                        <div className="flex items-center gap-1.5 mb-2">
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
                            <span className="text-muted-foreground text-xs">{Math.floor(Math.random() * 50) + 10} km</span>
                            <span className="text-foreground">
                                <span className="font-semibold">${listing.priceFrom}</span>
                                <span className="text-muted-foreground font-normal text-xs"> / night</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
