# E-commerce Website Replication - System Patterns and Architecture

## Implemented Architecture

The tech server solutions website follows a modern web application architecture with these implemented components:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Next.js        │     │  Express        │     │    MongoDB      │
│  Frontend       │◄────┤     Backend     │◄────┤                 │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Implemented Technical Patterns

### Frontend Architecture
- Next.js 13+ App Router for page organization and routing
- Component-based UI architecture with React functional components
- Responsive design implementation using Tailwind CSS
- React hooks (useState, useEffect) for state management
- Layout component pattern for consistent page structure
- Mock data for development and testing

### Backend Architecture
- RESTful API design with Express.js
- MongoDB with Mongoose for data modeling and access
- Controller-based architecture for request handling
- Route organization by resource type
- Environment-based configuration with dotenv

### Database Design
- Mongoose schemas for data modeling
- Product model with comprehensive fields for server equipment
- Timestamped documents for tracking creation and updates
- Validation rules embedded in schemas

### Containerization Strategy
- Docker-based development environment with docker-compose
- Separate containers for frontend, backend, and MongoDB
- Volume mapping for code sync during development
- Environment variable management for configuration

### Component Library
- Layout components (Navbar, Footer, Layout)
- Page-specific components organized by feature
- Lucide React for consistent icon system
- Tailwind CSS for styling with utility classes
- Mobile-first responsive design approach

## Implementation Guidelines (Applied)
- Responsive design with mobile-first approach
- Component reusability across pages
- State management with React hooks
- Form handling with controlled components
- PDF generation for server configurations
- Direct email system for sending configurations to sales
- Clean separation between UI and business logic
- TypeScript for type safety and better developer experience

## Page Structure
- **Layout**: Common structure with Navbar and Footer
- **Home**: Hero section, featured categories, featured products
- **Products**: Filtering sidebar, product grid, sorting options
- **Product Detail**: Image, info, specs, related products
- **Server Configuration**: Configuration interface, PDF generation, contact form

## Data Flow Patterns
- API requests for data fetching
- Form state management for user input
- Local state for UI interactions
- Conditional rendering based on state
- Mock data for development and testing
- Error handling for API failures

## Business Model Flow
```
┌──────────────┐     ┌─────────────────┐     ┌───────────────────┐
│  Customer    │     │  Configuration   │     │   PDF Generation  │
│  Browses     │────►│  & Customization │────►│   & Direct Email  │
│  Products    │     │                  │     │                   │
└──────────────┘     └─────────────────┘     └───────────────────┘
                                                       │
                                                       ▼
┌──────────────┐     ┌─────────────────┐     ┌───────────────────┐
│  Sales Team  │     │  Customer       │     │   Configuration    │
│  Contact     │◄────│  Details        │◄────│   Submission       │
│              │     │                  │     │                   │
└──────────────┘     └─────────────────┘     └───────────────────┘
```

## State Management Approach
- React hooks for component-level state
- useState for simple state management
- useEffect for side effects and data fetching
- Props for component communication
- Form state for user input
- Local component state for UI interactions

## Website Structure

### Navigation System
- **Main Navigation:** 
  - Tech-focused mega menu with categories: Servers, Storage, Networking, Components
  - Secondary navigation for Corporate sections: About, Support, Configure Online
- **Footer Navigation:**
  - Four-column layout with tech categories, corporate info, support, and contact
  - Social media links and newsletter signup
  - Copyright and terms

### Page Types
- Home page
- Category listing pages for server equipment
- Product detail pages with technical specifications
- Server configuration page
- Corporate information pages
- Configuration submission page with PDF generation
- Search results page

## UI Component Architecture

### Base Components
We use Radix UI primitives for accessible, unstyled components that we then customize with Tailwind CSS:

1. **Button**
   - Uses Radix UI Slot for polymorphic behavior
   - Supports `asChild` prop for rendering as different elements
   - Consistent styling with hover and focus states

2. **LoadingSpinner**
   - Three size variants: sm, default, lg
   - Accessible with proper ARIA attributes
   - Customizable with className prop

