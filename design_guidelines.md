# Design Guidelines: M&P TRAVEL & TOURS

## Design Approach
**Reference-Based Approach** inspired by premium travel and tourism platforms (Airbnb, Viator, luxury safari operators) with a focus on immersive imagery and trust-building through professional presentation.

## Core Design Principles
- **Visual Storytelling**: Large, high-quality imagery drives engagement and destination appeal
- **Credibility First**: Clean, professional layouts establish trust for a service business
- **Destination Focus**: Each service section feels like its own mini-landing experience

## Typography System
- **Primary Font**: Montserrat (modern, professional travel aesthetic)
- **Secondary Font**: Open Sans (clean readability for body text)
- **Hierarchy**:
  - Hero Headlines: 4xl-6xl, font-bold (Montserrat)
  - Section Headers: 3xl-4xl, font-semibold
  - Service Titles: xl-2xl, font-semibold
  - Body Text: base-lg, font-normal (Open Sans)
  - Catchphrase: 2xl-3xl, italic, font-medium

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 lg:py-24
- Component spacing: gap-8 to gap-12
- Container max-width: max-w-7xl
- Content max-width: max-w-4xl for text-heavy sections

## Component Library

### Navigation
- Sticky header with logo, navigation links (Services, Wine Tours, Safari Tours, Contact)
- CTA button in header: "Book Now" or "Get Quote"
- Mobile: Hamburger menu

### Hero Section
- Full-width hero with large background image (shuttle/luxury vehicle on scenic South African route)
- Centered content overlay with blur background for text readability
- Business name: M&P TRAVEL & TOURS (large, bold)
- Catchphrase: #We take you there (prominent, styled distinctively)
- Primary CTA: "Explore Our Services" with blurred background button
- Trust indicators: "Licensed & Insured" badges

### Service Overview Section
Grid layout showcasing 4 core services:
- Airport Transfers: Icon + title + brief description
- Wine Tours: Icon + title + brief description
- Safari Tours: Icon + title + brief description
- Shuttle Services: Icon + title + brief description
- Layout: 2x2 grid (lg:grid-cols-4 on desktop)
- Cards with subtle elevation, hover scale effect

### Wine Tours Feature Section
- Full-width section with side-by-side layout (lg:grid-cols-2)
- Left: Large hero image of wine farms (vineyards, rolling hills, wine estates)
- Right: Content block with:
  - Section title: "Wine Tours"
  - Descriptive paragraph about wine region experiences
  - List of tour highlights (bullet points or check icons)
  - CTA button: "View Wine Tour Packages"

### Safari Tours Feature Section
- Mirror layout of Wine Tours (image right, content left for visual rhythm)
- Right: Large hero image of Big 5 (composite or collage showing lion, elephant, buffalo, leopard, rhino)
- Left: Content block with:
  - Section title: "Safari Tours"
  - Descriptive paragraph about wildlife experiences
  - List of safari highlights
  - CTA button: "Explore Safari Adventures"

### Why Choose Us Section
- 3-column grid featuring:
  - Professional Drivers (icon + title + description)
  - Comfortable Vehicles (icon + title + description)
  - Local Knowledge (icon + title + description)

### Contact Section
- 2-column layout (lg:grid-cols-2)
- Left: Contact form (Name, Email, Phone, Service Interest dropdown, Message)
- Right: Contact information block:
  - Phone: +27 (0)79 551 9945
  - Email: m.mukombero@gmail.com
  - Business hours
  - Social media links

### Footer
- 3-column layout:
  - Company info (logo, tagline)
  - Quick Links (Services, About, Contact)
  - Contact details + Newsletter signup
- Bottom bar: Copyright, Privacy Policy, Terms

## Images

### Hero Section
Large, professional image of a luxury shuttle/tour vehicle on a scenic South African road (Table Mountain or wine country backdrop preferred). Image should convey professionalism and adventure.

### Wine Tours
High-quality image of Cape Winelands featuring:
- Rolling vineyard landscapes
- Wine estate buildings
- Preferably golden hour lighting
- Wide-angle composition showing scale and beauty

### Safari Tours
Composite or collage showcasing the Big 5:
- Lion (preferably male with mane)
- African Elephant
- Cape Buffalo
- Leopard
- Rhinoceros
- Natural habitat settings, professional wildlife photography
- Could be arranged as a hero banner or grid layout

### Service Cards
Icons or small illustrative images for:
- Airport (airplane icon)
- Wine glass (wine tours)
- Wildlife (safari)
- Shuttle van (general services)

## Interactions & Animations
**Minimal, purposeful animations**:
- Smooth scroll navigation
- Card hover: subtle scale (scale-105) and shadow increase
- Button hover: slight opacity change (built-in Button component)
- Scroll-triggered fade-in for sections (subtle, not distracting)
- NO parallax effects, NO complex scroll animations

## Accessibility
- High contrast text on images (use overlay darkening or blur backgrounds)
- All images have descriptive alt text
- Form labels clearly associated with inputs
- Focus states visible on all interactive elements
- Minimum touch target size: 44x44px

## Responsive Behavior
- Mobile: Single column, stacked sections, full-width images
- Tablet: 2-column grids where appropriate
- Desktop: Full multi-column layouts, side-by-side content/image sections
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)