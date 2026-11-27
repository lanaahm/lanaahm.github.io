import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineEmail } from 'react-icons/md';
import { BsWhatsapp, BsTelephone } from 'react-icons/bs';
import type { RootState } from '../../../../config/store';
import { sendContactEmail } from '../../../../services/emailService';
import { validateContactFields } from '../../../../utils/validators';
import './contact.scss';

interface SubmitStatus {
  type: 'idle' | 'sending' | 'success' | 'error';
  message: string;
}

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>({ type: 'idle', message: '' });
  const profile = useSelector((state: RootState) => state.settings[0]);

  const contactEmail = profile?.email || 'maulanamaliki2007@gmail.com';
  const contactPhone = profile?.number_phone || '6281234474958';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const { isValid } = validateContactFields({
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || '')
    });

    if (!isValid) {
      setStatus({ type: 'error', message: 'Please complete all fields with a valid email.' });
      return;
    }

    setStatus({ type: 'sending', message: 'Sending message...' });
    try {
      await sendContactEmail(formRef.current);
      formRef.current.reset();
      setStatus({ type: 'success', message: 'Message sent successfully.' });
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className="contact__option-icon" />
            <h4>Email</h4>
            <a href={`mailto:${contactEmail}`} target="_blank" rel="noreferrer">
              Send Message
            </a>
          </article>
          <article className="contact__option">
            <BsTelephone className="contact__option-icon" />
            <h4>Phone</h4>
            <a href={`tel:+${contactPhone}`} target="_blank" rel="noreferrer">
              Send Message
            </a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className="contact__option-icon" />
            <h4>WhatsApp</h4>
            <a
              href={`https://api.whatsapp.com/send?phone=${contactPhone}`}
              target="_blank"
              rel="noreferrer"
            >
              Send Message
            </a>
          </article>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Full Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea name="message" placeholder="Your Message" required />
          {status.message && <p className={`contact__status ${status.type}`}>{status.message}</p>}
          <button type="submit" className="btn btn-primary" disabled={status.type === 'sending'}>
            {status.type === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
