# TypeScript Types

This directory contains shared TypeScript type definitions and interfaces.

## Examples

```typescript
// Example: src/types/artwork.ts
export interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  artist: string;
  year?: number;
  medium?: string;
  dimensions?: string;
  price?: number;
  available?: boolean;
}

export interface Gallery {
  id: string;
  name: string;
  artworks: Artwork[];
}
```
