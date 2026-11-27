import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BiBook, BiMessageSquareDetail } from 'react-icons/bi';
import { RiServiceLine } from 'react-icons/ri';
import type { AppDispatch, RootState } from '../../../../config/store';
import { setNav } from '../../../../config/store/action';
import './nav.scss';

const NAV_SECTIONS = [
  { hash: '#', selector: 'header', label: 'Home', icon: <AiOutlineHome /> },
  { hash: '#about', selector: '#about', label: 'About', icon: <AiOutlineUser /> },
  { hash: '#experience', selector: '#experience', label: 'Experience', icon: <RiServiceLine /> },
  { hash: '#portfolio', selector: '#portfolio', label: 'Portfolio', icon: <BiBook /> },
  { hash: '#contact', selector: '#contact', label: 'Contact', icon: <BiMessageSquareDetail /> }
];

const resolveActiveSection = (): string => {
  const scrollBottom = window.innerHeight + window.scrollY;
  const nearPageBottom = scrollBottom >= document.documentElement.scrollHeight - 80;
  if (nearPageBottom) return '#contact';

  const triggerOffset = window.innerHeight * 0.35;
  let current = '#';

  NAV_SECTIONS.forEach(({ hash, selector }) => {
    const element = document.querySelector(selector);
    if (!element) return;
    if (element.getBoundingClientRect().top <= triggerOffset) {
      current = hash;
    }
  });

  return current;
};

const Nav: React.FC = () => {
  const activeNav = useSelector((state: RootState) => state.activeNav);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let rafId = 0;

    const updateOnScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const nextSection = resolveActiveSection();
        dispatch(setNav(nextSection));
        rafId = 0;
      });
    };

    updateOnScroll();
    window.addEventListener('scroll', updateOnScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateOnScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [dispatch]);

  return (
    <nav aria-label="Section navigation">
      {NAV_SECTIONS.map(({ hash, label, icon }) => (
        <a
          key={hash}
          href={hash === '#' ? '/#' : hash}
          aria-label={label}
          title={label}
          className={activeNav === hash ? 'active' : ''}
          onClick={() => dispatch(setNav(hash))}
        >
          {icon}
        </a>
      ))}
    </nav>
  );
};

export default Nav;
