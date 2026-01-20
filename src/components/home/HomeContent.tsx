"use client";

import { useState, useEffect } from 'react';
import { CategoryRow, CategoryType } from '@/components/layout/CategoryRow';
import { Hero360, FeaturedListing } from '@/components/home/Hero360';
import { FeaturedStayDetails } from '@/components/home/FeaturedStayDetails';
import { PlacesToStayRow } from '@/components/home/PlacesToStayRow';
import { ToursRow } from '@/components/home/ToursRow';
import { Listing } from '@prisma/client';

type ParsedListing = Omit<Listing, 'images' | 'amenities' | 'rules' | 'included'> & {
    images: string[];
    amenities: string[];
    rules: string[] | null;
    included: string[] | null;
};

interface HomeContentProps {
    stays: ParsedListing[];
    tours: ParsedListing[];
    featuredByCategory: Record<CategoryType, FeaturedListing | null>;
}

export function HomeContent({ stays, tours, featuredByCategory }: HomeContentProps) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('STAY');

    const handleCategoryChange = (category: CategoryType) => {
        setSelectedCategory(category);
    };

    const currentFeatured = featuredByCategory[selectedCategory];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Category Navigation */}
            <CategoryRow 
                selectedCategory={selectedCategory} 
                onCategoryChange={handleCategoryChange} 
            />

            {/* Hero Section */}
            <Hero360 
                category={selectedCategory} 
                featuredListing={currentFeatured} 
            />

            {/* Featured Details */}
            <FeaturedStayDetails />

            {/* Listings */}
            <PlacesToStayRow listings={stays} />
            <ToursRow listings={tours} />

            {/* Footer Spacer */}
            <div className="h-20" />
        </div>
    );
}
