import { Listing, BookingRequest, Category, Parish } from './types';
import { SEED_LISTINGS } from './data';

const LISTINGS_KEY = 'jamaica_listings';
const BOOKINGS_KEY = 'jamaica_bookings';
const FAVORITES_KEY = 'jamaica_favorites';

export const storage = {
    // listings
    getListings: (): Listing[] => {
        if (typeof window === 'undefined') return SEED_LISTINGS;
        const stored = localStorage.getItem(LISTINGS_KEY);
        if (!stored) {
            localStorage.setItem(LISTINGS_KEY, JSON.stringify(SEED_LISTINGS));
            return SEED_LISTINGS;
        }
        return JSON.parse(stored);
    },

    getListing: (id: string): Listing | undefined => {
        const listings = storage.getListings();
        return listings.find((l) => l.id === id);
    },

    addListing: (listing: Listing): void => {
        const listings = storage.getListings();
        listings.push(listing);
        localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
    },

    updateListing: (listing: Listing): void => {
        const listings = storage.getListings();
        const index = listings.findIndex((l) => l.id === listing.id);
        if (index !== -1) {
            listings[index] = listing;
            localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
        }
    },

    deleteListing: (id: string): void => {
        const listings = storage.getListings();
        const filtered = listings.filter((l) => l.id !== id);
        localStorage.setItem(LISTINGS_KEY, JSON.stringify(filtered));
    },

    // bookings
    getBookings: (): BookingRequest[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(BOOKINGS_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    addBooking: (booking: BookingRequest): void => {
        const bookings = storage.getBookings();
        bookings.push(booking);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    },

    // favorites
    getFavorites: (): string[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    toggleFavorite: (id: string): boolean => {
        const favs = storage.getFavorites();
        const index = favs.indexOf(id);
        let isFav = false;
        if (index === -1) {
            favs.push(id);
            isFav = true;
        } else {
            favs.splice(index, 1);
            isFav = false;
        }
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
        return isFav;
    },

    isFavorite: (id: string): boolean => {
        const favs = storage.getFavorites();
        return favs.includes(id);
    }
};
