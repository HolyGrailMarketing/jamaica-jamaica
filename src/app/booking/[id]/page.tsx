import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import { createBooking } from '@/app/actions/bookings';
import { BookingForm } from '@/components/features/BookingForm';
import { Card } from '@/components/ui/card';

interface BookingPageProps {
    params: Promise<{ id: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
    const { id: listingId } = await params;

    const listing = await listingsRepository.getById(listingId);
    if (!listing) {
        notFound();
    }

    const parsed = parseListingJson(listing);
    const priceLabel = listing.category === 'STAY' ? 'night' : 'person';

    async function handleSubmit(formData: FormData) {
        'use server';
        const result = await createBooking(formData);
        if (result.success && result.bookingId) {
            redirect(`/booking/confirmation/${result.bookingId}`);
        }
        return result;
    }

    return (
        <div className="container max-w-4xl py-10">
            <h1 className="text-3xl font-bold mb-8">Request Booking</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <BookingForm
                    listingId={listingId}
                    category={listing.category}
                    onSubmit={handleSubmit}
                />

                {/* Summary Card */}
                <div className="space-y-6">
                    <Card className="p-6 overflow-hidden">
                        <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
                            <Image
                                src={parsed.images[0]}
                                alt={listing.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="font-bold text-lg mb-1">{listing.title}</h3>
                        <p className="text-muted-foreground mb-4">{listing.locationText}, {listing.parish}</p>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Price per {priceLabel}</span>
                                <span className="font-semibold">${listing.priceFrom || 0}</span>
                            </div>
                        </div>
                    </Card>

                    <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                        <p className="mb-2"><strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before check-in.</p>
                        <p><strong>Ground Rules:</strong> Respect the local community and environment.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
