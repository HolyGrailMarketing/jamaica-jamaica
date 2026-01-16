"use client";

import { useEffect, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import Image from 'next/image';

// Fix for default marker icon in Next.js
const icon = L.icon({
    iconUrl: '/images/marker-icon.png', // We might need to ensure these exist or use CDN
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Or better, use a custom divIcon or CDN URLs if local assets missing
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface MapMarkerProps {
    listing: {
        id: string;
        title: string;
        lat?: number | null;
        lng?: number | null;
        images: string[];
        priceFrom?: number | null;
        category: string;
    };
}

export function MapMarker({ listing }: MapMarkerProps) {
    if (!listing.lat || !listing.lng) return null;

    return (
        <Marker position={[listing.lat, listing.lng]} icon={defaultIcon}>
            <Popup>
                <div className="w-48">
                    <Link href={`/listing/${listing.id}`} className="block group">
                        <div className="relative aspect-video rounded-md overflow-hidden mb-2">
                            <Image
                                src={listing.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80'}
                                alt={listing.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                                sizes="200px"
                            />
                        </div>
                        <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">{listing.title}</h3>
                        {listing.priceFrom && (
                            <p className="font-medium text-xs mt-1">
                                ${listing.priceFrom} <span className="text-muted-foreground font-normal">/ {listing.category === 'STAY' ? 'night' : 'person'}</span>
                            </p>
                        )}
                    </Link>
                </div>
            </Popup>
        </Marker>
    );
}
