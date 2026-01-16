'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function SortSelect({ currentSort }: { currentSort?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-muted-foreground whitespace-nowrap">
        Sort by:
      </label>
      <select
        id="sort"
        name="sort"
        defaultValue={currentSort || 'recommended'}
        className="text-sm font-medium bg-background border rounded-md px-3 py-1.5 focus:ring-2 focus:ring-primary"
        onChange={handleChange}
      >
        <option value="recommended">Recommended</option>
        <option value="rating">Highest Rated</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}
