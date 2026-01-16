import Link from 'next/link';
import { ListingCard } from './ListingCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ListingData {
    id: string;
    category: string;
    title: string;
    parish: string;
    locationText: string;
    rating: number;
    reviewsCount: number;
    priceFrom: number | null;
    images: string[];
}

interface FeaturedSectionProps {
    title: string;
    subtitle: string;
    listings: ListingData[];
    exploreLink: string;
}

export function FeaturedSection({ title, subtitle, listings, exploreLink }: FeaturedSectionProps) {
    if (listings.length === 0) return null;

    return (
        <section className="py-12 md:py-16">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
                        <p className="text-muted-foreground mt-1">{subtitle}</p>
                    </div>
                    <Button variant="ghost" asChild className="self-start md:self-auto">
                        <Link href={exploreLink}>
                            Explore all <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </div>
        </section>
    );
}
