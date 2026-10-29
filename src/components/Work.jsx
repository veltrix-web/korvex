import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { EASE, Reveal } from '../lib/motion'
import Doodle from './Doodle'
import { WORK } from '../data'

/* Desktop: the section is taller than the viewport, its inner panel pins,
   and vertical scroll is mapped onto horizontal travel. The distance is
   measured from the real track width rather than guessed as a percentage,
   so adding or removing a project needs no other change.
   Mobile: pinning fights with touch scroll, so it degrades to a native
   snap-scroll carousel. */
export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [range, setRange] = useState(0)
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')

    const measure = () => {
      setDesktop(mq.matches)
      if (!trackRef.current || !mq.matches) {
        setRange(0)
        return
      }
      const overflow = trackRef.current.scrollWidth - window.innerWidth
      setRange(Math.max(0, overflow + 64))
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    mq.addEventListener('change', measure)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      mq.removeEventListener('change', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.6 })
  const x = useTransform(smooth, [0, 1], [0, -range])
  const progress = useTransform(smooth, [0, 1], [0, 1])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative"
      style={desktop && range ? { height: `${range + window.innerHeight}px` } : undefined}
    >
      <div className="md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center md:overflow-hidden">
        {/* Mobile heading */}
        <div className="px-6 pt-24 pb-10 md:hidden">
          <Header />
        </div>

        {/* Desktop rail */}
        <motion.div
          ref={trackRef}
          style={desktop ? { x } : undefined}
          className="hidden w-max gap-6 px-10 md:flex md:items-stretch"
        >
          <div className="flex w-[34vw] max-w-[460px] shrink-0 flex-col justify-center pr-6">
            <Header />
          </div>

          {WORK.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}

          <EndCard />
        </motion.div>

        {/* Mobile carousel */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-16 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {WORK.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} mobile />
          ))}
          <EndCard mobile />
        </div>

        {/* Desktop progress rail */}
        {desktop && (
          <div className="mx-auto mt-10 hidden w-[min(560px,60vw)] items-center gap-4 md:flex">
            <span className="font-mono text-[11px] text-ink-3">01</span>
            <div className="h-px flex-1 bg-line">
              <motion.div
                style={{ scaleX: progress, transformOrigin: 'left' }}
                className="h-px bg-lime-deep"
              />
            </div>
            <span className="font-mono text-[11px] text-ink-3">0{WORK.length}</span>
          </div>
        )}
      </div>
    </section>
  )
}

function Header() {
  return (
    <Reveal>
      <p className="eyebrow mb-4">(Selected work)</p>
      <h2 className="display text-[11vw] leading-[0.9] md:text-[4.6vw]">
        Things we
        <br />
        shipped
      </h2>
      <p className="mt-6 max-w-sm text-[15.5px] leading-relaxed text-ink-2">
        Every one of these is live. Click any card to open the real site — no mockups, no
        &ldquo;concept&rdquo; screenshots.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <span className="hand text-[24px] text-lime-deep">keep scrolling</span>
        <Doodle shape="arrowRight" className="h-[38px] w-[86px]" delay={0.4} />
      </div>
    </Reveal>
  )
}

function ProjectCard({ project, index, mobile = false }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="Visit site"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay: mobile ? 0 : Math.min(index * 0.05, 0.3) }}
      className={`group relative flex shrink-0 snap-center flex-col overflow-hidden rounded-[20px] border border-line bg-paper-2 transition-shadow duration-500 hover:shadow-[0_28px_70px_-30px_rgba(11,11,11,0.35)] ${
        mobile ? 'w-[86vw]' : 'w-[min(46vw,560px)]'
      }`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-3">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-ink/[0.045] px-3 py-1.5">
          <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 text-lime-deep" fill="none" stroke="currentColor" strokeWidth="2.4">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="truncate font-mono text-[11px] text-ink-3">{project.domain}</span>
        </div>
        <span className="shrink-0 font-mono text-[11px] text-ink-3">{project.year}</span>
      </div>

      {/* Preview panel */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          style={{
            background: `radial-gradient(130% 120% at 18% 12%, ${project.accent} 0%, ${project.accent}55 38%, #ffffff 76%)`,
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-55" />

        <span className="display pointer-events-none absolute -right-2 -bottom-6 text-[13vw] leading-none text-ink/[0.06] md:text-[7vw]">
          0{index + 1}
        </span>

        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex flex-wrap gap-2">
            {project.scope.map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/10 bg-paper/75 px-3 py-1 text-[11.5px] font-semibold text-ink backdrop-blur-md"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between gap-4">
            <span className="display text-[7vw] leading-none text-ink md:text-[2.6vw]">
              {project.title}
            </span>
            <span className="grid h-11 w-11 shrink-0 translate-y-2 place-items-center rounded-full bg-ink text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              ↗
            </span>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-[12px] font-semibold tracking-[0.14em] text-lime-deep uppercase">
          {project.client}
        </p>
        <p className="text-[14.5px] leading-relaxed text-ink-2">{project.summary}</p>
      </div>
    </motion.a>
  )
}

function EndCard({ mobile = false }) {
  return (
    <a
      href="#contact"
      data-cursor="Let's talk"
      className={`group relative flex shrink-0 snap-center flex-col items-start justify-center gap-6 overflow-hidden rounded-[20px] border border-dashed border-ink/20 bg-lime-soft p-8 transition-colors duration-500 hover:border-ink/40 ${
        mobile ? 'w-[80vw]' : 'w-[min(32vw,400px)]'
      }`}
    >
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative">
        <p className="eyebrow mb-4">(Next up)</p>
        <h3 className="display text-[8vw] leading-[0.92] md:text-[2.8vw]">
          Yours
          <br />
          could be
          <br />
          number 0{WORK.length + 1}
        </h3>
        <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14px] font-semibold text-paper transition-transform duration-500 group-hover:scale-[1.04]">
          Start a project
          <span className="text-base leading-none">↗</span>
        </div>
      </div>
    </a>
  )
}
