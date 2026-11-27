import React from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Skeleton from '../../../../components/skeleton/Skeleton';
import type { RootState } from '../../../../config/store';
import type { ExperienceItem } from '../../../../types/domain';
import CareerTimeline from './CareerTimeline';
import './experience.scss';

const SKILL_SKELETON_GROUPS = [0, 1, 2];
const SKILL_SKELETON_ROWS = [0, 1, 2, 3, 4, 5];

const groupByCategory = (items: ExperienceItem[]): Record<string, ExperienceItem[]> =>
  items.reduce<Record<string, ExperienceItem[]>>((acc, item) => {
    const key = item.category || 'Other';
    acc[key] = [...(acc[key] || []), item];
    return acc;
  }, {});

const Experience: React.FC = () => {
  const { experience, employeeHistory, settings, isLoading } = useSelector(
    (state: RootState) => state
  );
  const grouped = groupByCategory(experience);
  const timelineOrientation =
    settings[0]?.timeline_orientation === 'vertical' ? 'vertical' : 'horizontal';
  const showSkillsSkeleton = isLoading && experience.length === 0;

  return (
    <section id="experience">
      <h5>What Skills &amp; Roles I Have</h5>
      <h2>My Experience</h2>

      <CareerTimeline
        items={employeeHistory}
        orientation={timelineOrientation}
        isLoading={isLoading}
      />

      <div className="container experience__skills-wrapper">
        <h3 className="experience__subheading">Technical Skills</h3>
        <div className="experience__container">
          {showSkillsSkeleton
            ? SKILL_SKELETON_GROUPS.map((group) => (
                <div className="experience" key={`skill-group-${group}`}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <Skeleton width="65%" height={22} />
                  </div>
                  <div className="experience__content">
                    {SKILL_SKELETON_ROWS.map((row) => (
                      <article className="experience__details" key={`skill-row-${group}-${row}`}>
                        <Skeleton width={18} height={18} borderRadius="50%" />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <Skeleton width="72%" height={15} />
                          <Skeleton width="42%" height={11} />
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))
            : Object.entries(grouped).map(([category, items]) => (
                <div className="experience" key={category}>
                  <h3>{category}</h3>
                  <div className="experience__content">
                    {[...items]
                      .sort((a, b) => (a.created_at > b.created_at ? 1 : -1))
                      .map((item) => (
                        <article className="experience__details" key={item.id}>
                          <BsPatchCheckFill className="experience__details-icon" />
                          <div>
                            <h4>{item.title}</h4>
                            <small className="text-light">Experienced</small>
                          </div>
                        </article>
                      ))}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
