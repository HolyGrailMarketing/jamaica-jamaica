import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBooking } from '@/app/actions/bookings';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Home } from 'lucide-react';

interface ConfirmationPageProps {
    params: Promise<{ id: string }>;
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
    const { id: bookingId } = await params;

    const booking = await getBooking(bookingId);
    if (!booking) {
        notFound();
    }

    const formatDate = (date: Date | null) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDateTime = (date: Date | null) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    return (
        <div className="container max-w-2xl py-20 text-center">
            <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">Booking Requested!</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Your request for <span className="font-semibold text-foreground">{booking.listing.title}</span> has been received.
            </p>

            <Card className="p-8 mb-8 text-left bg-muted/20">
                <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
                    Booking Details
                </h2>
                <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Reference ID</span>
                        <span className="font-mono font-medium">{booking.id}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">For</span>
                        <span className="font-medium">{booking.name}</span>
                    </div>
                    {booking.categorySnapshot === 'STAY' ? (
                        <>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">Check-in</span>
                                <span className="font-medium">{formatDate(booking.startDate)}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">Check-out</span>
                                <span className="font-medium">{formatDate(booking.endDate)}</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">Date & Time</span>
                            <span className="font-medium">{formatDateTime(booking.dateTime)}</span>
                        </div>
                    )}
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Guests</span>
                        <span className="font-medium">{booking.guests}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="text-muted-foreground">Status</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {booking.status}
                        </span>
                    </div>
                </div>
            </Card>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" /> Back to Home
                    </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href={`/listing/${booking.listingId}`}>
                        View Listing
                    </Link>
                </Button>
            </div>
        </div>
    );
}
