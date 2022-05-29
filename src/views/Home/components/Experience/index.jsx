import React from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { connect } from 'react-redux';

import './experience.scss';

const groupBy = (data, key) =>
  data.reduce((acc, x) => {
    acc[x[key]] = [...(acc[x[key]] || []), x];
    return acc;
  }, {});

const Experience = ({ experience }) => {
  const dataGroupbyCategory = groupBy(experience, 'category');
  return (
    <section id="experience">
      <h5>What Skills I Have</h5>
      <h2>My Experience</h2>

      <div className="container experience__container">
        {Object.entries(dataGroupbyCategory).map(([category, data], index) => (
          <div className="experience" key={`${index.toString()}`}>
            <h3>{category}</h3>
            <div className="experience__content">
              {console.log(data !== undefined ? data[index].createdAt : null)}
              {data
                .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
                .map((x, i) => (
                  // console.log(data);
                  <article
                    className="experience__details"
                    key={`${i.toString()}`}
                  >
                    <BsPatchCheckFill className="experience__details-icon" />
                    <div>
                      <h4>{x.title}</h4>
                      <small className="text-light">Experience</small>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  experience: state.experience
});

export default connect(mapStateToProps, null)(Experience);
