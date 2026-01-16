import Link from 'next/link';
import { Home, Map, UtensilsCrossed, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
}

function CategoryItem({ icon: Icon, label, active }: CategoryItemProps) {
    return (
        <div className={cn(
            "flex items-center gap-2 px-4 py-3 cursor-pointer transition-colors border-b-2",
            active
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-black hover:bg-gray-50"
        )}>
            <Icon className="h-4 w-4" />
            <span className="font-medium text-sm">{label}</span>
        </div>
    );
}

export function CategoryRow() {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="container mx-auto max-w-[1400px] flex items-center px-6">

                {/* Categories */}
                <div className="flex items-center">
                    <CategoryItem icon={Home} label="Stays" active />
                    <div className="h-4 w-px bg-gray-200 mx-1" />
                    <CategoryItem icon={Map} label="Tours" />
                    <div className="h-4 w-px bg-gray-200 mx-1" />
                    <CategoryItem icon={UtensilsCrossed} label="Restaurants" />
                    <div className="h-4 w-px bg-gray-200 mx-1" />
                    <CategoryItem icon={Waves} label="Beaches" />
                </div>

            </div>
        </div>
    );
}
