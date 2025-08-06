import React, { useState, useEffect } from "react";
import { SplitText } from "@animations/SplitText";
import * as styles from "../../styles/global.module.css";

const ProjectCard = ({ project, onRead }) => {
  const hasImages = project?.imgs && project.imgs.length > 0;
  const hasLink = project?.link;
  const [linkPreview, setLinkPreview] = useState(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  useEffect(() => {
    if (!hasImages && hasLink && !linkPreview) {
      setIsLoadingPreview(true);
      const fetchLinkPreview = async () => {
        try {
          const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`);
          if (response.status === 200 && response.url) {
            setLinkPreview(response.url);
          }
        } catch (error) {
        } finally {
          setIsLoadingPreview(false);
        }
      };
      fetchLinkPreview();
    }
  }, [hasImages, hasLink, linkPreview, project]);

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImageContainer}>
        {hasImages ? (
          <div className={styles.projectImagePlaceholder}>
            <img src={project.imgs[0]} alt={project.title} className={styles.projectImage} />
          </div>
        ) : hasLink ? (
          <div className={styles.projectImagePlaceholder}>
            {isLoadingPreview ? (
              <div style={{ width: '20px', height: '20px', border: '2px solid #6c63ff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            ) : (
              linkPreview && <img src={linkPreview} alt={project.title} className={styles.projectImage} />
            )}
          </div>
        ) : (
          <div className={styles.projectImagePlaceholder}>
          </div>
        )}
        <button className={styles.projectButtonOverlay} onClick={() => onRead(project)}>
          Read More
        </button>
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        {project.link && (
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
        )}
      </div>
    </div>
  );
};

export default ProjectCard;