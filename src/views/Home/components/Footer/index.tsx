import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaLinkedinIn, FaGithub, FaKaggle, FaMediumM } from 'react-icons/fa';
import Skeleton from '../../../../components/skeleton/Skeleton';
import type { AppDispatch, RootState } from '../../../../config/store';
import { setNav } from '../../../../config/store/action';
import './footer.scss';

const Footer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { settings, isLoading } = useSelector((state: RootState) => state);
  const showSkeleton = isLoading && settings.length === 0;

  const handleNav = (section: string) => {
    dispatch(setNav(section));
  };

  return (
    <footer>
      <a href="/#" className="footer__logo" onClick={() => handleNav('#')}>
        L A N
      </a>
      <ul className="permalinks">
        <li>
          <a href="/#" onClick={() => handleNav('#')}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => handleNav('#about')}>
            About
          </a>
        </li>
        <li>
          <a href="#experience" onClick={() => handleNav('#experience')}>
            Experience
          </a>
        </li>
        <li>
          <a href="#portfolio" onClick={() => handleNav('#portfolio')}>
            portfolio
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => handleNav('#contact')}>
            Contact
          </a>
        </li>
      </ul>

      {showSkeleton ? (
        <div className="footer__socials">
          {[0, 1, 2, 3].map((slot) => (
            <Skeleton key={slot} width={38} height={38} borderRadius="0.7rem" />
          ))}
        </div>
      ) : (
        settings.map((profile) => (
          <div className="footer__socials" key={profile.id}>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href={profile.kaggle} target="_blank" rel="noreferrer">
              <FaKaggle />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href={profile.medium} target="_blank" rel="noreferrer">
              <FaMediumM />
            </a>
          </div>
        ))
      )}
      <div className="footer__copyright">
        <small>&copy; L A N {new Date().getFullYear()}. All rights reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
