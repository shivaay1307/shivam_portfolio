import React from "react";
import { SplitText } from "@animations/SplitText";
import ProjectCard from "./ProjectCard";
import * as styles from "../../styles/global.module.css";

const ProjectsSection = ({ projects, onRead }) => {
  return (
    <div className={styles.skills_section}>
      <h2>
        <SplitText by="WORD" as="i" animate>
          Projects
        </SplitText>
      </h2>
      <div className={styles.seperator} />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsGrid}>
          {projects?.map((project, idx) => (
            <ProjectCard key={project.id || idx} project={project} onRead={onRead} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;