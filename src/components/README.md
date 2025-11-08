# Components

This directory contains React components organized by purpose.

## Structure

- **ui/** - Reusable UI components (buttons, cards, modals)
- **gallery/** - Gallery-specific components
- **layout/** - Layout components (header, footer, navigation)

## Component Guidelines

1. **Naming**: Use PascalCase for component files (e.g., `GalleryGrid.tsx`)
2. **Server vs Client**: Default to Server Components, add `'use client'` only when needed
3. **Props**: Define TypeScript interfaces for all props
4. **Exports**: Use named exports for components

## Example

```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}
    >
      {children}
    </button>
  );
}
```
