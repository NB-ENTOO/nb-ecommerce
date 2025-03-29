import mongoose, { Document, Schema } from 'mongoose';

// Product series interface
interface IProductSeries {
  name: string;
  generation: string;
  description: string;
}

// Technical specification interface
interface ITechnicalSpec {
  key: string;
  value: string;
  unit?: string;
  category: string; // Group specs by category (e.g., 'Processor', 'Memory', 'Storage')
  sortOrder: number;
}

// Configuration option interface
interface IConfigurationOption {
  name: string;
  required: boolean;
  sortOrder: number;
  options: Array<{
    value: string;
    price: number;
    description?: string;
    stock: number;
    sku: string;
  }>;
}

// Price interface for different currencies
interface IPrice {
  amount: number;
  currency: 'USD' | 'GBP' | 'EUR';
}

// Shipping dimensions
interface IShippingDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'mm' | 'cm' | 'in';
}

// Weight information
interface IWeight {
  value: number;
  unit: 'kg' | 'g' | 'lbs';
}

// Warranty interface
interface IWarranty {
  duration: number;
  unit: 'days' | 'months' | 'years';
  description: string;
  type: 'standard' | 'premium' | 'onsite';
  upgradeable: boolean;
  upgradeOptions?: Array<{
    duration: number;
    unit: 'days' | 'months' | 'years';
    type: 'standard' | 'premium' | 'onsite';
    price: IPrice[];
  }>;
}

