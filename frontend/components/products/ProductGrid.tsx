import { IProduct } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: IProduct[];
  className?: string;
}

export function ProductGrid({ products, className = '' }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <p className="text-lg text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
} 