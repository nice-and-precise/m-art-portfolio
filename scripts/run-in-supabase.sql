-- M_ART Pottery Database Schema
-- Copy ONLY this file (no markdown backticks)

CREATE TABLE IF NOT EXISTS pottery_pieces (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  collection VARCHAR(100) NOT NULL,
  images JSONB NOT NULL DEFAULT '[]',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_featured ON pottery_pieces(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_collection ON pottery_pieces(collection);
CREATE INDEX IF NOT EXISTS idx_created_at ON pottery_pieces(created_at DESC);

INSERT INTO pottery_pieces (id, title, description, collection, images, featured, created_at, updated_at)
VALUES
  ('1-elegant-vase', 'Elegant Terracotta Vase', 'Hand-thrown terracotta vase with natural earth tones and organic form', 'Vases', '[{"url": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&q=80", "publicId": "sample-1", "width": 1200, "height": 1800}]'::jsonb, TRUE, '2024-11-01T12:00:00Z', '2024-11-01T12:00:00Z'),
  ('2-celadon-bowl', 'Celadon Glazed Bowl', 'Handcrafted ceramic bowl with traditional celadon glaze finish', 'Bowls', '[{"url": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&q=80", "publicId": "sample-2", "width": 1200, "height": 1200}]'::jsonb, TRUE, '2024-11-02T12:00:00Z', '2024-11-02T12:00:00Z'),
  ('3-organic-sculpture', 'Organic Form Sculpture', 'Contemporary sculptural piece exploring fluid ceramic forms', 'Sculptural', '[{"url": "https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=1200&q=80", "publicId": "sample-3", "width": 1200, "height": 1600}]'::jsonb, TRUE, '2024-11-03T12:00:00Z', '2024-11-03T12:00:00Z'),
  ('4-artisan-mug', 'Artisan Coffee Mug', 'Hand-thrown stoneware mug with comfortable handle and rustic glaze', 'Functional', '[{"url": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1200&q=80", "publicId": "sample-4", "width": 1200, "height": 1200}]'::jsonb, FALSE, '2024-11-04T12:00:00Z', '2024-11-04T12:00:00Z'),
  ('5-minimalist-vessels', 'Minimalist Vessel Collection', 'Clean lines and matte glazes in neutral earth tones', 'Decorative', '[{"url": "https://images.unsplash.com/photo-1603904336647-f7c41c7bfa39?w=1200&q=80", "publicId": "sample-5", "width": 1200, "height": 1600}]'::jsonb, TRUE, '2024-11-05T12:00:00Z', '2024-11-05T12:00:00Z'),
  ('6-textured-vase', 'Textured Ceramic Vase', 'Exploring surface texture and form with contemporary glazing techniques', 'Vases', '[{"url": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80", "publicId": "sample-6", "width": 1200, "height": 1500}]'::jsonb, TRUE, '2024-11-06T12:00:00Z', '2024-11-06T12:00:00Z'),
  ('7-raku-bowl', 'Raku Fired Bowl', 'Traditional raku firing technique creating unique crackle patterns', 'Bowls', '[{"url": "https://images.unsplash.com/photo-1610878722345-79c5eaf6a48c?w=1200&q=80", "publicId": "sample-7", "width": 1200, "height": 1500}]'::jsonb, TRUE, '2024-11-07T12:00:00Z', '2024-11-07T12:00:00Z'),
  ('8-abstract-form', 'Abstract Ceramic Form', 'Experimental piece pushing boundaries of traditional pottery', 'Experimental', '[{"url": "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=1200&q=80", "publicId": "sample-8", "width": 1200, "height": 1800}]'::jsonb, FALSE, '2024-11-08T12:00:00Z', '2024-11-08T12:00:00Z')
ON CONFLICT (id) DO NOTHING;
