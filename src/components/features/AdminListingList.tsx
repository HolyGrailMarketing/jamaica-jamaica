'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { deleteListing, toggleFeatured, createListing, updateListing } from '@/app/actions/listings';
import { Trash2, Edit, Plus, Star, X, Save } from 'lucide-react';
import Image from 'next/image';

interface ListingData {
    id: string;
    category: string;
    title: string;
    parish: string;
    locationText: string;
    description: string;
    rating: number;
    reviewsCount: number;
    priceFrom: number | null;
    images: string[];
    amenities: string[];
    featured: boolean;
}

interface AdminListingListProps {
    listings: ListingData[];
}

const PARISHES = [
    'Kingston', 'St. Andrew', 'St. Thomas', 'Portland', 'St. Mary',
    'St. Ann', 'Trelawny', 'St. James', 'Hanover', 'Westmoreland',
    'St. Elizabeth', 'Manchester', 'Clarendon', 'St. Catherine'
];

export function AdminListingList({ listings }: AdminListingListProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this listing?')) {
            startTransition(async () => {
                await deleteListing(id);
                router.refresh();
            });
        }
    };

    const handleToggleFeatured = (id: string, featured: boolean) => {
        startTransition(async () => {
            await toggleFeatured(id, !featured);
            router.refresh();
        });
    };

    const handleCreate = async (formData: FormData) => {
        startTransition(async () => {
            const result = await createListing(formData);
            if (result.success) {
                setIsCreating(false);
                router.refresh();
            } else {
                alert(result.error);
            }
        });
    };

    const handleUpdate = async (id: string, formData: FormData) => {
        startTransition(async () => {
            const result = await updateListing(id, formData);
            if (result.success) {
                setEditingId(null);
                router.refresh();
            } else {
                alert(result.error);
            }
        });
    };

    if (isCreating || editingId) {
        const editing = editingId ? listings.find(l => l.id === editingId) : null;

        return (
            <Card className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{editing ? 'Edit Listing' : 'New Listing'}</h2>
                    <Button variant="ghost" size="icon" onClick={() => { setEditingId(null); setIsCreating(false); }}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
                <form action={(formData) => editing ? handleUpdate(editing.id, formData) : handleCreate(formData)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <Input name="title" defaultValue={editing?.title} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select name="category" defaultValue={editing?.category || 'STAY'} className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                                <option value="STAY">Stay</option>
                                <option value="TOUR">Tour</option>
                                <option value="RESTAURANT">Restaurant</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Parish</label>
                            <select name="parish" defaultValue={editing?.parish} className="w-full border rounded-md px-3 py-2 text-sm bg-background" required>
                                {PARISHES.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location Text</label>
                            <Input name="locationText" defaultValue={editing?.locationText} required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea name="description" defaultValue={editing?.description} className="w-full min-h-[80px] border rounded-md px-3 py-2 text-sm bg-background" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <Input name="images" defaultValue={editing?.images.join(', ')} placeholder="https://..." required />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <Input type="number" name="priceFrom" defaultValue={editing?.priceFrom || ''} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Rating</label>
                            <Input type="number" step="0.1" max="5" name="rating" defaultValue={editing?.rating || 0} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Reviews</label>
                            <Input type="number" name="reviewsCount" defaultValue={editing?.reviewsCount || 0} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Amenities (comma separated)</label>
                        <Input name="amenities" defaultValue={editing?.amenities.join(', ')} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Rules (comma separated, for stays)</label>
                        <Input name="rules" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Included (comma separated, for tours/restaurants)</label>
                        <Input name="included" />
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="featured" name="featured" value="true" defaultChecked={editing?.featured} />
                        <label htmlFor="featured" className="text-sm font-medium">Featured</label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => { setEditingId(null); setIsCreating(false); }}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            <Save className="w-4 h-4 mr-2" /> {isPending ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <Button onClick={() => setIsCreating(true)} className="mb-4">
                <Plus className="w-4 h-4 mr-2" /> Add Listing
            </Button>

            {listings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg bg-card shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded bg-muted overflow-hidden relative shrink-0">
                            <Image src={listing.images[0]} alt="" fill className="object-cover" sizes="48px" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{listing.title}</h3>
                                {listing.featured && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                            </div>
                            <div className="text-sm text-muted-foreground capitalize">
                                {listing.category.toLowerCase()} • {listing.parish}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleFeatured(listing.id, listing.featured)}
                            disabled={isPending}
                        >
                            {listing.featured ? 'Unfeature' : 'Feature'}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setEditingId(listing.id)}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(listing.id)}
                            disabled={isPending}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
