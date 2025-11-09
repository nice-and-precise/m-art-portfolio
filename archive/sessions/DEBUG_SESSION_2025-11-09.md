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

### Attempt #3: Replace with native `pg` library ✅ Implemented, ❌ FAILED
**Hypothesis**: Library-agnostic approach using standard PostgreSQL driver.

**Implementation**:
```typescript
import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});
// Converted all queries to parameterized format ($1, $2, etc.)
```

**Result**: ❌ Still fails with same error
**Commit**: `78c421f`

## 🛑 SYSTEMATIC DEBUGGING CHECKPOINT

**Per guidelines**: After 3 failed fixes → STOP and question architecture

### The Fundamental Problem

**Pattern that emerged**:
- ✅ `npx tsx scripts/verify-db.ts` → Works perfectly (uses @vercel/postgres)
- ❌ Next.js with @vercel/postgres → Fails
- ❌ Next.js with @vercel/postgres + createPool → Fails
- ❌ Next.js with @vercel/postgres + workaround param → Fails
- ❌ Next.js with native `pg` library → Fails

**This is NOT a library issue. This is an architectural/environment issue.**

### Architectural Questions (MUST DISCUSS WITH USER)

1. **Environment Variable Propagation**:
   - Why does `/api/debug` show correct `POSTGRES_URL` but connections fail?
   - Is Vercel's serverless environment blocking the connection?
   - Are there firewall/network rules preventing connections?

2. **Supabase Configuration**:
   - Is the Supabase instance configured to accept connections from Vercel?
   - Are we using the correct connection mode (pooled vs direct)?
   - Connection pooling requirements for serverless?

3. **Next.js Serverless Context**:
   - Is there something special about how Next.js API routes handle database connections?
   - Cold start issues with connection pools?
   - Timeout problems?

4. **Alternative Approaches**:
   - Should we use `@supabase/supabase-js` which has built-in Supabase optimizations?
   - Use Supabase's REST API instead of direct Postgres connection?
   - Different connection string format?

### Immediate Next Steps (Requires User Decision)

**Option A: Debug Environment/Network**
- Add extensive logging to see WHERE the connection fails
- Check Supabase dashboard for connection attempts
- Verify Vercel can reach Supabase endpoints

**Option B: Try Supabase Official Client**
- Install `@supabase/supabase-js`
- Use Supabase's REST API (not direct Postgres)
- May be better optimized for serverless

**Option C: Simplify for Investigation**
- Create minimal reproduction (single API route, single query)
- Test with different Supabase connection modes
- Verify network connectivity from Vercel

## Current Status: BLOCKED

Cannot proceed without architectural decision. All standard approaches have failed. Need to investigate the fundamental connectivity issue between Vercel's serverless functions and Supabase Postgres.

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
