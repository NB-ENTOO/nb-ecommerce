# NET-BRIDGE Server Solutions - Technical Context

## Technology Stack

### Frontend
- **Framework**: Next.js 13+ with App Router
- **UI Library**: React 18
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3.3+ with custom configuration
- **Icons**: Lucide React icons for consistent visual elements
- **Data Fetching**: Server components and API routes
- **State Management**: React hooks (useState, useContext, useEffect)
- **PDF Generation**: Client-side PDF library (jsPDF or similar)
- **Form Handling**: React hook form for validation and submission

### Backend
- **Runtime**: Node.js 18+
- **Server Framework**: Express 4.18+
- **API Design**: RESTful endpoints for product data and inquiry handling
- **Database Integration**: Mongoose ODM for MongoDB connectivity
- **Validation**: Express validator for request validation
- **Error Handling**: Centralized error middleware

### Database
- **Type**: MongoDB (Document-oriented NoSQL)
- **Schema Design**: Flexible product schema for server configurations
- **Relationships**: Referenced collections for related data
- **Indexing**: Performance optimization for frequent queries
- **Data Validation**: Schema-level validation with Mongoose

### Infrastructure
- **Containerization**: Docker for local development
- **Service Orchestration**: Docker Compose for multi-container management
- **Environment Management**: dotenv for configuration
- **Version Control**: Git with GitHub for collaboration
- **Local Development**: Hot reloading for frontend and backend

## Development Environment

### Local Setup
- Windows 10 (version 10.0.19045) development environment with WSL support
- Docker Desktop for Windows
- Node.js runtime
- Visual Studio Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Docker
  - MongoDB for VS Code

### Running the Application
```bash
# Clone the repository
git clone <repository-url>
cd server-solutions-platform

# Start the Docker containers
docker-compose up -d

# Access the application
Frontend: http://localhost:3000
Backend API: http://localhost:5000
MongoDB: mongodb://localhost:27017
```

## Architecture Overview

