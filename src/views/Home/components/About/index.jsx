import React from 'react';
import { FaAward } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import { connect } from 'react-redux';
import { setNav } from '../../../../config/store/action';

import ME from '../../../../assets/images/me-about-images.jpg';
import './about.scss';

const About = ({
  employeeHistory,
  certification,
  portfolio,
  settings,
  setActiveNav
}) => (
  <section id="about">
    <h5>Get To Know</h5>
    <h2>About me</h2>

    <div className="container about__container">
      <div className="about__me">
        <div className="about__me-image">
          <img src={ME} alt="About Image" aria-hidden />
        </div>
      </div>
      {settings.map((x, index) => (
        <div className="about__content" key={`${index.toString()}`}>
          <div className="about__cards">
            <article className="about__card">
              <FiUsers />
              <h5>Experience</h5>
              <small>{employeeHistory.length} companies</small>
            </article>
            <article className="about__card">
              <FaAward />
              <h5>Certificate</h5>
              <small>{certification.length} certifications</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary />
              <h5>Project</h5>
              <small>{portfolio.length} Projects</small>
            </article>
          </div>
          <p>{x.description}</p>
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={() => setActiveNav('#contact')}
          >
            Let's Talk
          </a>
        </div>
      ))}
    </div>
  </section>
);

const mapStateToProps = (state) => ({
  employeeHistory: state.employeeHistory,
  certification: state.certification,
  portfolio: state.portfolio,
  settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
  setActiveNav: (activate) => dispatch(setNav(activate))
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
