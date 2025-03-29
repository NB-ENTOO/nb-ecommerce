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
- Email form for sending configuration requests
- Clean separation between UI and business logic
- TypeScript for type safety and better developer experience

## Page Structure
- **Layout**: Common structure with Navbar and Footer
- **Home**: Hero section, featured categories, featured products
- **Products**: Filtering sidebar, product grid, sorting options
- **Product Detail**: Image, info, specs, related products
- **Server Configuration**: Configuration list, PDF generation, email form
- **Profile**: Account info with tabs

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
│  Browses     │────►│  & Customization │────►│   & Email Form    │
│  Products    │     │                  │     │                   │
└──────────────┘     └─────────────────┘     └───────────────────┘
                                                       │
                                                       ▼
┌──────────────┐     ┌─────────────────┐     ┌───────────────────┐
│  Sales Team  │     │  Customer       │     │   Configuration    │
│  Contact     │◄────│  Details        │◄────│   Request          │
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
  - User account and cart functionality in header
- **Footer Navigation:**
  - Four-column layout with tech categories, corporate info, support, and contact
  - Social media links and newsletter signup
  - Copyright and terms

### Page Types
- Home page
- Category listing pages for server equipment
- Product detail pages with technical specifications
- Server configuration pages
- Corporate information pages
- User account pages
- Configuration request page with PDF generation and email form
- Search results page

## UI Component Architecture

### Tech-Specific Components
- **ServerCard:** Displays server products with technical specifications
- **ConfigurationTool:** Interactive component for configuring server specifications
- **TechnicalSpecs:** Tabular display of detailed server specifications
- **CompatibilityChecker:** Tool to verify component compatibility
- **NetworkDiagram:** Visual configuration of network equipment
- **StorageSizer:** Calculator for storage requirements
- **PDFGenerator:** Component to create PDF of server configurations
- **ConfigurationRequestForm:** Form for customers to submit contact information

### Tech E-commerce Patterns
- Server product displays emphasize technical specifications over visual appeal
- Dense information architecture with multiple filtering options
- Expert advice components integrated with product listings
- Technical document downloads associated with products
- Configuration tools with dependency validation
- Technical support information prominently displayed
- Lead generation through PDF configurations and email forms

## Data Flow Architecture

### Tech Product Data Model
- Complex specification attributes for server equipment
- Component compatibility relationships
- Hierarchical categorization by technical capabilities
- Configuration options and dependencies
- Warranty and support package information

### Configuration Request Model
- Customer contact information
- Server configuration details
- Business requirements information
- PDF generation capabilities
- Email processing for sales team follow-up
