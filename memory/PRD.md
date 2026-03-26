# Mestar Tarımsal Ekipmanlar - PRD

## Problem Statement
Build a marketing website for Mestar Agricultural Equipment company based on their product catalog PDF, similar to hmsagro.com.tr reference site. Turkish + English bilingual, orange/black theme, product categories, quote form.

## Architecture
- **Backend**: FastAPI + MongoDB (quote/contact storage)
- **Frontend**: React + Tailwind CSS + Shadcn UI + Framer Motion
- **Database**: MongoDB for quote requests and contact messages

## User Personas
- Turkish farmers looking for potato/onion harvesting equipment
- International agricultural distributors/dealers
- Potential business partners and equipment buyers

## Core Requirements (Static)
- Bilingual support (TR/EN)
- Product catalog with 4 categories, 12 products
- Quote request form with backend storage
- Company information (About, Vision/Mission)
- Media/Gallery section
- Contact information

## What's Been Implemented (Dec 2025)
- Full responsive website with dark industrial theme
- Hero slider with auto-play and navigation
- About section with company description and vision/mission
- Animated statistics counters
- Marquee banner with tagline
- Bento-grid product categories (4 categories)
- Product detail pages with specs and features tables
- Quote request form with Shadcn Select dropdown (posts to /api/quote)
- Media/Gallery page
- Footer with contact information
- TR/EN language toggle
- Backend validation for quote requests
- Mobile-responsive navigation

## Prioritized Backlog
### P0 (Done)
- All core pages and navigation
- Product catalog and details
- Quote form with backend
- Bilingual support

### P1
- SEO meta tags and Open Graph
- Contact form (separate from quote)
- Product comparison feature

### P2
- Admin dashboard for managing quotes
- Google Maps integration for location
- WhatsApp chat integration
- PDF catalog download

## Next Tasks
- Add SEO meta tags for better search engine visibility
- Implement admin panel for quote management
- Add Google Maps embed for company location
- Add WhatsApp quick contact button
