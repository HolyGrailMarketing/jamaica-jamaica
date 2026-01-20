import prisma from '@/lib/db';
import { Listing } from '@prisma/client';

export type ListingCategory = 'STAY' | 'TOUR' | 'RESTAURANT' | 'BEACH';

export interface ListingFilters {
    category?: ListingCategory;
    parish?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    search?: string;
    featured?: boolean;
}

export interface ListingSort {
    field: 'rating' | 'priceFrom' | 'createdAt';
    direction: 'asc' | 'desc';
}

export const listingsRepository = {
    async getAll(filters?: ListingFilters, sort?: ListingSort, limit?: number, offset?: number) {
        const where: any = {};

        if (filters?.category) {
            where.category = filters.category;
        }
        if (filters?.parish) {
            where.parish = filters.parish;
        }
        if (filters?.minPrice !== undefined) {
            where.priceFrom = { ...where.priceFrom, gte: filters.minPrice };
        }
        if (filters?.maxPrice !== undefined) {
            where.priceFrom = { ...where.priceFrom, lte: filters.maxPrice };
        }
        if (filters?.minRating !== undefined) {
            where.rating = { gte: filters.minRating };
        }
        if (filters?.featured !== undefined) {
            where.featured = filters.featured;
        }
        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search } },
                { parish: { contains: filters.search } },
                { locationText: { contains: filters.search } },
            ];
        }

        const orderBy: any = [];
        if (sort) {
            orderBy.push({ [sort.field]: sort.direction });
        } else {
            // Default: featured first, then by rating
            orderBy.push({ featured: 'desc' });
            orderBy.push({ rating: 'desc' });
        }

        return prisma.listing.findMany({
            where,
            orderBy,
            take: limit,
            skip: offset,
        });
    },

    async getById(id: string) {
        return prisma.listing.findUnique({
            where: { id },
        });
    },

    async getByCategory(category: ListingCategory, limit?: number) {
        return prisma.listing.findMany({
            where: { category },
            orderBy: [{ featured: 'desc' }, { rating: 'desc' }],
            take: limit,
        });
    },

    async getFeatured(limit = 6) {
        return prisma.listing.findMany({
            where: { featured: true },
            orderBy: { rating: 'desc' },
            take: limit,
        });
    },

    async getSimilar(listing: Listing, limit = 3) {
        return prisma.listing.findMany({
            where: {
                category: listing.category,
                id: { not: listing.id },
            },
            orderBy: { rating: 'desc' },
            take: limit,
        });
    },

    async count(filters?: ListingFilters) {
        const where: any = {};
        if (filters?.category) where.category = filters.category;
        if (filters?.parish) where.parish = filters.parish;
        if (filters?.featured !== undefined) where.featured = filters.featured;
        return prisma.listing.count({ where });
    },

    async create(data: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>) {
        return prisma.listing.create({ data });
    },

    async update(id: string, data: Partial<Listing>) {
        return prisma.listing.update({
            where: { id },
            data,
        });
    },

    async delete(id: string) {
        return prisma.listing.delete({
            where: { id },
        });
    },

    async getParishes() {
        const listings = await prisma.listing.findMany({
            select: { parish: true },
            distinct: ['parish'],
        });
        return listings.map(l => l.parish);
    },
    async getSearchSuggestions(query: string, limit = 5) {
        if (!query) return [];
        return prisma.listing.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { parish: { contains: query, mode: 'insensitive' } },
                    { locationText: { contains: query, mode: 'insensitive' } },
                ],
            },
            select: { id: true, title: true, category: true, parish: true, images: true },
            take: limit,
        });
    },
    async getReviews(listingId: string, limit = 6) {
        return prisma.review.findMany({
            where: { listingId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    },
};

// Helper to parse JSON fields
export function parseListingJson(listing: Listing) {
    return {
        ...listing,
        images: JSON.parse(listing.images) as string[],
        amenities: JSON.parse(listing.amenities) as string[],
        rules: listing.rules ? JSON.parse(listing.rules) as string[] : null,
        included: listing.included ? JSON.parse(listing.included) as string[] : null,
    };
}
