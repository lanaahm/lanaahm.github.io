import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

export interface EmailClient {
  sendForm: (
    serviceID: string,
    templateID: string,
    form: HTMLFormElement,
    publicKey?: string
  ) => Promise<EmailJSResponseStatus>;
}

const getEmailConfig = () => ({
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || ''
});

/**
 * Sends a contact form payload via EmailJS using env-backed configuration.
 */
export const sendContactEmail = async (
  formElement: HTMLFormElement | null,
  emailClient: EmailClient = emailjs
): Promise<EmailJSResponseStatus> => {
  if (!formElement) {
    throw new Error('Contact form element is required.');
  }

  const { serviceId, templateId, publicKey } = getEmailConfig();
  return emailClient.sendForm(serviceId, templateId, formElement, publicKey);
};
