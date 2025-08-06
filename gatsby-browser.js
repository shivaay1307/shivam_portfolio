/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

import './src/styles/global.module.css';

// Preload critical fonts
export const onClientEntry = () => {
  // Preload critical fonts for better performance
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(link);
};

// Add smooth scrolling behavior
export const onRouteUpdate = () => {
  // Enable smooth scrolling for the entire site
  document.documentElement.style.scrollBehavior = 'smooth';
};

// Optimize images loading
export const shouldUpdateScroll = () => {
  return false; // Disable automatic scroll restoration for better UX
};
