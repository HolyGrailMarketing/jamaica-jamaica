'use server';

import { bookingsRepository } from '@/lib/repositories/bookings';
import { bookingFormSchema } from '@/lib/validations/schemas';
import { revalidatePath } from 'next/cache';

export async function createBooking(formData: FormData) {
    const rawData = {
        listingId: formData.get('listingId') as string,
        category: formData.get('category') as string,
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string,
        dateTime: formData.get('dateTime') as string,
        guests: formData.get('guests'),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        notes: formData.get('notes') as string,
    };

    const validated = bookingFormSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            error: validated.error.issues[0]?.message || 'Validation failed',
        };
    }

    try {
        const data = validated.data;
        const booking = await bookingsRepository.create({
            listingId: data.listingId,
            categorySnapshot: data.category,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
            dateTime: data.dateTime ? new Date(data.dateTime) : undefined,
            guests: data.guests,
            name: data.name,
            email: data.email,
            phone: data.phone,
            notes: data.notes,
        });

        revalidatePath('/admin');

        return { success: true, bookingId: booking.id };
    } catch (error) {
        console.error('Booking creation failed:', error);
        return { success: false, error: 'Failed to create booking' };
    }
}

export async function getBooking(id: string) {
    return bookingsRepository.getById(id);
}
