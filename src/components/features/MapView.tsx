"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from './MapMarker';
import L from 'leaflet';

// Fix for Leaflet icons
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

interface ListingShort {
    id: string;
    title: string;
    category: string;
    images: string[];
    priceFrom: number | null;
    lat?: number | null;
    lng?: number | null;
}

interface MapViewProps {
    listings?: ListingShort[]; // Optional list to show multiple markers
    center?: [number, number]; // Optional center
    zoom?: number;
    singleListing?: ListingShort; // Optional single listing to show
    height?: string;
}

const JAMAICA_CENTER: [number, number] = [18.1096, -77.2975];

export default function MapView({ listings = [], center, zoom = 9, singleListing, height = "100%" }: MapViewProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div 
                className="w-full rounded-lg bg-muted animate-pulse" 
                style={{ height }}
            />
        );
    }

    const mapCenter = center || (singleListing?.lat && singleListing?.lng ? [singleListing.lat, singleListing.lng] : JAMAICA_CENTER);
    const mapZoom = zoom || (singleListing ? 13 : 9);

    const listingsToShow = singleListing ? [singleListing] : listings;

    return (
        <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            scrollWheelZoom={true}
            className="w-full rounded-lg z-0"
            style={{ height, minHeight: '400px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {listingsToShow.map((listing) => (
                <MapMarker key={listing.id} listing={listing} />
            ))}
        </MapContainer>
    );
}
