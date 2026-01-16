import prisma from '@/lib/db';
import { BookingRequest } from '@prisma/client';

export type BookingStatus = 'NEW' | 'CONFIRMED' | 'CANCELLED';

export interface CreateBookingData {
    listingId: string;
    categorySnapshot: string;
    startDate?: Date;
    endDate?: Date;
    dateTime?: Date;
    guests: number;
    name: string;
    email: string;
    phone: string;
    notes?: string;
}

export const bookingsRepository = {
    async create(data: CreateBookingData) {
        return prisma.bookingRequest.create({
            data: {
                ...data,
                status: 'NEW',
            },
        });
    },

    async getById(id: string) {
        return prisma.bookingRequest.findUnique({
            where: { id },
            include: { listing: true },
        });
    },

    async getByListing(listingId: string) {
        return prisma.bookingRequest.findMany({
            where: { listingId },
            orderBy: { createdAt: 'desc' },
        });
    },

    async updateStatus(id: string, status: BookingStatus) {
        return prisma.bookingRequest.update({
            where: { id },
            data: { status },
        });
    },

    async getAll() {
        return prisma.bookingRequest.findMany({
            include: { listing: true },
            orderBy: { createdAt: 'desc' },
        });
    },
};
