/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';

const Modal = ({ isShowing, hide, title, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        // eslint-disable-next-line react/jsx-indent
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <h4>{title}</h4>
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">{props.children}</div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    isShowing,
    toggle
  };
};

export default Modal;
