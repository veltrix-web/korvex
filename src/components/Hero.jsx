import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE, Magnetic, SplitWords } from '../lib/motion'
import Doodle from './Doodle'
import { BRAND } from '../data'

/* The hero is pinned by its `sticky` wrapper in App.jsx. As the next
   panel slides up over it, the hero shrinks and dims so it reads as a
   layer being covered rather than a section scrolling away. */
export default function Hero({ start }) {
  const { scrollY } = useScroll()
  const [vh, setVh] = useState(900)

  useEffect(() => {
    const measure = () => setVh(window.innerHeight)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const scale = useTransform(scrollY, [0, vh], [1, 0.92])
  const opacity = useTransform(scrollY, [0, vh * 0.85], [1, 0.25])
  const blur = useTransform(scrollY, [0, vh], ['blur(0px)', 'blur(4px)'])
  const auraY = useTransform(scrollY, [0, vh], [0, -140])

  return (
    <section id="top" className="relative h-full overflow-hidden pt-28 md:pt-32">
      {/* Layer 1 — grid */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />

      {/* Scattered marker marks — small enough to feel incidental */}
      <Doodle
        shape="star"
        className="absolute top-[22%] right-[7%] hidden h-[36px] w-[36px] lg:block"
        delay={1.3}
        width={2}
      />
      <Doodle
        shape="sparkle"
        className="absolute top-[54%] left-[3%] hidden h-[22px] w-[22px] lg:block"
        delay={1.5}
        width={1.8}
      />

      {/* Layer 2 — lime aura */}
      <motion.div
        style={{ y: auraY }}
        className="aura pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[820px] -translate-x-1/2 opacity-70"
      />

      {/* Layer 3 — content */}
      <motion.div
        style={{ scale, opacity, filter: blur }}
        className="relative mx-auto flex h-[calc(100%-2.5rem)] max-w-[1440px] flex-col justify-between px-6 pb-8 md:px-10"
      >
        <div>
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-2/60 py-1.5 pr-4 pl-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-lime-deep" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-deep" />
            </span>
            <span className="text-[12.5px] font-medium text-ink-2">
              Taking on new projects — {BRAND.location}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="display text-[13vw] leading-[0.88] md:text-[8.8vw] lg:text-[8vw]">
            <span className="block">
              <SplitWords text="We design &" delay={0.2} play={start} />
            </span>
            <span className="block">
              <SplitWords text="build digital" delay={0.29} play={start} />
            </span>
            <span className="flex flex-wrap items-baseline gap-x-[0.22em]">
              <SplitWords text="things" delay={0.38} play={start} />
              <motion.span
                initial={{ opacity: 0, rotate: -6, y: 22 }}
                animate={start ? { opacity: 1, rotate: -3, y: 0 } : {}}
                transition={{ duration: 1, ease: EASE, delay: 0.7 }}
                className="hand inline-block text-lime-deep"
                style={{ fontSize: '0.72em', letterSpacing: '-0.01em' }}
              >
                that actually work
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 grid gap-8 border-t border-line pt-7 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.77 }}
            className="max-w-md text-[15.5px] leading-relaxed text-ink-2 md:col-span-5 md:text-[17px]"
          >
            A small studio of three — building apps, websites, brand design and video for people
            who would rather have one team than four freelancers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.87 }}
            className="flex flex-wrap items-center gap-3 md:col-span-4"
          >
            <Magnetic>
              <a
                href="#contact"
                data-cursor="Let's talk"
                className="sweep inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-[14.5px] font-semibold text-paper transition-colors duration-500 hover:text-ink"
              >
                Book a free call
                <span className="text-base leading-none">↗</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-4 text-[14.5px] font-semibold text-ink transition-colors duration-400 hover:border-ink"
              >
                See our work
              </a>
            </Magnetic>
          </motion.div>

          {/* Rotating stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={start ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.95 }}
            className="hidden md:col-span-3 md:flex md:justify-end"
          >
            <div className="relative h-[116px] w-[116px]">
              <svg viewBox="0 0 124 124" className="spin-slow absolute inset-0 h-full w-full">
                <defs>
                  <path
                    id="circlePath"
                    d="M62,62 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                    fill="none"
                  />
                </defs>
                <text
                  fill="currentColor"
                  className="text-ink-3"
                  style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.22em' }}
                >
                  <textPath href="#circlePath">
                    {`${BRAND.name.toUpperCase()} · DESIGN · DEVELOPMENT · `}
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-lime text-ink">
                  <span className="text-lg leading-none">↓</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
