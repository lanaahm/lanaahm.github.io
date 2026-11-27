import React, { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import Skeleton from '../../../../components/skeleton/Skeleton';
import type { EmployeeHistoryItem, TimelineOrientation } from '../../../../types/domain';
import CareerDetailModal from './CareerDetailModal';

interface CareerTimelineProps {
  items: EmployeeHistoryItem[];
  orientation?: TimelineOrientation;
  isLoading?: boolean;
}

const SKELETON_SLOTS = [0, 1, 2, 3];

const splitCompanyRole = (raw: string): { company: string; role: string } => {
  const [company, role] = raw.split(' — ');
  return { company: company || raw, role: role || '' };
};

const CareerTimeline: React.FC<CareerTimelineProps> = ({
  items,
  orientation = 'horizontal',
  isLoading = false
}) => {
  const [selectedJob, setSelectedJob] = useState<EmployeeHistoryItem | null>(null);
  const isHorizontal = orientation === 'horizontal';
  const showSkeleton = isLoading && items.length === 0;

  if (!showSkeleton && items.length === 0) return null;

  return (
    <div className="container experience__timeline-wrapper">
      <h3 className="experience__subheading">Career Journey</h3>
      <ol
        className={`career-timeline ${
          isHorizontal ? 'career-timeline--horizontal' : 'career-timeline--vertical'
        }`}
      >
        {showSkeleton
          ? SKELETON_SLOTS.map((slot) => (
              <li
                className={`career-timeline__item ${slot % 2 === 0 ? 'is-first' : 'is-second'}`}
                key={`timeline-skel-${slot}`}
              >
                <span className="career-timeline__dot" aria-hidden="true" />
                <article className="career-timeline__card career-timeline__card--skeleton">
                  <Skeleton width="55%" height={20} borderRadius="999px" />
                  <Skeleton width="75%" height={18} />
                  <Skeleton width="90%" height={14} />
                </article>
              </li>
            ))
          : items.map((job, index) => {
              const { company, role } = splitCompanyRole(job.company);
              const isCurrent = job.end_work.toLowerCase() === 'present';
              const sideClass = index % 2 === 0 ? 'is-first' : 'is-second';

              return (
                <li className={`career-timeline__item ${sideClass}`} key={job.id}>
                  <span
                    className={`career-timeline__dot ${isCurrent ? 'is-current' : ''}`.trim()}
                    aria-hidden="true"
                  />
                  <article
                    className="career-timeline__card career-timeline__card--interactive"
                    onClick={() => setSelectedJob(job)}
                  >
                    <span className="career-timeline__period">
                      {job.start_work} &ndash; {job.end_work}
                    </span>
                    {role && <h4 className="career-timeline__role">{role}</h4>}
                    <p className="career-timeline__company text-light">{company}</p>
                    <button
                      type="button"
                      className="career-timeline__detail-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                    >
                      <span>View Detail</span>
                      <FiArrowUpRight />
                    </button>
                  </article>
                </li>
              );
            })}
      </ol>

      <CareerDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
};

export default CareerTimeline;
