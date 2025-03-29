import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parent?: mongoose.Types.ObjectId;
  level: number;
  path: string[];
  children: mongoose.Types.ObjectId[];
  image?: string;
  icon?: string;
  isActive: boolean;
  sortOrder: number;
  metadata: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  specifications: Array<{
    name: string;
    type: 'text' | 'number' | 'boolean' | 'select';
    required: boolean;
    options?: string[];
    unit?: string;
  }>;
  filters: Array<{
    name: string;
    type: 'checkbox' | 'radio' | 'range';
    field: string;
    options?: Array<{
      label: string;
      value: string;
    }>;
  }>;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      trim: true,
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
    path: [{
      type: String,
      required: true,
    }],
    children: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    }],
    image: String,
    icon: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    metadata: {
      title: String,
      description: String,
      keywords: [String],
    },
    specifications: [{
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['text', 'number', 'boolean', 'select'],
        required: true,
      },
      required: {
        type: Boolean,
        default: false,
      },
      options: [String],
      unit: String,
    }],
    filters: [{
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['checkbox', 'radio', 'range'],
        required: true,
      },
      field: {
        type: String,
        required: true,
      },
      options: [{
        label: String,
        value: String,
      }],
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ parent: 1 });
categorySchema.index({ path: 1 });
categorySchema.index({ level: 1 });
categorySchema.index({ sortOrder: 1 });
categorySchema.index({ isActive: 1 });

// Pre-save middleware to generate path
categorySchema.pre('save', async function(next) {
  if (this.isModified('parent') || this.isModified('slug')) {
    if (!this.parent) {
      this.path = [this.slug];
      this.level = 0;
    } else {
      const parent = await mongoose.model('Category').findById(this.parent);
      if (parent) {
        this.path = [...parent.path, this.slug];
        this.level = parent.level + 1;
      }
    }
  }
  next();
});

export default mongoose.model<ICategory>('Category', categorySchema); 