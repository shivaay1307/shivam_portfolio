import React, { useState, useEffect } from "react"
import { work } from "./data"
import { SplitText } from "../Gsap/SplitText"

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(work.length)

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % length)
  }

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + length) % length)
  }

  useEffect(() => {
    setLength(work.length)
  }, [work])

  const handleRadioChange = index => setCurrentIndex(index)

  const renderRadio = () => {
    let radio = []
    for (let i = 0; i < work.length; i++) {
      radio.push(
        <div key={i} className="radio-wrapper">
          <button
            onClick={() => handleRadioChange(i)}
            className={`input-radio ${i === currentIndex ? "buttonActive" : ""}`}
          >
            {i + 1}
          </button>
          {i < work.length - 1 && <span className="line" />}
        </div>,
      )
    }
    return radio
  }

  return (
    <div className="slider-container2">
      <div className="slider2">
        {work?.map(
          (data, index) =>
            data && (
              <div
                key={index}
                className={`slide2 ${
                  index === currentIndex ? "active" : ""
                }`}
              >
                <h2>
                  <SplitText by="WORD" as="i" animate>
                    <span className="beforeBox" /> {data.title} <br /><span className="beforeBox" /> {data.company} <br /><span className="beforeBox" />{" "}
                    {data.duration}
                  </SplitText>
                </h2>
                <ul className="description">
                  {data.tasks.map((task, n) => (
                    <li key={n}>
                      <SplitText by="WORD" as="i" animate>
                        {task}
                      </SplitText>  
                    </li>
                  ))}
                </ul>
              </div>
            ),
        )}
        <div className="radio-container">{renderRadio()}</div>
      </div>
    </div>
  )
}

export default Swiper
