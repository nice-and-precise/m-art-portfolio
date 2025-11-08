// JSON file database utilities
// Last updated: 2025-11-08

import fs from 'fs/promises';
import path from 'path';
import type { PotteryPiece, Collection } from '@/types/pottery';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'pottery.json');

interface Database {
  pieces: PotteryPiece[];
}

/**
 * Initialize database file if it doesn't exist
 */
async function initDB(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(DB_FILE);
  } catch {
    const initialData: Database = { pieces: [] };
    await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
  }
}

/**
 * Read all pottery pieces
 */
export async function getAllPieces(): Promise<PotteryPiece[]> {
  await initDB();
  const data = await fs.readFile(DB_FILE, 'utf-8');
  const db: Database = JSON.parse(data);
  return db.pieces;
}

/**
 * Get pottery piece by ID
 */
export async function getPieceById(id: string): Promise<PotteryPiece | null> {
  const pieces = await getAllPieces();
  return pieces.find((p) => p.id === id) || null;
}

/**
 * Get pottery pieces by collection
 */
export async function getPiecesByCollection(collection: Collection): Promise<PotteryPiece[]> {
  const pieces = await getAllPieces();
  return pieces.filter((p) => p.collection === collection);
}

/**
 * Get featured pottery pieces
 */
export async function getFeaturedPieces(): Promise<PotteryPiece[]> {
  const pieces = await getAllPieces();
  return pieces.filter((p) => p.featured);
}

/**
 * Create new pottery piece
 */
export async function createPiece(piece: Omit<PotteryPiece, 'id' | 'createdAt' | 'updatedAt'>): Promise<PotteryPiece> {
  await initDB();
  const pieces = await getAllPieces();

  const newPiece: PotteryPiece = {
    ...piece,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  pieces.push(newPiece);
  await savePieces(pieces);
  return newPiece;
}

/**
 * Update pottery piece
 */
export async function updatePiece(id: string, updates: Partial<PotteryPiece>): Promise<PotteryPiece | null> {
  const pieces = await getAllPieces();
  const index = pieces.findIndex((p) => p.id === id);

  if (index === -1) return null;

  pieces[index] = {
    ...pieces[index],
    ...updates,
    id, // Prevent ID change
    updatedAt: new Date().toISOString(),
  };

  await savePieces(pieces);
  return pieces[index];
}

/**
 * Delete pottery piece
 */
export async function deletePiece(id: string): Promise<boolean> {
  const pieces = await getAllPieces();
  const filtered = pieces.filter((p) => p.id !== id);

  if (filtered.length === pieces.length) return false;

  await savePieces(filtered);
  return true;
}

/**
 * Save pieces to file (atomic write)
 */
async function savePieces(pieces: PotteryPiece[]): Promise<void> {
  const db: Database = { pieces };
  const tempFile = `${DB_FILE}.tmp`;

  await fs.writeFile(tempFile, JSON.stringify(db, null, 2));
  await fs.rename(tempFile, DB_FILE);
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
