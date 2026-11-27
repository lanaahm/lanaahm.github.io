import React from 'react';
import { BsLinkedin, BsGithub, BsMedium } from 'react-icons/bs';
import { FaKaggle } from 'react-icons/fa';

interface HeaderSocialsProps {
  linkedin: string;
  github: string;
  kaggle: string;
  medium: string;
}

const HeaderSocials: React.FC<HeaderSocialsProps> = ({
  linkedin,
  github,
  kaggle,
  medium
}) => (
  <div className="header__socials">
    <a href={linkedin} target="_blank" rel="noreferrer">
      <BsLinkedin />
    </a>
    <a href={github} target="_blank" rel="noreferrer">
      <BsGithub />
    </a>
    <a href={kaggle} target="_blank" rel="noreferrer">
      <FaKaggle />
    </a>
    <a href={medium} target="_blank" rel="noreferrer">
      <BsMedium />
    </a>
  </div>
);

export default HeaderSocials;
