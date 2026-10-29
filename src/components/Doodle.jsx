import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* Hand-drawn marker doodles. Paths are deliberately uneven — the curves
   overshoot and the circle doesn't close — so they read as pen on paper
   rather than a vector shape. Each one draws itself in when scrolled to. */

const SHAPES = {
  // Long swoop, left to right, arrowhead at the far end
  arrowRight: {
    viewBox: '0 0 132 58',
    body: 'M4 38 C 27 11, 63 5, 92 17 C 107 23, 117 32, 123 43',
    head: 'M112 29 L124 44 L106 47',
  },
  // Curls down and to the right — good under a headline
  arrowDown: {
    viewBox: '0 0 84 108',
    body: 'M42 5 C 13 25, 9 63, 31 84 C 44 96, 60 97, 70 87',
    head: 'M57 79 L71 88 L58 97',
  },
  // Short nudge, points down-left
  arrowLeft: {
    viewBox: '0 0 92 70',
    body: 'M86 8 C 66 30, 44 46, 16 55',
    head: 'M31 58 L13 56 L26 44',
  },
  // Loop-de-loop, points right
  arrowLoop: {
    viewBox: '0 0 148 74',
    body: 'M5 52 C 24 20, 44 8, 58 18 C 70 27, 56 50, 40 44 C 26 39, 34 16, 62 14 C 96 12, 122 26, 138 44',
    head: 'M126 32 L139 46 L121 50',
  },
  // Rough ellipse that overshoots where it closes
  circle: {
    viewBox: '0 0 124 62',
    body: 'M62 6 C 24 6, 7 18, 7 31 C 7 46, 31 55, 63 55 C 97 55, 116 44, 115 30 C 114 17, 93 6, 57 6 C 31 6, 13 14, 10 27',
  },
  // Two passes of a scribbled underline
  underline: {
    viewBox: '0 0 146 20',
    body: 'M4 11 C 32 4, 74 4, 141 9',
    head: 'M13 17 C 46 11, 88 11, 133 15',
  },
  // Four-point sparkle
  sparkle: {
    viewBox: '0 0 24 24',
    body: 'M12 1 C 13.2 8, 16 10.8, 23 12 C 16 13.2, 13.2 16, 12 23 C 10.8 16, 8 13.2, 1 12 C 8 10.8, 10.8 8, 12 1',
  },
  // Wobbly connector line
  squiggle: {
    viewBox: '0 0 120 24',
    body: 'M4 14 C 14 2, 24 2, 34 12 C 44 22, 54 22, 64 12 C 74 2, 84 2, 94 12 C 104 22, 112 20, 116 14',
  },
  // Shallower wave — reads as an underline
  wave: {
    viewBox: '0 0 130 16',
    body: 'M3 10 C 14 3, 24 15, 35 8 C 46 1, 56 13, 67 7 C 78 1, 88 13, 99 7 C 110 1, 120 10, 127 7',
  },
  // Five-point star, drawn in one pass so it never quite closes
  star: {
    viewBox: '0 0 48 48',
    body: 'M24 3 C 26 10, 28 16, 30.5 18 C 34 18.5, 42 19, 46 19.5 C 41 24, 35 28, 33 30 C 34 35, 36 41, 37.5 44.5 C 32 41, 27 37, 24 35.5 C 20 37.5, 14 41, 10 44 C 11.5 39, 14 32, 15 30 C 11 26, 5 21, 2 19 C 8 18.5, 15 18, 18 17.5 C 20 13, 22 7, 24 3',
  },
  // Quick tick
  check: {
    viewBox: '0 0 40 30',
    body: 'M4 16 C 8 19, 13 24, 16 27 C 22 19, 30 8, 37 3',
  },
  // Inward spiral
  spiral: {
    viewBox: '0 0 60 60',
    body: 'M32 30 C 32 26, 28 25, 26 28 C 23 32, 27 38, 33 38 C 42 38, 46 30, 43 22 C 39 12, 27 9, 17 15 C 5 22, 3 39, 13 49 C 24 60, 45 57, 55 44',
  },
  // Rough box for circling a whole phrase
  box: {
    viewBox: '0 0 140 60',
    body: 'M6 10 C 40 6, 100 6, 134 9 C 136 24, 136 40, 133 52 C 96 55, 44 55, 8 52 C 5 38, 5 22, 6 10',
  },
  // Scribbled cross
  cross: {
    viewBox: '0 0 30 30',
    body: 'M5 5 C 12 12, 20 20, 25 25',
    head: 'M25 5 C 18 12, 10 20, 5 25',
  },
}

export default function Doodle({
  shape = 'arrowRight',
  className = '',
  color = 'var(--color-lime-deep)',
  width = 2.4,
  delay = 0,
  duration = 1.1,
  rotate = 0,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const def = SHAPES[shape] ?? SHAPES.arrowRight

  return (
    <svg
      ref={ref}
      viewBox={def.viewBox}
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none overflow-visible ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <motion.path
        d={def.body}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{
          pathLength: { duration, delay, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.12, delay },
        }}
      />
      {def.head && (
        <motion.path
          d={def.head}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: duration * 0.4, delay: delay + duration * 0.72, ease: 'easeOut' },
            opacity: { duration: 0.1, delay: delay + duration * 0.72 },
          }}
        />
      )}
    </svg>
  )
}

/* A doodle paired with a handwritten note — the combo that makes a page
   feel annotated by a person. */
export function DoodleNote({
  children,
  shape = 'arrowRight',
  className = '',
  noteClassName = '',
  doodleClassName = '',
  delay = 0,
  rotate = 0,
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.6, delay }}
        className={`hand text-lime-deep ${noteClassName}`}
      >
        {children}
      </motion.span>
      <Doodle shape={shape} className={doodleClassName} delay={delay + 0.15} rotate={rotate} />
    </div>
  )
}
