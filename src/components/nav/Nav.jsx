import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BiBook, BiMessageSquareDetail } from 'react-icons/bi';
import { RiServiceLine } from 'react-icons/ri';
import './nav.css';

function Nav() {
  const [activeNav, setActivateNav] = useState('#');
  return (
    <nav>
      <a
        href="/#"
        className={activeNav === '#' ? 'active' : ''}
        onClick={() => setActivateNav('#')}
      >
        <AiOutlineHome />
      </a>
      <a
        href="#about"
        className={activeNav === '#about' ? 'active' : ''}
        onClick={() => setActivateNav('#about')}
      >
        <AiOutlineUser />
      </a>
      <a
        href="#experience"
        className={activeNav === '#experience' ? 'active' : ''}
        onClick={() => setActivateNav('#experience')}
      >
        <RiServiceLine />
      </a>
      <a
        href="#portfolio"
        className={activeNav === '#portfolio' ? 'active' : ''}
        onClick={() => setActivateNav('#portfolio')}
      >
        <BiBook />
      </a>
      <a
        href="#contact"
        className={activeNav === '#contact' ? 'active' : ''}
        onClick={() => setActivateNav('#contact')}
      >
        <BiMessageSquareDetail />
      </a>
    </nav>
  );
}

export default Nav;
