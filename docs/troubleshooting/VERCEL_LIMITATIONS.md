# Vercel Deployment Limitations

**Date**: 2025-11-09
**Status**: ⚠️ IMPORTANT - Read-Only Filesystem Limitation

---

## Overview

The M_ART portfolio is successfully deployed on Vercel, but there's a **critical architectural limitation** you need to understand:

**Vercel's serverless functions have a READ-ONLY filesystem** (except for `/tmp` directory).

This means:
- ✅ **Viewing pottery** works perfectly
- ✅ **Login** works perfectly
- ❌ **Upload new pieces** will FAIL in production
- ❌ **Delete pieces** will FAIL in production
- ❌ **Edit pieces** will FAIL in production

---

## Why This Happens

### Current Architecture
The website currently stores all pottery pieces in a JSON file:
```
data/pottery.json
```

This works great **locally** because:
1. You upload a piece → Code writes to `pottery.json`
2. File is saved on your computer's hard drive
3. Next time you visit, the piece is still there

But on **Vercel production**:
1. You upload a piece → Code tries to write to `pottery.json`
2. ❌ Vercel blocks the write (filesystem is read-only)
3. Error: "Delete/Upload requires a database - JSON file storage is read-only on Vercel"

### Technical Details
From `src/lib/db.ts`:
```typescript
async function savePieces(pieces: PotteryPiece[]): Promise<void> {
  try {
    await fs.writeFile(tempFile, JSON.stringify(db, null, 2));
    await fs.rename(tempFile, DB_FILE);
  } catch (error) {
    if (process.env.VERCEL) {
      throw new Error('Delete/Upload requires a database');
    }
  }
}
```

---

## Error Messages You'll See

### When Deleting a Piece
```
Failed to delete piece: Delete/Upload requires a database - JSON file storage is read-only on Vercel
```

### When Uploading a Piece
The image upload to Cloudinary will succeed, but creating the piece entry will fail with:
```
Failed to create piece
```

---

## Solutions (Ordered by Complexity)

### Option 1: Accept Limitation (Quick Fix - 0 hours)
**Best for**: Demo/testing purposes

- Accept that upload/delete only work locally
- Pre-populate pottery.json with final pieces before deploying
- When artist needs to add new pieces:
  1. Update `data/pottery.json` locally
  2. Push to GitHub
  3. Vercel auto-deploys with new pieces

**Pros**:
- No code changes needed
- Works immediately
- Free

**Cons**:
- Not user-friendly for artist
- Requires git/technical knowledge
- No self-service uploads

---

### Option 2: Vercel Postgres (Recommended - 2-4 hours)
**Best for**: Production use with artist self-service

**Setup**:
1. Create Vercel Postgres database (free tier available)
2. Migrate `data/pottery.json` to database tables
3. Update `src/lib/db.ts` to use database instead of file

**Cost**: Free for up to 60 hours/month compute time

**Implementation Steps**:
```bash
# 1. Install Vercel Postgres
npm install @vercel/postgres

# 2. Create database in Vercel dashboard
# 3. Run migrations
# 4. Update db.ts to use SQL queries
```

**Pros**:
- Fully persistent
- Upload/delete works in production
- Scalable
- Free tier available

**Cons**:
- Requires code changes
- Need to learn SQL basics
- 2-4 hours of work

**Example migration**:
```sql
CREATE TABLE pottery_pieces (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  collection VARCHAR(100),
  images JSONB,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### Option 3: MongoDB Atlas (Alternative - 2-4 hours)
**Best for**: If you prefer NoSQL or want cloud portability

**Setup**:
1. Create free MongoDB Atlas cluster
2. Install mongoose or mongodb driver
3. Update db.ts to use MongoDB

**Cost**: Free tier (512MB storage)

**Pros**:
- NoSQL (similar to JSON structure)
- Easy to migrate from JSON
- Cloud-portable (not locked to Vercel)

**Cons**:
- External dependency
- Slightly higher latency (cross-region calls)

---

### Option 4: Vercel KV (Redis) - Not Recommended
**Why not**: Redis is for caching, not primary storage. Not ideal for pottery pieces.

---

## Current Workaround (Temporary)

Until you implement a database, here's the recommended workflow:

### Adding New Pottery Pieces

1. **Local development**:
   ```bash
   cd C:\Users\Owner\Desktop\M_ART
   npm run dev
   ```

2. **Open admin dashboard**:
   ```
   http://localhost:3000/admin/login
   Password: admin123
   ```

3. **Upload pieces** (works locally!)

4. **Commit and deploy**:
   ```bash
   git add data/pottery.json
   git commit -m "Add new pottery pieces"
   git push
   ```

5. **Vercel auto-deploys** (~2 minutes)

### Editing Pieces

Edit `data/pottery.json` directly:
```json
{
  "pieces": [
    {
      "id": "9-new-vase",
      "title": "Beautiful New Vase",
      "description": "Hand-thrown ceramic vase",
      "collection": "Vases",
      "images": [
        {
          "url": "https://res.cloudinary.com/dfrzq3gvh/image/upload/v1234567890/piece-9.jpg",
          "publicId": "piece-9",
          "width": 1200,
          "height": 1800
        }
      ],
      "featured": true,
      "createdAt": "2024-11-09T12:00:00Z",
      "updatedAt": "2024-11-09T12:00:00Z"
    }
  ]
}
```

---

## Recommended Next Steps

### For Demo/Testing (Now)
✅ Accept limitation
✅ Use local upload + git push workflow

### For Production (Within 1 week)
1. ⭐ Implement Vercel Postgres (RECOMMENDED)
2. Migrate existing pottery.json data
3. Enable artist self-service uploads

### Migration Checklist
- [ ] Set up Vercel Postgres database
- [ ] Create database schema (pottery_pieces table)
- [ ] Update `src/lib/db.ts` to use SQL
- [ ] Migrate data from pottery.json to database
- [ ] Test upload/delete in production
- [ ] Update documentation

---

## Error Reference

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Delete/Upload requires a database" | Trying to write to file on Vercel | Use database or accept limitation |
| "Failed to delete piece" | Same as above | Same as above |
| "Unauthorized - please log in again" | Auth token expired/missing | Log in to admin again |
| "Piece not found" | Trying to delete non-existent piece | Refresh dashboard |

---

## Questions?

**Q: Can I fix this without a database?**
A: No. Vercel's filesystem is read-only by design for security and scalability.

**Q: Why did login work but upload doesn't?**
A: Login only reads files (environment variables), doesn't write anything.

**Q: Will existing pieces disappear?**
A: No! Pieces in pottery.json are deployed with your code and persist.

**Q: What happens if I try to upload on production?**
A: Error message will appear, no data will be saved, Cloudinary image might upload (wasted storage).

**Q: Is there a free database option?**
A: Yes! Vercel Postgres free tier or MongoDB Atlas free tier (512MB).

---

## Current Status

- **Local Development**: ✅ Upload/Delete works perfectly
- **Production (Vercel)**: ❌ Upload/Delete fails (read-only filesystem)
- **Workaround**: ✅ Manual git push workflow
- **Permanent Fix**: ⏳ Pending database migration

---

**Last Updated**: 2025-11-09
**Author**: Claude Code
