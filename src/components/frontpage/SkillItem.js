import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import { SplitText } from '@animations/SplitText';
import * as styles from '@styles/global.module.css';

const SkillItem = ({ skill }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          name
          childImageSharp {
            gatsbyImageData( placeholder: BLURRED, quality: 90)
          }
        }
      }
    }
  `);
    console.log(data);
    
  const matchedImage = data.allFile.nodes.find(
    node => node.name.toLowerCase() === skill.name.toLowerCase()
  );

  const image = getImage(matchedImage);

  return (
    <li className={styles.skill_item}>
      <div className={styles.skill_img_container}>
        {image ? (
          <div className={styles.skill_img_container_inner}>
            <GatsbyImage
              image={image}
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
