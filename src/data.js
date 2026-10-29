/* ============================================================
   Site content — sab kuch yahin se edit karo.
   Jahan PLACEHOLDER likha hai, wahan apna asli data daalna
   before going live.
   ============================================================ */

export const BRAND = {
  name: 'Kritvyn',
  // Sanskrit "कृत् / krit" = to make, to create.
  meaning: 'From Sanskrit “krit” — to make, to create.',
  tagline: 'Design & development studio',
  email: 'hello@kritvyn.com', // PLACEHOLDER
  phone: '+91 00000 00000', // PLACEHOLDER
  location: 'Noida, India',
  // PLACEHOLDER — studio ke apne handles yahan daalo
  socials: {
    instagram: '#',
    linkedin: '#',
    github: '#',
    twitter: '#',
  },
}

/* Order matches the order these sections appear on the page. */
export const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#studio' },
]

export const SERVICES = [
  {
    no: '01',
    title: 'App Development',
    blurb:
      'Android and iOS apps built from one codebase — fast, offline-friendly, and ready for the store on day one.',
    tags: ['React Native', 'Flutter', 'Firebase', 'Play Store / App Store'],
    art: 'phone',
  },
  {
    no: '02',
    title: 'Web Development',
    blurb:
      'Marketing sites, dashboards and full products. Fast on 4G, accessible, and easy for your team to update.',
    tags: ['React', 'Next.js', 'Node', 'Headless CMS'],
    art: 'browser',
  },
  {
    no: '03',
    title: 'Poster & Graphic Design',
    blurb:
      'Posters, social creatives, packaging and print — designed to stop the scroll, not just fill the frame.',
    tags: ['Social Creatives', 'Print', 'Packaging', 'Campaign Kits'],
    art: 'poster',
  },
  {
    no: '04',
    title: 'Video Editing',
    blurb:
      'Reels, ads and brand films. Cut for rhythm, graded for mood, captioned for the 80% who watch on mute.',
    tags: ['Reels & Shorts', 'Brand Films', 'Motion Graphics', 'Colour Grade'],
    art: 'video',
  },
  {
    no: '05',
    title: 'Brand Identity',
    blurb:
      'Logo, type, colour and the rules that hold it together — so your brand looks the same everywhere.',
    tags: ['Logo Systems', 'Typography', 'Guidelines', 'Collateral'],
    art: 'pen',
  },
  {
    no: '06',
    title: 'UI/UX Design',
    blurb:
      'Research, flows, wireframes and high-fidelity screens — designed in the same room as the people building it.',
    tags: ['User Flows', 'Wireframes', 'Design Systems', 'Prototypes'],
    art: 'layers',
  },
]

/* Live projects. `summary` lines describe what each build does — agar koi
   project client ka nahi, personal/practice hai, to `client` field usi
   hisaab se badal dena. */
export const WORK = [
  {
    title: 'Wanderly Trails',
    client: 'Travel & Tourism',
    year: 'Aug 2026',
    url: 'https://wanderly-trails.vercel.app',
    domain: 'wanderly-trails.vercel.app',
    scope: ['Web App', 'Performance', 'CMS'],
    summary:
      'A trip discovery platform. We stripped out the heavy admin panel and rebuilt content loading, so pages now render immediately instead of waiting on the dashboard bundle.',
    accent: '#A1FF62',
  },
  {
    title: 'SmileCraft Dental',
    client: 'Healthcare',
    year: 'Jul 2026',
    url: 'https://smilecraft-dental-zeta.vercel.app',
    domain: 'smilecraft-dental-zeta.vercel.app',
    scope: ['Website', 'Multi-page', 'UI/UX'],
    summary:
      'A premium multi-page clinic site — treatments, doctors, before-and-after gallery and an appointment flow that works on one hand while walking.',
    accent: '#9DD6FF',
  },
  {
    title: 'Nexvora AI',
    client: 'AI Product',
    year: 'Mar 2026',
    url: 'https://nexvora-ai.vercel.app',
    domain: 'nexvora-ai.vercel.app',
    scope: ['Product', 'Landing', 'Motion'],
    summary:
      'Product site for an AI tool — the kind of page that has to explain something abstract in five seconds without drowning it in jargon.',
    accent: '#C7B4FF',
  },
  {
    title: 'Analyst Dashboard',
    client: 'Data & SaaS',
    year: 'May 2026',
    url: 'https://analyst-dashboard-lovat.vercel.app',
    domain: 'analyst-dashboard-lovat.vercel.app',
    scope: ['Dashboard', 'Charts', 'React'],
    summary:
      'A data dashboard with live charts and filtering — proof that we build the boring interior screens, not just the pretty landing page.',
    accent: '#FFD666',
  },
  {
    title: 'Kartik Painter Services',
    client: 'Home Services',
    year: 'Jul 2026',
    url: 'https://kartikpainterservices.vercel.app',
    domain: 'kartikpainterservices.vercel.app',
    scope: ['Website', 'Local SEO', 'Leads'],
    summary:
      'A lead-first site for a painting contractor. Individual service pages, a quote form and a call button that never scrolls out of reach.',
    accent: '#FFB4A2',
  },
  {
    title: 'Abhay Editz',
    client: 'Creative Portfolio',
    year: 'Jul 2026',
    url: 'https://abhayeditz.vercel.app',
    domain: 'abhayeditz.vercel.app',
    scope: ['Portfolio', 'Video', 'Motion'],
    summary:
      'A video editor’s portfolio built around the reel itself — fast playback, no autoplay noise, and a showreel that loads before the visitor loses interest.',
    accent: '#FF9EC4',
  },
  {
    title: 'Anytime Fitness',
    client: 'Fitness',
    year: 'Jun 2026',
    url: 'https://anytime-fitnes.vercel.app',
    domain: 'anytime-fitnes.vercel.app',
    scope: ['Website', 'Membership', 'Brand'],
    summary:
      'Gym site with class schedules, membership tiers and a trial signup — designed to convert someone who is browsing on their phone at 11pm.',
    accent: '#7BE0C4',
  },
  {
    title: 'Tanisha Makeup Artist',
    client: 'Beauty',
    year: 'Jan 2026',
    url: 'https://tanisha-makeup-artist2006.vercel.app',
    domain: 'tanisha-makeup-artist2006.vercel.app',
    scope: ['Website', 'Gallery', 'Booking'],
    summary:
      'Portfolio and booking site for a bridal makeup artist — image-heavy by nature, so every photo is optimised to load on a wedding-day 4G connection.',
    accent: '#FFC9A3',
  },
]

