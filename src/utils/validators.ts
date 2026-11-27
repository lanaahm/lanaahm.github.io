const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_PDF_BYTES = 10 * 1024 * 1024;

export interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Ensures a table name is a non-empty string.
 */
export const validateTableName = (tableName: string): string => {
  if (typeof tableName !== 'string' || !tableName.trim()) {
    throw new Error('Table name must be a non-empty string.');
  }
  return tableName.trim();
};

/**
 * Ensures a record ID is a non-empty string.
 */
export const validateDocumentId = (id: string): string => {
  if (typeof id !== 'string' || !id.trim()) {
    throw new Error('Document ID must be a non-empty string.');
  }
  return id.trim();
};

/**
 * Validates an image file before uploading to Supabase Storage.
 */
export const validateImageFile = (file: File): void => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Only JPEG and PNG images are allowed.');
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('Image size must not exceed 5 MB.');
  }
};

/**
 * Validates a PDF file before uploading to Supabase Storage.
 */
export const validatePdfFile = (file: File): void => {
  if (file.type !== 'application/pdf') {
    throw new Error('Only PDF files are allowed.');
  }
  if (file.size > MAX_PDF_BYTES) {
    throw new Error('PDF size must not exceed 10 MB.');
  }
};

/**
 * Validates contact form fields at the UI boundary before sending via EmailJS.
 */
export const validateContactFields = ({
  name,
  email,
  subject,
  message
}: ContactFields): ValidationResult => {
  const errors: Record<string, string> = {};
  if (!name || !name.trim()) errors.name = 'Full name is required.';
  if (!email || !EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Valid email address is required.';
  }
  if (!subject || !subject.trim()) errors.subject = 'Subject is required.';
  if (!message || !message.trim()) errors.message = 'Message is required.';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
