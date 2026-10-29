import { motion } from 'framer-motion'
import { EASE, Reveal } from '../lib/motion'
import Doodle from './Doodle'
import SocialIcons from './SocialIcons'
import { TEAM } from '../data'

export default function Team() {
  return (
    <section id="studio" className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
      <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <div>
          <p className="eyebrow mb-4">(The studio)</p>
          <h2 className="display text-[11vw] leading-[0.9] md:text-[6.2vw]">
            Three people.
            <br />
            <span className="hand text-lime-deep" style={{ fontSize: '0.86em' }}>
              That&apos;s the whole agency.
            </span>
          </h2>
        </div>
        <div className="max-w-xs">
          <p className="text-[15.5px] leading-relaxed text-ink-2">
            You will always know who is working on your project, because there are only three of us
            and you will have talked to all of them.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <span className="hand text-[22px] text-lime-deep">portfolios here</span>
            <Doodle shape="arrowRight" className="h-[36px] w-[80px]" delay={0.35} rotate={12} />
          </div>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {TEAM.map((person, i) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            data-cursor="true"
            className="group relative overflow-hidden rounded-[22px] border border-line bg-paper-2 p-7 transition-colors duration-700 hover:border-ink/20 md:p-8"
          >
            {/* Lime wash on hover */}
            <div className="absolute inset-0 translate-y-full bg-lime-soft transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />

            <div className="relative">
              <div className="mb-8 flex items-start justify-between">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-ink text-[22px] font-extrabold text-lime transition-transform duration-700 group-hover:rotate-[-6deg] md:h-[72px] md:w-[72px]">
                  {person.initials}
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] text-ink-3">0{i + 1}</span>
                  {person.portfolio && person.portfolio !== '#' ? (
                    <a
                      href={person.portfolio}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="Portfolio"
                      aria-label={`${person.name}'s portfolio`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-ink/12 text-lg text-ink transition-all duration-500 hover:rotate-45 hover:border-ink hover:bg-ink hover:text-lime"
                    >
                      ↗
                    </a>
                  ) : (
                    <span
                      title="Portfolio coming soon"
                      className="grid h-11 w-11 place-items-center rounded-full border border-dashed border-ink/15 text-lg text-ink-3"
                    >
                      ↗
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-[26px] font-extrabold tracking-[-0.035em] md:text-[30px]">
                {person.name}
              </h3>
              <p className="mt-1 text-[13px] font-semibold tracking-wide text-lime-deep uppercase">
                {person.role}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{person.line}</p>

              <div className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
                {person.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-ink/12 px-3 py-1.5 text-[12px] font-medium text-ink-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                <span className="text-[12px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
                  Follow
                </span>
                <SocialIcons socials={person.socials} name={person.name} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
