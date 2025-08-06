import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { SplitText } from '@animations/SplitText';
import * as styles from '@styles/global.module.css';
import pause from '../assets/images/pause.svg';
import play from '../assets/images/resume.svg';

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [holdPaused, setHoldPaused] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const intervalRef = React.useRef();

  const data = useStaticQuery(graphql`
    query WorkData {
      allWork {
        nodes {
          id
          title
          company
          duration
          tasks
          skills
        }
      }
    }
  `);

  const work = data.allWork.nodes;

  useEffect(() => {
    if (!paused && !holdPaused && work.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % work.length);
        setSlideKey(prev => prev + 1);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [currentIndex, paused, holdPaused, work.length]);

  const handleRadioChange = index => {
    setCurrentIndex(index);
    setSlideKey(prev => prev + 1);
  };
  const handleMouseDown = () => setHoldPaused(true);
  const handleMouseUp = () => setHoldPaused(false);
  const handleMouseLeave = () => setHoldPaused(false);
  const handlePauseButton = () => setPaused(prev => !prev);

  const renderRadio = () => {
    let radio = [];
    for (let i = 0; i < work.length; i++) {
      radio.push(
        <div key={i} className={styles.button_container}>
          <button
            onClick={() => handleRadioChange(i)}
            className={`${styles.input_radio} ${i === currentIndex ? styles.buttonActive : ''}`}
          >
            {i + 1}
          </button>
          {i < work.length - 1 && <span className={styles.line} />}
        </div>
      );
    }
    return radio;
  };

  if (!work || work.length === 0) {
    return (
      <div className={styles.slider_container}>
        <div className={styles.slider}>
          <div className={`${styles.slide} ${styles.active}`}>
            <h2>
              <SplitText by="WORD" as="i" animate>
                Loading work experience...
              </SplitText>
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.slider_container}>
                <button
                  onClick={handlePauseButton}
                  className={styles.pauseButton}
                >
                  {paused ? (
                    <img src={play} alt="play" height={16} width={16} />
                  ) : (
                    <img src={pause} alt="pause" height={16} width={16} />
                  )}
                </button>
      <div className={styles.slider}>
        {work?.map(
          (data, index) =>
            data && (
              <div
                key={`${data.id}-${slideKey}`}
                className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <h2>
                  <SplitText 
                    key={`title-${data.id}-${slideKey}`} 
                    by="WORD" 
                    as="i" 
                    animate={true}
                  >
                    <span /> {data.title} <span /> {data.company} <span />{' '}
                    {data.duration}
                  </SplitText>
                </h2>
                <div className={styles.seperator} />
                <ul className={styles.description}>
                  {data.tasks.map((task, n) => (
                    <li key={n}>
                      <SplitText 
                        key={`task-${data.id}-${n}-${slideKey}`} 
                        by="WORD" 
                        as="i" 
                        animate={true}
                      >
                        {task}
                      </SplitText>
                    </li>
                  ))}
                </ul>
                <div className={styles.radio_container}>{renderRadio()}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Swiper;
