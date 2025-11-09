// Supabase database utilities
// Last updated: 2025-11-09 - Migrated to Supabase JS client (REST API)
// Fix #4: Use Supabase's REST API designed for serverless (after 3 failed direct Postgres attempts)

import { createClient } from '@supabase/supabase-js';
import type { PotteryPiece, Collection } from '@/types/pottery';
import type { ContactSubmission, CreateContactRequest } from '@/types/contact';

// Create Supabase client using service role key for server-side operations
// Service role bypasses RLS (Row Level Security) for admin operations
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Read all pottery pieces
 */
export async function getAllPieces(): Promise<PotteryPiece[]> {
  try {
    const { data, error } = await supabase
      .from('pottery_pieces')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error in getAllPieces:', error);
      throw new Error('Failed to fetch pottery pieces from database');
    }

    // Transform snake_case to camelCase for TypeScript
    return (data || []).map(transformDbToPotteryPiece);
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
    const { data, error } = await supabase
      .from('pottery_pieces')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null;
      }
      console.error(`Supabase error in getPieceById(${id}):`, error);
      return null;
    }

    return transformDbToPotteryPiece(data);
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
    const { data, error } = await supabase
      .from('pottery_pieces')
      .select('*')
      .eq('collection', collection)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Supabase error in getPiecesByCollection(${collection}):`, error);
      return [];
    }

    return (data || []).map(transformDbToPotteryPiece);
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
    const { data, error } = await supabase
      .from('pottery_pieces')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error in getFeaturedPieces:', error);
      return [];
    }

    return (data || []).map(transformDbToPotteryPiece);
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

    const { data, error } = await supabase
      .from('pottery_pieces')
      .insert({
        id,
        title: piece.title,
        description: piece.description || null,
        collection: piece.collection,
        images: piece.images,
        featured: piece.featured,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error in createPiece:', error);
      throw new Error('Failed to create pottery piece');
    }

    return transformDbToPotteryPiece(data);
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

    // Build update object, transforming camelCase to snake_case where needed
    const updateData: any = {
      updated_at: now,
    };

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.collection !== undefined) updateData.collection = updates.collection;
    if (updates.images !== undefined) updateData.images = updates.images;
    if (updates.featured !== undefined) updateData.featured = updates.featured;

    const { data, error } = await supabase
      .from('pottery_pieces')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null;
      }
      console.error(`Supabase error in updatePiece(${id}):`, error);
      throw new Error('Failed to update pottery piece');
    }

    return transformDbToPotteryPiece(data);
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
    const { error } = await supabase
      .from('pottery_pieces')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Supabase error in deletePiece(${id}):`, error);
      throw new Error('Failed to delete pottery piece');
    }

    return true;
  } catch (error) {
    console.error(`Database error in deletePiece(${id}):`, error);
    throw new Error('Failed to delete pottery piece');
  }
}

/**
 * Transform database row to PotteryPiece type (snake_case → camelCase)
 */
function transformDbToPotteryPiece(row: any): PotteryPiece {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    collection: row.collection,
    images: row.images,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Generate unique ID
 */
function generateId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}`;
}

// ============================================================================
// CONTACT SUBMISSIONS
// ============================================================================

/**
 * Create new contact submission
 */
export async function createContactSubmission(
  submission: CreateContactRequest
): Promise<ContactSubmission> {
  try {
    const id = generateId();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        id,
        name: submission.name,
        email: submission.email,
        phone: submission.phone || null,
        inquiry_type: submission.inquiryType,
        message: submission.message,
        status: 'new',
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error in createContactSubmission:', error);
      throw new Error('Failed to create contact submission');
    }

    return transformDbToContactSubmission(data);
  } catch (error) {
    console.error('Database error in createContactSubmission:', error);
    throw new Error('Failed to create contact submission');
  }
}

/**
 * Get all contact submissions
 */
export async function getAllContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error in getAllContactSubmissions:', error);
      return [];
    }

    return (data || []).map(transformDbToContactSubmission);
  } catch (error) {
    console.error('Database error in getAllContactSubmissions:', error);
    return [];
  }
}

/**
 * Transform database row to ContactSubmission type (snake_case → camelCase)
 */
function transformDbToContactSubmission(row: any): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    inquiryType: row.inquiry_type,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
