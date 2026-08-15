import { useState, useEffect, useCallback } from 'react'

const heroPhoto = '/geekhaus-self-1.jpg'

const projects = [
  {
    id: 'kananos',
    name: 'KananOS / United Distribution',
    tagline: 'Multi-tenant B2B e-commerce wholesale platform',
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    url: 'https://united-distro.vercel.app/united',
    repo: 'https://github.com/geekhaus314/kanan-e',
    images: ['/shots/united-distro.png', '/shots/kananos-home.png', '/shots/kanan-e-checkout.png'],
    detail: [
      'E-commerce infrastructure built for Kanan Enterprises LLC, DBA United Distribution, a wholesale smoke shop distributor in Florissant, MO.',
      'Multi-tenant Next.js architecture supporting branded storefronts (united-distro and kanan-e) with product catalogs, brands, and browse routes.',
      'Production deployment on Vercel with checkout flow, product imagery pipelines, and catalog management.',
    ],
  },
  {
    id: 'myhairloss',
    name: 'Brian Ivie Hair — myhairloss.com',
    tagline: 'Client site for a hair loss clinic, live with custom domain',
    stack: ['Next.js', 'MDX', 'Cloudflare Pages'],
    url: 'https://www.myhairloss.com',
    repo: 'https://github.com/geekhaus314/myhairloss-stl',
    images: ['/shots/myhairloss.png', '/shots/brian-home.png', '/shots/brian-services.png', '/shots/brian-shop.png'],
    detail: [
      'Production Next.js site for Brian Ivie Hair, deployed to Cloudflare Pages with custom domains (myhairloss.com, www, admin subdomain).',
      'Service pages, shop section, and admin tooling — maintained and updated continuously.',
      'GitHub-connected auto-deploy pipeline with the Cloudflare Pages integration.',
    ],
  },
  {
    id: 'compass',
    name: 'Compass — Psychedelic Trip Journal',
    tagline: 'Private journaling companion for psychedelic experiences',
    stack: ['React', 'Vite', 'JavaScript'],
    url: 'https://compass-psi.vercel.app',
    repo: 'https://github.com/geekhaus314/Compass-Psychadelic-Trip-Journal',
    images: ['/shots/compass.png'],
    detail: [
      'Vite + React journaling app for documenting psychedelic experiences in a calm, private space.',
      'Clean single-page interface with session entries and reflection-oriented UI.',
      'Live on Vercel.',
    ],
  },
  {
    id: 'angie',
    name: 'Angie Viefhaus — Wildlife Photography',
    tagline: 'Photography portfolio for a wildlife photographer',
    stack: ['React', 'TypeScript', 'Tailwind', 'Cloudflare Pages'],
    url: 'https://angie-viefhaus.pages.dev',
    repo: 'https://github.com/geekhaus314/angie-viefhaus',
    images: ['/shots/angie-pages.png'],
    detail: [
      'Full photography portfolio — hero, manifesto, gallery, and lightbox — for a wildlife photographer.',
      'Serif-forward editorial design (Cormorant Garamond) with a dark, gallery-grade presentation.',
      'Deployed to Cloudflare Pages; the same design language powers this portfolio.',
    ],
  },
  {
    id: 'agentos',
    name: 'AgentOS — Vertical AI Revenue Infrastructure',
    tagline: 'Multi-tenant AI revenue workflow platform',
    stack: ['Java', 'Gradle', 'AI Agents'],
    url: 'https://github.com/geekhaus314/agentos',
    repo: 'https://github.com/geekhaus314/agentos',
    images: [],
    detail: [
      'Multi-tenant, vertical AI revenue workflow platform with reusable core infrastructure.',
      'Industry vertical modules (commercial roofing, HVAC, insurance), white-label reseller deployment, configurable workflow engine.',
      'AI agent orchestration with explicit tool authorization and full audit logging for compliance.',
    ],
  },
  {
    id: 'proofshelf',
    name: 'ProofShelf — Full-Stack SaaS',
    tagline: 'Next.js + Postgres/pgvector + Redis + Clerk',
    stack: ['Next.js', 'PostgreSQL', 'pgvector', 'Redis', 'Clerk'],
    url: 'https://github.com/geekhaus314',
    repo: 'https://github.com/geekhaus314',
    images: [],
    detail: [
      'Full-stack SaaS with PostgreSQL + pgvector for semantic search, Redis for caching, Clerk for authentication.',
      'Dockerized API + worker services with monorepo structure (pnpm workspaces).',
      'In-progress — local dev stack fully configured.',
    ],
  },
  {
    id: 'nightanvil',
    name: 'NightAnvil — Freelancer Business Toolkit',
    tagline: 'Fiverr gig generator, invoices, Stripe payments',
    stack: ['Python', 'Flask', 'Stripe', 'PostgreSQL'],
    url: 'https://github.com/3m0h4ck3r/nightanvil',
    repo: 'https://github.com/3m0h4ck3r/nightanvil',
    images: [],
    detail: [
      'Complete Python/Flask toolkit for freelancers: AI-powered gig generation, PDF invoices with payment tracking, Stripe checkout + webhooks.',
      'Fiverr one-click gig sync, auth with secure sessions, dark neon brand UI, GitHub Actions CI/CD.',
      'Deployable to Railway with PostgreSQL + SQLAlchemy.',
    ],
  },
  {
    id: 'obsidian',
    name: 'Obsidian Platform — Bug Bounty Intelligence',
    tagline: 'Production-grade Go attack surface management',
    stack: ['Go', 'ASM', 'Recon'],
    url: 'https://github.com/3m0h4ck3r/obsidian-platform',
    repo: 'https://github.com/3m0h4ck3r/obsidian-platform',
    images: [],
    detail: [
      'Production-grade Go attack surface management platform for bug bounty programs.',
      'Hive-mind tier intelligence gathering: automated recon, scope monitoring, and target profiling.',
    ],
  },
  {
    id: 'bb-suite',
    name: 'bb-suite — Python Pentest Toolkit',
    tagline: 'Automated bug bounty reconnaissance',
    stack: ['Python', 'CLI'],
    url: 'https://github.com/geekhaus314',
    repo: 'https://github.com/geekhaus314',
    images: [],
    detail: [
      'Modular Python toolkit for bug bounty recon with config, data pipelines, and scoped files.',
      'Supports multiple reconnaissance modules with structured output for analysis.',
    ],
  },
  {
    id: 'south-city',
    name: 'South City Scooters — Redesign Preview',
    tagline: 'Client site redesign + rebrandable template kit',
    stack: ['Next.js', 'HTML/CSS/JS', 'Tailwind'],
    url: 'https://github.com/geekhaus314',
    repo: 'https://github.com/geekhaus314',
    images: [],
    detail: [
      'Next.js redesign for South City Scooters with a companion rebrandable template kit (template-kit).',
      'Static, themed, mobile-first HTML/CSS/JS templates with hero, services, testimonials, and contact sections.',
      'Built to pitch redesigns to potential clients — CSS-variable driven for instant rebranding.',
    ],
  },
  {
    id: 'viper',
    name: 'Viper-Web3 + PayloadsAllTheThings',
    tagline: 'Solidity + web security toolkits',
    stack: ['Solidity', 'Python', 'Security'],
    url: 'https://github.com/geekhaus314/Viper-Web3',
    repo: 'https://github.com/geekhaus314/Viper-Web3',
    images: [],
    detail: [
      'Viper-Web3: Solidity bug bounty toolkit for smart contract auditing.',
      'PayloadsAllTheThings fork maintained for web application security testing payloads and bypasses.',
    ],
  },
  {
    id: 'vercel-gateway',
    name: 'Vercel AI Gateway Demo',
    tagline: 'AI gateway routing and caching',
    stack: ['TypeScript', 'Vercel', 'AI'],
    url: 'https://github.com/geekhaus314/vercel-ai-gateway-demo',
    repo: 'https://github.com/geekhaus314/vercel-ai-gateway-demo',
    images: [],
    detail: [
      'Demo of AI gateway patterns on Vercel — routing, provider abstraction, and caching for LLM APIs.',
    ],
  },
]

