# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js landing page for selling "The Satvik 3-Book Collection: Where Health Meets Celebration" ebook. The site uses a health-focused color palette inspired by traditional Satvik cooking principles.

## Development Commands

### Running the Application
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint on the codebase

### Development Workflow
The development server supports hot reloading. Changes to files in `src/` will automatically refresh the browser.

## Architecture

### Tech Stack
- **Next.js 16**: Using App Router (not Pages Router) with Turbopack
- **TypeScript**: Strict type checking enabled
- **Tailwind CSS v4**: Utility-first styling with CSS-based configuration
- **React 19**: Latest stable version

### Directory Structure
```
src/
├── app/               # Next.js App Router directory
│   ├── layout.tsx    # Root layout, wraps all pages
│   ├── page.tsx      # Homepage / landing page
│   └── globals.css   # Tailwind imports + global styles
└── components/        # Reusable React components
```

### Key Architectural Decisions

**App Router**: This project uses Next.js App Router (not the legacy Pages Router). All routes are defined in the `src/app/` directory using the file-system based routing:
- `page.tsx` files define routes
- `layout.tsx` files define shared UI that wraps pages
- Server Components are the default (use `'use client'` directive for client components)

**Styling Approach**: This project uses Tailwind CSS v4, which has a new CSS-based configuration system. Custom colors are defined in `src/app/globals.css` using the `@theme` directive, not in a JavaScript config file. All colors follow the Satvik health theme and should be used consistently across the application.

## Custom Color Palette

The project uses a carefully selected color scheme aligned with Satvik cooking principles. These colors are defined in `src/app/globals.css` using Tailwind v4's `@theme` directive and should be used consistently:

- `satvik-green` (Primary): Deep earthy green for headers, primary elements
  - `satvik-green-light`: Lighter shade
  - `satvik-green-dark`: Darker shade
- `saffron-orange` (Accent): CTA buttons and important actions only
  - `saffron-orange-light`: Hover states
  - `saffron-orange-dark`: Active states
- `warm-white`: Default background color
- `charcoal`: Primary text color
- `sage-green`: Section backgrounds, subtle highlights
  - `sage-green-light`: Very light backgrounds
  - `sage-green-dark`: Borders, dividers

**Important**: Use these custom colors instead of Tailwind's default palette to maintain brand consistency.

## Configuration Files

- `src/app/globals.css` - Tailwind v4 CSS-based configuration with `@theme` directive for custom colors
- `postcss.config.mjs` - PostCSS configuration using `@tailwindcss/postcss` plugin
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` → `src/*`)
- `next.config.ts` - Next.js configuration
- `.eslintrc.json` - ESLint rules extending Next.js defaults

**Note**: This project uses Tailwind CSS v4, which does NOT use a `tailwind.config.ts` file. All Tailwind configuration is done in CSS using the `@theme` directive in `globals.css`.

## State Management

Currently no global state management is implemented. For future e-commerce features (cart, checkout), consider:
- React Context for simple state
- Zustand or Redux Toolkit for complex state
- Server Actions for form submissions and data mutations

## Adding New Features

When adding new components or pages:
1. Create components in `src/components/`
2. Use TypeScript interfaces for props
3. Follow the existing color scheme defined in `src/app/globals.css` (Tailwind v4 uses CSS-based config)
4. Prefer Server Components unless client interactivity is needed
5. Use semantic HTML and ensure accessibility

**Tailwind v4 Notes**: To add new custom colors or theme values, edit the `@theme` block in `src/app/globals.css`, not a config file.
