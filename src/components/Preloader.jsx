import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { EASE } from '../lib/motion'
import { BRAND } from '../data'

/* Counts to 100, reveals the wordmark, then lifts the paper curtain. */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)

  // Held in a ref so a new onDone identity from the parent can't restart
  // the count-up animation on every render.
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    let timer
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: [0.5, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        timer = setTimeout(() => {
          setGone(true)
          onDoneRef.current?.()
        }, 380)
      },
    })
    return () => {
      controls.stop()
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink px-6 py-8 md:px-12 md:py-12"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between">
            <motion.span
              className="text-[11px] font-semibold tracking-[0.24em] text-paper/50 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {BRAND.tagline}
            </motion.span>
            <motion.span
              className="text-[11px] font-semibold tracking-[0.24em] text-paper/50 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {BRAND.location}
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              className="display text-[16vw] text-paper md:text-[13vw]"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            >
              {BRAND.name.toUpperCase()}
              <span className="text-lime">.</span>
            </motion.h1>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px w-full max-w-[62%] bg-paper/15">
              <motion.div
                className="h-px bg-lime"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                style={{ transformOrigin: 'left' }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>
            <span className="display text-[13vw] leading-none text-paper md:text-[7vw]">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
