"use client";

import Link from 'next/link';
import { Home, Map, UtensilsCrossed, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export type CategoryType = 'STAY' | 'RESTAURANT' | 'TOUR' | 'BEACH';

interface CategoryItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

interface CategoryRowProps {
    selectedCategory?: CategoryType;
    onCategoryChange?: (category: CategoryType) => void;
}

const categories: { icon: React.ElementType; label: string; value: CategoryType }[] = [
    { icon: Home, label: 'Stays', value: 'STAY' },
    { icon: UtensilsCrossed, label: 'Restaurants', value: 'RESTAURANT' },
    { icon: Map, label: 'Tours', value: 'TOUR' },
    { icon: Waves, label: 'Beaches', value: 'BEACH' },
];

function CategoryItem({ icon: Icon, label, active, onClick }: CategoryItemProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 md:py-3 cursor-pointer transition-colors border-b-2 flex-1",
                active
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-black hover:bg-gray-50"
            )}>
            <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="font-medium text-xs md:text-sm whitespace-nowrap">{label}</span>
        </motion.div>
    );
}

export function CategoryRow({ selectedCategory = 'STAY', onCategoryChange }: CategoryRowProps) {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="container mx-auto max-w-[1400px] px-6">
                {/* Categories - Full width, evenly spaced */}
                <div className="flex items-center justify-between w-full">
                    {categories.map((cat, index) => (
                        <div key={cat.value} className="contents">
                            <CategoryItem 
                                icon={cat.icon} 
                                label={cat.label} 
                                active={selectedCategory === cat.value}
                                onClick={() => onCategoryChange?.(cat.value)}
                            />
                            {index < categories.length - 1 && (
                                <div className="h-4 w-px bg-gray-200 flex-shrink-0" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
