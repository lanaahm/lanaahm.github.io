import React from 'react';
import { connect } from 'react-redux';
import CTA from './CTA';
import ME from '../../../../assets/images/me.png';
import HeaderSocials from './HeaderSocials';
import './header.scss';

const Header = ({ settings }) => (
  <header>
    <div className="container header__container">
      <h5>Hello I'm</h5>
      <h1>L A N</h1>
      <h5 className="text-light">Software Developer</h5>

      <CTA />

      {settings.map((x, index) => (
        <HeaderSocials
          key={`${index.toString()}`}
          linkedin={x.linkedin}
          github={x.github}
          kaggle={x.kaggle}
          medium={x.medium}
        />
      ))}

      <div className="me">
        <img src={ME} alt="me" />
      </div>

      <a href="#about" className="scroll_down">
        Scroll Down
      </a>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps, null)(Header);
