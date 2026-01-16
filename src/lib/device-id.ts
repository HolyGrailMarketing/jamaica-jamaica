import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const DEVICE_ID_COOKIE = 'jj_device_id';

export async function getDeviceId(): Promise<string> {
    const cookieStore = await cookies();
    let deviceId = cookieStore.get(DEVICE_ID_COOKIE)?.value;

    if (!deviceId) {
        deviceId = uuidv4();
        // Note: Setting cookies in Server Components requires a response
        // We'll handle this in middleware or API routes
    }

    return deviceId;
}

export function getDeviceIdFromCookieStore(cookieStore: { get: (name: string) => { value: string } | undefined }): string {
    return cookieStore.get(DEVICE_ID_COOKIE)?.value || '';
}

export { DEVICE_ID_COOKIE };
