import React from 'react';
import { SplitText } from '@animations/SplitText';
import * as styles from '@styles/global.module.css';

const SkillItem = ({ skill }) => {
  return (
    <li className={styles.skill_item}>
      <div className={styles.skill_img_container}>
        {skill?.imgPath ? (
          <div className={styles.skill_img_container_inner}>
          <img
            src={skill.imgPath}
            alt={skill?.title}
            className={styles.skill_img}
          />
          </div>
        ) : (
          <div className={styles.skill_img_placeholder}>
            <span>{skill?.title}</span>
          </div>
        )}
      </div>
      <div className={styles.skill_title_container}>
        <SplitText by="WORD" as="i" animate>
          {skill?.title}
        </SplitText>
        <SplitText by="WORD" as="i" animate>
          <div className={styles.skill_rating}>
            <div>{skill?.rate}</div>
            <div className={styles.rating_bar_container}>
              <div
                className={styles.rating_bar_fill}
                style={{ width: `${(skill?.rate / 10) * 100}%` }}
              />
            </div>
            <div>/10</div>
          </div>
        </SplitText>
      </div>
    </li>
  );
};

export default SkillItem;
