'use client';

import React from 'react';
import { IProduct } from '@/types/product';
import ConfigurationBuilder from '@/components/products/ConfigurationBuilder';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PriceDisplay from '@/components/common/PriceDisplay';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import Link from 'next/link';

interface ProductDetailProps {
  params: {
    id: string;
  };
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

// This would normally come from an API call
const sampleProduct: IProduct = {
  _id: '1',
  name: 'Dell PowerEdge R740',
  sku: 'PE-R740-01',
  description: 'Enterprise-class 2U rack server designed for complex workloads',
  shortDescription: 'Powerful 2U rack server for enterprise workloads',
  prices: [
    { amount: 2499.99, currency: 'USD' },
    { amount: 1999.99, currency: 'GBP' },
    { amount: 2299.99, currency: 'EUR' },
  ],
  category: 'Servers',
  subcategories: ['Rack Servers', '2U Servers'],
  brand: 'Dell',
  productModel: 'PowerEdge R740',
  series: {
    name: 'PowerEdge',
    generation: '14th',
    releaseDate: new Date('2023-01-01'),
  },
  images: [
    {
      url: '/images/servers/r740-front.jpg',
      alt: 'Dell PowerEdge R740 Front View',
      isFeatured: true,
    },
    {
      url: '/images/servers/r740-rear.jpg',
      alt: 'Dell PowerEdge R740 Rear View',
    },
  ],
  stock: 10,
  specifications: [
    {
      category: 'Processor',
      key: 'CPU Model',
      value: 'Intel Xeon Silver 4310',
      sortOrder: 1,
    },
    {
      category: 'Processor',
      key: 'Core Count',
      value: '12',
      unit: 'cores',
      sortOrder: 2,
    },
    {
      category: 'Memory',
      key: 'RAM Type',
      value: 'DDR4 ECC',
      sortOrder: 1,
    },
    {
      category: 'Memory',
      key: 'Base Memory',
      value: '32',
      unit: 'GB',
      sortOrder: 2,
    },
  ],
  configurationOptions: [
    {
      name: 'Processor',
      description: 'Select your processor configuration',
      required: true,
      sortOrder: 1,
      options: [
        {
          value: 'Intel Xeon Silver 4310 (12C/24T)',
          description: '12 cores, 2.1GHz base, 3.3GHz turbo',
          price: 0,
          stock: 10,
        },
        {
          value: 'Intel Xeon Gold 6330 (28C/56T)',
          description: '28 cores, 2.0GHz base, 3.1GHz turbo',
          price: 1200,
          stock: 5,
        },
        {
          value: 'Intel Xeon Platinum 8380 (40C/80T)',
          description: '40 cores, 2.3GHz base, 3.4GHz turbo',
          price: 2500,
          stock: 2,
        },
      ],
    },
    {
      name: 'Memory',
      description: 'Select your memory configuration',
      required: true,
      sortOrder: 2,
      options: [
        {
          value: '32GB (2x16GB) DDR4-3200',
          description: 'Dual channel ECC memory',
          price: 0,
          stock: 15,
        },
        {
          value: '64GB (4x16GB) DDR4-3200',
          description: 'Quad channel ECC memory',
          price: 400,
          stock: 8,
        },
        {
          value: '128GB (4x32GB) DDR4-3200',
          description: 'Quad channel ECC memory',
          price: 900,
          stock: 4,
        },
      ],
    },
  ],
  features: [
    'Up to 2 Intel Xeon Scalable processors',
    'Up to 24 NVMe drives',
    'iDRAC9 with Lifecycle Controller',
    'Hot-plug power supplies',
  ],
  dimensions: {
    length: 750,
    width: 482,
    height: 87,
    unit: 'mm',
  },
  weight: {
    value: 21.9,
    unit: 'kg',
  },
  warranty: {
    duration: 3,
    unit: 'years',
    type: 'standard',
    description: 'Next Business Day On-Site Service',
    upgradeable: true,
    upgradeOptions: [
      {
        duration: 5,
        unit: 'years',
        type: 'premium',
        price: [
          { amount: 499.99, currency: 'USD' },
          { amount: 399.99, currency: 'GBP' },
          { amount: 449.99, currency: 'EUR' },
        ],
        description: '24/7 Support with 4-hour response time',
      },
    ],
  },
  support: {
    includedHours: 10,
    type: 'remote',
    description: 'Remote technical support during business hours',
    upgradeOptions: [
      {
        hours: 40,
        type: 'priority',
        price: [
          { amount: 299.99, currency: 'USD' },
          { amount: 249.99, currency: 'GBP' },
          { amount: 279.99, currency: 'EUR' },
        ],
        description: 'Priority support with dedicated technical account manager',
      },
    ],
  },
  customization: {
    buildTime: 48,
    buildToOrder: true,
    customizationNotes: 'Custom RAID configuration available upon request',
  },
  shipping: {
    international: true,
    restrictions: ['Some countries may have import restrictions'],
    leadTime: 5,
    freeShipping: true,
  },
  priceMatch: {
    eligible: true,
    terms: 'Price match available for identical configurations from authorized resellers',
  },
  relatedProducts: ['2', '3', '4'],
  certifications: ['CE', 'FCC', 'Energy Star'],
  reviews: {
    rating: 4.8,
    count: 125,
  },
  seo: {
    title: 'Dell PowerEdge R740 Server | Enterprise 2U Rack Server',
    description: 'Dell PowerEdge R740 - Enterprise-class 2U rack server with powerful performance and flexible configuration options.',
    keywords: ['Dell', 'PowerEdge', 'R740', 'Server', 'Rack Server', '2U'],
  },
  status: 'active',
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-03-15'),
};

export default function ProductPage({ params }: ProductDetailProps) {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    // In a real app, we would fetch from the API here
    // For now, we'll use a mock product
    setTimeout(() => {
      setProduct({
        id: params.id,
        name: `Product ${params.id}`,
        description: 'This is a detailed description of the product. It provides information about its features, specifications, and benefits. The product is designed to meet the needs of various customers and offers high quality and reliability.',
        price: 99.99,
        category: 'Electronics',
        imageUrl: '/product.jpg',
        stock: 10
      });
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToQuote = (configuration: any) => {
    console.log('Adding to quote:', configuration);
    // Here you would typically make an API call to add the configuration to the user's quote
  };

  if (loading) {
    return (
      <Layout>
        <div className="h-96 flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading product details...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="h-96 flex items-center justify-center">
          <div className="text-xl text-gray-600">Product not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images and Basic Info */}
          <div className="space-y-6">
            <div className="aspect-square relative overflow-hidden rounded-lg border">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {sampleProduct.images.map((image) => (
                <div
                  key={image.url}
                  className="aspect-square relative overflow-hidden rounded-lg border cursor-pointer"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            <Card className="p-6">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                {product.stock <= 5 && (
                  <Badge variant="warning">Low Stock</Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Starting at:</span>
                  <PriceDisplay
                    amount={product.price}
                    currency="USD"
                    className="text-2xl font-bold text-primary"
                  />
                </div>
                {sampleProduct.priceMatch.eligible && (
                  <Badge variant="outline">Price Match Available</Badge>
                )}
              </div>
            </Card>
          </div>

          {/* Configuration Builder */}
          <div>
            <ConfigurationBuilder
              product={sampleProduct}
              onAddToQuote={handleAddToQuote}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
} 