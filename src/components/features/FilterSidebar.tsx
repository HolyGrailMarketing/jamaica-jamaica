'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface FilterSidebarProps {
    parishes: string[];
}

const CATEGORIES = [
    { value: 'all', label: 'All' },
    { value: 'STAY', label: 'Stays' },
    { value: 'TOUR', label: 'Tours' },
    { value: 'RESTAURANT', label: 'Restaurants' },
];

const RATING_OPTIONS = [
    { value: '', label: 'Any rating' },
    { value: '4', label: '4+ stars' },
    { value: '4.5', label: '4.5+ stars' },
];

export function FilterSidebar({ parishes }: FilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get('category') || 'all';
    const currentParish = searchParams.get('parish') || 'all';
    const currentMinPrice = searchParams.get('minPrice') || '';
    const currentMaxPrice = searchParams.get('maxPrice') || '';
    const currentMinRating = searchParams.get('minRating') || '';

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'all' && value !== '') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete('page'); // Reset to page 1
        router.push(`/browse?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push('/browse');
    };

    const hasFilters = currentCategory !== 'all' || currentParish !== 'all' ||
        currentMinPrice || currentMaxPrice || currentMinRating;

    return (
        <div className="bg-card border rounded-lg p-4 space-y-6 sticky top-20">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="w-4 h-4 mr-1" /> Clear
                    </Button>
                )}
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <Button
                            key={cat.value}
                            variant={currentCategory === cat.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateFilters('category', cat.value)}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Parish */}
            <div className="space-y-2">
                <label htmlFor="parish" className="text-sm font-medium">Parish</label>
                <select
                    id="parish"
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    value={currentParish}
                    onChange={(e) => updateFilters('parish', e.target.value)}
                >
                    <option value="all">All parishes</option>
                    {parishes.map((parish) => (
                        <option key={parish} value={parish}>{parish}</option>
                    ))}
                </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        value={currentMinPrice}
                        onChange={(e) => updateFilters('minPrice', e.target.value)}
                        className="w-full"
                    />
                    <Input
                        type="number"
                        placeholder="Max"
                        value={currentMaxPrice}
                        onChange={(e) => updateFilters('maxPrice', e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
                <label htmlFor="rating" className="text-sm font-medium">Minimum Rating</label>
                <select
                    id="rating"
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    value={currentMinRating}
                    onChange={(e) => updateFilters('minRating', e.target.value)}
                >
                    {RATING_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
