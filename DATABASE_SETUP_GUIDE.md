# Vercel Postgres Setup Guide

**Date**: 2025-11-09
**Status**: Automated monitoring active
**Time Required**: 5 minutes (automated)

---

## 🤖 Automated Setup (Recommended)

A monitoring script is running in the background that will automatically detect when you create the database and guide you through initialization.

**What's automated**:
- ✅ Detects database creation via Vercel API
- ✅ Verifies database connection to project
- ✅ Provides next steps for SQL initialization
- ✅ All you need to do: Create the database in the browser

**Status**: Check terminal for real-time progress

---

## What Changed

The M_ART portfolio has been **migrated from JSON file storage to Vercel Postgres**!

This means:
- ✅ Upload/Delete now works in production
- ✅ Data persists between deployments
- ✅ No more read-only filesystem errors
- ✅ Artist can self-service manage pottery

---

## Setup Steps (Follow Carefully)

### Step 1: Create Vercel Postgres Database (2 minutes)

1. **Go to Vercel Dashboard**:
   ```
   https://vercel.com/jordans-projects-4bff4baa/m-art-portfolio
   ```

2. **Navigate to Storage**:
   - Click the "Storage" tab in the top navigation

3. **Create Database**:
   - Click "Create Database"
   - Select **"Postgres"**
   - Choose **"Continue"** (free tier)
   - Accept defaults and click "Create"

4. **Connect to Project**:
   - Select your project: `m-art-portfolio`
   - Click "Connect"
   - Vercel will automatically add environment variables

---

### Step 2: Initialize Database Schema (3 minutes)

1. **Open Postgres Dashboard**:
   - In Vercel Storage tab, click on your new Postgres database
   - Click the **"Query"** tab

2. **Run Initialization SQL**:
   - Open this file: `scripts/init-db.sql`
   - Copy ALL the contents
   - Paste into the Vercel Query editor
   - Click **"Run Query"**

3. **Verify Success**:
   You should see a message like:
   ```
   CREATE TABLE
   CREATE INDEX (3 times)
   INSERT 0 8
   ```
   This means the database was created and populated with 8 pottery pieces!

4. **Check Data**:
   Run this query to verify:
   ```sql
   SELECT id, title FROM pottery_pieces;
   ```
   You should see 8 pieces listed.

---

### Step 3: Deploy New Code (2 minutes)

The code changes are already committed. Just push to deploy:

```bash
cd C:\Users\Owner\Desktop\M_ART
git status
# Should show: Your branch is ahead of 'origin/master' by 1 commit
git push
```

Vercel will automatically:
- Deploy the new database-powered code
- Connect to your Postgres database
- Start working immediately!

---

### Step 4: Test Production Upload/Delete (3 minutes)

1. **Visit Admin Dashboard**:
   ```
   https://m-art-portfolio.vercel.app/admin/login
   Password: admin123
   ```

2. **Test Delete**:
   - Click "Delete" on any piece
   - Confirm deletion
   - ✅ Should delete successfully (no error!)

3. **Test Upload**:
   - Click "+ New Piece"
   - Upload an image
   - Fill in title, description, collection
   - Click "Upload Piece"
   - ✅ Should upload successfully!

4. **Refresh Page**:
   - Your new piece should still be there (persisted!)
   - This confirms database is working

---

## Troubleshooting

### Error: "Failed to fetch pottery pieces from database"

**Cause**: Database connection not configured

**Fix**:
1. Go to Vercel Dashboard → Storage → Postgres
2. Click your database
3. Click "Connect to Project"
4. Select `m-art-portfolio`
5. Redeploy: `git commit --allow-empty -m "trigger redeploy" && git push`

---

### Error: "relation 'pottery_pieces' does not exist"

**Cause**: SQL initialization script not run

**Fix**:
1. Go to Vercel Dashboard → Storage → Postgres → Query tab
2. Copy contents of `scripts/init-db.sql`
3. Paste and run in query editor
4. Verify with: `SELECT COUNT(*) FROM pottery_pieces;`

---

### Database shows empty (0 pieces)

**Cause**: Initialization script ran but data wasn't inserted

**Fix**:
Run this query in Vercel Query tab:
```sql
SELECT COUNT(*) FROM pottery_pieces;
```

