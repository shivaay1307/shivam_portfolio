import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import gsap from 'gsap';
import * as styles from "@styles/global.module.css"
import Frontpage from '@components/frontpage/Frontpage';

const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();

  useImperativeHandle(ref, () => ({
    moveTo(x, y) {
      gsap.to(el.current, { 
        x: x - el.current.offsetWidth / 2, 
        y: y - el.current.offsetHeight / 2,
        duration: 0.3,
        delay,
        ease: "power2.out"
      });
    }
  }), [delay]);

  return (
    <div 
      className={`${styles.circle} ${styles[size]}`}
      ref={el}
    />
  );
});

const Layout = ({ children }) => {
  useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const frontpageRef = useRef();
  const circleRefs = useRef([]);
  
  useEffect(() => {
    const initPosition = () => {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      circleRefs.current.forEach(ref => ref?.moveTo(x, y));
    };

    const onMove = ({ clientX, clientY }) => {
      circleRefs.current.forEach(ref => ref?.moveTo(clientX, clientY));
    };

    initPosition();
    window.addEventListener('pointermove', onMove);
    window.addEventListener('resize', initPosition);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', initPosition);
    };
  }, []);

  const addCircleRef = (ref) => {
    if (ref && !circleRefs.current.includes(ref)) {
      circleRefs.current.push(ref);
    }
  };

  const sectionMap = {
    'home': 0,
    'work-experience': 1,
    'education': 2,
    'skills': 3,
    'projects': 4,
  };

  const handleNavClick = (section) => {
    if (frontpageRef.current && typeof frontpageRef.current.goToPage === 'function') {
      frontpageRef.current.goToPage(sectionMap[section]);
    }
  };

  return (
    <div>
      <Circle size="sm" ref={addCircleRef} delay={0} />
      <Circle size="md" ref={addCircleRef} delay={0.1} />
      <Circle size="lg1" ref={addCircleRef} delay={0.2} />
      <Circle size="lg2" ref={addCircleRef} delay={0.3} />
      <Circle size="lg3" ref={addCircleRef} delay={0.4} />
      <Circle size="lg4" ref={addCircleRef} delay={0.5} />
      <Circle size="lg5" ref={addCircleRef} delay={0.6} />
      <Circle size="lg6" ref={addCircleRef} delay={0.7} />
      <Circle size="lg7" ref={addCircleRef} delay={0.8} />
      <Circle size="lg8" ref={addCircleRef} delay={0.9} />
      <Header onNavClick={handleNavClick} />
      <main>
        <Frontpage ref={frontpageRef} />
      </main>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} &middot; Software Developer -{' '}
        <span href="https://www.google.com">Shivam Gupta</span>
      </footer>
    </div>
  );
};

export default Layout;
