import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* Hand-drawn line illustrations. Every stroke is a single open path with
   slightly-off control points, so the shapes look sketched rather than
   constructed. They draw themselves in, stroke by stroke, on scroll. */

const ART = {
  browser: {
    viewBox: '0 0 200 150',
    paths: [
      'M8 14 C 60 9, 140 9, 192 13 C 195 50, 195 105, 192 140 C 140 145, 60 145, 8 141 C 5 105, 5 50, 8 14',
      'M9 38 C 60 34, 140 34, 192 37',
      'M18 26 C 18 23, 24 23, 24 26 C 24 29, 18 29, 18 26',
      'M30 26 C 30 23, 36 23, 36 26 C 36 29, 30 29, 30 26',
      'M42 26 C 42 23, 48 23, 48 26 C 48 29, 42 29, 42 26',
      'M28 60 C 60 57, 90 57, 120 59',
      'M28 78 C 70 75, 110 75, 150 77',
      'M28 96 C 55 93, 80 93, 105 95',
      'M28 112 C 45 110, 62 110, 78 112 C 79 120, 79 126, 78 132 C 62 134, 45 134, 28 132 C 27 126, 27 118, 28 112',
    ],
  },
  phone: {
    viewBox: '0 0 110 190',
    paths: [
      'M14 12 C 40 7, 70 7, 96 12 C 99 60, 99 130, 96 178 C 70 183, 40 183, 14 178 C 11 130, 11 60, 14 12',
      'M42 18 C 50 16, 60 16, 68 18',
      'M26 44 C 50 41, 76 41, 86 43',
      'M26 62 C 45 59, 65 59, 78 61',
      'M26 100 C 50 97, 76 97, 88 99 C 90 116, 90 132, 88 144 C 62 147, 40 147, 26 144 C 24 130, 24 114, 26 100',
      'M40 166 C 52 164, 62 164, 72 166',
    ],
  },
  poster: {
    viewBox: '0 0 150 180',
    paths: [
      'M12 14 C 55 9, 100 9, 138 13 C 141 60, 141 125, 138 168 C 98 173, 52 173, 14 169 C 11 125, 11 60, 12 14',
      'M46 56 C 32 56, 26 68, 32 78 C 38 89, 56 89, 62 78 C 68 67, 60 56, 46 56',
      'M78 88 C 88 70, 98 52, 106 40 C 114 56, 122 74, 128 88 C 112 90, 94 90, 78 88',
      'M28 112 C 60 109, 100 109, 124 111',
      'M28 128 C 52 125, 78 125, 96 127',
      'M28 144 C 48 141, 68 141, 82 143',
    ],
  },
  video: {
    viewBox: '0 0 190 140',
    paths: [
      'M14 40 C 60 30, 130 20, 176 12 C 178 20, 180 28, 181 34 C 134 44, 62 56, 18 62 C 16 55, 15 46, 14 40',
      'M46 34 C 44 42, 41 50, 38 58',
      'M78 28 C 76 36, 73 44, 70 52',
      'M110 22 C 108 30, 105 38, 102 46',
      'M142 17 C 140 25, 137 33, 134 40',
      'M18 62 C 66 55, 134 46, 178 38 C 180 70, 180 105, 178 128 C 130 134, 66 134, 20 128 C 17 106, 17 82, 18 62',
      'M84 78 C 96 85, 108 92, 118 98 C 106 105, 92 112, 82 118 C 82 105, 82 90, 84 78',
    ],
  },
  pen: {
    viewBox: '0 0 150 150',
    paths: [
      'M96 18 C 108 26, 120 38, 128 50 C 112 78, 88 106, 62 128 C 52 118, 40 106, 32 94 C 54 68, 76 42, 96 18',
      'M78 44 C 86 52, 96 62, 104 70',
      'M62 128 C 58 134, 54 140, 52 146 C 48 140, 42 134, 38 130',
      'M10 140 C 34 128, 66 122, 96 126',
    ],
  },
  layers: {
    viewBox: '0 0 170 150',
    paths: [
      'M85 12 C 110 22, 135 32, 158 42 C 134 52, 108 62, 85 70 C 62 62, 36 52, 12 42 C 36 32, 60 22, 85 12',
      'M12 70 C 36 80, 62 90, 85 98 C 108 90, 134 80, 158 70',
      'M12 98 C 36 108, 62 118, 85 126 C 108 118, 134 108, 158 98',
    ],
  },
  rocket: {
    viewBox: '0 0 140 170',
    paths: [
      'M70 8 C 88 26, 98 54, 98 84 C 98 104, 92 120, 84 130 C 74 133, 66 133, 56 130 C 48 120, 42 104, 42 84 C 42 54, 52 26, 70 8',
      'M70 54 C 60 54, 55 62, 60 70 C 65 78, 78 78, 82 70 C 86 62, 80 54, 70 54',
      'M42 92 C 30 102, 22 118, 20 132 C 30 130, 38 128, 46 124',
      'M98 92 C 110 102, 118 118, 120 132 C 110 130, 102 128, 94 124',
      'M58 134 C 62 146, 66 156, 70 164 C 74 156, 78 146, 82 134',
    ],
  },
  chat: {
    viewBox: '0 0 150 120',
    paths: [
      'M14 16 C 50 10, 96 10, 130 16 C 133 34, 133 54, 130 68 C 106 73, 80 74, 56 72 C 46 82, 36 92, 28 100 C 29 90, 30 80, 30 72 C 24 71, 18 70, 14 68 C 11 52, 11 32, 14 16',
      'M48 40 C 48 36, 55 36, 55 40 C 55 44, 48 44, 48 40',
      'M68 40 C 68 36, 75 36, 75 40 C 75 44, 68 44, 68 40',
      'M88 40 C 88 36, 95 36, 95 40 C 95 44, 88 44, 88 40',
    ],
  },
}

export const ILLUSTRATIONS = Object.keys(ART)

export default function Illustration({
  name = 'browser',
  className = '',
  color = 'currentColor',
  width = 2.2,
  delay = 0,
  stagger = 0.13,
  rotate = 0,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })
  const art = ART[name] ?? ART.browser

  return (
    <svg
      ref={ref}
      viewBox={art.viewBox}
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none overflow-visible ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {art.paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 0.85, delay: delay + i * stagger, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.1, delay: delay + i * stagger },
          }}
        />
      ))}
    </svg>
  )
}
