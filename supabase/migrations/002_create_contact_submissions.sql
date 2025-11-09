-- M_ART Contact Submissions Table
-- Run this in Supabase SQL Editor to create the contact_submissions table
-- Last updated: 2025-11-09

CREATE TABLE IF NOT EXISTS contact_submissions (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  inquiry_type VARCHAR(50) NOT NULL CHECK (inquiry_type IN ('commission', 'purchase', 'collaboration', 'exhibition', 'general')),
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_inquiry_type ON contact_submissions(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
