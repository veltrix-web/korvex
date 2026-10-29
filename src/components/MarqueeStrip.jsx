import { Marquee } from '../lib/motion'
import { MARQUEE_WORDS } from '../data'

/* The lime band under the hero. Tilted very slightly so it reads as a
   sticker laid over the page rather than a plain divider. */
export default function MarqueeStrip() {
  return (
    <div className="relative border-y border-ink/10 bg-lime py-4 md:py-5">
      <Marquee duration={30}>
        {MARQUEE_WORDS.map((word) => (
          <span key={word} className="flex items-center">
            <span className="display px-7 text-[26px] whitespace-nowrap text-ink md:px-10 md:text-[34px]">
              {word}
            </span>
            <Asterisk />
          </span>
        ))}
      </Marquee>
    </div>
  )
}

function Asterisk() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="spin-slow shrink-0 text-ink/70">
      <path
        fill="currentColor"
        d="M11 2h2v7.2l5.1-5.1 1.4 1.4-5.1 5.1H22v2h-7.6l5.1 5.1-1.4 1.4-5.1-5.1V22h-2v-7.6l-5.1 5.1-1.4-1.4 5.1-5.1H2v-2h7.2L4.1 5.9 5.5 4.5 11 9.6z"
      />
    </svg>
  )
}
