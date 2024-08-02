import React, {
  // forwardRef,
  // useEffect,
  // useImperativeHandle,
  // useRef,
} from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
// import gsap from "gsap"

// const Circle = forwardRef(({ size, delay }, ref) => {
//   const el = useRef()

//   useImperativeHandle(
//     ref,
//     () => {
//       return {
//         moveTo(x, y) {
//           gsap.to(el.current, { x, y, delay })
//         },
//       }
//     },
//     [delay],
//   )

//   return <div className={`circle ${size}`} ref={el}></div>
// })

const Layout = ({ children }) => {
  useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // const circleRefs = useRef()
  // circleRefs.current = []

  // useEffect(() => {
  //   const { innerWidth, innerHeight } = window
  //   circleRefs.current.forEach(ref =>
  //     ref.moveTo(innerWidth / 2, innerHeight / 2),
  //   )

  //   const onMove = ({ clientX, clientY }) => {
  //     circleRefs.current.forEach(ref => ref.moveTo(clientX, clientY))
  //   }

  //   window.addEventListener("pointermove", onMove)
  //   return () => window.removeEventListener("pointermove", onMove)
  // }, [])

  // const addCircleRef = ref => {
  //   if (ref) {
  //     circleRefs.current.push(ref)
  //   }
  // }


  return (
        <div id="app">
          {/* <Circle size="sm" ref={addCircleRef} delay={0} />
      <Circle size="md" ref={addCircleRef} delay={0.1} />
      <Circle size="lg1" ref={addCircleRef} delay={0.2} />
      <Circle size="lg2" ref={addCircleRef} delay={0.3} />
      <Circle size="lg3" ref={addCircleRef} delay={0.4} />
      <Circle size="lg4" ref={addCircleRef} delay={0.5} />
      <Circle size="lg5" ref={addCircleRef} delay={0.6} />
      <Circle size="lg6" ref={addCircleRef} delay={0.7} />
      <Circle size="lg7" ref={addCircleRef} delay={0.8} />
      <Circle size="lg8" ref={addCircleRef} delay={0.9} /> */}
          <Header />
          <main>{children}</main>
          <footer
            style={{
              color: "#000",
              textDecoration: "none",
            }}
          >
            © {new Date().getFullYear()} &middot; Developer -{` `}
            <a href="https://www.google.com">Shivam</a>
          </footer>
        </div>
  )
}

export default Layout
