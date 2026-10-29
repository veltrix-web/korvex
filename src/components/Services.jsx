import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE, Reveal } from '../lib/motion'
import Doodle from './Doodle'
import Illustration from './Illustration'
import { SERVICES } from '../data'

/* Numbered service rows. Hovering a row sweeps lime up from the bottom
   and opens the description — on touch devices the row is always open. */
export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <section id="services" className="relative border-y border-line bg-paper-2">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <div>
            <p className="eyebrow mb-4">(What we do)</p>
            <h2 className="display text-[11vw] leading-[0.9] md:text-[6.2vw]">
              Six things,
              <br />
              done <span className="marker">properly</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-[15.5px] leading-relaxed text-ink-2">
              Pick one, or hand us the whole thing. Most clients start with a website and end up
              keeping us for everything else.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="hand text-[22px] text-lime-deep">hover to open</span>
              <Doodle shape="arrowDown" className="h-[46px] w-[34px]" delay={0.35} rotate={8} />
            </div>
          </div>
        </Reveal>

        <div className="border-t border-line">
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.no}
              service={service}
              index={i}
              active={active === i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ service, index, active, onEnter, onLeave }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor="true"
      className="sweep group relative block border-b border-line"
    >
      <div className="flex items-center gap-5 px-2 py-7 transition-all duration-500 md:gap-10 md:px-6 md:py-9">
        <span
          className={`w-9 shrink-0 font-mono text-[12px] font-semibold transition-colors duration-500 md:text-[13px] ${
            active ? 'text-ink' : 'text-ink-3'
          }`}
        >
          {service.no}
        </span>

        <h3 className="display flex-1 text-[7.6vw] leading-none transition-transform duration-700 group-hover:translate-x-2 md:text-[4vw]">
          {service.title}
        </h3>

        <motion.span
          animate={{ rotate: active ? 45 : 0, scale: active ? 1.15 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-lg md:h-12 md:w-12"
        >
          +
        </motion.span>
      </div>

      {/* Desktop: reveal on hover. Mobile: always visible. */}
      <div className="px-2 pb-7 md:hidden">
        <Detail service={service} />
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="hidden overflow-hidden md:block"
          >
            <div className="px-6 pb-9 pl-[4.75rem]">
              <Detail service={service} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Detail({ service }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
      <p className="max-w-xl text-[15px] leading-relaxed text-ink-2 md:text-[16.5px]">
        {service.blurb}
      </p>

      <Illustration
        name={service.art}
        className="h-[86px] w-auto shrink-0 self-start text-ink/30 md:h-[104px]"
        width={2}
        rotate={-3}
      />

      <div className="flex flex-wrap gap-2 md:max-w-[260px] md:justify-end">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-ink/15 bg-paper/60 px-3.5 py-1.5 text-[12.5px] font-medium whitespace-nowrap text-ink-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
