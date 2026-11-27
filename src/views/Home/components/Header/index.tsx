import React from 'react';
import { useSelector } from 'react-redux';
import Skeleton from '../../../../components/skeleton/Skeleton';
import type { RootState } from '../../../../config/store';
import CTA from './CTA';
import ME from '../../../../assets/images/me.png';
import HeaderSocials from './HeaderSocials';
import './header.scss';

const Header: React.FC = () => {
  const { settings, isLoading } = useSelector((state: RootState) => state);
  const showSkeleton = isLoading && settings.length === 0;

  return (
    <header>
      <div className="container header__container">
        <h5>Hello I&apos;m</h5>
        <h1>L A N</h1>
        <h5 className="text-light">Data &amp; Software Engineer</h5>

        <CTA />

        {showSkeleton ? (
          <div className="header__socials">
            {[0, 1, 2, 3].map((slot) => (
              <Skeleton key={slot} width={22} height={22} borderRadius="50%" />
            ))}
          </div>
        ) : (
          settings.map((profile) => (
            <HeaderSocials
              key={profile.id}
              linkedin={profile.linkedin}
              github={profile.github}
              kaggle={profile.kaggle}
              medium={profile.medium}
            />
          ))
        )}

        <div className="me">
          <img src={ME} alt="me" />
        </div>

        <a href="#about" className="scroll_down">
          Scroll Down
        </a>
      </div>
    </header>
  );
};

export default Header;
