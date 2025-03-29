'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { debounce } from '@/lib/utils';

interface ProductFilterProps {
  categories: string[];
  initialSearch?: string;
  initialCategory?: string;
  initialSort?: string;
}

export function ProductFilter({
  categories,
  initialSearch = '',
  initialCategory = '',
  initialSort = ''
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);

  const updateSearchParams = useCallback((newFilters: {
    search?: string;
    category?: string;
    sort?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newFilters.search) {
      params.set('search', newFilters.search);
    } else {
      params.delete('search');
    }
    if (newFilters.category) {
      params.set('category', newFilters.category);
    } else {
      params.delete('category');
    }
    if (newFilters.sort) {
      params.set('sort', newFilters.sort);
    } else {
      params.delete('sort');
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const debouncedUpdate = useCallback(
    debounce((value: string) => {
      updateSearchParams({ search: value, category, sort });
    }, 300),
    [category, sort, updateSearchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedUpdate(value);
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value === 'all' ? '' : value;
    setCategory(newCategory);
    updateSearchParams({ search, category: newCategory, sort });
  };

  const handleSortChange = (value: string) => {
    const newSort = value === 'default' ? '' : value;
    setSort(newSort);
    updateSearchParams({ search, category, sort: newSort });
  };

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || '');
    setSort(searchParams.get('sort') || '');
  }, [searchParams]);

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
      />
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select value={category || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort || 'default'} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="name_asc">Name: A to Z</SelectItem>
            <SelectItem value="name_desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 