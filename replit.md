# M&P TRAVEL & TOURS - Project Documentation

## Overview

M&P TRAVEL & TOURS is a premium travel and tourism website for a South African tour operator specializing in airport transfers, wine tours, safari tours, and shuttle services. The application is built as a modern single-page application with a focus on visual storytelling, credibility, and immersive imagery inspired by premium travel platforms like Airbnb and Viator.

The project uses a full-stack TypeScript architecture with React on the frontend and Express on the backend, designed to showcase travel services with professional presentation and trust-building elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast hot module replacement
- Wouter for lightweight client-side routing (single route application currently)
- React Query (@tanstack/react-query) for server state management and data fetching

**UI Component System:**
- shadcn/ui component library with Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system supporting light/dark modes with CSS variables
- Typography system using Montserrat (primary) and Open Sans (secondary) fonts

**Design System:**
- Visual hierarchy emphasizing large imagery and destination focus
- Consistent spacing primitives (4, 6, 8, 12, 16, 20, 24px units)
- Color system built on HSL values with semantic naming (primary, secondary, muted, accent, destructive)
- Shadow and elevation system for depth and visual hierarchy
- Responsive breakpoints with mobile-first approach

**State Management:**
- React Query for asynchronous state and API interactions
- React hooks (useState, useEffect) for local component state
- Context API via TooltipProvider for shared UI state

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for the HTTP server
- ESM module system (type: "module" in package.json)
- Custom middleware for request logging and JSON body parsing
- Session management with connect-pg-simple for PostgreSQL-backed sessions

**Development & Production:**
- Development: tsx for running TypeScript directly with hot reload
- Production: esbuild for fast bundling of server code
- Vite middleware integration for serving frontend in development
- Static file serving from dist/public in production

**API Design:**
- RESTful API structure (routes prefixed with /api)
- Centralized route registration in server/routes.ts
- Storage abstraction layer for database operations

### Data Storage Solutions

**Database:**
- PostgreSQL as the primary database (via @neondatabase/serverless for Neon integration)
- Drizzle ORM for type-safe database queries and schema management
- Database schema defined in shared/schema.ts for code sharing between client and server

**Current Schema:**
- Users table with id (UUID), username (unique), and password fields
- Schema validation using drizzle-zod for runtime type checking

**Storage Pattern:**
- IStorage interface defining CRUD operations
- MemStorage implementation for in-memory storage (development/testing)
- Designed for easy swapping to PostgreSQL implementation
- Shared types between frontend and backend via shared/ directory

### Email Notifications
- Form inquiries are sent to m.mukombero@gmail.com using Resend.
- The `RESEND_API_KEY` secret is used for authentication.
- Outgoing emails use `onboarding@resend.dev` as the sender (default for unverified domains).

### Removed Features
- Admin dashboard and related authentication logic have been removed per user request.

### Recent Changes (2025-11-15)
- Removed admin dashboard and authentication routes.
- Integrated Resend for automated email notifications on form submission.
- Cleaned up unused admin-related files.
- Added deployment configurations for Render and Railway.

### External Dependencies

**UI Component Libraries:**
- Radix UI suite (@radix-ui/*) for 20+ accessible component primitives
- embla-carousel-react for image carousels
- cmdk for command palette/search functionality
- lucide-react for consistent iconography
- react-day-picker for date selection
- recharts for data visualization (if needed)

**Form Handling:**
- react-hook-form for performant form state management
- @hookform/resolvers for validation schema integration
- zod for runtime type validation

**Styling:**
- tailwindcss with autoprefixer
- class-variance-authority for variant-based component APIs
- clsx and tailwind-merge for conditional class composition

**Build Tools:**
- Vite plugins: @vitejs/plugin-react, Replit-specific plugins for error handling and development tools
- esbuild for server bundling
- drizzle-kit for database migrations

**Development Tools:**
- tsx for TypeScript execution
- TypeScript with strict mode enabled
- Path aliases (@/, @shared/, @assets/) for clean imports

### Project Structure

**Monorepo Layout:**
- `/client` - Frontend React application (Vite root)
- `/server` - Backend Express application
- `/shared` - Shared types and schemas (database models, validation)
- `/migrations` - Drizzle database migrations
- `/attached_assets` - Static assets (images, brand materials)

**Key Configuration:**
- TypeScript configured with path mapping for clean imports
- Drizzle config pointing to PostgreSQL with migration output to /migrations
- Tailwind configured to scan client files with custom theme extensions
- Vite configured with alias resolution and Replit development plugins