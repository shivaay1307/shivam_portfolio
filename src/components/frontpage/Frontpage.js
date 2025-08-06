import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ParticleNetworkAnimation from '../particle';
import BannerSection from './BannerSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ProjectPopup from './ProjectPopup';
import Swiper from '@components/swiper';
import * as styles from '@styles/global.module.css';

const Frontpage = forwardRef((props, ref) => {
  const [readMore, setReadMore] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [prevPage, setPrevPage] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState('down');
  const lastScrollTime = useRef(0);
  const scrollThreshold = useRef(0);

  const data = useStaticQuery(graphql`
    query FrontpageData {
      allProject {
        nodes {
          id
          title
          description
          imgs
          link
        }
      }
      allTech {
        nodes {
          id
          title
          name
          imgPath
          rate
        }
      }
    }
  `);

  const projects = data.allProject.nodes;
  const tech = data.allTech.nodes;

  function handleRead(project) {
    setOpenProject(project);
    setReadMore(true);
  }

  const handleClosePopup = () => {
    setReadMore(false);
    setOpenProject(null);
  };

  const goToPage = newPage => {
    if (newPage === currentPage || transitioning) return;

    setPrevPage(currentPage);
    setDirection(newPage > currentPage ? 'down' : 'up');
    setCurrentPage(newPage);
    setTransitioning(true);

    setTimeout(() => {
      setTransitioning(false);
    }, 400);

    setTimeout(() => {
      setPrevPage(null);
    }, 800);
  };

  useImperativeHandle(ref, () => ({
    goToPage,
  }));

  const sections = [
    <div id="home" className={styles.flex_enter}>
      <BannerSection />
    </div>,
    <div id="work-experience" className={styles.flex_enter}>
      <Swiper />
    </div>,
    <div id="education" className={styles.flex_enter}>
      <EducationSection />
    </div>,
    <div id="skills" className={styles.flex_enter}>
      <SkillsSection tech={tech} />
    </div>,
    <div id="projects" className={styles.flex_enter}>
      <ProjectsSection projects={projects} onRead={handleRead} />
    </div>,
  ];

  useEffect(() => {
    let touchStartY = null;
    let touchEndY = null;

    const handleWheel = e => {
      e.preventDefault();

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      if (timeSinceLastScroll < 800) {
        return;
      }

      if (transitioning) return;

      scrollThreshold.current += Math.abs(e.deltaY);

      if (scrollThreshold.current < 50) {
        return;
      }

      lastScrollTime.current = now;
      scrollThreshold.current = 0;

      if (e.deltaY > 0 && currentPage < sections.length - 1) {
        goToPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        goToPage(currentPage - 1);
      }
    };

    const handleKeyDown = e => {
      if (transitioning) return;

      if (e.key === 'ArrowDown' && currentPage < sections.length - 1) {
        e.preventDefault();
        goToPage(currentPage + 1);
      } else if (e.key === 'ArrowUp' && currentPage > 0) {
        e.preventDefault();
        goToPage(currentPage - 1);
      } else if (e.key === 'Escape' && readMore) {
        handleClosePopup();
      }
    };

    const handleTouchStart = e => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = e => {
      if (e.touches.length === 1) {
        touchEndY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      if (transitioning || touchStartY === null || touchEndY === null) return;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentPage < sections.length - 1) {
          goToPage(currentPage + 1);
        } else if (deltaY < 0 && currentPage > 0) {
          goToPage(currentPage - 1);
        }
      }
      touchStartY = null;
      touchEndY = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage, transitioning, sections.length, readMore]);

  if (!styles) return null;

  return (
    <>
      <ParticleNetworkAnimation />
      <div className={styles.snapContainer}>
        {sections.map((Section, idx) => {
          if (idx !== currentPage && idx !== prevPage) return null;

          let className = styles.snapSection;

          if (idx === currentPage && transitioning) {
            className +=
              ' ' +
              (direction === 'down' ? styles.enteringDown : styles.enteringUp);
          } else if (idx === prevPage && transitioning) {
            className +=
              ' ' +
              (direction === 'down' ? styles.leavingDown : styles.leavingUp);
          } else if (idx === currentPage) {
            className += ' ' + styles.active;
          }

          return (
            <section key={idx} className={className}>
              {Section}
            </section>
          );
        })}
      </div>
      {readMore && openProject && (
        <ProjectPopup project={openProject} onClose={handleClosePopup} />
      )}
    </>
  );
});

export default Frontpage;
