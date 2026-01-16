'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar, User, Mail, Phone, Clock, Users } from 'lucide-react';

interface BookingFormProps {
    listingId: string;
    category: string;
    onSubmit: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full mt-4" disabled={pending}>
            {pending ? 'Submitting...' : 'Submit Request'}
        </Button>
    );
}

export function BookingForm({ listingId, category, onSubmit }: BookingFormProps) {
    const isStay = category === 'STAY';
    const [submitError, setSubmitError] = useState<string | null>(null);

    const formAction = async (formData: FormData) => {
        setSubmitError(null);
        const result = await onSubmit(formData);
        if (result && !result.success) {
            setSubmitError(result.error || 'Something went wrong');
        }
    };

    return (
        <Card className="p-6">
            <form action={formAction} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Your Details</h2>

                {submitError && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                        {submitError}
                    </div>
                )}

                <input type="hidden" name="listingId" value={listingId} />
                <input type="hidden" name="category" value={category} />

                {/* Dates */}
                {isStay ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="startDate" className="text-sm font-medium flex items-center">
                                <Calendar className="w-4 h-4 mr-1" /> Check-in
                            </label>
                            <Input type="date" id="startDate" name="startDate" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="endDate" className="text-sm font-medium flex items-center">
                                <Calendar className="w-4 h-4 mr-1" /> Check-out
                            </label>
                            <Input type="date" id="endDate" name="endDate" required />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <label htmlFor="dateTime" className="text-sm font-medium flex items-center">
                            <Clock className="w-4 h-4 mr-1" /> Date & Time
                        </label>
                        <Input type="datetime-local" id="dateTime" name="dateTime" required />
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="guests" className="text-sm font-medium flex items-center">
                        <Users className="w-4 h-4 mr-1" /> Guests
                    </label>
                    <Input type="number" id="guests" name="guests" min="1" max="20" defaultValue="2" required />
                </div>

                <hr className="my-4" />

                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium flex items-center">
                        <User className="w-4 h-4 mr-1" /> Full Name
                    </label>
                    <Input type="text" id="name" name="name" placeholder="John Doe" required />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex items-center">
                        <Mail className="w-4 h-4 mr-1" /> Email
                    </label>
                    <Input type="email" id="email" name="email" placeholder="john@example.com" required />
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium flex items-center">
                        <Phone className="w-4 h-4 mr-1" /> Phone
                    </label>
                    <Input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" required />
                </div>

                <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">Special Requests (Optional)</label>
                    <textarea
                        id="notes"
                        name="notes"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <SubmitButton />
            </form>
        </Card>
    );
}
