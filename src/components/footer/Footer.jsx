/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './footer.css';
import { FaLinkedinIn, FaGithub, FaKaggle, FaMediumM } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <a href="#" className="footer__logo">
        L A N
      </a>
      <ul className="permalinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#experience">Experience</a>
        </li>
        <li>
          <a href="#portfolio">portfolio</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="footer__socials">
        <a href="http://linkin.cin">
          <FaLinkedinIn />
        </a>
        <a href="http://kaggle.com">
          <FaKaggle />
        </a>
        <a href="http://github.com">
          <FaGithub />
        </a>
        <a href="http://instagram.com">
          <FaMediumM />
        </a>
      </div>
      <div className="footer__copyright">
        <small>
          &copy; L A N {new Date().getFullYear()}. All rights reserved
        </small>
      </div>
    </footer>
  );
}

export default Footer;