function ProjectCarousel({ project, onClose }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % project.images.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + project.images.length) % project.images.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, project.images.length])

  const prev = () => setIndex((i) => (i - 1 + project.images.length) % project.images.length)
  const next = () => setIndex((i) => (i + 1) % project.images.length)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="lightbox-enter relative w-full max-w-4xl max-h-[90vh] bg-panel border border-bone/10 rounded-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-md bg-black/60 px-3 py-1.5 text-sm text-bone hover:bg-blood transition-colors"
          aria-label="Close"
        >
          Close ✕
        </button>

        <div className="p-6 border-b border-bone/10">
          <h3 className="font-serif text-2xl text-bone">{project.name}</h3>
          <p className="text-sm text-bone/60 mt-1">{project.tagline}</p>
        </div>

        {project.images.length > 0 ? (
          <>
            <div className="relative bg-black/40">
              <img
                src={project.images[index]}
                alt={`${project.name} screenshot ${index + 1}`}
                className="w-full max-h-[50vh] object-contain"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md bg-black/60 px-3 py-2 text-bone hover:bg-blood transition-colors"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-black/60 px-3 py-2 text-bone hover:bg-blood transition-colors"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          i === index ? 'bg-blood' : 'bg-bone/30 hover:bg-bone/60'
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto p-4">
              {project.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setIndex(i)}
                  className={`shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                    i === index ? 'border-blood' : 'border-transparent hover:border-bone/40'
                  }`}
                >
                  <img src={img} alt="" className="h-16 w-28 object-cover" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="p-10 text-center text-bone/50 italic">
            Screenshots coming soon — this project is in active development.
          </div>
        )}

        <div className="p-6 border-t border-bone/10 space-y-3">
          {project.detail.map((line, i) => (
            <p key={i} className="text-sm text-bone/75 leading-relaxed">
              {line}
            </p>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-bone/20 px-3 py-1 text-xs text-bone/70"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blood px-4 py-2 text-sm font-medium text-bone hover:opacity-90 transition-opacity"
              >
                Visit live site
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-bone/25 px-4 py-2 text-sm font-medium text-bone/80 hover:border-bone transition-colors"
            >
              View code
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen }) {
  const cover = project.images[0]
  return (
    <button
      onClick={() => onOpen(project)}
      className="group text-left rounded-lg overflow-hidden border border-bone/10 bg-panel hover:border-blood/60 transition-colors"
    >
      <div className="aspect-[16/10] overflow-hidden bg-black/30 flex items-center justify-center">
        {cover ? (
          <img
            src={cover}
            alt={`${project.name} preview`}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="font-serif text-2xl text-bone/30 italic px-4 text-center">
            {project.name}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl text-bone group-hover:text-bone/90">{project.name}</h3>
        <p className="mt-1 text-sm text-bone/55">{project.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs text-bone/45">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

function BookingForm() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: 'Full-stack development',
    timeline: '',
    details: '',
  })

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm({ name: '', email: '', service: 'Full-stack development', timeline: '', details: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-md border border-bone/20 bg-panel px-4 py-2.5 text-sm text-bone placeholder:text-bone/35 focus:border-blood focus:outline-none transition-colors'

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bk-name" className="mb-1.5 block text-sm text-bone/70">Name</label>
          <input id="bk-name" required value={form.name} onChange={update('name')} placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="bk-email" className="mb-1.5 block text-sm text-bone/70">Email</label>
          <input id="bk-email" type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com" className={inputClass} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bk-service" className="mb-1.5 block text-sm text-bone/70">Service needed</label>
          <select id="bk-service" value={form.service} onChange={update('service')} className={inputClass}>
            <option>Full-stack development</option>
            <option>API development</option>
            <option>Web scraping / data</option>
            <option>Automation / scripting</option>
            <option>SEO / database configuration</option>
            <option>Security / firewall setup</option>
            <option>Site redesign / rebuild</option>
            <option>Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="bk-timeline" className="mb-1.5 block text-sm text-bone/70">Timeline</label>
          <input id="bk-timeline" value={form.timeline} onChange={update('timeline')} placeholder="ASAP, 2 weeks, flexible…" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="bk-details" className="mb-1.5 block text-sm text-bone/70">Project details</label>
        <textarea
          id="bk-details"
          required
          rows={5}
          value={form.details}
          onChange={update('details')}
          placeholder="Tell me what you're building…"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-md bg-blood px-6 py-3 text-sm font-medium text-bone hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {status === 'sending' ? 'Sending…' : 'Request a booking'}
      </button>
      {status === 'sent' && (
        <p className="text-center text-sm text-emerald-400">Booking request sent — I'll get back to you within a day.</p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm text-red-400">Something went wrong. Email me directly at geekhaus314@proton.me</p>
      )}
    </form>
  )
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-ink font-sans antialiased">
      <nav className="fixed top-0 inset-x-0 z-40 border-b border-bone/10 bg-ink/85 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#top" className="font-serif text-xl tracking-tight text-bone">
            pwn4g3
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm text-bone/60">
            <a href="#about" className="hover:text-bone transition-colors">About</a>
            <a href="#portfolio" className="hover:text-bone transition-colors">Portfolio</a>
            <a href="#booking" className="hover:text-bone transition-colors">Book</a>
          </div>
          <a
            href="mailto:geekhaus314@proton.me"
            className="rounded-md bg-blood px-4 py-1.5 text-sm font-medium text-bone hover:opacity-90 transition-opacity"
          >
            Hire me
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroPhoto}
            alt="Jake Viefhaus"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-bone/50">Full-Stack Developer · St. Louis, MO</p>
          <div className="mt-4 font-mono text-sm text-bone/50">
            <span className="text-blood">[whoami]$</span> Jake Viefhaus (aka{' '}
            <a href="https://github.com/geekhaus314" target="_blank" rel="noopener noreferrer" className="text-bone underline decoration-bone/30 hover:text-blood transition-colors">
              @geekhaus314
            </a>{' '}on GitHub)
          </div>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl font-light text-bone">
            pwn4g3
          </h1>
          <p className="mt-6 text-lg text-bone/70 max-w-2xl mx-auto leading-relaxed">
            I build full-stack web applications, APIs, automation, and secure infrastructure —
            from e-commerce platforms to bug bounty tooling.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#booking"
              className="rounded-md bg-blood px-6 py-3 text-sm font-medium text-bone hover:opacity-90 transition-opacity"
            >
              Book a project
            </a>
            <a
              href="#portfolio"
              className="rounded-md border border-bone/25 px-6 py-3 text-sm font-medium text-bone/80 hover:border-bone transition-colors"
            >
              See my work
            </a>
            <a
              href="https://github.com/geekhaus314"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-bone/25 px-6 py-3 text-sm font-medium text-bone/80 hover:border-bone transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 border-t border-bone/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="reveal font-serif text-4xl font-light text-bone sm:text-5xl">About</h2>
          <div className="reveal mt-8 space-y-5 text-bone/70 leading-relaxed">
            <p>
              I'm Jake, a full-stack developer and cybersecurity engineering student based in
              St. Louis, Missouri — founder of pwn4g3. I build web applications, automate
              workflows, and help businesses make sense of their data.
            </p>
            <p>
              From multi-tenant e-commerce platforms to client sites for local businesses,
              AI revenue infrastructure to bug bounty tooling — I cover the whole stack:
              TypeScript, React, Vue, Python, Node, Go, SQL, scraping, APIs, automation,
              SEO configuration, and firewall/security work.
            </p>
            <p className="italic text-bone/50">
              I'm an optimist at heart — I believe the world can be whole again; I just say
              it with my eyes on the horizon instead of my mouth.
            </p>
            <ul className="space-y-2 text-sm text-bone/60">
              <li><strong className="text-bone/80">Location:</strong> St. Louis, MO</li>
              <li><strong className="text-bone/80">Born:</strong> December 5, 2000</li>
              <li><strong className="text-bone/80">Pronouns:</strong> he/him</li>
              <li><strong className="text-bone/80">Email:</strong> geekhaus314@proton.me</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 border-t border-bone/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="reveal font-serif text-4xl font-light text-bone sm:text-5xl">Portfolio</h2>
          <p className="reveal mt-3 text-bone/55">
            Selected projects — click any card to see the full breakdown and screenshots.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="reveal">
                <ProjectCard project={p} onOpen={setActiveProject} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-20 border-t border-bone/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="reveal font-serif text-4xl font-light text-bone sm:text-5xl text-center">Book a project</h2>
          <p className="reveal mt-3 text-center text-bone/55">
            Tell me what you need — I'll get back to you within a day.
          </p>
          <div className="reveal mt-10">
            <BookingForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-bone/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-bone/40">
          <p>© {new Date().getFullYear()} pwn4g3 · Jake M. Viefhaus</p>
          <div className="flex gap-5">
            <a href="https://github.com/geekhaus314" target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">GitHub</a>
            <a href="https://github.com/3m0h4ck3r" target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">3m0h4ck3r</a>
            <a href="https://gitlab.com/geekhaus314" target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">GitLab</a>
            <a href="mailto:geekhaus314@proton.me" className="hover:text-bone transition-colors">Email</a>
          </div>
        </div>
      </footer>

      {activeProject && <ProjectCarousel project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  )
}