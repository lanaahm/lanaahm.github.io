import React, { useState } from 'react';
import { FaAward } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '../../../../components/skeleton/Skeleton';
import type { AppDispatch, RootState } from '../../../../config/store';
import { setNav } from '../../../../config/store/action';
import ME from '../../../../assets/images/me-about-images.jpg';
import CertificationsModal from './CertificationsModal';
import './about.scss';

const About: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employeeHistory, certification, portfolio, settings, isLoading } = useSelector(
    (state: RootState) => state
  );
  const [showCertModal, setShowCertModal] = useState(false);
  const showSkeleton = isLoading && settings.length === 0;

  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="About portrait" aria-hidden />
          </div>
        </div>
        {showSkeleton ? (
          <div className="about__content">
            <div className="about__cards">
              {[0, 1, 2].map((slot) => (
                <article className="about__card" key={slot}>
                  <Skeleton width={28} height={28} borderRadius="50%" />
                  <div style={{ marginTop: 10 }}>
                    <Skeleton width="70%" height={14} />
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <Skeleton width="55%" height={12} />
                  </div>
                </article>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '2rem 0' }}>
              <Skeleton width="100%" height={14} />
              <Skeleton width="95%" height={14} />
              <Skeleton width="80%" height={14} />
            </div>
            <Skeleton width={130} height={42} borderRadius="0.4rem" />
          </div>
        ) : (
          settings.map((profile) => (
            <div className="about__content" key={profile.id}>
              <div className="about__cards">
                <article className="about__card">
                  <FiUsers />
                  <h5>Experience</h5>
                  <small>{employeeHistory.length} companies</small>
                </article>
                <button
                  type="button"
                  className="about__card about__card--interactive"
                  onClick={() => setShowCertModal(true)}
                >
                  <FaAward />
                  <h5>Certificate</h5>
                  <small>{certification.length} certifications</small>
                  <span className="about__card-hint">Click to preview</span>
                </button>
                <article className="about__card">
                  <VscFolderLibrary />
                  <h5>Project</h5>
                  <small>{portfolio.length} Projects</small>
                </article>
              </div>
              <p>{profile.description}</p>
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={() => dispatch(setNav('#contact'))}
              >
                Let&apos;s Talk
              </a>
            </div>
          ))
        )}
      </div>

      <CertificationsModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        certifications={certification}
      />
    </section>
  );
};

export default About;
