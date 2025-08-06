import React, { useEffect, useState } from 'react';
import { SplitText } from '@animations/SplitText';
import * as styles from '../../styles/global.module.css';
import left from '../../assets/images/left.svg';
import right from '../../assets/images/right.svg';


const ANIMATION_DURATION = 2200;

const ProjectPopup = ({ project, onClose }) => {
  const images = project?.imgs || []; 
  const [current, setCurrent] = useState(0);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    setShowLink(false);
    const timer = setTimeout(() => setShowLink(true), ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [project?.description]);

  const goPrev = e => {
    e.stopPropagation();
    setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = e => {
    e.stopPropagation();
    setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2>
            <SplitText by="WORD" as="i" animate>
              {project?.title}
            </SplitText>
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        </div>
          <div className={styles.popupDescription}>
            <SplitText by="WORD" as="i" animate>
              {project?.description}
            </SplitText>
          {project?.link && showLink &&  (
            <div className={styles.popupLink}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                <SplitText by="WORD" as="i" animate>
                  Visit Live Project →
                </SplitText>
              </a>
            </div>
          )}
            </div>
          {images.length > 0 && (
            <div className={styles.popupImages}>
              <div
                className={styles.imageGrid}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <button
                  onClick={goPrev}
                  disabled={images.length <= 1}
                  className={styles.project_image_slider}
                  style={{ marginRight: '8px' }}
                >
                  <img src={left} alt="left" />
                </button>
                <div className={styles.imageContainer}>
                  <img
                    src={images[current]}
                    alt={`${project?.title} screenshot ${current + 1}`}
                    className={styles.popupImage}
                  />
                </div>
                <button
                  onClick={goNext}
                  disabled={images.length <= 1}
                  className={styles.project_image_slider}
                  style={{ marginLeft: '8px' }}
                >
                  <img src={right} alt="right" />
                </button>
              </div>
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                {current + 1} / {images.length}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProjectPopup;
