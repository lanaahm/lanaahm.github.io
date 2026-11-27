import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BsPatchCheckFill } from 'react-icons/bs';
import { FiCalendar, FiMapPin, FiX } from 'react-icons/fi';
import type { EmployeeHistoryItem } from '../../../../types/domain';
import './career-detail-modal.scss';

export interface CareerDetailModalProps {
  job: EmployeeHistoryItem | null;
  onClose: () => void;
}

const splitCompanyRole = (raw: string): { company: string; role: string } => {
  const [company, role] = raw.split(' — ');
  return { company: company || raw, role: role || '' };
};

const CareerDetailModal: React.FC<CareerDetailModalProps> = ({ job, onClose }) => {
  useEffect(() => {
    if (!job) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [job, onClose]);

  if (!job) return null;

  const { company, role } = splitCompanyRole(job.company);
  const highlights = Array.isArray(job.highlights) ? job.highlights : [];

  return ReactDOM.createPortal(
    <div className="career-modal__overlay" onClick={onClose} role="presentation">
      <div
        className="career-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${role || company} details`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="career-modal__header">
          <div>
            <span className="career-modal__period">
              <FiCalendar /> {job.start_work} &ndash; {job.end_work}
            </span>
            <h3 className="career-modal__role">{role || company}</h3>
            <p className="career-modal__company">{company}</p>
            {job.location && (
              <span className="career-modal__location">
                <FiMapPin /> {job.location}
              </span>
            )}
          </div>
          <button
            type="button"
            className="career-modal__close"
            onClick={onClose}
            aria-label="Close career detail"
          >
            <FiX />
          </button>
        </div>

        <div className="career-modal__body">
          {job.focus && <p className="career-modal__focus">{job.focus}</p>}

          {highlights.length > 0 ? (
            <ul className="career-modal__highlights">
              {highlights.map((point, idx) => (
                <li key={`${job.id}-hl-${idx}`}>
                  <BsPatchCheckFill className="career-modal__bullet" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-light">No additional details recorded yet.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CareerDetailModal;
