# Library / Utilities

This directory contains utility functions, helpers, and shared code.

## Structure

- **api/** - API client functions
- **utils/** - General utility functions
- **constants/** - Application constants
- **hooks/** - Custom React hooks (if needed for client components)

## Examples

```typescript
// Example: src/lib/utils/format.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// Example: src/lib/api/artworks.ts
export async function getArtworks() {
  // Fetch artwork data
}
```
