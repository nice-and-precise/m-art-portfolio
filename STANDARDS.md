# Code Standards & Conventions

**Quick Reference** - This document provides an overview of all coding standards for M_ART. For detailed guidelines, see the [docs/standards/](docs/standards/) directory.

## Core Principles

1. **Consistency** - Follow established Next.js and React patterns
2. **Clarity** - Code should be self-documenting with minimal comments
3. **Quality** - Maintain >80% test coverage, pass all linting
4. **Security** - Validate inputs, never commit secrets, follow OWASP top 10
5. **Performance** - Optimize images, lazy load, monitor Core Web Vitals

## Quick Reference Guide

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase.tsx | `GalleryGrid.tsx` |
| Pages (App Router) | lowercase/page.tsx | `gallery/page.tsx` |
| Utilities | camelCase.ts | `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE.ts | `GALLERY_CONFIG.ts` |
| Folders | kebab-case | `image-gallery/` |
| Variables/Functions | camelCase | `getArtworks()` |
| Types/Interfaces | PascalCase | `ArtworkData` |
| Booleans | is/has/should prefix | `isLoading`, `hasImages` |

### File Organization

**Next.js App Router Structure:**
```
src/app/
├── layout.tsx           # Root layout
├── page.tsx             # Home page
├── gallery/
│   ├── page.tsx        # Gallery page
│   └── [id]/
│       └── page.tsx    # Individual artwork page
└── about/
    └── page.tsx        # About page
```

**Component Organization:**
```
src/components/
├── ui/                 # Reusable UI components
│   ├── Button.tsx
│   └── Card.tsx
├── gallery/            # Gallery-specific components
│   ├── GalleryGrid.tsx
│   └── ArtworkCard.tsx
└── layout/             # Layout components
    ├── Header.tsx
    └── Footer.tsx
```

### Import Order

```typescript
// 1. React and Next.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. External dependencies
import clsx from 'clsx';

// 3. Internal modules (@ aliases)
import { getArtworks } from '@/lib/api';
import { ArtworkCard } from '@/components/gallery';

// 4. Relative imports
import { GalleryHeader } from './components';

// 5. Styles
import styles from './page.module.css';

// 6. Types (last)
import type { Artwork } from '@/types';
```

### Next.js Best Practices

✅ **DO:**
- Use Server Components by default
- Add 'use client' only when needed (interactivity, hooks)
- Use Next/Image for all images
- Implement proper metadata for SEO
- Use dynamic imports for code splitting
- Leverage route groups for organization
- Use loading.tsx and error.tsx for better UX

❌ **DON'T:**
- Make all components Client Components
- Use regular <img> tags
- Forget to add alt text to images
- Skip image optimization
- Hardcode metadata
- Use window or document in Server Components

### Image Optimization

```typescript
// ✅ Good - Optimized with Next/Image
<Image
  src="/images/artwork.jpg"
  alt="Artwork title and description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 800px"
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/..."
/>

// ❌ Bad - Not optimized
<img src="/images/artwork.jpg" alt="artwork" />
```

### Tailwind CSS Conventions

```typescript
// ✅ Good - Complete class strings
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// ✅ Good - Using clsx for conditional classes
<div className={clsx(
  'rounded-lg shadow-md',
  isActive && 'ring-2 ring-blue-500',
  !isActive && 'opacity-50'
)}>

// ❌ Bad - Dynamic concatenation (won't work with Tailwind)
<div className={`grid-cols-${columns}`}>
```

### TypeScript Patterns

```typescript
// ✅ Good - Proper typing
interface ArtworkProps {
  title: string;
  imageUrl: string;
  artist: string;
  year?: number;
}

export function ArtworkCard({ title, imageUrl, artist, year }: ArtworkProps) {
  // Component code
}

// ✅ Good - Type for Server Component props
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  // Server component code
}
```

### Testing Standards

**Structure:** Arrange-Act-Assert

```typescript
import { render, screen } from '@testing-library/react';
import { ArtworkCard } from './ArtworkCard';

describe('ArtworkCard', () => {
  it('displays artwork information correctly', () => {
    // Arrange
    const artwork = {
      title: 'Sunset',
      imageUrl: '/test.jpg',
      artist: 'Jane Doe'
    };

    // Act
    render(<ArtworkCard {...artwork} />);

    // Assert
    expect(screen.getByText('Sunset')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});
```

**Coverage Expectations:**
- Critical paths: 100%
- Business logic: 90%+
- Utils/helpers: 100%
- Overall project: 80%+

### Git Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

**Example:**
```
feat(gallery): add image lightbox viewer

Implements full-screen image viewing with navigation.
Includes keyboard shortcuts and touch gestures.

Closes #45
```

### Performance Benchmarks

**Core Web Vitals:**
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

**Lighthouse Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

**Bundle Size:**
- Initial JS: < 150KB gzipped
- Images: Optimized with Next/Image
- Fonts: Subset and preloaded

### Accessibility Standards

- [ ] All images have descriptive alt text
- [ ] Semantic HTML elements used
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Touch targets minimum 44x44px
- [ ] Screen reader tested

### Security Checklist

- [ ] No API keys in client-side code
- [ ] All user input sanitized
- [ ] HTTPS only
- [ ] CSP headers configured
- [ ] Images from trusted sources
- [ ] Form validation on client AND server

### Code Complexity Limits

- **Function length:** Max 50 lines (aim for 20)
- **File length:** Max 300 lines
- **Function parameters:** Max 4 (use props object)
- **Nesting depth:** Max 3 levels
- **Component complexity:** Keep components focused

## Responsive Design

### Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
```typescript
// ✅ Good - Mobile first
<div className="text-sm md:text-base lg:text-lg">

// ❌ Bad - Desktop first
<div className="text-lg lg:text-sm">
```

## When Claude Writes Code

**I should automatically:**

✅ Use Server Components by default
✅ Add 'use client' only when necessary
✅ Implement proper image optimization
✅ Follow Tailwind CSS conventions
✅ Include TypeScript types (no `any`)
✅ Add error handling and loading states
✅ Write tests for new components
✅ Add accessibility attributes
✅ Ensure responsive design
✅ Optimize for Core Web Vitals

**I should NOT:**

❌ Skip image optimization
❌ Use regular <img> tags
❌ Forget alt text
❌ Make everything a Client Component
❌ Use inline styles (use Tailwind)
❌ Ignore TypeScript errors
❌ Skip responsive testing

## Detailed Standards

For comprehensive guidelines on specific topics, see [docs/standards/](docs/standards/) (to be created):

- Next.js conventions
- React component patterns
- Tailwind CSS architecture
- Image optimization guide
- Testing strategies
- Performance optimization
- SEO best practices
- Accessibility guidelines

---

**Last Updated:** 2025-11-08
**Version:** 1.0.0
**Project:** M_ART - Art Portfolio & Gallery

For questions about these standards, consult the detailed documents or update this file as the project evolves.
