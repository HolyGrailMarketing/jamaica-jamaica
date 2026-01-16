import { Suspense } from 'react';
import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import { AdminListingList } from '@/components/features/AdminListingList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const listings = await listingsRepository.getAll();
    const parsedListings = listings.map(l => ({
        ...l,
        images: JSON.parse(l.images) as string[],
        amenities: JSON.parse(l.amenities) as string[],
    }));

    return (
        <div className="container py-10">
            <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Internal Admin Demo</AlertTitle>
                <AlertDescription>
                    This is an internal admin interface for demonstration purposes.
                    In production, this would require authentication.
                </AlertDescription>
            </Alert>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage listings ({listings.length} total)</p>
                </div>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <AdminListingList listings={parsedListings} />
            </Suspense>
        </div>
    );
}
