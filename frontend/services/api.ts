import { IProduct } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchProducts(params?: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: IProduct[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
  }

  const response = await fetch(`${API_URL}/products?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function fetchProductById(id: string): Promise<IProduct> {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function createProduct(product: Omit<IProduct, '_id'>): Promise<IProduct> {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return response.json();
}

export async function updateProduct(id: string, product: Partial<IProduct>): Promise<IProduct> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
}

export async function submitConfiguration(configuration: {
  productId: string;
  options: Record<string, string>;
  totalPrice: number;
  currency: string;
  customerInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
}): Promise<{ id: string; estimatedDelivery: string }> {
  const response = await fetch(`${API_URL}/configurations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(configuration),
  });
  if (!response.ok) {
    throw new Error('Failed to submit configuration');
  }
  return response.json();
} 