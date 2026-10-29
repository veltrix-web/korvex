import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE, Reveal } from '../lib/motion'
import Illustration from './Illustration'
import { PROCESS } from '../data'

/* Sticky heading on the left, stepped list on the right. A lime line
   fills down the list as the section scrolls. */
export default function Process() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.72', 'end 0.7'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="process"
      data-cursor-theme="dark"
      className="relative border-y border-line bg-ink text-paper"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.055]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-20">
          {/* Sticky column */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <Reveal>
                <p className="eyebrow text-paper/40">(How it works)</p>
                <h2 className="display mt-4 text-[11vw] leading-[0.9] md:text-[5vw]">
                  No mystery,
                  <br />
                  no drama
                </h2>
                <p className="mt-7 max-w-sm text-[16px] leading-relaxed text-paper/55">
                  Four steps, and you know exactly where the project stands at every point. If
                  something slips, you hear it from us first.
                </p>

                <a
                  href="#contact"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-[14.5px] font-semibold text-ink transition-transform duration-500 hover:scale-[1.04]"
                >
                  Start step one
                  <span className="text-base leading-none">↗</span>
                </a>
              </Reveal>
            </div>
          </div>

          {/* Steps */}
          <div ref={listRef} className="relative md:col-span-7">
            {/* Track + fill */}
            <div className="absolute top-2 bottom-2 left-[15px] w-px bg-paper/12 md:left-[19px]" />
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute top-2 bottom-2 left-[15px] w-px bg-lime md:left-[19px]"
            />

            <div className="flex flex-col gap-14 md:gap-20">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.no}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
                  className="relative pl-14 md:pl-20"
                >
                  <span className="absolute top-1 left-0 grid h-8 w-8 place-items-center rounded-full border border-paper/20 bg-ink font-mono text-[11px] font-bold md:h-10 md:w-10 md:text-[12px]">
                    {step.no}
                  </span>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="display text-[8vw] leading-none md:text-[3.4vw]">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-paper/55 md:text-[16.5px]">
                        {step.body}
                      </p>
                    </div>

                    <Illustration
                      name={step.art}
                      className="h-[70px] w-auto shrink-0 text-lime/70 md:h-[92px]"
                      width={2}
                      delay={0.2}
                      rotate={i % 2 ? 5 : -5}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
