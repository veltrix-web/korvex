import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  animate,
} from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]

/* ---------------------------------------------------------------
   Reveal — fades + lifts a block into view once.
   --------------------------------------------------------------- */
export function Reveal({ children, delay = 0, y = 26, className = '', once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ---------------------------------------------------------------
   SplitWords — headline words rise from a clipped line, staggered.
   Each word gets its own overflow-hidden mask so the lift reads
   as type being "revealed" rather than just faded.
   --------------------------------------------------------------- */
export function SplitWords({
  text,
  className = '',
  delay = 0,
  stagger = 0.055,
  once = true,
  play = true, // lets a parent hold the reveal (e.g. until the preloader lifts)
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-10% 0px' })
  const words = text.split(' ')
  const show = inView && play

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={show ? { y: 0 } : {}}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ---------------------------------------------------------------
   ScrollHighlight — paragraph whose words darken as you scroll past.
   The "premium editorial" effect: text starts ghosted, fills in.
   --------------------------------------------------------------- */
export function ScrollHighlight({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <HighlightWord key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </HighlightWord>
        )
      })}
    </p>
  )
}

function HighlightWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
      {' '}
    </motion.span>
  )
}

/* ---------------------------------------------------------------
   Magnetic — element leans toward the cursor, springs back.
   --------------------------------------------------------------- */
export function Magnetic({ children, strength = 0.32, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------------------------------------------------------------
   Counter — counts up to `to` when scrolled into view.
   --------------------------------------------------------------- */
export function Counter({ to, duration = 1.9, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

/* ---------------------------------------------------------------
   Marquee — infinite horizontal scroll. Children are duplicated so
   the -50% keyframe loops seamlessly.
   --------------------------------------------------------------- */
export function Marquee({ children, duration = 34, dir = 'left', className = '' }) {
  return (
    <div className={`marquee marquee-mask overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        data-dir={dir === 'right' ? 'right' : undefined}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------
   Parallax — shifts a layer against scroll.
   --------------------------------------------------------------- */
export function useParallax(ref, distance = 80) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  return useTransform(scrollYProgress, [0, 1], [distance, -distance])
}
