import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE, Reveal } from '../lib/motion'
import { FAQS } from '../data'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-4">
          <Reveal>
            <p className="eyebrow mb-4">(Questions)</p>
            <h2 className="display text-[11vw] leading-[0.9] md:text-[4.4vw]">
              The stuff
              <br />
              everyone asks
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <div className="border-t border-line">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.05 }}
                className="border-b border-line"
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[18px] font-bold tracking-[-0.02em] md:text-[21px]">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 text-base"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pr-12 pb-7 text-[15.5px] leading-relaxed text-ink-2 md:text-[16.5px]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
