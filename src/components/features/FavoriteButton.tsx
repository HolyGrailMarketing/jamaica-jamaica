'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toggleFavorite } from '@/app/actions/favorites';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
    listingId: string;
    initialFavorite: boolean;
}

export function FavoriteButton({ listingId, initialFavorite }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            const result = await toggleFavorite(listingId);
            setIsFavorite(result.added);
        });
    };

    return (
        <Button
            variant={isFavorite ? 'default' : 'outline'}
            size="sm"
            onClick={handleToggle}
            disabled={isPending}
            className={cn(
                isFavorite && 'bg-red-500 hover:bg-red-600 text-white border-red-500'
            )}
        >
            <Heart className={cn('w-4 h-4 mr-2', isFavorite && 'fill-current')} />
            {isFavorite ? 'Saved' : 'Save'}
        </Button>
    );
}