3. **ErrorMessage**
   - Consistent error presentation
   - Uses AlertCircle icon from Lucide
   - Accessible with proper role="alert"

4. **Form Controls**
   - Slider: Range selection with dual thumbs
   - Checkbox: Accessible with proper keyboard navigation
   - Label: Associated with form controls via htmlFor

### Product Components

1. **ProductGrid**
   - Responsive grid layout
   - Image optimization with Next.js Image
   - Consistent card layout for products

2. **ProductFilter**
   - Category selection with checkboxes
   - Price range selection with slider
   - Stock status filtering
   - Reset functionality

## State Management

### Local State
- Using React's useState for component-level state
- Filter state managed in parent component
- Loading and error states for async operations

### Data Flow
- Top-down props passing
- Event handlers for state updates
- Filter changes trigger immediate UI updates

## Styling Patterns

### Tailwind CSS Usage
- Consistent spacing with margin/padding utilities
- Responsive design with breakpoint prefixes
- Component-specific variants with cn utility

### Component Classes
- BEM-like structure with Tailwind
- Consistent naming conventions
- Reusable utility classes

## Error Handling

### UI Error States
- Dedicated ErrorMessage component
- Consistent error presentation
- Clear error messages for users

### Loading States
- Consistent loading indicators
- Size variants for different contexts
- Accessible loading states

## Accessibility Patterns

### ARIA Attributes
- Proper roles for interactive elements
- State indicators for loading/error
- Keyboard navigation support

### Focus Management
- Visible focus indicators
- Proper tab order
- Focus trapping where needed

## Image Handling

### Next.js Image Component
- Automatic optimization
- Lazy loading
- Proper aspect ratio maintenance

## Responsive Design

### Grid System
- Mobile-first approach
- Responsive breakpoints
- Consistent spacing

### Component Layout
- Flexible containers
- Adaptive sizing
- Consistent margins/padding

## Code Organization

### Component Structure
- Consistent file naming
- Clear interface definitions
- Proper type exports

### Directory Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Button.tsx
│   │   │   └── ...
│   │   └── products/
│   │       ├── ProductGrid.tsx
│   │       └── ProductFilter.tsx
│   └── lib/
│       └── utils.ts
└── app/
    └── products/
        └── page.tsx
