// Vercel Postgres database utilities
// Last updated: 2025-11-09 - Migrated from JSON file storage to Postgres

import { sql } from '@vercel/postgres';
import type { PotteryPiece, Collection } from '@/types/pottery';

/**
 * Read all pottery pieces
 */
export async function getAllPieces(): Promise<PotteryPiece[]> {
  try {
    const result = await sql<PotteryPiece>`
      SELECT
        id,
        title,
        description,
        collection,
        images,
        featured,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM pottery_pieces
      ORDER BY created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database error in getAllPieces:', error);
    throw new Error('Failed to fetch pottery pieces from database');
  }
}

/**
 * Get pottery piece by ID
 */
export async function getPieceById(id: string): Promise<PotteryPiece | null> {
  try {
    const result = await sql<PotteryPiece>`
      SELECT
        id,
        title,
        description,
        collection,
        images,
        featured,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM pottery_pieces
      WHERE id = ${id}
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Database error in getPieceById(${id}):`, error);
    return null;
  }
}

/**
 * Get pottery pieces by collection
 */
export async function getPiecesByCollection(collection: Collection): Promise<PotteryPiece[]> {
  try {
    const result = await sql<PotteryPiece>`
      SELECT
        id,
        title,
        description,
        collection,
        images,
        featured,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM pottery_pieces
      WHERE collection = ${collection}
      ORDER BY created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error(`Database error in getPiecesByCollection(${collection}):`, error);
    return [];
  }
}

/**
 * Get featured pottery pieces
 */
export async function getFeaturedPieces(): Promise<PotteryPiece[]> {
  try {
    const result = await sql<PotteryPiece>`
      SELECT
        id,
        title,
        description,
        collection,
        images,
        featured,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM pottery_pieces
      WHERE featured = TRUE
      ORDER BY created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database error in getFeaturedPieces:', error);
    return [];
  }
}

/**
 * Create new pottery piece
 */
export async function createPiece(piece: Omit<PotteryPiece, 'id' | 'createdAt' | 'updatedAt'>): Promise<PotteryPiece> {
  try {
    const id = generateId();
    const now = new Date().toISOString();

    const result = await sql<PotteryPiece>`
      INSERT INTO pottery_pieces (
        id, title, description, collection, images, featured, created_at, updated_at
      )
      VALUES (
        ${id},
        ${piece.title},
        ${piece.description || null},
        ${piece.collection},
        ${JSON.stringify(piece.images)}::jsonb,
        ${piece.featured},
        ${now},
        ${now}
      )
      RETURNING
        id,
        title,
        description,
        collection,
        images,
        featured,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `;

    return result.rows[0];
  } catch (error) {
    console.error('Database error in createPiece:', error);
    throw new Error('Failed to create pottery piece');
  }
}

/**
 * Update pottery piece
 */
export async function updatePiece(id: string, updates: Partial<PotteryPiece>): Promise<PotteryPiece | null> {
  try {
    const now = new Date().toISOString();

    // Build dynamic update query based on provided fields
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(updates.title);
    }
    if (updates.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(updates.description);
    }
    if (updates.collection !== undefined) {
      fields.push(`collection = $${paramIndex++}`);
      values.push(updates.collection);
    }
    if (updates.images !== undefined) {
      fields.push(`images = $${paramIndex++}::jsonb`);
      values.push(JSON.stringify(updates.images));
    }
    if (updates.featured !== undefined) {
      fields.push(`featured = $${paramIndex++}`);
      values.push(updates.featured);
    }

    // Always update updated_at
    fields.push(`updated_at = $${paramIndex++}`);
    values.push(now);

    // Add id for WHERE clause
    values.push(id);

    if (fields.length === 1) {
      // Only updated_at, nothing to update
      return await getPieceById(id);
    }

    // Build the UPDATE query manually since @vercel/postgres doesn't support sql.raw()
    const setClause = fields.join(', ');
    const query = `
      UPDATE pottery_pieces
      SET ${setClause}
      WHERE id = $${paramIndex}
      RETURNING
        id,
        title,
        description,
        collection,
        images,
        featured,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `;

    const result = await sql.query<PotteryPiece>(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Database error in updatePiece(${id}):`, error);
    throw new Error('Failed to update pottery piece');
  }
}

/**
 * Delete pottery piece
 */
export async function deletePiece(id: string): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM pottery_pieces
      WHERE id = ${id}
    `;

    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(`Database error in deletePiece(${id}):`, error);
    throw new Error('Failed to delete pottery piece');
  }
}

/**
 * Generate unique ID
 */
function generateId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}`;
}
