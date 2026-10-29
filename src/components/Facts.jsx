import { Counter, Marquee, Reveal } from '../lib/motion'
import { FACTS, STACK } from '../data'

export default function Facts() {
  return (
    <section className="relative border-y border-line bg-paper-2">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 0.08}>
              <p className="display text-[13vw] leading-none md:text-[4.6vw]">
                <Counter to={fact.value} suffix={fact.suffix} />
              </p>
              <p className="mt-3 max-w-[190px] text-[14px] leading-snug text-ink-2">{fact.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Stack ticker */}
      <div className="border-t border-line py-6">
        <Marquee duration={44} dir="right">
          {STACK.map((tool) => (
            <span
              key={tool}
              className="mx-3 rounded-full border border-line px-5 py-2 text-[13.5px] font-medium whitespace-nowrap text-ink-2"
            >
              {tool}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
