import React, { useEffect, useRef } from "react"
import $ from "jquery"
import * as styles from "@styles/global.module.css"

const ParticleNetworkAnimation = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    class Particle {
      constructor(parent, x, y) { 
        this.network = parent
        this.canvas = parent.canvas
        this.ctx = parent.ctx
        this.particleColor = returnRandomArrayitem(
          this.network.options.particleColors
        )
        this.radius = getLimitedRandom(1.5, 2.5)
        this.opacity = 0
        this.x = x || Math.random() * this.canvas.width
        this.y = y || Math.random() * this.canvas.height
        this.velocity = {
          x: (Math.random() - 0.5) * parent.options.velocity,
          y: (Math.random() - 0.5) * parent.options.velocity,
        }
      }

      update() {
        if (this.opacity < 1) {
          this.opacity += 0.01
        } else {
          this.opacity = 1
        }

        if (this.x > this.canvas.width + 100 || this.x < -100) {
          this.velocity.x = -this.velocity.x
        }
        if (this.y > this.canvas.height + 100 || this.y < -100) {
          this.velocity.y = -this.velocity.y
        }

        this.x += this.velocity.x
        this.y += this.velocity.y
      }

      draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.particleColor
        this.ctx.globalAlpha = this.opacity
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.ctx.fill()
      }
    }

    class ParticleNetwork {
      constructor(parent) {
        this.options = {
          velocity: 1,
          density: 15000,
          netLineDistance:  400,
          netLineColor: "#ffffff33",
          particleColors: ["#ffffff33"],
        }
        this.canvas = parent.canvas
        this.ctx = parent.ctx

        this.init()
      }

      init() {
        this.createParticles(true)
        this.animationFrame = requestAnimationFrame(this.update.bind(this))
        this.bindUiActions()
      }

      createParticles(isInitial) {
        this.particles = [];
        let maxQuantity = (this.canvas.width * this.canvas.height) / this.options.density;
        if (isInitial) {
          let quantity = 50;
          for (let i = 0; i < quantity; i++) {
            const x = this.canvas.width * (0.1 + 0.8 * (i / (quantity - 1)));
            const y = this.canvas.height * (0.1 + 0.8 * (i / (quantity - 1)));
            this.particles.push(new Particle(this, x, y));
          }
          let growInterval = setInterval(() => {
            if (this.particles.length < maxQuantity) {
              for (let j = 0; j < 2 && this.particles.length < maxQuantity; j++) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                this.particles.push(new Particle(this, x, y));
              }
            } else {
              clearInterval(growInterval);
            }
          }, 200);
        } else {
          for (let i = 0; i < maxQuantity; i++) {
            this.particles.push(new Particle(this));
          }
        }
      }

      createInteractionParticle() {
        this.interactionParticle = new Particle(this)
        this.interactionParticle.velocity = {
          x: 0,
          y: 0,
        }
        this.particles.push(this.interactionParticle)
        return this.interactionParticle
      }

      removeInteractionParticle() {
        const index = this.particles.indexOf(this.interactionParticle)
        if (index > -1) {
          this.interactionParticle = undefined
          this.particles.splice(index, 1)
        }
      }

      update() {
        if (this.canvas) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.ctx.globalAlpha = 1

          for (let i = 0; i < this.particles.length; i++) {
            for (let j = this.particles.length - 1; j > i; j--) {
              let distance,
                p1 = this.particles[i],
                p2 = this.particles[j]

              distance = Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y))
              if (distance > this.options.netLineDistance) {
                continue
              }

              distance = Math.sqrt(
                Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
              )
              if (distance > this.options.netLineDistance) {
                continue
              }

              this.ctx.beginPath()
              this.ctx.strokeStyle = this.options.netLineColor
              this.ctx.globalAlpha =
                ((this.options.netLineDistance - distance) /
                  this.options.netLineDistance) *
                p1.opacity *
                p2.opacity
              this.ctx.lineWidth = 0.7
              this.ctx.moveTo(p1.x, p1.y)
              this.ctx.lineTo(p2.x, p2.y)
              this.ctx.stroke()
            }
          }

          for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update()
            this.particles[i].draw()
          }

          if (this.options.velocity !== 0) {
            this.animationFrame = requestAnimationFrame(this.update.bind(this))
          }
        } else {
          cancelAnimationFrame(this.animationFrame)
        }
      }

      bindUiActions() {
        this.spawnQuantity = 3
        this.mouseIsDown = false
        this.touchIsMoving = false

        this.onMouseMove = e => {
          if (!this.interactionParticle) {
            this.createInteractionParticle()
          }
          this.interactionParticle.x = e.offsetX
          this.interactionParticle.y = e.offsetY
        }

        this.onTouchMove = e => {
          e.preventDefault()
          this.touchIsMoving = true
          if (!this.interactionParticle) {
            this.createInteractionParticle()
          }
          this.interactionParticle.x = e.changedTouches[0].clientX
          this.interactionParticle.y = e.changedTouches[0].clientY
        }

        this.onMouseDown = e => {
          this.mouseIsDown = true
          let counter = 0
          let quantity = this.spawnQuantity
          const intervalId = setInterval(() => {
            if (this.mouseIsDown) {
              if (counter === 1) {
                quantity = 1
              }
              for (let i = 0; i < quantity; i++) {
                if (this.interactionParticle) {
                  this.particles.push(
                    new Particle(
                      this,
                      this.interactionParticle.x,
                      this.interactionParticle.y
                    )
                  )
                }
              }
            } else {
              clearInterval(intervalId)
            }
            counter++
          }, 50)
        }

        this.onTouchStart = e => {
          e.preventDefault()
          setTimeout(() => {
            if (!this.touchIsMoving) {
              for (let i = 0; i < this.spawnQuantity; i++) {
                this.particles.push(
                  new Particle(
                    this,
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY
                  )
                )
              }
            }
          }, 200)
        }

        this.onMouseUp = e => {
          this.mouseIsDown = false
        }

        this.onMouseOut = e => {
          this.removeInteractionParticle()
        }

        this.onTouchEnd = e => {
          e.preventDefault()
          this.touchIsMoving = false
          this.removeInteractionParticle()
        }

        this.canvas.addEventListener("mousemove", this.onMouseMove)
        this.canvas.addEventListener("touchmove", this.onTouchMove)
        this.canvas.addEventListener("mousedown", this.onMouseDown)
        this.canvas.addEventListener("touchstart", this.onTouchStart)
        this.canvas.addEventListener("mouseup", this.onMouseUp)
        this.canvas.addEventListener("mouseout", this.onMouseOut)
        this.canvas.addEventListener("touchend", this.onTouchEnd)
      }

      unbindUiActions() {
        if (this.canvas) {
          this.canvas.removeEventListener("mousemove", this.onMouseMove)
          this.canvas.removeEventListener("touchmove", this.onTouchMove)
          this.canvas.removeEventListener("mousedown", this.onMouseDown)
          this.canvas.removeEventListener("touchstart", this.onTouchStart)
          this.canvas.removeEventListener("mouseup", this.onMouseUp)
          this.canvas.removeEventListener("mouseout", this.onMouseOut)
          this.canvas.removeEventListener("touchend", this.onTouchEnd)
        }
      }
    }

    const ParticleNetworkAnimation = class {

      init(element) {
        this.$el = $(element)
        this.container = element
        this.canvas = document.createElement("canvas")
        this.sizeCanvas()
        this.container.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d")
        this.particleNetwork = new ParticleNetwork(this)

        this.bindUiActions()

        return this
      }

      bindUiActions() {
        $(window).on("resize", () => {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.sizeCanvas()
          this.particleNetwork.createParticles()
        })
      }

      sizeCanvas() {
        this.canvas.width = this.container.offsetWidth
        this.canvas.height = this.container.offsetHeight
      }
    }

    const getLimitedRandom = (min, max, roundToInteger) => {
      let number = Math.random() * (max - min) + min
      if (roundToInteger) {
        number = Math.round(number)
      }
      return number
    }

    const returnRandomArrayitem = array => {
      return array[Math.floor(Math.random() * array.length)]
    }

    const pna = new ParticleNetworkAnimation();
    if (canvasRef.current) {
      pna.init(canvasRef.current);
      setTimeout(() => {
        if (pna.particleNetwork && pna.particleNetwork.options) {
          pna.particleNetwork.options.velocity = pna.particleNetwork.options.velocity / 2;
        }
      }, 10000);
    }

    return () => {
      pna.unbindUiActions()
    }
  }, [])
  return (
    <div ref={canvasRef} className={styles.particleNetworkAnimation}>
      <div className={styles.glow + " " + styles.glow1}></div>
      <div className={styles.glow + " " + styles.glow2}></div>
      <div className={styles.glow + " " + styles.glow3}></div>
    </div>
  )
}

export default ParticleNetworkAnimation
