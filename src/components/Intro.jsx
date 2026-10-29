import { Reveal, ScrollHighlight } from '../lib/motion'
import Doodle from './Doodle'
import Illustration from './Illustration'
import { BRAND } from '../data'

/* Editorial statement. The paragraph words fill in from ghost-grey to
   full ink as the section scrolls through the viewport. */
export default function Intro() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Reveal>
            <p className="eyebrow">(Studio)</p>
            <p className="hand mt-3 text-[26px] leading-tight text-lime-deep">{BRAND.meaning}</p>
            <Doodle shape="wave" className="mt-2 h-[16px] w-[150px]" delay={0.3} />

            <Illustration
              name="pen"
              className="mt-10 hidden h-[130px] w-auto text-ink/25 md:block"
              width={2}
              delay={0.35}
              rotate={-6}
            />
          </Reveal>
        </div>

        <div className="md:col-span-9">
          <ScrollHighlight
            className="text-[26px] leading-[1.32] font-medium tracking-[-0.025em] text-balance md:text-[40px] lg:text-[46px]"
            text="Most agencies hand you four different people who never speak to each other. We are three, we sit in the same room, and the person who designs your screen is the person who builds it. That is the whole idea."
          />

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8">
              {['One team, end to end', 'Fixed price, written scope', 'You own everything'].map(
                (item, i) => (
                  <span key={item} className="flex items-center gap-2.5 text-[15px] text-ink-2">
                    <Doodle
                      shape="check"
                      className="h-[15px] w-[19px] shrink-0"
                      width={3}
                      delay={0.15 + i * 0.14}
                      duration={0.5}
                    />
                    {item}
                  </span>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
