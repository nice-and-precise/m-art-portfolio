# Database Connection Debug Session - 2025-11-09

## Status: 🔴 IN PROGRESS - Fix Attempts Unsuccessful

## Root Cause Identified
@vercel/postgres has a **hardcoded validation bug** that rejects Supabase connection strings:
- **Expected pattern**: `-pooler.` (dash-pooler-dot)
- **Supabase pattern**: `.pooler.` (dot-pooler-dot)
- **Result**: Connection fails with `ENOTFOUND api.pooler.supabase.com`

## Evidence Gathered (Systematic Debugging Phase 1)

### What Works ✅
- **Standalone scripts**: `npx tsx scripts/verify-db.ts` successfully connects and retrieves all 8 pottery pieces
- **Environment variables**: Correctly loaded in both local and production (verified via `/api/debug` endpoint)
- **Database**: Supabase Postgres is operational with 8 pieces loaded
- **Build process**: TypeScript compilation succeeds

### What Fails ❌
- **Next.js dev server**: Database queries fail
- **Next.js production**: Database queries fail
- **Error**: `NeonDbError: Error connecting to database: fetch failed`
- **DNS error**: `getaddrinfo ENOTFOUND api.pooler.supabase.com`

### Key Finding
The failing hostname `api.pooler.supabase.com` does NOT appear in environment variables. Our `POSTGRES_URL` shows `aws-1-us-east-1.pooler.supabase.com`, proving @vercel/postgres is transforming/mishandling the URL.

## Fix Attempts (Following Systematic Debugging Process)

### Attempt #1: Use createPool() with explicit connection string
**Hypothesis**: Global `sql` singleton fails, but explicit `createPool()` might work.

**Implementation**:
```typescript
import { createPool } from '@vercel/postgres';
const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});
// Replace all `sql` with `pool.sql`
```

**Result**: ❌ Still fails with same error
**Commit**: `b36db76`

### Attempt #2: Add workaround parameter
**Hypothesis**: Community workaround of adding dummy parameter with "pooler" tricks validation.

**Implementation**:
```typescript
const pool = createPool({
  connectionString: process.env.POSTGRES_URL + '&workaround=supabase-pooler.vercel',
});
```

**Result**: ❌ Still fails with same error
**Commit**: `bd09173`

## Pattern Analysis

**Working example** (verify-db.ts):
```typescript
import { sql } from '@vercel/postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const result = await sql.query('SELECT COUNT(*) FROM pottery_pieces');
// ✅ WORKS
```

**Broken example** (src/lib/db.ts in Next.js):
```typescript
import { createPool } from '@vercel/postgres';
const pool = createPool({ connectionString: process.env.POSTGRES_URL });
const result = await pool.sql`SELECT * FROM pottery_pieces`;
// ❌ FAILS
```

**Key Difference**: The working script uses `dotenv` explicitly, but Next.js auto-loads env vars. Both should work identically, but don't.

## Next Steps (Per Systematic Debugging)

### Option A: Try Fix #3 - Replace @vercel/postgres with native `pg` library
**Rationale**: @vercel/postgres is designed for Vercel's Neon Postgres, not Supabase. Using native PostgreSQL driver should bypass validation issues.

**Implementation**:
1. Install: `npm install pg @types/pg`
2. Replace src/lib/db.ts to use `pg.Pool` directly
3. Test locally before deployment

**Risk**: Architectural change, but should be straightforward.

### Option B: Question the Architecture (After 3+ Failed Fixes)
Per systematic debugging guidelines: "If 3+ fixes failed: STOP and question fundamentals"

**Questions to ask**:
- Is @vercel/postgres the right choice for Supabase?
- Should we use `@supabase/supabase-js` instead?
- Is there a fundamental incompatibility we're missing?

## Recommendations

**IMMEDIATE** (Before user returns):
1. ✅ Try Option A (native `pg` library) - ONE more fix attempt
2. If that fails → Document architectural decision needed
3. Prepare comparison of database client options

**FUTURE** (With user):
- Discuss whether to continue with @vercel/postgres or switch libraries
- Consider using Supabase's official client for better compatibility

## Files Modified
- `src/lib/db.ts` - Database utilities (2 fix attempts)
- `src/app/api/debug/route.ts` - Created for diagnostics

## Test Results
- **E2E Tests**: 17 failed (all database-dependent), 19 passed (non-database)
- **Local verify script**: ✅ 8/8 pieces retrieved
- **Production API**: ❌ Returns `{"error":"Failed to fetch pieces"}`

## Resources
- GitHub Issue: https://github.com/vercel/storage/issues/123
- Supabase Discussion: https://github.com/orgs/supabase/discussions/14165
- Community workaround documented but not working in our case

---

**Session Duration**: ~2 hours
**Approach**: Systematic debugging (root cause → pattern analysis → hypothesis testing)
**Status**: Ready for Fix #3 or architectural discussion
