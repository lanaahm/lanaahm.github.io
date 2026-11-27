import { vi } from 'vitest';
import { sendContactEmail, EmailClient } from './emailService';

describe('emailService', () => {
  test('throws when formElement is missing', async () => {
    await expect(sendContactEmail(null)).rejects.toThrow('Contact form element is required.');
  });

  test('delegates form submission to injected email client', async () => {
    const sendForm = vi.fn().mockResolvedValue({ status: 200, text: 'OK' });
    const mockClient: EmailClient = { sendForm };
    const fakeForm = document.createElement('form');

    const result = await sendContactEmail(fakeForm, mockClient);
    expect(result).toEqual({ status: 200, text: 'OK' });
    expect(sendForm).toHaveBeenCalledTimes(1);
    expect(sendForm.mock.calls[0][2]).toBe(fakeForm);
  });
});