```

## Future Considerations

### Performance
- Implement virtualization for large lists
- Add pagination for product grid
- Optimize image loading

### State Management
- Consider global state for filters
- Implement URL-based filtering
- Add sorting functionality

### API Integration
- Add proper error boundaries
- Implement retry logic
- Add loading skeletons

## Architecture Overview

### Core Components

- **Frontend**: Next.js application with React components
  - App Router architecture for page routing
  - Component-based UI structure
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Custom hooks for state management
  - Responsive design using CSS media queries

- **Backend**: Express.js REST API
  - Controller-based architecture
  - Mongoose for MongoDB interaction
  - Route-specific middleware pattern
  - Service layer for business logic
  - Model-driven database schema

- **Database**: MongoDB
  - Document-based NoSQL structure
  - Product schema with nested specifications
  - Configuration model with compatibility rules
  - Seeding scripts for development data
  - Backup and restore procedures

- **Admin Panel**: Secure management interface
  - Separate authentication system
  - Product management capabilities
  - Bulk import functionality
  - User management for administrators
  - Activity logging for audit trail

- **Infrastructure**: Docker containerization
  - Multi-container architecture with Docker Compose
  - Volume mounting for persistence
  - Environment variable configuration
  - Container health checks
  - Production vs development configurations
  - Network configuration between containers

## Technical Patterns

### Frontend Architecture

1. **Component Structure**
   - Layout components for structural elements
   - UI components for reusable interface elements
   - Page components for specific routes
   - Container components for state management
   - Presentational components for UI rendering
   - Admin components for management interface

2. **State Management**
   - React hooks for local state
   - Context API for global state
   - Custom hooks for shared logic
   - Form state with controlled components
   - Server configuration state management
   - Admin state for product management

3. **Routing**
   - Next.js App Router for page organization
   - Dynamic routes for product pages
   - Middleware for request processing
   - Layouts for consistent page structure
   - Loading states for data fetching
   - Protected routes for admin panel

### Backend Architecture

1. **API Structure**
   - RESTful endpoints organized by resource
   - Controllers for request handling
   - Models for data representation
   - Services for business logic
   - Middleware for cross-cutting concerns
   - Admin-specific endpoints with authentication

2. **Database Integration**
   - MongoDB with Mongoose ODM
   - Schema-based models
   - Indexing for performance
   - Validation middleware
   - Query optimization techniques
   - Seeding mechanism for development data
   - Bulk import functionality for product data

3. **Data Flow**
   - Request validation
   - Controller processing
   - Service layer business logic
   - Repository pattern for data access
   - Response formatting
   - Authentication middleware for admin routes

### Database Design

1. **MongoDB Collections**
   - Products: Server products and components
   - Categories: Product categorization hierarchy
   - Configurations: Server configuration combinations
   - Compatibility: Component compatibility rules
   - Media: Product images and documents
   - Admins: Administrative user accounts
   - ActivityLogs: Admin action audit trail

2. **Key Schema Patterns**
   - Embedding for related data that's queried together
   - Referencing for shared data across documents
   - Array fields for multiple values
   - Object fields for structured data
   - Indexing for frequently queried fields
   - Versioning for tracking data changes

3. **Database Seeding Strategy**
   - JSON-based seed data files
   - Seeding scripts run during initialization
   - Development vs production data sets
   - Compatibility validation during seeding
   - Realistic data model for testing

### Admin Panel Architecture

### Overview
The admin panel is structured as a separate section within the Next.js application, using a dedicated layout and navigation system specifically for administrative functions. It follows a modular pattern with consistent UI components and hierarchical organization.

### Admin Route Structure
```
/admin                     # Dashboard home
/admin/products            # Product management
/admin/products/[id]       # Product editing
/admin/products/new        # Create new product
/admin/products/import     # Bulk import
/admin/categories          # Category management
/admin/categories/[id]     # Category editing
/admin/users               # User management (planned)
/admin/settings            # System settings (planned)
```

### Component Architecture
- `AdminLayout`: Core wrapper component providing consistent layout with:
  - Responsive sidebar navigation with collapsible menu
  - Admin header with search, notifications, and user info
  - Consistent page container with appropriate padding
  - Mobile-friendly design with collapsible sidebar
  
- `Dashboard`: Overview component with:
  - Statistics cards displaying key metrics
  - Recent activity feed with status indicators
  - System alerts section
  - Quick action links
  
- `ProductsPage`: Product management component with:
  - Search functionality with debounced input
  - Category filtering with multi-select
  - Sortable product table with column customization
  - Action buttons for edit, delete operations
  - Pagination controls
  
- `ProductEditPage`: Product editing component with:
  - Comprehensive form with multiple sections
  - Dynamic specification fields with add/remove capability
  - Configurable options management
  - Form validation and error handling
  - Save, delete, and cancel actions
  
- `CategoriesPage`: Category management component with:
  - Hierarchical category display with collapsible sections
  - Category search functionality
  - Add, edit, and delete actions
  - Visual indication of category hierarchy

### State Management Pattern
- Each page component manages its own local state using React hooks
- Search inputs use debounced state updates to prevent excessive renders
- Form inputs use controlled components with onChange handlers
- Complex forms use structured state objects that mirror the data model
- Multi-step processes use finite state machines with clear state transitions

### Form Management Pattern
- Controlled inputs with state management
- Field-level validation with error messages
- Dynamic form sections that can be added/removed
- Structured form state that mirrors the backend data model
- Form submission handling with loading states
- Consistent error reporting

### Navigation Pattern
- Hierarchical navigation with main sections and subsections
- Visual indication of current location
- Mobile-responsive design with hamburger menu
- Persistent sidebar with collapsible sections on desktop
- Breadcrumb navigation for deep paths

### Authentication Pattern (Planned)
- Role-based access control for admin routes
- JWT integration with NextAuth
- Protected route middleware
- Session management with secure storage
- Authentication state context provider
- Login page with credentials and error handling

### Data Fetching Pattern (Planned)
- Server-side data fetching for initial page load
- Client-side fetching for dynamic updates
- Loading states during data fetching
- Error handling with user feedback
- Data caching for frequently accessed information
- Optimistic UI updates for better user experience

## Admin UI Component Library

### Core Components
- `StatCard`: Displays key metric with icon, value, and label
- `RecentActivity`: Shows recent system actions with timestamps
- `SystemAlert`: Displays system notifications with severity levels
- `AdminTable`: Reusable table component with sorting and filtering
- `SearchBar`: Input with debounced search and clear button
- `CategoryFilter`: Multi-select filter for categories
- `ActionButton`: Styled button with icon for common actions
- `PageHeader`: Consistent page header with title and actions
- `SectionContainer`: Wrapper for logical page sections

### Form Components
- `FormSection`: Grouping container for related form fields
- `InputField`: Text input with label and error handling
- `SelectField`: Dropdown select with options
- `TextareaField`: Multi-line text input
- `DynamicFieldArray`: Component for managing arrays of inputs
- `ImageUpload`: Component for uploading and previewing images (planned)

### Admin Panel Styling Pattern
- Consistent color scheme for admin interface
- Clear visual hierarchy with typography scaling
- Card-based layout for content organization
- Responsive design with mobile-first approach
- Accessibility considerations for form elements
- Clear visual feedback for interactive elements
- Loading states for asynchronous operations

## Business Model Flow

1. **Server Product Discovery**
   - Homepage with featured servers
   - Category navigation
   - Search functionality
   - Filtering options
   - Detailed product pages

2. **Server Configuration Process**
   - Component selection
   - Compatibility checking
   - Price calculation
   - Configuration summary
   - PDF generation
   - Contact information collection
   - Email submission

3. **Admin Product Management**
   - Secure admin login
   - Product catalog management
   - Individual product creation/editing
   - Bulk product import from CSV/JSON
   - Category management
   - Product availability control
   - Image management for products

## Data Flow Patterns

1. **Product Data Flow**
   - Database → Backend API → Frontend → UI components
   - Category filtering → Product listing → Product details
   - Search query → Backend search → Filtered results
   - Admin panel → Product creation → Database storage

2. **Configuration Data Flow**
   - Component selection → Compatibility validation → Configuration summary
   - Configuration data → PDF generation → Email system
   - Contact information → Email delivery → Sales team

3. **Admin Data Flow**
   - Admin credentials → Authentication → JWT token
   - Product form → Validation → Database operation
   - CSV/JSON upload → Parsing → Validation → Batch insert
   - Admin action → Logging → Audit trail storage

## Website Structure

1. **Navigation System**
   - Primary navigation (top)
   - Category navigation (mega menu)
   - Footer navigation
   - Breadcrumb navigation
   - Mobile navigation (hamburger menu)
   - Admin navigation (sidebar)

2. **Page Types**
   - Homepage with hero and featured sections
   - Product listing with filtering
   - Product detail with specifications
   - Server configuration page
   - Information pages (About, Support, etc.)
   - Admin dashboard
   - Admin product management pages
   - Admin import tool pages

3. **UI Component Architecture**
   - Header component
   - Navigation components
   - Hero component
   - Product grid component
   - Product card component
   - Specification table component
   - Configuration form component
   - Footer component
   - Admin layout component
   - Product management forms
   - Import tool components

## ConfigurationBuilder Refactoring

- **Component:** `frontend/components/products/ConfigurationBuilder.tsx`
- **Refactoring Approach:** Utilized `useReducer` hook to centralize state management for selected options, currency, total price, and validation errors.
- **Type Alignment:** Strictly aligned the component logic, state, props, and helper functions with the structure defined in `frontend/types/product.ts` (`IProduct` interface).
- **Removed Features:** Due to type constraints in `IProduct`, the following features were removed from the component:
    - Calculation and display of estimated build time.
    - UI and logic for selecting warranty upgrades.
    - UI and logic for selecting support upgrades.
- **Price Calculation:** Simplified to use `product.prices.base` and apply `priceModifier` from selected configuration options.
- **Validation:** Basic validation for required options is implemented using a helper function (`validateConfigurationInternal`).
