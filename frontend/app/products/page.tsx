import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilter } from '@/components/products/ProductFilter';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { fetchProducts, fetchCategories } from '@/services/api';
import { IProduct } from '@/types/product';
import { Suspense } from 'react';

export default async function ProductsPage({ searchParams }: {
  searchParams?: { [key: string]: string | string | undefined };
}) {
  const search = searchParams?.search as string | undefined;
  const category = searchParams?.category as string | undefined;
  const sort = searchParams?.sort as string | undefined;

  const [productsData, categoriesData] = await Promise.all([
    fetchProducts({ search, category, sort }).catch((err: unknown) => {
      console.error('Failed to fetch products:', err);
      return { products: [], total: 0, error: 'Failed to load products. Please try again later.' };
    }),
    fetchCategories().catch((err: unknown) => {
      console.error('Failed to fetch categories:', err);
      return { categories: ['Servers', 'Storage', 'Networking', 'Components', 'Accessories'], error: 'Failed to load categories.' };
    })
  ]);

  // Type guard to check for error property
  function hasError<T>(obj: T | (T & { error: string })): obj is T & { error: string } {
    return typeof obj === 'object' && obj !== null && 'error' in obj;
  }

  // Handle potential errors from fetching
  if (hasError(productsData)) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        {/* Render filter even on error */}
        <ProductFilter
          categories={hasError(categoriesData) ? [] : categoriesData.categories}
          initialSearch={search}
          initialCategory={category}
          initialSort={sort}
        />
        <div className="mt-8">
          <ErrorMessage message={productsData.error} />
        </div>
      </div>
    );
  }

  // If categories fetch failed, log it but continue with fallback
  if (hasError(categoriesData)) {
    console.warn(categoriesData.error);
    // Use fallback categories if fetch failed
    const fallbackCategories = ['Servers', 'Storage', 'Networking', 'Components', 'Accessories'];
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <ProductFilter
          categories={fallbackCategories}
          initialSearch={search}
          initialCategory={category}
          initialSort={sort}
        />
        <div className="mt-8">
          {productsData.products.length > 0 ? (
            <ProductGrid products={productsData.products} />
          ) : (
            <p className="text-center text-muted-foreground">No products found matching your criteria.</p>
          )}
        </div>
      </div>
    );
  }

  // If both fetches were successful
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <ProductFilter
        categories={categoriesData.categories} // Now known to not have error
        initialSearch={search}
        initialCategory={category}
        initialSort={sort}
      />
      <div className="mt-8">
        {productsData.products.length > 0 ? (
          <ProductGrid products={productsData.products} /> // Now known to not have error
        ) : (
          <p className="text-center text-muted-foreground">No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
} 