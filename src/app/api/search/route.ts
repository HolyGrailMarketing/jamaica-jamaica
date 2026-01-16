import { NextResponse } from 'next/server';
import { listingsRepository } from '@/lib/repositories/listings';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json([]);
    }

    try {
        const suggestions = await listingsRepository.getSearchSuggestions(query);

        // Parse images for the response since we selected it
        const parsedSuggestions = suggestions.map(item => ({
            ...item,
            images: JSON.parse(item.images) as string[],
        }));

        return NextResponse.json(parsedSuggestions);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 });
    }
}
