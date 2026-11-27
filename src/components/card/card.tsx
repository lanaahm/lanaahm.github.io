import React from 'react';
import './card.scss';

export interface CardAction {
  action: () => void;
  title: React.ReactNode;
}

export interface CardProps {
  title: string;
  button?: CardAction;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, button, children }) => (
  <div className="card">
    <div className="card__header">
      <h3>{title}</h3>
      {button ? (
        <button type="button" className="btn modal-toggle" onClick={button.action}>
          {button.title}
        </button>
      ) : null}
    </div>
    <div className="card__body">{children}</div>
  </div>
);

export default Card;
