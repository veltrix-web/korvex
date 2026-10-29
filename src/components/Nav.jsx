import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { EASE, Magnetic } from '../lib/motion'
import SocialIcons from './SocialIcons'
import { BRAND, NAV } from '../data'

/* Starts as a full-width bar over the hero, then collapses into a
   floating island once you scroll. The active link is marked by a single
   lime pill that slides between items via a shared layoutId. */
export default function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [floating, setFloating] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setFloating(y > 90)
    setHidden(y > prev && y > 420 && !open)
  })

  // Scroll-spy. rootMargin biases the "current" section toward the middle
  // of the viewport so the pill flips at a natural moment.
  useEffect(() => {
    const ids = [...NAV.map((n) => n.href), '#contact']
    const sections = ids.map((id) => document.querySelector(id)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] px-3 md:px-6"
        animate={{ y: hidden ? '-130%' : '0%' }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <motion.div
          animate={{
            marginTop: floating ? 14 : 0,
            maxWidth: floating ? 1180 : 1440,
            borderRadius: floating ? 999 : 0,
            paddingLeft: floating ? 14 : 10,
            paddingRight: floating ? 14 : 10,
          }}
          transition={{ duration: 0.7, ease: EASE }}
          className={`mx-auto flex items-center justify-between gap-4 py-2.5 transition-[background-color,box-shadow,border-color] duration-500 ${
            floating
              ? 'border border-line bg-paper/75 shadow-[0_10px_40px_-14px_rgba(11,11,11,0.22)] backdrop-blur-xl'
              : 'border border-transparent bg-transparent'
          }`}
        >
          {/* Wordmark */}
          <a href="#top" className="group flex shrink-0 items-center gap-2.5 pl-1" aria-label={BRAND.name}>
            <motion.span
              animate={{ rotate: floating ? -8 : 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid h-9 w-9 place-items-center rounded-[11px] bg-lime text-[16px] font-extrabold text-ink"
            >
              K
            </motion.span>
            <span className="text-[17px] font-extrabold tracking-[-0.03em]">
              {BRAND.name.toLowerCase()}
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const isActive = active === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-lime"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Live status — only once the bar is floating, so it doesn't
                duplicate the hero's availability pill. */}
            <AnimatePresence>
              {floating && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="hidden items-center gap-2 overflow-hidden pr-1 text-[12.5px] font-medium whitespace-nowrap text-ink-2 lg:flex"
                >
                  <span className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" />
                  Available
                </motion.span>
              )}
            </AnimatePresence>

            <Magnetic className="hidden md:block">
              <a
                href="#contact"
                data-cursor="true"
                className="sweep inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-paper transition-colors duration-500 hover:text-ink"
              >
                Start a project
                <span className="text-[15px] leading-none">↗</span>
              </a>
            </Magnetic>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-paper/70 backdrop-blur-md md:hidden"
            >
              <motion.span
                className="block h-[1.5px] w-4 bg-ink"
                animate={{ rotate: open ? 45 : 0, y: open ? 3.25 : 0 }}
              />
              <motion.span
                className="block h-[1.5px] w-4 bg-ink"
                animate={{ rotate: open ? -45 : 0, y: open ? -3.25 : 0 }}
              />
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-center bg-paper px-7 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />

            <nav className="relative flex flex-col">
              {[...NAV, { label: 'Contact', href: '#contact' }].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-line py-4"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.7, ease: EASE }}
                >
                  <span className="font-mono text-[12px] text-ink-3">0{i + 1}</span>
                  <span className="display text-[12vw] leading-none">{item.label}</span>
                  <span className="ml-auto self-center text-xl text-ink-3">↗</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="relative mt-10 flex items-end justify-between gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <div>
                <a href={`mailto:${BRAND.email}`} className="text-[15px] font-semibold text-ink">
                  {BRAND.email}
                </a>
                <p className="mt-1 text-[14px] text-ink-2">{BRAND.location}</p>
              </div>
              <SocialIcons socials={BRAND.socials} name={BRAND.name} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
