import React from 'react';
import './portfolio.css';
import { FaGithub } from 'react-icons/fa';
import IMG from '../../assets/portfolio5.png';

const data = [
  {
    id: 1,
    image: IMG,
    title: 'This is a portofolio item title',
    github: 'http://github.com',
  },
  {
    id: 2,
    image: IMG,
    title: 'This is a portofolio item title',
    github: 'http://github.com',
  },
  {
    id: 3,
    image: IMG,
    title: 'This is a portofolio item title',
    github: 'http://github.com',
  },
  {
    id: 4,
    image: IMG,
    title: 'This is a portofolio item title',
    github: 'http://github.com',
  },
  {
    id: 5,
    image: IMG,
    title: 'This is a portofolio item title',
    github: 'http://github.com',
  },
  {
    id: 6,
    image: IMG,
    title: 'This is a portofolio item title',
    github: 'http://github.com',
  },
];

function Portfolio() {
  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        {data.map((args) => (
          <article className="portfolio__item" key={args.id}>
            <div className="portfolio__item-image">
              <img src={args.image} alt={args.title} />
            </div>
            <h3>{args.title}</h3>
            <div className="portfolio__item-cta">
              <a
                href={args.github}
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={args.github}
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
