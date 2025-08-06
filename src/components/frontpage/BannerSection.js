import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { SplitText } from '@animations/SplitText';
import { Link } from 'gatsby';
import * as styles from '@styles/global.module.css';

const BannerSection = () => (
  <div className={styles.banner}>
    <div className={styles.shivam_pic}>
      <StaticImage
        src="../../assets/images/shivam.jpeg"
        alt="Shivam Gupta Profile"
        width={300}
        height={300}
        placeholder="blurred"
        quality={90}
        className={styles.picture}
      />
    </div>
    <div className={styles.banner_text}>
      <div className={styles.h1}>
        <SplitText by="WORD" as="i" animate>
          Shivam Gupta
        </SplitText>
      </div>
      <Link
        className={styles.email}
        target="_blank"
        to="mailto:shivamgupta130798@gmail.com"
      >
        <svg xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512"><rect width="512" height="512" rx="15%" fill="#ffffff"/><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"/><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"/><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"/><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"/><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"/></svg>
          <SplitText by="WORD" as="i" animate>
          Shivamgupta130798@gmail.com
        </SplitText>
      </Link>
      <div className={styles.banner_links}>
        <div className={styles.links_container}>
          <Link
            className={styles.a}
            target="_blank"
            to="https://github.com/shivaay1307"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 24 24"
            >
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
            </svg>
            <SplitText by="WORD" as="i" animate>
              Github
            </SplitText>
          </Link>
          <Link
            className={styles.a}
            target="_blank"
            to="https://leetcode.com/shivamgupta130798/"
          >
            <img
              width="20"
              height="20"
              src='/leetcode.png'
              alt={"Shivam's Leetcode Profile"}
              style={{ marginRight: '5px' }}
            />
            <SplitText by="WORD" as="i" animate>
              Leetcode
            </SplitText>
          </Link>
        </div>
        <div className={styles.links_container}>
          <Link
            className={styles.a}
            target="_blank"
            to="https://www.linkedin.com/in/shivam-gupta-a52501224"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#0288D1"
                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
              ></path>
              <path
                fill="#FFF"
                d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
              ></path>
            </svg>
            <SplitText by="WORD" as="i" animate>
              LinkedIn
            </SplitText>
          </Link>
          <Link
            href="https://docs.google.com/document/d/1nJmr-hhch2DvVgKT9kWKzQJdu5BUuovU/export?format=pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.a}
            download
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="800px" height="800px" viewBox="0 0 32 32" version="1.1">
              <path d="M0 16q0 2.912 1.824 5.088t4.576 2.752q0.032 0 0.032-0.032v-0.064t0.032-0.032q0.544-1.344 1.344-2.176t2.208-1.184v-2.336q0-2.496 1.728-4.256t4.256-1.76 4.256 1.76 1.76 4.256v2.336q1.376 0.384 2.176 1.216t1.344 2.144l0.096 0.288h0.384q2.464 0 4.224-1.76t1.76-4.224v-2.016q0-2.464-1.76-4.224t-4.224-1.76q-0.096 0-0.32 0.032 0.32-1.152 0.32-2.048 0-3.296-2.368-5.632t-5.632-2.368q-2.88 0-5.056 1.824t-2.784 4.544q-1.152-0.352-2.176-0.352-3.296 0-5.664 2.336t-2.336 5.664v1.984zM10.016 25.824q-0.096 0.928 0.576 1.6l4 4q0.576 0.576 1.408 0.576t1.408-0.576l4-4q0.672-0.672 0.608-1.6-0.064-0.32-0.16-0.576-0.224-0.576-0.736-0.896t-1.12-0.352h-1.984v-5.984q0-0.832-0.608-1.408t-1.408-0.608-1.408 0.608-0.576 1.408v5.984h-2.016q-0.608 0-1.12 0.352t-0.736 0.896q-0.096 0.288-0.128 0.576z" />
            </svg>
            Download Resume
          </ Link>
        </div>
      </div>
    </div>
  </div>
);

export default BannerSection;
