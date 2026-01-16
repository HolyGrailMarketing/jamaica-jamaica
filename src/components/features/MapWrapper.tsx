"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const MapView = dynamic(() => import('./MapView'), {
    ssr: false,
    loading: () => (
        <Skeleton 
            className="w-full rounded-lg bg-muted" 
            style={{ height: '100%', minHeight: '400px' }}
        />
    )
});

export default function MapWrapper(props: any) {
    return <MapView {...props} />;
}
