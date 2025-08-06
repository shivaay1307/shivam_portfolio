import React, { useRef, useEffect } from 'react';
import { SplitText } from '@animations/SplitText';
import SkillItem from './SkillItem';
import * as styles from '@styles/global.module.css';

const SkillsSection = ({ tech }) => {
  const listRef = useRef(null);
  const requestRef = useRef();
  const scrollPosRef = useRef(0);
  
  useEffect(() => {
    if (!listRef.current || tech.length === 0) return;

    const list = listRef.current;
    const scrollSpeed = 0.5;

    const animateScroll = () => {
      scrollPosRef.current += scrollSpeed;
      const originalHeight = list.scrollHeight / 2;
      if (scrollPosRef.current >= originalHeight) {
        scrollPosRef.current = 0;
      }
      list.scrollTop = scrollPosRef.current;

      requestRef.current = requestAnimationFrame(animateScroll);
    };

    requestRef.current = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [tech]);

  return (
    <div className={styles.skills_section}>
      <h2>
        <SplitText by="WORD" as="i" animate>
          Skills
        </SplitText>
      </h2>
      <div className={styles.seperator} />
      <ul className={styles.skills_list} ref={listRef}>
          {tech.map((item, index) => (
            <SkillItem key={index} skill={item} />
          ))}
          {tech.map((item, index) => (
            <SkillItem key={`clone-${index}`} skill={item} />
          ))}
      </ul>
    </div>
  );
};

export default SkillsSection;
