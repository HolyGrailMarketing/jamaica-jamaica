"use client";

import Link from 'next/link';
import { Home, Map, UtensilsCrossed, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CategoryItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
}

function CategoryItem({ icon: Icon, label, active }: CategoryItemProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 md:py-3 cursor-pointer transition-colors border-b-2 flex-shrink-0",
                active
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-black hover:bg-gray-50"
            )}>
            <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="font-medium text-xs md:text-sm whitespace-nowrap">{label}</span>
        </motion.div>
    );
}

export function CategoryRow() {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="container mx-auto max-w-[1400px] px-6">
                {/* Categories - Scrollable on mobile */}
                <div className="flex items-center overflow-x-auto scrollbar-hide -mx-6 px-6">
                    <CategoryItem icon={Home} label="Stays" active />
                    <div className="h-4 w-px bg-gray-200 mx-1 flex-shrink-0" />
                    <CategoryItem icon={Map} label="Tours" />
                    <div className="h-4 w-px bg-gray-200 mx-1 flex-shrink-0" />
                    <CategoryItem icon={UtensilsCrossed} label="Restaurants" />
                    <div className="h-4 w-px bg-gray-200 mx-1 flex-shrink-0" />
                    <CategoryItem icon={Waves} label="Beaches" />
                </div>
            </div>
        </div>
    );
}
