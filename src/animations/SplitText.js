import React, { createContext, useContext, memo, useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { splitString } from '@animations/utils/splitString';

const SplitTextContext = createContext({
  hasAnimationEnded: false,
  setHasAnimationEnded: () => {},
  by: 'WORD' || 'CHAR',
});

const simpleHash = (str) => {
  const stringValue = String(str);
  let hash = 0;
  if (stringValue.length === 0) return hash;
  for (let i = 0; i < stringValue.length; i++) {
    const char = stringValue.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
};

export const SplitText = memo(
  ({
    as: Component = 'span',
    by: localBy = 'WORD',
    children,
    animate = true,
  }) => {
    const childrenBackup = useRef(children);
    const [hasAnimationEnded, setHasAnimationEnded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const contextValue = useContext(SplitTextContext);
    const [animationId, setAnimationId] = useState(0);
    const [lastAnimationId, setLastAnimationId] = useState(null);
    const elementRef = useRef(null);
    const observerRef = useRef(null);

    const getContentKey = (content) => {
      if (typeof content === 'string') {
        return simpleHash(content);
      } else if (React.isValidElement(content)) {
        return simpleHash(content.props?.children || 'element');
      } else if (Array.isArray(content)) {
        return simpleHash(content.length + content.map(item => 
          typeof item === 'string' ? item : 'item'
        ).join(''));
      } else {
        return simpleHash('unknown');
      }
    };

    const contentKey = getContentKey(children);

    useEffect(() => {
      if (contentKey !== childrenBackup.current) {
        setAnimationId(prev => prev + 1);
        setHasAnimated(false);
        childrenBackup.current = contentKey;
      }
    }, [contentKey]);

    useEffect(() => {
      if (!animate || !elementRef.current) return;

      const element = elementRef.current;
      const currentAnimationId = animationId;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated && currentAnimationId !== lastAnimationId) {
              setIsInView(true);
              setHasAnimated(true);
              setLastAnimationId(currentAnimationId);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      observer.observe(element);
      observerRef.current = observer;

      const fallbackTimer = setTimeout(() => {
        if (!hasAnimated && animate) {
          setIsInView(true);
          setHasAnimated(true);
        }
      }, 1000);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        clearTimeout(fallbackTimer);
      };
    }, [animate, hasAnimated, animationId, lastAnimationId, children]);

    useEffect(() => {
      if (!isInView || !elementRef.current) return;

      const element = elementRef.current;
      const words = element.querySelectorAll('.word');
      const chars = element.querySelectorAll('.char');
      const timeline = gsap.timeline();

      if (localBy === 'WORD' && words.length > 0) {
        timeline.fromTo(
          words,
          {
            opacity: 0,
            y: 70,
            skewY: 8,
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
          }
        );
      } else if (localBy === 'CHAR' && chars.length > 0) {
        timeline.fromTo(
          chars,
          {
            opacity: 0,
            y: 70,
            skewY: 8,
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power3.out',
          }
        );
      }

      timeline.call(() => {
        setHasAnimationEnded(true);
        contextValue.setHasAnimationEnded(true);
      });

      return () => {
        timeline.kill();
      };
    }, [isInView, localBy, contextValue, children]);

    const contextValueToProvide = {
      hasAnimationEnded,
      setHasAnimationEnded,
      by: localBy,
    };

    return (
      <SplitTextContext.Provider value={contextValueToProvide}>
        <Component ref={elementRef}>
          {splitString(children, localBy)}
        </Component>
      </SplitTextContext.Provider>
    );
  }
);

SplitText.displayName = 'SplitText';