### Component Structure
```
frontend/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Homepage
│   ├── products/         # Product listing
│   │   ├── page.tsx
│   │   └── [id]/         # Product detail
│   │       └── page.tsx
│   ├── cart/             # Server configuration
│   │   └── page.tsx      # (PDF generation & email form)
│   ├── profile/          # User profile
│   │   └── page.tsx
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── layout/           # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── ui/               # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── product/          # Product components
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   └── ProductFilter.tsx
│   ├── cart/             # Configuration components
│   │   ├── ConfigItem.tsx
│   │   ├── ConfigSummary.tsx
│   │   ├── PDFGenerator.tsx
│   │   └── InquiryForm.tsx
│   └── profile/          # Profile components
│       ├── ProfileForm.tsx
│       └── AccountDetails.tsx
├── lib/                  # Utility functions
│   ├── api.ts            # API client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
├── public/               # Static assets
├── styles/               # Global styles
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── productController.ts
│   │   └── inquiryController.ts
│   ├── models/           # Database models
│   │   ├── Product.ts
│   │   └── Inquiry.ts
│   ├── routes/           # API routes
│   │   ├── productRoutes.ts
│   │   └── inquiryRoutes.ts
│   ├── middleware/       # Middleware functions
│   │   ├── error.ts
│   │   └── validation.ts
│   ├── utils/            # Utility functions
│   │   ├── logger.ts
│   │   └── email.ts
│   ├── config/           # Configuration
│   │   └── db.ts
│   └── server.ts         # Express application
├── .env                  # Environment variables
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## Data Flow

### Product Browsing
1. User navigates to product listing
2. Next.js server component fetches product data
3. Products are rendered with filtering options
4. User selects a product
5. Product detail page loads with specifications

### Server Configuration
1. User adds server configuration to cart
2. Configuration is stored in local state
3. User navigates to configuration page
4. User modifies quantities or specifications
5. Summary is updated with current configurations

### PDF Generation
1. User clicks "Generate PDF" button
2. Client-side PDF library creates document
3. Document includes configuration details
4. PDF is offered for download or preview
5. Configuration remains in state for modification

### Inquiry Submission
1. User completes contact information form
2. Form validation ensures complete data
3. User submits the form with configuration
4. Backend API receives inquiry data
5. Confirmation is shown to the user
6. Optional: Email notification sent to sales team

## Technical Design Patterns

### Server Components
Next.js 13 server components are used for initial data loading, improving performance and SEO. Client components handle interactive elements like the configuration tools and form submissions.

### Responsive Strategy
Tailwind CSS with custom breakpoints ensures responsive design:
- Mobile: Default styles (< 640px)
- Tablet: sm (640px) and md (768px) 
- Desktop: lg (1024px) and xl (1280px)
- Large Desktop: 2xl (1536px)

### State Management
React hooks manage local component state, while context providers handle shared state for:
- Configuration items
- Form data
- UI state (modals, drawers, etc.)

### API Integration
Backend API endpoints are accessed through service modules that:
- Handle request formatting
- Process responses
- Manage errors
- Cache results where appropriate

### PDF Generation
Client-side PDF generation implements:
- Company branding with logo and colors
- Structured layout for configuration details
- Tabular format for specifications
- Pricing information with subtotals
- Contact information for follow-up

### Form Validation
React Hook Form provides:
- Field-level validation
- Form state management
- Error messaging
- Submission handling
- State persistence

## Testing Approach

### Frontend Testing
- Component testing with React Testing Library
- End-to-end testing with Cypress
- Visual regression testing for UI components
- Mobile responsiveness testing

### Backend Testing
- Unit testing with Jest
- Integration testing for API endpoints
- MongoDB mock for database operations
- Request validation testing

### Cross-Browser Testing
- Chrome, Firefox, Safari, and Edge
- Mobile browsers (Chrome for Android, Safari iOS)
- Responsive design validation

## Performance Considerations

### Frontend Optimization
- Image optimization with Next.js Image component
- Code splitting for page-specific components
- Static generation where possible
- Client-side caching strategies

### API Efficiency
- Pagination for large data sets
- Selective field querying
- Indexing for frequent query patterns
- Response compression

### Monitoring
- Performance metrics collection
- Error tracking
- User journey analysis
- Load time optimization

## Security Measures

### Data Protection
- Input validation for all user data
- CSRF protection
- XSS prevention
- Secure storage of inquiry data

### Form Security
- Rate limiting for submission attempts
- CAPTCHA for spam prevention
- Data sanitization
- Validation of email formats

## Deployment Considerations
- Environment configuration management
- Database migration strategies
- Backup and recovery procedures
- Continuous integration setup
- Staging environment for testing 

## Known Challenges
- Admin authentication system needs proper frontend-backend integration (NextAuth -> JWT).
- Protected routes require middleware configuration.
- Docker container networking requires optimization.
- MongoDB seeding needs realistic server product data.
- Volume mounting needed for Docker development persistence.
- CSV/JSON import functionality for bulk product management needs implementation.
- Strict typing with `IProduct` requires careful component alignment; assumptions about data structure can lead to type errors (as seen in `ConfigurationBuilder` refactor).
- UI components relying on product data must be robust against potential variations or missing fields in `IProduct`.

## Platform Considerations

## Frontend Stack

### Core Technologies
- Next.js 14.2.26
- React 18
- TypeScript
- Tailwind CSS

### UI Components
- Radix UI Primitives
  - @radix-ui/react-slider
  - @radix-ui/react-checkbox
  - @radix-ui/react-label
  - @radix-ui/react-slot
- Lucide React (for icons)
- Next.js Image (for optimized images)

### Development Tools
- Docker for containerization
- npm for package management
- ESLint for code linting
- Prettier for code formatting

## Backend Stack

### Core Technologies
- Node.js
- Express.js
- MongoDB
- TypeScript

### Development Tools
- Docker for containerization
- npm for package management
- ESLint for code linting
- Prettier for code formatting

## Infrastructure

### Development Environment
- Windows 10 (version 10.0.19045)
- Docker Desktop for Windows
- PowerShell for terminal commands

### Container Setup
- Frontend container: nb-ecommerce-frontend-1
  - Port: 3000
  - Hot reloading enabled
- Backend container: nb-ecommerce-backend-1
  - Port: 5000
  - API endpoints
- MongoDB container: nb-ecommerce-mongodb-1
  - Port: 27017
  - Persistent storage

## Development URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## Component Library

### Base UI Components
- LoadingSpinner: Loading state indicator
- ErrorMessage: Error state display
- Button: Interactive button element
- Card: Container for content
- Slider: Range selection
- Checkbox: Selection control
- Label: Form label

### Product Components
- ProductGrid: Product display layout
- ProductFilter: Product filtering interface

## Type Definitions

### Product Interface
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}
```

### Filter State Interface
```typescript
interface FilterState {
  category: string[];
  priceRange: [number, number];
  inStock: boolean;
}
```

## Current Technical Challenges

### Frontend
1. Need to implement API integration
2. Image optimization for product images
3. State management for filters
4. Pagination for large product lists

### Backend
1. API endpoint implementation
2. Database schema design
3. Authentication system
4. Product data seeding

## Next Technical Steps

### Frontend
1. Connect to backend API
2. Implement error boundaries
3. Add loading skeletons
4. Implement pagination
5. Add sorting functionality

### Backend
1. Create product endpoints
2. Implement authentication
3. Set up database schemas
4. Create seeding scripts

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Use meaningful component names

### Component Structure
- Separate concerns
- Use TypeScript interfaces
- Document props
- Include accessibility attributes

### State Management
- Use React hooks
- Lift state when needed
- Document state updates
- Handle loading/error states

### Testing
- Unit tests for components
- Integration tests for features
- E2E tests for critical paths
- Test accessibility
