import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'

import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Intro from './components/Intro'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import Team from './components/Team'
import Facts from './components/Facts'
import Faq from './components/Faq'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  /* Smooth scrolling. Anchor clicks are routed through Lenis so the
     eased motion applies to in-page navigation too. */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -80 })
    }

    document.addEventListener('click', onAnchorClick)
    return () => {
      document.removeEventListener('click', onAnchorClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  /* Keep the page pinned while the preloader is up. */
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  return (
    <div className="grain relative">
      <Preloader onDone={() => setReady(true)} />
      <Cursor />

      {/* Scroll progress rail */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: 'left' }}
        className="fixed inset-x-0 top-0 z-[110] h-[2px] bg-lime-deep"
      />

      <Nav />

      <main>
        {/* Pinned hero. Everything after it lives in an opaque panel that
            scrolls up and covers this layer. */}
        <div className="sticky top-0 z-0 h-svh">
          <Hero start={ready} />
        </div>

        <div className="relative z-10 rounded-t-[26px] bg-paper shadow-[0_-30px_80px_-24px_rgba(11,11,11,0.28)] md:rounded-t-[40px]">
          <Intro />
          <Services />
          <Work />
          <MarqueeStrip />
          <Process />
          <Team />
          <Facts />
          <Faq />
          <CTA />
          <Footer />
        </div>
      </main>
    </div>
  )
}
