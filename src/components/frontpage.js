import React, { useState } from "react"
import shivam from "../images/shivam.jpg"
import { SplitText } from "../Gsap/SplitText"
import { Link } from "gatsby"
import "./frontpage.css"
import ParticleNetworkAnimation from "../components/particle"
import { projects, tech } from "./data"
import ImageSwiper from "./imageSwiper"
import cross from "@images/cross.svg"
import Swiper from "./swiper"

const Frontpage = () => {
  const [readMore, setReadMore] = useState(false)
  const [openProject, setOpenProject] = useState(false)

  function handleRead(project) {
    setReadMore(true)
    setOpenProject(project)
  }

  const handleClosePopup = () => {
    setReadMore(false)
  }

  return (
    <div>
      <ParticleNetworkAnimation />
      <SplitText by="WORD" as="i" animate>
        <div className="section" id="section1">
          <div className="contain banner">
            <div id="bg">
              <img
                src={shivam}
                width="300"
                height="300"
                alt="Profile"
                className="profile"
              />
            </div>
            <div className="banner-text">
              <SplitText by="WORD" as="i" animate>
                <span className="banner-head">
                  Welcome to my portolio website . . .
                </span>
              </SplitText>
              <div className="my-name">
                <SplitText by="WORD" as="i" animate>
                  I'm Shivam Gupta.
                </SplitText>
              </div>
              <div className="banner-inner-section">
                <Link
                  target="_blank"
                  className="link-tiles"
                  to="mailto:shivamgupta130798@gmail.com"
                >
                  <SplitText by="WORD" as="i" animate>
                    Gmail: Shivamgupta130798@gmail.com
                  </SplitText>
                </Link>
                <div className="link-tiles">
                  <SplitText by="WORD" as="i" animate>
                    Location: India
                  </SplitText>
                </div>
                <Link
                  target="_blank"
                  className="link-tiles"
                  to="https://github.com/shivaay1307"
                >
                  <SplitText by="WORD" as="i" animate>
                    Github
                  </SplitText>
                </Link>
                <Link
                  target="_blank"
                  className="link-tiles"
                  to="https://leetcode.com/shivamgupta130798/"
                >
                  <SplitText by="WORD" as="i" animate>
                    Leetcode
                  </SplitText>
                </Link>
                <Link
                  target="_blank"
                  className="link-tiles"
                  to="https://www.linkedin.com/in/shivam-gupta-a52501224"
                >
                  <SplitText by="WORD" as="i" animate>
                    LinkedIn
                  </SplitText>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="section" id="section2">
          <Swiper />
        </div>
        <div className="section" id="section3">
          <div className="contain">
            <h2>Academic Education</h2>
            <ul className="description">
              <li>
                <SplitText by="WORD" as="i" animate>
                  Higher Secondary Education:
                  <div>
                    Bright Future Senior Secondary School, Jaipur, Rajasthan,
                    India.
                  </div>
                  <div>
                    Physics, Chemistry, and Mathematics, Ajmer Board, Jaipur,
                    Rajasthan, India.
                  </div>
                </SplitText>
              </li>
              <li>
                <SplitText by="WORD" as="i" animate>
                  Undergraduate Studies:
                  <div>
                    Bachelor's in Computer Applications from Rajasthan
                    University, Jaipur, Rajasthan, India.
                  </div>
                </SplitText>
              </li>
              <li>
                <SplitText by="WORD" as="i" animate>
                  Postgraduate Studies:
                  <div>
                    Master's in Information Technology from the Dhirubhai Ambani
                    Institute of ICT, Gandhinagar, Gujarat, India.
                  </div>
                </SplitText>
              </li>
            </ul>

            <h2>State and National Level Examinations</h2>
            <ul className="description">
              <li>
                <SplitText by="WORD" as="i" animate>
                  CMAT 2019: Ranked in the 55th percentile.
                </SplitText>
              </li>
              <li>
                <SplitText by="WORD" as="i" animate>
                  NIMCET 2019: Ranked approximately 4500 out of 36000.
                </SplitText>
              </li>
              <li>
                <SplitText by="WORD" as="i" animate>
                  Karnataka PGCET 2019: Ranked approximately 500 out of 6500.
                </SplitText>
              </li>
              <li>
                <SplitText by="WORD" as="i" animate>
                  Dhirubhai Ambani Institute of ICT 2020: Qualified in the merit
                  list for the entrance exam.
                </SplitText>
              </li>
            </ul>
          </div>
        </div>
        <div className="section" id="section4">
          <div className="contain">
            <h2>Skills</h2>
            <ul className="description image-stack">
              {tech?.map((i, n) => {
                return (
                  <li className="image-tech-container" key={n}>
                    <div className="single-skill">
                      <img
                        src={i?.img[i?.name]}
                        alt={i?.title}
                        className="tech-image"
                      />
                      <SplitText by="WORD" as="i" animate>
                        {i?.title}
                      </SplitText>
                    </div>
                    <div className="skill-rating">
                      <SplitText by="WORD" as="i" animate>
                        <p>{i?.rate} </p>
                        <span className="rating-bar">
                          <span
                            className="rating-bar2"
                            style={{ width: `${i?.rate * 10 + 2}px` }}
                          />
                        </span>
                        <p>10</p>
                      </SplitText>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div
          className="section"
          id="section5"
          style={{ minHeight: `${openProject ? "100vh" : "160vh"}` }}
        >
          {openProject !== undefined && readMore === true ? (
            <div className="project-popup">
              <div className="popup-container">
                <div>
                  <div className="popup-heading">
                    <h1 className="project-popup-head">
                      <SplitText by="WORD" as="i" animate>
                        {openProject?.title}
                      </SplitText>
                    </h1>
                    <button onClick={() => handleClosePopup()}>
                      <img src={cross} alt="close" className="close" />
                    </button>
                  </div>
                  <div className="project-popup-description">
                    {openProject?.description?.map((desc, index) => {
                      return (
                        <p key={index}>
                          <SplitText by="WORD" as="i" animate>
                            {desc}
                          </SplitText>
                        </p>
                      )
                    })}
                  </div>
                </div>
                {openProject && (
                  <ImageSwiper images={openProject?.imgs} readMore={readMore} />
                )}
              </div>
            </div>
          ) : (
            <div className="contain">
              <h2>Projects (Main)</h2>
              <div className="project-container">
                {projects?.map(project => {
                  return (
                    <button
                      type="button"
                      className="project-card"
                      onClick={() => handleRead(project)}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === "Space") {
                          handleRead(project)
                        }
                      }}
                    >
                      <h3 className="project-head">
                        <SplitText by="WORD" as="i" animate>
                          {project?.title}
                        </SplitText>
                      </h3>
                      <div className="project-description">
                        {project?.description?.map((desc, index) => {
                          return (
                            <p key={index}>
                              <SplitText by="WORD" as="i" animate>
                                {desc}
                              </SplitText>
                            </p>
                          )
                        })}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </SplitText>
    </div>
  )
}

export default Frontpage
