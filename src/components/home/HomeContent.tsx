"use client";

import { useState } from 'react';
import { CategoryRow, CategoryType } from '@/components/layout/CategoryRow';
import { Hero360, FeaturedListing } from '@/components/home/Hero360';
import { FeaturedStayDetails } from '@/components/home/FeaturedStayDetails';
import { ListingsGrid } from '@/components/home/ListingsGrid';
import { Listing } from '@prisma/client';

type ParsedListing = Omit<Listing, 'images' | 'amenities' | 'rules' | 'included'> & {
    images: string[];
    amenities: string[];
    rules: string[] | null;
    included: string[] | null;
};

const categoryHeadings: Record<CategoryType, { label: string; title: string }> = {
    STAY: { label: 'Featured Places', title: 'Places to Stay' },
    RESTAURANT: { label: 'Featured Dining', title: 'Restaurants' },
    TOUR: { label: 'Experiences', title: 'Tours & Activities' },
    BEACH: { label: 'Featured Beaches', title: 'Beaches' },
};

interface HomeContentProps {
    listingsByCategory: Record<CategoryType, ParsedListing[]>;
    featuredByCategory: Record<CategoryType, FeaturedListing | null>;
    featuredSlideshowByCategory: Record<CategoryType, ParsedListing[]>;
}

export function HomeContent({
    listingsByCategory,
    featuredByCategory,
    featuredSlideshowByCategory,
}: HomeContentProps) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('STAY');

    const handleCategoryChange = (category: CategoryType) => {
        setSelectedCategory(category);
    };

    const currentFeatured = featuredByCategory[selectedCategory];
    const currentListings = listingsByCategory[selectedCategory] || [];
    const currentSlideshow = featuredSlideshowByCategory[selectedCategory] || [];
    const headings = categoryHeadings[selectedCategory];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <CategoryRow
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            <Hero360 category={selectedCategory} featuredListing={currentFeatured} />

            <FeaturedStayDetails
                listings={currentSlideshow}
                category={selectedCategory}
                heading={headings}
            />

            <ListingsGrid
                listings={currentListings}
                category={selectedCategory}
                heading={headings}
            />

            <div className="h-20" />
        </div>
    );
}
