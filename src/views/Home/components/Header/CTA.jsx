import React from 'react';
import { connect } from 'react-redux';
import { setNav } from '../../../../config/store/action';

import CV from '../../../../assets/CV_Maulana Ahmad Maliki.pdf';

const CTA = ({ settings, setActiveNav }) => (
  <div className="cta">
    {settings.map((x, index) => (
      <a
        target={x.cv !== undefined ? '_blank' : null}
        href={x.cv ?? CV}
        download="CV MAULANA AHMAD MALIKI.PDF"
        className="btn"
        key={`${index.toString()}`}
        rel="noreferrer"
      >
        Download CV
      </a>
    ))}
    <a
      href="#about"
      className="btn btn-primary"
      onClick={() => setActiveNav('#about')}
    >
      Let's Talk
    </a>
  </div>
);

const mapStateToProps = (state) => ({
  settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
  setActiveNav: (activate) => dispatch(setNav(activate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CTA);
