"use client";

import Image from 'next/image';
import { useState } from 'react';
import { ImageSkeleton } from '@/components/features/ImageSkeleton';

interface ListingGalleryProps {
    images: string[];
    title: string;
}

export function ListingGallery({ images, title }: ListingGalleryProps) {
    const [loadingStates, setLoadingStates] = useState<boolean[]>([true, true, true]);

    const handleLoad = (index: number) => {
        setLoadingStates(prev => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[400px] mb-8 rounded-xl overflow-hidden">
            <div className="md:col-span-2 relative h-full bg-muted">
                {loadingStates[0] && <ImageSkeleton className="absolute inset-0 z-10" />}
                <Image
                    src={images[0]}
                    alt={title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${loadingStates[0] ? 'opacity-0' : 'opacity-100'}`}
                    priority
                    onLoad={() => handleLoad(0)}
                />
            </div>
            <div className="hidden md:flex flex-col gap-2 h-full">
                <div className="relative flex-1 bg-muted">
                    {loadingStates[1] && <ImageSkeleton className="absolute inset-0 z-10" />}
                    <Image
                        src={images[1] || images[0]}
                        alt="Gallery"
                        fill
                        className={`object-cover transition-opacity duration-500 ${loadingStates[1] ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => handleLoad(1)}
                    />
                </div>
                <div className="relative flex-1 bg-muted">
                    {loadingStates[2] && <ImageSkeleton className="absolute inset-0 z-10" />}
                    <Image
                        src={images[2] || images[0]}
                        alt="Gallery"
                        fill
                        className={`object-cover transition-opacity duration-500 ${loadingStates[2] ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => handleLoad(2)}
                    />
                </div>
            </div>
        </div>
    );
}
