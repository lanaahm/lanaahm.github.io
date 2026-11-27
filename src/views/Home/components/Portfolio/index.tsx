import React from 'react';
import { FaGithub, FaKaggle, FaLink } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ImageSkeleton from '../../../../components/image-skeleton/ImageSkeleton';
import Skeleton from '../../../../components/skeleton/Skeleton';
import type { RootState } from '../../../../config/store';
import './portfolio.scss';

const PORTFOLIO_SKELETON_SLOTS = [0, 1, 2, 3];

const renderLinkIcon = (domain: string): React.ReactNode => {
  if (domain === 'github') return <FaGithub />;
  if (domain === 'kaggle') return <FaKaggle />;
  return <FaLink />;
};

const Portfolio: React.FC = () => {
  const { portfolio: dataPortfolio, isLoading } = useSelector((state: RootState) => state);
  const showSkeleton = isLoading && dataPortfolio.length === 0;

  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        {showSkeleton
          ? PORTFOLIO_SKELETON_SLOTS.map((slot) => (
              <article className="portfolio__item" key={`portfolio-skel-${slot}`}>
                <div className="portfolio__item-image">
                  <Skeleton width="100%" height={180} borderRadius="1.5rem" />
                </div>
                <div
                  className="portfolio__item-detail"
                  style={{ width: '100%', gap: 10, marginTop: 18 }}
                >
                  <Skeleton width="80%" height={18} />
                  <Skeleton width="100%" height={13} />
                  <Skeleton width="70%" height={13} />
                </div>
                <div className="portfolio__item-cta">
                  <Skeleton width={56} height={34} borderRadius="0.4rem" />
                </div>
              </article>
            ))
          : dataPortfolio.map((item) => {
              const links = Array.isArray(item.link) ? item.link : [];
              return (
                <article className="portfolio__item" key={item.id}>
                  <div className="portfolio__item-image">
                    <ImageSkeleton
                      src={item.image}
                      alt={item.title}
                      height={180}
                      borderRadius="1.5rem"
                    />
                  </div>
                  <div className="portfolio__item-detail">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="portfolio__item-cta">
                    {links.map((entry, idx) =>
                      entry
                        ? Object.entries(entry).map(([domain, href]) => (
                            <div key={`${item.id}-${domain}-${idx}`}>
                              <a href={href} className="btn" target="_blank" rel="noreferrer">
                                {renderLinkIcon(domain)}
                              </a>
                            </div>
                          ))
                        : null
                    )}
                  </div>
                </article>
              );
            })}
      </div>
    </section>
  );
};

export default Portfolio;
