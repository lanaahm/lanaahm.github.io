import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Modal from '../modal/Modal';
import './confirm-modal.scss';

export interface ConfirmModalProps {
  isShowing: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isShowing,
  title = 'Confirm Delete',
  message,
  confirmLabel = 'Delete',
  isLoading = false,
  onCancel,
  onConfirm
}) => (
  <Modal isShowing={isShowing} hide={onCancel} title={title}>
    <div className="confirm-modal">
      <div className="confirm-modal__icon">
        <FiAlertTriangle />
      </div>
      <p className="confirm-modal__message">{message}</p>
      <div className="confirm-modal__actions">
        <button
          type="button"
          className="confirm-modal__btn confirm-modal__btn--cancel"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="button"
          className="confirm-modal__btn confirm-modal__btn--danger"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : confirmLabel}
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;