// Product interface
export interface IProduct extends Document {
  name: string;
  sku: string;
  description: string;
  shortDescription: string;
  prices: IPrice[];
  category: mongoose.Types.ObjectId;
  subcategories: mongoose.Types.ObjectId[];
  brand: string;
  series?: IProductSeries;
  productModel: string;
  images: {
    url: string;
    alt: string;
    sortOrder: number;
  }[];
  stock: number;
  specifications: ITechnicalSpec[];
  configurationOptions: IConfigurationOption[];
  features: string[];
  dimensions: IShippingDimensions;
  weight: IWeight;
  warranty: IWarranty;
  status: 'active' | 'inactive' | 'discontinued';
  condition: 'new' | 'refurbished' | 'used';
  availability: {
    inStock: boolean;
    leadTime: number;
    nextAvailableDate?: Date;
    preOrder: boolean;
  };
  shipping: {
    eligible: boolean;
    restrictions?: string[];
    dimensions: IShippingDimensions;
    weight: IWeight;
    freeShipping: boolean;
    internationalShipping: boolean;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
  };
  relatedProducts: mongoose.Types.ObjectId[];
  compatibleWith: mongoose.Types.ObjectId[];
  certifications: string[];
  reviews: {
    rating: number;
    count: number;
  };
  priceMatch: {
    eligible: boolean;
    terms?: string;
  };
  customization: {
    configurable: boolean;
    basePrice: IPrice[];
    buildTime: number; // in hours
    customOptions?: {
      category: string;
      required: boolean;
      options: Array<{
        name: string;
        price: IPrice[];
        stock: number;
      }>;
    }[];
  };
  support: {
    includedHours: number;
    type: 'basic' | 'premium' | '24x7';
    upgradeOptions?: Array<{
      type: 'basic' | 'premium' | '24x7';
      hours: number;
      price: IPrice[];
    }>;
  };
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    sku: {
      type: String,
      required: [true, 'Please provide a SKU'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    prices: [{
      amount: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number'],
      },
      currency: {
        type: String,
        required: true,
        enum: ['USD', 'GBP', 'EUR'],
      },
    }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please provide a product category'],
    },
    subcategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    }],
    brand: {
      type: String,
      required: [true, 'Please provide a brand name'],
      trim: true,
    },
    series: {
      name: String,
      generation: String,
      description: String,
    },
    productModel: {
      type: String,
      required: [true, 'Please provide a model number'],
      trim: true,
    },
    images: [{
      url: {
        type: String,
        required: true,
      },
      alt: String,
      sortOrder: {
        type: Number,
        default: 0,
      },
    }],
    stock: {
      type: Number,
      required: [true, 'Please provide stock information'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    specifications: [{
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      unit: String,
      category: {
        type: String,
        required: true,
      },
      sortOrder: {
        type: Number,
        default: 0,
      },
    }],
    configurationOptions: [{
      name: {
        type: String,
        required: true,
      },
      required: {
        type: Boolean,
        default: false,
      },
      sortOrder: {
        type: Number,
        default: 0,
      },
      options: [{
        value: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: [0, 'Price must be a positive number'],
        },
        description: String,
        stock: {
          type: Number,
          required: true,
          min: [0, 'Stock cannot be negative'],
        },
        sku: {
          type: String,
          required: true,
        },
      }],
    }],
    features: [{
      type: String,
      required: true,
    }],
    dimensions: {
      length: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
        enum: ['mm', 'cm', 'in'],
        default: 'mm',
      },
    },
    weight: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
        enum: ['kg', 'g', 'lbs'],
        default: 'kg',
      },
    },
    warranty: {
      duration: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
        enum: ['days', 'months', 'years'],
        default: 'years',
      },
      description: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ['standard', 'premium', 'onsite'],
        default: 'standard',
      },
      upgradeable: {
        type: Boolean,
        default: false,
      },
      upgradeOptions: [{
        duration: Number,
        unit: {
          type: String,
          enum: ['days', 'months', 'years'],
        },
        type: {
          type: String,
          enum: ['standard', 'premium', 'onsite'],
        },
        price: [{
          amount: Number,
          currency: {
            type: String,
            enum: ['USD', 'GBP', 'EUR'],
          },
        }],
      }],
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'discontinued'],
      default: 'active',
    },
    condition: {
      type: String,
      required: true,
      enum: ['new', 'refurbished', 'used'],
      default: 'new',
    },
    availability: {
      inStock: {
        type: Boolean,
        required: true,
        default: false,
      },
      leadTime: {
        type: Number,
        default: 0,
      },
      nextAvailableDate: Date,
      preOrder: {
        type: Boolean,
        default: false,
      },
    },
    shipping: {
      eligible: {
        type: Boolean,
        required: true,
        default: true,
      },
      restrictions: [String],
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: {
          type: String,
          enum: ['mm', 'cm', 'in'],
          default: 'mm',
        },
      },
      weight: {
        value: Number,
        unit: {
          type: String,
          enum: ['kg', 'g', 'lbs'],
          default: 'kg',
        },
      },
      freeShipping: {
        type: Boolean,
        default: false,
      },
      internationalShipping: {
        type: Boolean,
        default: true,
      },
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
      slug: {
        type: String,
        unique: true,
      },
    },
    relatedProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }],
    compatibleWith: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }],
    certifications: [String],
    reviews: {
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    priceMatch: {
      eligible: {
        type: Boolean,
        default: true,
      },
      terms: String,
    },
    customization: {
      configurable: {
        type: Boolean,
        default: false,
      },
      basePrice: [{
        amount: Number,
        currency: {
          type: String,
          enum: ['USD', 'GBP', 'EUR'],
        },
      }],
      buildTime: {
        type: Number,
        default: 24,
      },
      customOptions: [{
        category: String,
        required: Boolean,
        options: [{
          name: String,
          price: [{
            amount: Number,
            currency: {
              type: String,
              enum: ['USD', 'GBP', 'EUR'],
            },
          }],
          stock: Number,
        }],
      }],
    },
    support: {
      includedHours: {
        type: Number,
        default: 0,
      },
      type: {
        type: String,
        enum: ['basic', 'premium', '24x7'],
        default: 'basic',
      },
      upgradeOptions: [{
        type: {
          type: String,
          enum: ['basic', 'premium', '24x7'],
        },
        hours: Number,
        price: [{
          amount: Number,
          currency: {
            type: String,
            enum: ['USD', 'GBP', 'EUR'],
          },
        }],
      }],
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create indexes for better query performance
productSchema.index({ name: 'text', description: 'text', brand: 'text', productModel: 'text' });
productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ subcategories: 1 });
productSchema.index({ status: 1 });
productSchema.index({ 'prices.amount': 1 });
productSchema.index({ 'series.generation': 1 });
productSchema.index({ condition: 1 });
productSchema.index({ 'availability.inStock': 1 });
productSchema.index({ 'seo.slug': 1 });

export default mongoose.model<IProduct>('Product', productSchema); 