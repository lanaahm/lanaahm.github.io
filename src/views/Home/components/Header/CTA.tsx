import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../config/store';
import { setNav } from '../../../../config/store/action';
import CV from '../../../../assets/CV_Maulana Ahmad Maliki.pdf';

const CTA: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings);
  const remoteCvUrl = settings[0]?.cv_url;
  const cvHref = remoteCvUrl || CV;

  return (
    <div className="cta">
      <a
        href={cvHref}
        target={remoteCvUrl ? '_blank' : undefined}
        download="Maulana Ahmad Maliki - Resume.pdf"
        className="btn"
        rel="noreferrer"
      >
        Download CV
      </a>
      <a
        href="#about"
        className="btn btn-primary"
        onClick={() => dispatch(setNav('#about'))}
      >
        Let&apos;s Talk
      </a>
    </div>
  );
};

export default CTA;
