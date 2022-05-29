/* eslint-disable no-nested-ternary */
import React from 'react';
import { FaGithub, FaKaggle, FaLink } from 'react-icons/fa';
import { connect } from 'react-redux';

import IMG from '../../../../assets/images/portfolio5.png';
import './portfolio.scss';

const Portfolio = ({ dataPortfolio }) => (
  <section id="portfolio">
    <h5>My Recent Work</h5>
    <h2>Portfolio</h2>

    <div className="container portfolio__container">
      {dataPortfolio.map((args) => (
        <article className="portfolio__item" key={args.id}>
          <div className="portfolio__item-image">
            <img src={args.image ?? IMG} alt={args.title} />
          </div>
          <div className="portfolio__item-detail">
            <h3>{args.title}</h3>
            <p>{args.description}</p>
          </div>
          <div className="portfolio__item-cta">
            {Object.values(args.link).map((x) => {
              if (x) {
                return Object.keys(x).map((key, index) => (
                  <div key={`${index.toString()}`}>
                    <a
                      href={x[key]}
                      className="btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {key === 'github' ? (
                        <FaGithub />
                      ) : key === 'kaggle' ? (
                        <FaKaggle />
                      ) : (
                        <FaLink />
                      )}
                    </a>
                  </div>
                ));
              }
              return null;
            })}
          </div>
        </article>
      ))}
    </div>
  </section>
);

const mapStateToProps = (state) => ({
  dataPortfolio: state.portfolio
});

export default connect(mapStateToProps, null)(Portfolio);
