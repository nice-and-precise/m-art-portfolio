// Contact form types
// Last updated: 2025-11-09

export type InquiryType =
  | 'commission'
  | 'purchase'
  | 'collaboration'
  | 'exhibition'
  | 'general';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType: InquiryType;
  message: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone?: string;
  inquiryType: InquiryType;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
