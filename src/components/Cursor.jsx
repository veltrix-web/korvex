import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

/* A precise dot that tracks 1:1 plus a ring that trails on a spring.
   No blend modes — those turn muddy over the lime sections. Instead the
   cursor reads the nearest [data-cursor-theme] ancestor and flips its
   own colours, so it stays legible on paper, lime and ink alike. */

const THEME = {
  light: { ring: '#0B0B0B', dot: '#0B0B0B', fill: '#0B0B0B', label: '#F7F7F4' },
  dark: { ring: '#F7F7F4', dot: '#F7F7F4', fill: '#A1FF62', label: '#0B0B0B' },
}

export default function Cursor() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  // Ring lags just enough to feel weighted, not laggy.
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.42 })
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.42 })

  const [state, setState] = useState('idle') // idle | link | label | text
  const [label, setLabel] = useState('')
  const [theme, setTheme] = useState('light')
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    // Fine pointers only — no phantom cursor on touch devices.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    document.documentElement.classList.add('has-custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const el = e.target
      setTheme(el.closest?.('[data-cursor-theme="dark"]') ? 'dark' : 'light')

      if (el.closest?.('input, textarea, [contenteditable="true"]')) {
        setState('text')
        setLabel('')
        return
      }

      const hit = el.closest?.('a, button, [data-cursor]')
      if (hit) {
        const text = hit.dataset?.cursor
        const custom = text && text !== 'true' ? text : ''
        setLabel(custom)
        setState(custom ? 'label' : 'link')
      } else {
        setLabel('')
        setState('idle')
      }
    }

    const leave = () => setVisible(false)
    const down = () => setPressed(true)
    const up = () => setPressed(false)

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [x, y])

  const c = THEME[theme]

  const ring = {
    idle: { width: 30, height: 30, opacity: 0.32, borderWidth: 1.25, backgroundColor: 'rgba(0,0,0,0)' },
    link: { width: 48, height: 48, opacity: 1, borderWidth: 1.25, backgroundColor: 'rgba(0,0,0,0)' },
    label: { width: 88, height: 88, opacity: 1, borderWidth: 0, backgroundColor: c.fill },
    text: { width: 2, height: 26, opacity: 0.9, borderWidth: 1.25, backgroundColor: c.ring },
  }[state]

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: c.ring,
          borderStyle: 'solid',
          borderRadius: state === 'text' ? 2 : 999,
        }}
        animate={{
          ...ring,
          scale: (visible ? 1 : 0.4) * (pressed ? 0.88 : 1),
          opacity: visible ? ring.opacity : 0,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.5 }}
      >
        <AnimatePresence>
          {state === 'label' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="px-2 text-center text-[10.5px] leading-tight font-semibold tracking-[0.1em] uppercase"
              style={{ color: c.label }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        className="cursor-dot"
        style={{ x, y, translateX: '-50%', translateY: '-50%', backgroundColor: c.dot }}
        animate={{
          width: state === 'idle' ? 5 : 0,
          height: state === 'idle' ? 5 : 0,
          opacity: visible && state === 'idle' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
