'use server';

import { listingsRepository } from '@/lib/repositories/listings';
import { listingFormSchema } from '@/lib/validations/schemas';
import { revalidatePath } from 'next/cache';

export async function createListing(formData: FormData) {
    const rawData = {
        category: formData.get('category') as string,
        title: formData.get('title') as string,
        parish: formData.get('parish') as string,
        locationText: formData.get('locationText') as string,
        description: formData.get('description') as string,
        rating: formData.get('rating'),
        reviewsCount: formData.get('reviewsCount'),
        priceFrom: formData.get('priceFrom'),
        images: formData.get('images') as string,
        amenities: formData.get('amenities') as string,
        rules: formData.get('rules') as string,
        included: formData.get('included') as string,
        lat: formData.get('lat'),
        lng: formData.get('lng'),
        featured: formData.get('featured') === 'true',
    };

    const validated = listingFormSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            error: validated.error.issues[0]?.message || 'Validation failed',
        };
    }

    try {
        const data = validated.data;
        const listing = await listingsRepository.create({
            category: data.category,
            title: data.title,
            parish: data.parish,
            locationText: data.locationText,
            description: data.description,
            rating: data.rating,
            reviewsCount: data.reviewsCount,
            priceFrom: data.priceFrom || null,
            images: JSON.stringify(data.images.split(',').map(s => s.trim())),
            amenities: JSON.stringify(data.amenities.split(',').map(s => s.trim())),
            rules: data.rules ? JSON.stringify(data.rules.split(',').map(s => s.trim())) : null,
            included: data.included ? JSON.stringify(data.included.split(',').map(s => s.trim())) : null,
            lat: data.lat || null,
            lng: data.lng || null,
            featured: data.featured,
        });

        revalidatePath('/admin');
        revalidatePath('/browse');
        revalidatePath('/');

        return { success: true, listingId: listing.id };
    } catch (error) {
        console.error('Listing creation failed:', error);
        return { success: false, error: 'Failed to create listing' };
    }
}

export async function updateListing(id: string, formData: FormData) {
    const rawData = {
        category: formData.get('category') as string,
        title: formData.get('title') as string,
        parish: formData.get('parish') as string,
        locationText: formData.get('locationText') as string,
        description: formData.get('description') as string,
        rating: formData.get('rating'),
        reviewsCount: formData.get('reviewsCount'),
        priceFrom: formData.get('priceFrom'),
        images: formData.get('images') as string,
        amenities: formData.get('amenities') as string,
        rules: formData.get('rules') as string,
        included: formData.get('included') as string,
        lat: formData.get('lat'),
        lng: formData.get('lng'),
        featured: formData.get('featured') === 'true',
    };

    const validated = listingFormSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            error: validated.error.issues[0]?.message || 'Validation failed',
        };
    }

    try {
        const data = validated.data;
        await listingsRepository.update(id, {
            category: data.category,
            title: data.title,
            parish: data.parish,
            locationText: data.locationText,
            description: data.description,
            rating: data.rating,
            reviewsCount: data.reviewsCount,
            priceFrom: data.priceFrom || null,
            images: JSON.stringify(data.images.split(',').map(s => s.trim())),
            amenities: JSON.stringify(data.amenities.split(',').map(s => s.trim())),
            rules: data.rules ? JSON.stringify(data.rules.split(',').map(s => s.trim())) : null,
            included: data.included ? JSON.stringify(data.included.split(',').map(s => s.trim())) : null,
            lat: data.lat || null,
            lng: data.lng || null,
            featured: data.featured,
        });

        revalidatePath('/admin');
        revalidatePath('/browse');
        revalidatePath('/');
        revalidatePath(`/listing/${id}`);

        return { success: true };
    } catch (error) {
        console.error('Listing update failed:', error);
        return { success: false, error: 'Failed to update listing' };
    }
}

export async function deleteListing(id: string) {
    try {
        await listingsRepository.delete(id);
        revalidatePath('/admin');
        revalidatePath('/browse');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Listing deletion failed:', error);
        return { success: false, error: 'Failed to delete listing' };
    }
}

export async function toggleFeatured(id: string, featured: boolean) {
    try {
        await listingsRepository.update(id, { featured });
        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Toggle featured failed:', error);
        return { success: false, error: 'Failed to toggle featured' };
    }
}