export const PROCESS = [
  {
    no: '01',
    title: 'Listen',
    body: 'A free call where we ask about the business, not the buttons. You leave with a clear scope, timeline and a fixed price — no surprises later.',
    art: 'chat',
  },
  {
    no: '02',
    title: 'Design',
    body: 'Wireframes first, then real screens. You see the whole thing in Figma and sign off before a single line of production code exists.',
    art: 'pen',
  },
  {
    no: '03',
    title: 'Build',
    body: 'We build in weekly slices with a live preview link. You watch it come together instead of waiting in the dark for a big reveal.',
    art: 'browser',
  },
  {
    no: '04',
    title: 'Launch & hold',
    body: 'We ship, hand over every login and repo, and stay on for 30 days of free fixes. Optional monthly care after that.',
    art: 'rocket',
  },
]

/* Har member ka `portfolio` card ke top-right arrow se khulta hai.
   `socials` me sirf wahi keys daalo jo exist karti hain — baaki hata do.
   PLACEHOLDER handles ko apne asli handles se replace karna. */
export const TEAM = [
  {
    name: 'Mithun',
    role: 'Founder & Software Developer',
    line: 'Builds the apps and the web products — from database to the last pixel.',
    skills: ['React', 'React Native', 'Node.js', 'Architecture'],
    initials: 'M',
    portfolio: 'https://mithun-webdev.vercel.app',
    socials: {
      instagram: 'https://instagram.com/mithun', // PLACEHOLDER
      linkedin: 'https://linkedin.com/in/mithun', // PLACEHOLDER
      github: 'https://github.com/mithun', // PLACEHOLDER
      twitter: 'https://x.com/mithun', // PLACEHOLDER
    },
  },
  {
    name: 'Ravi Kushwa',
    role: 'Web Developer & Video Editor',
    line: 'Turns designs into fast, responsive sites — and cuts the films that sell them.',
    skills: ['Frontend', 'Premiere Pro', 'After Effects', 'Motion'],
    initials: 'RK',
    portfolio: '#', // PLACEHOLDER — Ravi ka portfolio link aane par yahan daalo
    socials: {
      instagram: '#',
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
  },
  {
    name: 'Ankit',
    role: 'Graphic Designer',
    line: 'Posters, brand systems and social creative that look expensive on purpose.',
    skills: ['Brand Identity', 'Poster Design', 'Illustrator', 'Photoshop'],
    initials: 'A',
    portfolio: 'https://ankit-portfolio749.vercel.app/',
    socials: {
      instagram: 'https://instagram.com/ankit', // PLACEHOLDER
      linkedin: 'https://linkedin.com/in/ankit', // PLACEHOLDER
      github: 'https://github.com/ankit', // PLACEHOLDER
      twitter: 'https://x.com/ankit', // PLACEHOLDER
    },
  },
]

/* Honest numbers for a young studio — no invented client counts. */
export const FACTS = [
  { value: 3, suffix: '', label: 'Specialists, no middlemen' },
  { value: 6, suffix: '', label: 'Services under one roof' },
  { value: 7, suffix: ' days', label: 'To your first design draft' },
  { value: 100, suffix: '%', label: 'Code & files handed to you' },
]

export const STACK = [
  'React',
  'Next.js',
  'React Native',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'Framer Motion',
  'Firebase',
  'PostgreSQL',
  'Figma',
  'Illustrator',
  'Photoshop',
  'After Effects',
  'Premiere Pro',
  'Vercel',
  'Razorpay',
]

export const MARQUEE_WORDS = [
  'App Development',
  'Web Development',
  'Poster Design',
  'Video Editing',
  'Brand Identity',
  'UI/UX Design',
]

export const FAQS = [
  {
    q: 'How much does a project cost?',
    a: 'A focused business website usually lands between ₹25,000 and ₹80,000. Apps and custom products start around ₹1,20,000. You get a fixed quote after the first call — we do not bill by the hour and then hand you a surprise.',
  },
  {
    q: 'How long will it take?',
    a: 'A website is typically 2–4 weeks, an app 6–10 weeks. The single biggest delay is content and images, so we agree on a content deadline up front and build around it.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'A 30-minute call, whatever brand material you already have, and one decision-maker who can approve things. That is genuinely it — we handle the rest.',
  },
  {
    q: 'Do I own the code and design files?',
    a: 'Yes, completely. On handover you get the repository, the Figma file, the design source files and every account login in your own name. Nothing stays locked with us.',
  },
  {
    q: 'What happens after launch?',
    a: 'Thirty days of free bug fixes are included. After that you can take a monthly care plan for updates, backups and small changes, or simply call us when you need something.',
  },
]
