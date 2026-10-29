import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE, Magnetic, SplitWords } from '../lib/motion'
import Doodle from './Doodle'
import { BRAND, SERVICES } from '../data'

export default function CTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const auraScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.15])

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden border-t border-line bg-paper-2"
    >
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />
      <motion.div
        style={{ scale: auraScale }}
        className="aura pointer-events-none absolute -bottom-56 left-1/2 h-[620px] w-[900px] -translate-x-1/2"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-7">(Say hello)</p>

          <h2 className="display text-[13vw] leading-[0.9] md:text-[7.4vw]">
            <span className="block">
              <SplitWords text="Let's build" />
            </span>
            <span className="block">
              <SplitWords text="something" delay={0.08} />{' '}
              <span className="hand text-lime-deep" style={{ fontSize: '0.9em' }}>
                good
              </span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mx-auto mt-8 max-w-md text-[16.5px] leading-relaxed text-ink-2"
          >
            Tell us what you are trying to build. First call is free, thirty minutes, and you get a
            written scope and a fixed price whether or not you hire us.
          </motion.p>

          {/* Hand-drawn nudge toward the email button */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="hand text-[24px] text-lime-deep">no obligation, promise</span>
            <Doodle shape="arrowDown" className="h-[62px] w-[46px]" delay={0.5} rotate={-14} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${BRAND.email}`}
                data-cursor="Email us"
                className="sweep inline-flex items-center gap-3 rounded-full bg-ink px-9 py-5 text-[15.5px] font-semibold text-paper transition-colors duration-500 hover:text-ink"
              >
                {BRAND.email}
                <span className="text-lg leading-none">↗</span>
              </a>
            </Magnetic>
            <a
              href={`tel:${BRAND.phone.replace(/\s/g, '')}`}
              className="link-underline text-[15.5px] font-semibold text-ink-2 hover:text-ink"
            >
              or call {BRAND.phone}
            </a>
          </motion.div>

          {/* Service chips */}
          <div className="mt-14 flex flex-wrap justify-center gap-2">
            {SERVICES.map((service, i) => (
              <motion.span
                key={service.no}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.05 }}
                className="rounded-full border border-ink/12 bg-paper/70 px-4 py-2 text-[13px] font-medium text-ink-2 backdrop-blur-sm"
              >
                {service.title}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
