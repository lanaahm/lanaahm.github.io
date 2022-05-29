import React from 'react';

import './card.scss';

const Card = (props) => (
  <div className="card">
    <div className="card__header">
      <h3>{props.title}</h3>
      {props.button ? (
        <button
          type="button"
          className="btn modal-toggle"
          onClick={props.button?.action}
        >
          {props.button?.title}
        </button>
      ) : (
        ''
      )}
    </div>
    <div className="card__body">{props.children}</div>
  </div>
);

export default Card;
