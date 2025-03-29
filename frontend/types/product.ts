export interface IPrice {
  amount: number;
  currency: 'USD' | 'GBP' | 'EUR';
}

export interface IImage {
  url: string;
  alt: string;
  isFeatured?: boolean;
}

export interface IShippingDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'mm' | 'cm' | 'in';
}

export interface IWeight {
  value: number;
  unit: 'kg' | 'lbs';
}

export interface IWarrantyUpgrade {
  duration: number;
  unit: 'years' | 'months';
  type: string;
  price: IPrice[];
  description: string;
}

export interface IWarranty {
  duration: number;
  unit: 'years' | 'months';
  type: string;
  description: string;
  upgradeable: boolean;
  upgradeOptions?: IWarrantyUpgrade[];
}

export interface ISupportUpgrade {
  hours: number;
  type: string;
  price: IPrice[];
  description: string;
}

export interface ISupport {
  includedHours: number;
  type: string;
  description: string;
  upgradeOptions?: ISupportUpgrade[];
}

export interface IConfigurationOption {
  value: string;
  description: string;
  price: number;
  stock: number;
}

export interface IConfigurationGroup {
  name: string;
  description: string;
  required: boolean;
  sortOrder: number;
  options: IConfigurationOption[];
}

export interface ISpecification {
  category: string;
  key: string;
  value: string;
  unit?: string;
  sortOrder: number;
}

export interface IProductSeries {
  name: string;
  generation: string;
  releaseDate: Date;
}

export interface IDimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface ICustomization {
  buildTime: number;
  buildToOrder: boolean;
  customizationNotes?: string;
}

export interface IShipping {
  international: boolean;
  restrictions?: string[];
  leadTime: number;
  freeShipping: boolean;
}

export interface IPriceMatch {
  eligible: boolean;
  terms: string;
}

export interface IReviews {
  rating: number;
  count: number;
}

export interface ISEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  description: string;
  prices: {
    base: number;
    currency: string;
    discounted?: number;
  };
  category: string;
  images: string[];
  stock: number;
  specifications: {
    [key: string]: string | number | boolean;
  };
  configurationOptions: {
    [key: string]: {
      name: string;
      options: Array<{
        value: string;
        label: string;
        priceModifier: number;
      }>;
      required: boolean;
    };
  };
  features: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  weight: {
    value: number;
    unit: string;
  };
  warranty: {
    duration: number;
    type: string;
    description: string;
  };
  support: {
    type: string;
    level: string;
    description: string;
  };
  customization: {
    available: boolean;
    options?: string[];
  };
  shipping: {
    dimensions: {
      width: number;
      height: number;
      depth: number;
      unit: string;
    };
    weight: {
      value: number;
      unit: string;
    };
    method: string;
    estimatedDays: number;
  };
  priceMatch: boolean;
  relatedProducts: string[];
  certifications: string[];
  reviews: Array<{
    rating: number;
    comment: string;
    user: string;
    date: string;
  }>;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  status: 'active' | 'inactive' | 'discontinued';
  createdAt: string;
  updatedAt: string;
} 