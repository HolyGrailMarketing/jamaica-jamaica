import { Suspense } from 'react';
import { listingsRepository, parseListingJson } from '@/lib/repositories/listings';
import { ListingCard } from '@/components/features/ListingCard';
import { FilterSidebar } from '@/components/features/FilterSidebar';
import { SortSelect } from '@/components/features/SortSelect';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Map } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 12;

interface BrowsePageProps {
  searchParams: Promise<{
    category?: string;
    parish?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
    sort?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const offset = (page - 1) * ITEMS_PER_PAGE;

  // Build filters
  const filters: any = {};
  if (params.category && params.category !== 'all') {
    filters.category = params.category.toUpperCase();
  }
  if (params.parish && params.parish !== 'all') {
    filters.parish = params.parish;
  }
  if (params.minPrice) {
    filters.minPrice = parseInt(params.minPrice);
  }
  if (params.maxPrice) {
    filters.maxPrice = parseInt(params.maxPrice);
  }
  if (params.minRating) {
    filters.minRating = parseFloat(params.minRating);
  }
  if (params.q) {
    filters.search = params.q;
  }

  // Build sort
  let sort: any = undefined;
  if (params.sort === 'rating') {
    sort = { field: 'rating', direction: 'desc' };
  } else if (params.sort === 'price_asc') {
    sort = { field: 'priceFrom', direction: 'asc' };
  } else if (params.sort === 'price_desc') {
    sort = { field: 'priceFrom', direction: 'desc' };
  }

  const [listings, total, parishes] = await Promise.all([
    listingsRepository.getAll(filters, sort, ITEMS_PER_PAGE, offset),
    listingsRepository.count(filters),
    listingsRepository.getParishes(),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const parsedListings = listings.map(parseListingJson);

  // Build URL params for pagination
  const buildPageUrl = (pageNum: number) => {
    const p = new URLSearchParams();
    if (params.category) p.set('category', params.category);
    if (params.parish) p.set('parish', params.parish);
    if (params.minPrice) p.set('minPrice', params.minPrice);
    if (params.maxPrice) p.set('maxPrice', params.maxPrice);
    if (params.minRating) p.set('minRating', params.minRating);
    if (params.sort) p.set('sort', params.sort);
    if (params.q) p.set('q', params.q);
    p.set('page', String(pageNum));
    return `/browse?${p.toString()}`;
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <Suspense fallback={<div>Loading filters...</div>}>
            <FilterSidebar parishes={parishes} />
          </Suspense>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {params.q ? `Results for "${params.q}"` : 'Explore Jamaica'}
              </h1>
              <p className="text-muted-foreground">
                {total} listing{total !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="hidden sm:flex items-center gap-2" asChild>
                <Link href="/browse/map">
                  <Map className="w-4 h-4" />
                  Map View
                </Link>
              </Button>
              <SortSelect currentSort={params.sort} />
            </div>
          </div>

          {parsedListings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {parsedListings.map((listing, index) => (
                  <ListingCard key={listing.id} listing={listing} showDistance index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {page > 1 && (
                    <Button variant="outline" asChild>
                      <Link href={buildPageUrl(page - 1)}>Previous</Link>
                    </Button>
                  )}

                  <span className="flex items-center px-4 text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>

                  {page < totalPages && (
                    <Button variant="outline" asChild>
                      <Link href={buildPageUrl(page + 1)}>Next</Link>
                    </Button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
              <Button variant="outline" asChild>
                <Link href="/browse">Clear all filters</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
