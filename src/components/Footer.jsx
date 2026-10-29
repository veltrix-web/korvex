import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import SocialIcons from './SocialIcons'
import { BRAND, NAV, SERVICES } from '../data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-cursor-theme="dark" className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 pt-20 md:px-10 md:pt-24">
        {/* Columns */}
        <div className="grid gap-12 border-b border-paper/10 pb-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-lime text-[16px] font-extrabold text-ink">
                K
              </span>
              <span className="text-[19px] font-extrabold tracking-[-0.03em]">
                {BRAND.name.toLowerCase()}
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-paper/50">
              A three-person design and development studio in {BRAND.location}. We build apps,
              websites, brands and video — and we hand you the keys when we are done.
            </p>
            <p className="hand mt-6 text-[22px] text-lime">{BRAND.meaning}</p>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <p className="eyebrow mb-5 text-paper/35">Menu</p>
            <ul className="flex flex-col gap-3">
              {[...NAV, { label: 'Contact', href: '#contact' }].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-[15px] text-paper/65 hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5 text-paper/35">Services</p>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service.no} className="text-[15px] text-paper/65">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-paper/35">Elsewhere</p>
            <SocialIcons socials={BRAND.socials} name={BRAND.name} tone="dark" />
            <a
              href={`mailto:${BRAND.email}`}
              className="link-underline mt-7 inline-block text-[15px] text-lime"
            >
              {BRAND.email}
            </a>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="overflow-hidden pt-10">
          <motion.h2
            initial={{ y: '30%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 1.2, ease: EASE }}
            className="display wordmark-sheen-dark text-center text-[19vw] leading-[0.8] select-none"
            style={{ WebkitTextFillColor: 'transparent' }}
          >
            {BRAND.name.toUpperCase()}
          </motion.h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-paper/10 py-7 text-[13px] text-paper/40 md:flex-row">
          <p>
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime" />
            Available for new projects
          </p>
        </div>
      </div>
    </footer>
  )
}
