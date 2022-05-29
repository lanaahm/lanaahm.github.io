import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BiBook, BiMessageSquareDetail } from 'react-icons/bi';
import { RiServiceLine } from 'react-icons/ri';

import { setNav } from '../../../../config/store/action';
import './nav.scss';

const Nav = ({ activeNav, setActiveNav }) => (
  <nav>
    <a
      href="/#"
      className={activeNav === '#' ? 'active' : ''}
      onClick={() => setActiveNav('#')}
    >
      <AiOutlineHome />
    </a>
    <a
      href="#about"
      className={activeNav === '#about' ? 'active' : ''}
      onClick={() => setActiveNav('#about')}
    >
      <AiOutlineUser />
    </a>
    <a
      href="#experience"
      className={activeNav === '#experience' ? 'active' : ''}
      onClick={() => setActiveNav('#experience')}
    >
      <RiServiceLine />
    </a>
    <a
      href="#portfolio"
      className={activeNav === '#portfolio' ? 'active' : ''}
      onClick={() => setActiveNav('#portfolio')}
    >
      <BiBook />
    </a>
    <a
      href="#contact"
      className={activeNav === '#contact' ? 'active' : ''}
      onClick={() => setActiveNav('#contact')}
    >
      <BiMessageSquareDetail />
    </a>
  </nav>
);

const mapStateToProps = (state) => ({
  activeNav: state.activeNav
});

const mapDispatchToProps = (dispatch) => ({
  setActiveNav: (activate) => dispatch(setNav(activate))
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
