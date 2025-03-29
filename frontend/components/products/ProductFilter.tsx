import { useCallback, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { debounce } from '@/lib/utils';

interface ProductFilterProps {
  onFilterChange: (filters: {
    search?: string;
    category?: string;
    sort?: string;
  }) => void;
  categories: string[];
}

export function ProductFilter({ onFilterChange, categories }: ProductFilterProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onFilterChange({ search: value, category, sort });
    }, 300),
    [category, sort, onFilterChange]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onFilterChange({ search, category: value, sort });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    onFilterChange({ search, category, sort: value });
  };

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
      />
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Default</SelectItem>
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