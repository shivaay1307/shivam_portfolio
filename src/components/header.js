import * as React from 'react';
import { SplitText } from '@animations/SplitText';
import profile from '@images/shivam.jpeg';
import * as styles from '@styles/global.module.css';

const Header = ({ onNavClick }) => (
  <header
  className={styles.headerContainer}
  >
    <div className={styles.header}>
      <div className={styles.headerProfile}>
        <a href="#home"  onClick={e => { e.preventDefault(); onNavClick('home'); }}>
          <img alt="profile" src={profile} />
        </a>
      </div>
      <nav className={styles.headerNav}>
        <a href="#work-experience" onClick={e => { e.preventDefault(); onNavClick('work-experience'); }}>
          <SplitText by="WORD" as="i" animate>Work Experience</SplitText>
        </a>
        <a href="#education" onClick={e => { e.preventDefault(); onNavClick('education'); }}>
          <SplitText by="WORD" as="i" animate>Education</SplitText>
        </a>
        <a href="#skills" onClick={e => { e.preventDefault(); onNavClick('skills'); }}>
          <SplitText by="WORD" as="i" animate>Skills</SplitText>
        </a>
        <a href="#projects" onClick={e => { e.preventDefault(); onNavClick('projects'); }}>
          <SplitText by="WORD" as="i" animate>Projects</SplitText>
        </a>
      </nav>
    </div>
  </header>
);
export default Header;
