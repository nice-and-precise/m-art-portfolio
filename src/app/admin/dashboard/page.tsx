// Admin Dashboard - Last updated: 2025-11-08
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { PotteryPiece } from '@/types/pottery';

export default function AdminDashboard() {
  const [pieces, setPieces] = useState<PotteryPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    loadPieces();
  }, []);

  const loadPieces = async () => {
    try {
      const res = await fetch('/api/pieces');
      if (res.ok) {
        const data = await res.json();
        setPieces(data);
      }
    } catch (err) {
      console.error('Failed to load pieces:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this piece?')) return;

    try {
      const res = await fetch(`/api/pieces/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPieces(pieces.filter(p => p.id !== id));
      } else {
        alert('Failed to delete piece');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    try {
      // Upload image to Cloudinary
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadRes.ok) throw new Error('Upload failed');
      const imageData = await uploadRes.json();

      // Create pottery piece
      const pieceData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        collection: formData.get('collection') as string,
        images: [imageData],
        featured: formData.get('featured') === 'on',
      };

      const createRes = await fetch('/api/pieces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pieceData),
      });

      if (createRes.ok) {
        setShowUploadForm(false);
        loadPieces();
        (e.target as HTMLFormElement).reset();
      } else {
        alert('Failed to create piece');
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-clay-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif text-clay-900">Admin Dashboard</h1>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-clay-500 hover:bg-clay-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {showUploadForm ? 'Cancel' : '+ New Piece'}
          </button>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 animate-slide-down">
            <h2 className="text-2xl font-serif mb-6 text-clay-900">Upload New Piece</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-clay-700 mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="w-full px-4 py-2 border border-clay-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-clay-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2 border border-clay-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-clay-700 mb-2">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-4 py-2 border border-clay-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-clay-700 mb-2">Collection</label>
                <select
                  name="collection"
                  required
                  className="w-full px-4 py-2 border border-clay-300 rounded-lg"
                >
                  <option value="Vases">Vases</option>
                  <option value="Bowls">Bowls</option>
                  <option value="Sculptural">Sculptural</option>
                  <option value="Functional">Functional</option>
                  <option value="Decorative">Decorative</option>
                  <option value="Experimental">Experimental</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm text-clay-700">
                  Featured piece
                </label>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-clay-500 hover:bg-clay-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </form>
          </div>
        )}

        {/* Pieces Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="aspect-square bg-clay-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pieces.map(piece => (
              <div key={piece.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={piece.images[0]?.url || '/placeholder.jpg'}
                    alt={piece.title}
                    fill
                    className="object-cover"
                  />
                  {piece.featured && (
                    <span className="absolute top-2 right-2 bg-clay-500 text-white px-3 py-1 rounded-full text-xs">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-serif text-lg mb-1 text-clay-900">{piece.title}</h3>
                  <p className="text-sm text-clay-600 mb-4">{piece.collection}</p>

                  <button
                    onClick={() => handleDelete(piece.id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
