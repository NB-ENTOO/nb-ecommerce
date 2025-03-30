import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  filters: FilterState;
}

interface FilterState {
  category: string[];
  priceRange: [number, number];
  inStock: boolean;
}

const categories = [
  'Servers',
  'Storage',
  'Networking',
  'Components',
  'Accessories'
];

export function ProductFilter({ onFilterChange, filters }: FilterProps) {
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    
    onFilterChange({
      ...filters,
      category: newCategories
    });
  };

  const handlePriceChange = (value: [number, number]) => {
    onFilterChange({
      ...filters,
      priceRange: value
    });
  };

  const handleStockChange = (checked: boolean) => {
    onFilterChange({
      ...filters,
      inStock: checked
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.category.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Price Range</h3>
          <Slider
            defaultValue={filters.priceRange}
            max={10000}
            step={100}
            onValueChange={handlePriceChange}
          />
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={handleStockChange}
            />
            <Label htmlFor="inStock">In Stock Only</Label>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => onFilterChange({
            category: [],
            priceRange: [0, 10000],
            inStock: false
          })}
        >
          Reset Filters
        </Button>
      </div>
    </Card>
  );
} 