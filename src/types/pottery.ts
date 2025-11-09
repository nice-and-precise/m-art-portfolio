// Pottery data types
// Last updated: 2025-11-08

export interface PotteryPiece {
  id: string;
  title: string;
  description?: string;
  collection: Collection;
  images: PotteryImage[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PotteryImage {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
}

export type Collection = 'Vases' | 'Bowls' | 'Sculptural' | 'Functional' | 'Decorative' | 'Experimental' | 'Portfolio';

export const COLLECTIONS: Collection[] = [
  'Vases',
  'Bowls',
  'Sculptural',
  'Functional',
  'Decorative',
  'Experimental',
  'Portfolio',
];

// Admin types
export interface LoginRequest {
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface CreatePieceRequest {
  title: string;
  description?: string;
  collection: Collection;
  images: PotteryImage[];
  featured?: boolean;
}

export interface UpdatePieceRequest extends Partial<CreatePieceRequest> {
  id: string;
}

// API response types
export interface ApiError {
  error: string;
}

export interface ApiSuccess<T = unknown> {
  success: boolean;
  data?: T;
}
