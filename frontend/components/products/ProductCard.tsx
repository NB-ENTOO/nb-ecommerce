import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PriceDisplay } from '@/components/ui/PriceDisplay';

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden">
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-square">
          <Image
            src={product.images[0] || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.stock === 0 && (
            <Badge
              variant="destructive"
              className="absolute right-2 top-2"
            >
              Out of Stock
            </Badge>
          )}
          {product.prices.discounted && (
            <Badge
              variant="success"
              className="absolute left-2 top-2"
            >
              Sale
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link
          href={`/products/${product._id}`}
          className="block hover:underline"
        >
          <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
        </Link>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full flex-col gap-2">
          <PriceDisplay
            price={product.prices.base}
            currency={product.prices.currency}
            discountedPrice={product.prices.discounted}
          />
          <div className="flex gap-2">
            <Link href={`/products/${product._id}`}>
              <Button className="flex-1">
                View Details
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex-1"
              disabled={product.stock === 0}
            >
              Configure
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
} 