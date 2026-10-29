/* Inline SVGs — no icon library, so nothing extra ships in the bundle. */

const PATHS = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <line x1="7" y1="10.5" x2="7" y2="17" />
      <circle cx="7" cy="7.2" r="1.15" fill="currentColor" stroke="none" />
      <path d="M11 17v-3.6a2.6 2.6 0 0 1 5.2 0V17" />
      <line x1="11" y1="10.5" x2="11" y2="17" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.3-6-2.8m12 5v-3.5c0-1 .1-1.4-.5-2 2.3-.3 4.5-1.2 4.5-5.1a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-.9-.3-3 1.1a10.3 10.3 0 0 0-5.6 0C7.1 3.6 6.2 3.9 6.2 3.9a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 5 9.5c0 3.9 2.2 4.8 4.5 5.1-.6.6-.6 1.2-.5 2V20" />
  ),
  twitter: (
    <path d="M3 3h4.2l5.1 6.9L17.9 3H21l-6.9 8L21.4 21H17l-5.4-7.3L5.3 21H2.2l7.3-8.4L3 3Z" />
  ),
}

const LABELS = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  twitter: 'X (Twitter)',
}

const TONES = {
  light: 'border-ink/12 text-ink-2 hover:border-ink hover:bg-ink hover:text-lime',
  dark: 'border-paper/20 text-paper/60 hover:border-lime hover:bg-lime hover:text-ink',
}

export default function SocialIcons({ socials = {}, name = '', tone = 'light' }) {
  const entries = Object.entries(socials).filter(([, href]) => href)
  if (!entries.length) return null

  return (
    <div className="flex items-center gap-2">
      {entries.map(([key, href]) => (
        <a
          key={key}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer noopener"
          aria-label={`${name} on ${LABELS[key] ?? key}`}
          title={LABELS[key] ?? key}
          className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-400 hover:-translate-y-0.5 ${TONES[tone] ?? TONES.light}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[15px] w-[15px]"
            fill={key === 'twitter' ? 'currentColor' : 'none'}
            stroke={key === 'twitter' ? 'none' : 'currentColor'}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {PATHS[key]}
          </svg>
        </a>
      ))}
    </div>
  )
}
