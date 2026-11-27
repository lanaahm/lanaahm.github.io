import {
  validateContactFields,
  validateDocumentId,
  validateImageFile,
  validateTableName
} from './validators';

describe('validators', () => {
  test('validateTableName trims valid names and rejects empty values', () => {
    expect(validateTableName(' portfolio ')).toBe('portfolio');
    expect(() => validateTableName('')).toThrow('Table name');
  });

  test('validateDocumentId trims valid IDs and rejects invalid values', () => {
    expect(validateDocumentId(' doc-1 ')).toBe('doc-1');
    expect(() => validateDocumentId('   ')).toThrow('Document ID');
  });

  test('validateImageFile accepts jpeg/png under 5MB and rejects others', () => {
    const valid = new File(['abc'], 'cover.png', { type: 'image/png' });
    expect(() => validateImageFile(valid)).not.toThrow();

    const invalidType = new File(['abc'], 'script.svg', { type: 'image/svg+xml' });
    expect(() => validateImageFile(invalidType)).toThrow('JPEG and PNG');
  });

  test('validateContactFields accepts valid input and flags invalid fields', () => {
    const valid = validateContactFields({
      name: 'Maulana',
      email: 'user@example.com',
      subject: 'Hello',
      message: 'Message body'
    });
    expect(valid).toEqual({ isValid: true, errors: {} });

    const invalid = validateContactFields({
      name: '',
      email: 'not-an-email',
      subject: '',
      message: ''
    });
    expect(invalid.isValid).toBe(false);
    expect(Object.keys(invalid.errors)).toEqual(['name', 'email', 'subject', 'message']);
  });
});
