import { z } from 'zod';

export const bookingFormSchema = z.object({
    listingId: z.string().min(1),
    category: z.enum(['STAY', 'TOUR', 'RESTAURANT']),

    // Dates - conditional based on category
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    dateTime: z.string().optional(),

    guests: z.coerce.number().min(1).max(50),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(7, 'Phone number is required'),
    notes: z.string().optional(),
}).refine((data) => {
    // Validate dates based on category
    if (data.category === 'STAY') {
        return data.startDate && data.endDate;
    } else {
        return data.dateTime;
    }
}, {
    message: 'Please provide valid dates',
    path: ['startDate'],
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const listingFormSchema = z.object({
    category: z.enum(['STAY', 'TOUR', 'RESTAURANT']),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    parish: z.string().min(1, 'Parish is required'),
    locationText: z.string().min(3, 'Location description is required'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    rating: z.coerce.number().min(0).max(5).default(0),
    reviewsCount: z.coerce.number().min(0).default(0),
    priceFrom: z.coerce.number().min(0).optional(),
    images: z.string().min(1, 'At least one image URL is required'),
    amenities: z.string().min(1, 'At least one amenity is required'),
    rules: z.string().optional(),
    included: z.string().optional(),
    lat: z.coerce.number().optional(),
    lng: z.coerce.number().optional(),
    featured: z.boolean().default(false),
});

export type ListingFormData = z.infer<typeof listingFormSchema>;
