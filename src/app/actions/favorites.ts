'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { favoritesRepository } from '@/lib/repositories/favorites';
import { revalidatePath } from 'next/cache';

const DEVICE_ID_COOKIE = 'jj_device_id';

async function getDeviceId(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(DEVICE_ID_COOKIE)?.value || null;
}

async function getOrCreateDeviceId(): Promise<string> {
    const cookieStore = await cookies();
    let deviceId = cookieStore.get(DEVICE_ID_COOKIE)?.value;

    if (!deviceId) {
        deviceId = uuidv4();
        cookieStore.set(DEVICE_ID_COOKIE, deviceId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 365, // 1 year
        });
    }

    return deviceId;
}

export async function toggleFavorite(listingId: string) {
    const deviceId = await getOrCreateDeviceId();
    const result = await favoritesRepository.toggle(deviceId, listingId);
    revalidatePath('/favorites');
    revalidatePath(`/listing/${listingId}`);
    return result;
}

export async function getFavorites() {
    const deviceId = await getOrCreateDeviceId();
    return favoritesRepository.getByDevice(deviceId);
}

export async function getFavoriteIds() {
    const deviceId = await getOrCreateDeviceId();
    return favoritesRepository.getFavoriteIds(deviceId);
}

export async function isFavorite(listingId: string) {
    const deviceId = await getDeviceId();
    if (!deviceId) {
        return false; // No device ID means no favorites
    }
    return favoritesRepository.isFavorite(deviceId, listingId);
}

export async function removeFavorite(listingId: string) {
    const deviceId = await getOrCreateDeviceId();
    await favoritesRepository.remove(deviceId, listingId);
    revalidatePath('/favorites');
}
