export type Category = 'stay' | 'tour' | 'restaurant';

export type Parish =
    | 'Kingston'
    | 'St. Andrew'
    | 'St. Catherine'
    | 'Clarendon'
    | 'Manchester'
    | 'St. Elizabeth'
    | 'Westmoreland'
    | 'Hanover'
    | 'St. James'
    | 'Trelawny'
    | 'St. Ann'
    | 'St. Mary'
    | 'Portland'
    | 'St. Thomas';

export interface Listing {
    id: string;
    title: string;
    category: Category;
    parish: Parish;
    location: string;
    description: string;
    images: string[];
    priceFrom?: number;
    rating: number;
    reviewsCount: number;
    amenities: string[];
    rules?: string[]; // Only for stays
    included?: string[]; // For tours and restaurants
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface BookingRequest {
    id: string;
    listingId: string;
    listingTitle: string;
    listingImage: string;
    dateStart: string; // ISO date string
    dateEnd?: string; // Only for stays
    time?: string; // For tours/restaurants
    guests: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
}

export type SortOption = 'recommended' | 'rating' | 'price_asc' | 'price_desc';

export interface FilterState {
    category?: Category;
    parish?: Parish;
    priceMin?: number;
    priceMax?: number;
    ratingMin?: number;
}
