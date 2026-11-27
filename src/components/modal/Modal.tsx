import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';

export interface ModalProps {
  isShowing: boolean;
  hide: () => void;
  title: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isShowing, hide, title, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <h4>{title}</h4>
                <button type="button" className="modal-close-button" onClick={hide}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing((prev) => !prev);
  return { isShowing, toggle };
};

export default Modal;
