import React from 'react';
import { connect } from 'react-redux';
import { FaLinkedinIn, FaGithub, FaKaggle, FaMediumM } from 'react-icons/fa';
import { setNav } from '../../../../config/store/action';

import './footer.scss';

const Footer = ({ settings, setActiveNav }) => (
  <footer>
    <a href="/#" className="footer__logo" onClick={() => setActiveNav('#')}>
      L A N
    </a>
    <ul className="permalinks">
      <li>
        <a href="/#" onClick={() => setActiveNav('#')}>
          Home
        </a>
      </li>
      <li>
        <a href="#about" onClick={() => setActiveNav('#about')}>
          About
        </a>
      </li>
      <li>
        <a href="#experience" onClick={() => setActiveNav('#experience')}>
          Experience
        </a>
      </li>
      <li>
        <a href="#portfolio" onClick={() => setActiveNav('#portfolio')}>
          portfolio
        </a>
      </li>
      <li>
        <a href="#contact" onClick={() => setActiveNav('#contact')}>
          Contact
        </a>
      </li>
    </ul>

    {settings.map((x, index) => (
      <div className="footer__socials" key={`${index.toString()}`}>
        <a href={x.linkedin} target="_blank" rel="noreferrer">
          <FaLinkedinIn />
        </a>
        <a href={x.kaggle} target="_blank" rel="noreferrer">
          <FaKaggle />
        </a>
        <a href={x.github} target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a href={x.medium} target="_blank" rel="noreferrer">
          <FaMediumM />
        </a>
      </div>
    ))}
    <div className="footer__copyright">
      <small>
        &copy; L A N {new Date().getFullYear()}. All rights reserved
      </small>
    </div>
  </footer>
);

const mapStateToProps = (state) => ({
  settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
  setActiveNav: (activate) => dispatch(setNav(activate))
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