If it returns 0, re-run the INSERT statements from `scripts/init-db.sql` (starting from line 24).

---

## Environment Variables (Automatically Added)

When you connected the database to your project, Vercel added these:

- `POSTGRES_URL` - Full connection string
- `POSTGRES_URL_NON_POOLING` - Non-pooled connection
- `POSTGRES_USER` - Database username
- `POSTGRES_HOST` - Database host
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DATABASE` - Database name

You don't need to manually configure these!

---

## Database Management

### View All Pottery Pieces
```sql
SELECT id, title, collection, featured
FROM pottery_pieces
ORDER BY created_at DESC;
```

### Add a Piece Manually
```sql
INSERT INTO pottery_pieces (
  id, title, description, collection, images, featured, created_at, updated_at
)
VALUES (
  '9-custom-piece',
  'My Custom Piece',
  'Description here',
  'Vases',
  '[{"url": "https://example.com/image.jpg", "publicId": "piece-9", "width": 1200, "height": 1800}]'::jsonb,
  false,
  NOW(),
  NOW()
);
```

### Delete All Test Data
```sql
DELETE FROM pottery_pieces;
```

### Reset to Original 8 Pieces
Re-run the entire `scripts/init-db.sql` file.

---

## Cost & Limits

**Free Tier (Current)**:
- ✅ 256 MB storage
- ✅ 60 hours compute/month
- ✅ Unlimited queries
- ✅ Automatic backups

This is MORE than enough for a pottery portfolio!

**Estimated Usage**:
- Each pottery piece: ~2 KB
- 100 pieces: 200 KB (0.2 MB)
- You can store **thousands** of pieces

---

## Migration Complete Checklist

- [ ] Created Vercel Postgres database
- [ ] Connected database to m-art-portfolio project
- [ ] Ran `init-db.sql` in Query tab
- [ ] Verified 8 pieces exist with `SELECT COUNT(*)`
- [ ] Pushed code to GitHub (`git push`)
- [ ] Waited for Vercel deployment (~2 min)
- [ ] Tested delete on production (works!)
- [ ] Tested upload on production (works!)
- [ ] Verified data persists after page refresh

---

## What to Do Next

1. **Delete Test Data** (if you uploaded test pieces during testing):
   ```sql
   DELETE FROM pottery_pieces WHERE title LIKE '%Test%';
   ```

2. **Upload Real Pottery Photos**:
   - Visit `/admin/dashboard`
   - Upload artist's actual pottery photos
   - Delete the placeholder Unsplash images

3. **Change Admin Password**:
   - Generate new password hash
   - Update `ADMIN_PASSWORD_HASH` in Vercel environment variables

4. **Add Custom Domain** (optional):
   - Vercel Dashboard → Settings → Domains
   - Add: `martceramics.com` or similar

---

## Backup & Recovery

**Automatic Backups**:
- Vercel automatically backs up your database
- Retention: 7 days on free tier

**Manual Export**:
```sql
COPY pottery_pieces TO '/tmp/pottery_backup.csv' CSV HEADER;
```

**Manual Import**:
```sql
COPY pottery_pieces FROM '/tmp/pottery_backup.csv' CSV HEADER;
```

---

## Files Modified

**New Files**:
- `scripts/init-db.sql` - Database schema + seed data
- `scripts/migrate-to-db.ts` - Migration script (for reference)
- `DATABASE_SETUP_GUIDE.md` - This file

**Modified Files**:
- `src/lib/db.ts` - Completely rewritten to use Postgres
- `package.json` - Added @vercel/postgres dependency

**Unchanged**:
- All UI components (no changes needed!)
- API routes (same interface)
- Authentication (still works the same)

---

## Need Help?

**Common Issues**:
1. Database connection errors → Check environment variables
2. Table doesn't exist → Run init-db.sql
3. No data showing → Check piece count with SQL
4. Upload still fails → Verify Vercel deployment completed

**Database Access**:
- Vercel Dashboard → Storage → Your Database
- Query tab for running SQL
- Data tab for browsing records
- Settings tab for connection details

---

**Status**: Ready to deploy! Follow the steps above and you'll have a fully functional database-powered portfolio in ~10 minutes.

Last Updated: 2025-11-09
