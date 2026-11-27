import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { FiExternalLink, FiEye, FiFileText, FiImage, FiX } from 'react-icons/fi';
import ImageSkeleton from '../../../../components/image-skeleton/ImageSkeleton';
import type { CertificationItem } from '../../../../types/domain';
import './certifications-modal.scss';

export interface CertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  certifications: CertificationItem[];
}

const isPdfFile = (url: string): boolean => url.toLowerCase().endsWith('.pdf');

const CertificationsModal: React.FC<CertificationsModalProps> = ({
  isOpen,
  onClose,
  certifications
}) => {
  const [selectedIssuer, setSelectedIssuer] = useState('All');
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  const issuers = useMemo(() => {
    const unique = Array.from(
      new Set(certifications.map((c) => c.issuer || 'Other'))
    );
    return ['All', ...unique];
  }, [certifications]);

  const filtered = useMemo(
    () =>
      selectedIssuer === 'All'
        ? certifications
        : certifications.filter((c) => (c.issuer || 'Other') === selectedIssuer),
    [certifications, selectedIssuer]
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    setSelectedCert((prev) =>
      prev && filtered.some((c) => c.id === prev.id) ? prev : filtered[0] || null
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="cert-modal__overlay" onClick={onClose} role="presentation">
      <div
        className="cert-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Certifications"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cert-modal__header">
          <div>
            <h3>My Certifications</h3>
            <small className="text-light">{certifications.length} verified certificates</small>
          </div>
          <button
            type="button"
            className="cert-modal__close"
            onClick={onClose}
            aria-label="Close certifications popup"
          >
            <FiX />
          </button>
        </div>

        <div className="cert-modal__filters">
          {issuers.map((issuer) => (
            <button
              type="button"
              key={issuer}
              className={`cert-modal__chip ${selectedIssuer === issuer ? 'is-active' : ''}`}
              onClick={() => setSelectedIssuer(issuer)}
            >
              {issuer}
            </button>
          ))}
        </div>

        <div className="cert-modal__body">
          <ul className="cert-modal__list">
            {filtered.map((cert) => {
              const isSelected = selectedCert?.id === cert.id;
              return (
                <li key={cert.id}>
                  <button
                    type="button"
                    className={`cert-modal__item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedCert(cert)}
                  >
                    <span className="cert-modal__item-icon">
                      {isPdfFile(cert.file_url) ? <FiFileText /> : <FiImage />}
                    </span>
                    <span className="cert-modal__item-info">
                      <strong>{cert.title}</strong>
                      <small>{cert.issuer || 'Certificate'}</small>
                    </span>
                    <span className="cert-modal__item-action">
                      <FiEye />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="cert-modal__preview">
            {selectedCert ? (
              <>
                <div className="cert-modal__preview-bar">
                  <div>
                    <h4>{selectedCert.title}</h4>
                    <small className="text-light">{selectedCert.issuer}</small>
                  </div>
                  {selectedCert.file_url && (
                    <a
                      href={selectedCert.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn cert-modal__open-btn"
                    >
                      <FiExternalLink /> Open
                    </a>
                  )}
                </div>
                <div className="cert-modal__preview-stage">
                  {selectedCert.file_url && isPdfFile(selectedCert.file_url) ? (
                    <iframe
                      src={selectedCert.file_url}
                      title={selectedCert.title}
                      className="cert-modal__iframe"
                    />
                  ) : (
                    <ImageSkeleton
                      src={selectedCert.file_url}
                      alt={selectedCert.title}
                      height="100%"
                      borderRadius="0.9rem"
                      className="cert-modal__image"
                    />
                  )}
                </div>
              </>
            ) : (
              <p className="text-light">Select a certification to preview.</p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CertificationsModal;
