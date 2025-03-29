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