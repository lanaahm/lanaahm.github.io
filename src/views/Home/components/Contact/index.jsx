import React, { useRef } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { BsWhatsapp, BsTelephone } from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import './contact.scss';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'Portfolio_SendMail',
        'template_y02qr0f',
        form.current,
        'DpIJh4xv27Shh2_i7'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
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
            <a
              href="mailto:maulanamaliki2007@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Send Message
            </a>
          </article>
          <article className="contact__option">
            <BsTelephone className="contact__option-icon" />
            <h4>Phone</h4>
            <a href="tel:+6281234474958" target="_blank" rel="noreferrer">
              Send Message
            </a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className="contact__option-icon" />
            <h4>Whatapps</h4>
            <a
              href="https://api.whatsapp.com/send?phone=6281234474958"
              target="_blank"
              rel="noreferrer"
            >
              Send Message
            </a>
          </article>
        </div>
        {/* END OF CONTACT OPTIONS */}
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />
          <input type="text" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea name="message" placeholder="Your Message" required />
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
