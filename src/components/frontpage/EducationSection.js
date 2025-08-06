import React, { useEffect, useRef } from 'react';
import { SplitText } from '@animations/SplitText';
import * as styles from '../../styles/global.module.css';
import { education, achievements } from '../../data/data';

const EducationSection = () => {
  const headingRef = useRef(null);
  const itemsRef = useRef([]);
  const achievementsHeadingRef = useRef(null);
  const achievementsItemsRef = useRef([]);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.classList.add(styles.animated);
    }
    itemsRef.current.forEach(item => {
      if (item) item.classList.add(styles.animated);
    });
    if (achievementsHeadingRef.current) {
      achievementsHeadingRef.current.classList.add(styles.animated);
    }
    achievementsItemsRef.current.forEach(item => {
      if (item) item.classList.add(styles.animated);
    });
  }, []);

  return (
    <div className={styles.educationSection}>
      <h2 ref={headingRef}>
        <SplitText by="WORD" as="i" animate>
          Education
        </SplitText>
      </h2>
      <ul>
        {education.map((edu, idx) => (
          <li key={edu.id} ref={el => (itemsRef.current[idx] = el)}>
            <div>
              <strong>
                <SplitText by="WORD" as="i" animate>
                  {edu.level}
                </SplitText>
              </strong>
              {edu.specialization && (
                <>
                  {' '}
                  -{' '}
                  <SplitText by="WORD" as="i" animate>
                    {edu.specialization}
                  </SplitText>
                </>
              )}
            </div>
            <div>
              <SplitText by="WORD" as="i" animate>
                {edu.institution}
              </SplitText>
            </div>
          </li>
        ))}
      </ul>
      <h3 ref={achievementsHeadingRef}>
        <SplitText by="WORD" as="i" animate>
          Achievements
        </SplitText>
      </h3>
      <ul>
        {achievements.map((ach, idx) => (
          <li key={ach.id} ref={el => (achievementsItemsRef.current[idx] = el)}>
            <strong>
              <SplitText by="WORD" as="i" animate>
                {ach.exam}
              </SplitText>
            </strong>{' '}
            (<SplitText by="WORD" as="i" animate>{ach.year}</SplitText>) -{' '}
            <SplitText by="WORD" as="i" animate>{ach.ranking}</SplitText>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationSection;