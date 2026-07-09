import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Linkedin, Mail, Phone, MapPin, Palette, Check, Download } from 'lucide-react'
import passportPhoto from '@/assets/passport-photo.jpeg'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const THEMES = [
  { id: 'navy', label: 'Navy', c50: '#f1f5f9', c100: '#e2e8f0', c400: '#64748b', c600: '#334155', c700: '#1e293b', c900: '#0f172a', dot: '#1e293b' },
  { id: 'blue', label: 'Blue', c50: '#eff6ff', c100: '#dbeafe', c400: '#60a5fa', c600: '#2563eb', c700: '#1d4ed8', c900: '#1e3a8a', dot: '#2563eb' },
  { id: 'emerald', label: 'Emerald', c50: '#ecfdf5', c100: '#d1fae5', c400: '#34d399', c600: '#059669', c700: '#047857', c900: '#064e3b', dot: '#059669' },
  { id: 'violet', label: 'Violet', c50: '#f5f3ff', c100: '#ede9fe', c400: '#a78bfa', c600: '#7c3aed', c700: '#6d28d9', c900: '#4c1d95', dot: '#7c3aed' },
  { id: 'rose', label: 'Rose', c50: '#fff1f2', c100: '#ffe4e6', c400: '#fb7185', c600: '#e11d48', c700: '#be123c', c900: '#881337', dot: '#e11d48' },
  { id: 'amber', label: 'Amber', c50: '#fffbeb', c100: '#fef3c7', c400: '#fbbf24', c600: '#d97706', c700: '#b45309', c900: '#78350f', dot: '#d97706' }
]

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState(THEMES[0])
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const themeMenuRef = useRef<HTMLDivElement>(null)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setIsThemeOpen(false)
      }
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setIsContactOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const ids = ['about', 'experience', 'skills', 'education']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const downloadResume = () => {
    const lines = [
      'MUSTAFA SHAKIL',
      'Talent Acquisition Leader',
      'Email: mustafa_shakil@hotmail.com | Phone: +92 334 328 7869 | Islamabad, Pakistan',
      'LinkedIn: linkedin.com/in/mustafa-shakil',
      '',
      'SUMMARY',
      'Manager-level Talent Acquisition professional with 10+ years of experience building high-performing technical teams across management consulting, AI startups, and enterprise technology.',
      '',
      'EXPERIENCE',
      ...experiences.flatMap(exp => [
        `${exp.role} — ${exp.company} (${exp.period})`,
        exp.location,
        ...exp.highlights.map(h => `  • ${h}`),
        exp.achievements ? `  Key Impact: ${exp.achievements}` : '',
        ''
      ]),
      'CORE COMPETENCIES',
      ...competencies.flatMap(c => [`${c.category}: ${c.items.join(', ')}`]),
      '',
      'EDUCATION',
      'Master of Business Administration (MBA), Human Resources Management — Iqra University (2015–2017)',
      'Bachelor of Business Administration (BBA), Human Resources Management — Iqra University (2011–2015)',
      '',
      'CERTIFICATIONS',
      ...certifications.map(c => `  • ${c}`)
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Mustafa_Shakil_Resume.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Education', id: 'education' }
  ]

  const experiences = [
    {
      role: 'Manager, Talent Acquisition',
      company: 'Unstuck Labs',
      location: 'Islamabad, Pakistan',
      period: 'October 2025 – Present',
      highlights: [
        'Leading end-to-end talent acquisition strategy for AI-powered development team, building recruiting infrastructure and scalable processes from ground up',
        'Establishing full-cycle recruitment framework for engineering, product, and automation engineering roles across global markets',
        'Developing employer branding strategy to position Unstuck Labs as employer of choice in competitive AI/ML talent market',
        'Creating comprehensive HR playbooks, structured interview frameworks, and employee celebration programs to enhance organizational culture',
        'Implementing data-driven recruiting metrics and reporting systems to optimize hiring funnel performance'
      ],
      achievements: null
    },
    {
      role: 'Senior Technical Recruiter',
      company: 'Vyro.ai (ImagineArt)',
      location: 'Pakistan | Global Hiring',
      period: 'December 2024 – October 2025',
      highlights: [
        'Managed full lifecycle recruitment for specialized technical roles across AI/ML, full-stack engineering, and product functions, scaling engineering team by 55+ developers in 6 months',
        'Designed and launched company-wide referral program, increasing quality applicant flow by 35% and reducing time-to-fill for critical engineering roles by 28%',
        'Developed automated onboarding trackers that reduced new hire ramp-up time by 40%, improving integration experience for technical teams',
        'Implemented Slack-integrated applicant funnel automation with real-time updates and Excel reporting, enabling data-driven hiring decisions and pipeline visibility',
        'Pioneered unconventional sourcing strategies leveraging Discord, Reddit, and GitHub to identify passive candidates overlooked by traditional recruiting channels',
        'Authored comprehensive Notion-based talent operations playbook, standardizing recruiting workflows and increasing team efficiency by 25%',
        'Conducted product knowledge training sessions for hiring managers, improving technical interview quality and candidate experience scores to 4.7/5'
      ],
      achievements: 'Enhanced quality of hire by 30% through rigorous screening processes | Reduced average time-to-fill from 42 to 26 days | Improved candidate experience with structured communication and feedback loops'
    },
    {
      role: 'Senior Recruiter, Digital Technology & Analytics',
      company: 'McKinsey & Company',
      location: 'Pakistan | EMEA Region (UAE, KSA, Egypt, Africa)',
      period: 'January 2022 – December 2024',
      highlights: [
        'Recruited top-tier digital and analytics talent across Eastern Europe, Middle East, and Africa for McKinsey\'s digital transformation practice, supporting strategic growth initiatives',
        'Advised 15+ Partners and Senior Partners on proactive recruiting strategies, pipeline development, talent market intelligence, and candidate experience optimization',
        'Coached and mentored team of 8 sourcers and junior recruiters on advanced Boolean search techniques, competitive hiring strategies, and standardized screening practices',
        'Executed full-cycle recruitment using Avature ATS for Digital Consultants, Technical Leads, Product Owners, and UI/UX Designers',
        'Spearheaded diversity, equity, and inclusion initiatives embedded into recruiting strategy, resulting in 40% increase in diverse hires across technical functions',
        'Led "First Hire Index" initiative to benchmark and elevate sourcing effectiveness against competitor consulting firms',
        'Pioneered automated reporting tool to minimize manual data entry errors, improving recruiting analytics accuracy by 90%'
      ],
      achievements: 'Built McKinsey\'s first Digital Hub in Pakistan from zero to 50+ technical professionals | Reduced time-to-fill by 35% through optimized recruitment processes | Increased digital recruitment pipeline by 25% year-over-year | Achieved 95% offer acceptance rate through enhanced candidate experience'
    },
    {
      role: 'Assistant Manager, Talent Acquisition & Employer Branding',
      company: 'Afiniti Ltd.',
      location: 'Pakistan',
      period: 'June 2015 – January 2022',
      progression: 'Talent Acquisition Analyst (2015–2019) → TA Associate (2019–2020) → Assistant Manager (2020–2022)',
      highlights: [
        'Led technical recruitment and employer branding initiatives for AI-powered enterprise software company, hiring niche talent across Data Science, Software Engineering, and Business Support functions',
        'Developed robust talent pipelines through creative sourcing including referral generation, professional networking, HR forums, and executive search',
        'Optimized Applicant Tracking System (ATS) workflows, improving recruitment process efficiency by 20% and reducing cost-per-hire by 15%',
        'Managed end-to-end employee lifecycle including onboarding, HRIS administration, payroll coordination, and benefits management for 200+ employees',
        'Digitized complete employee records system, reducing paper-based processes by 95% and improving HR data accuracy and accessibility',
        'Mentored and trained 5 new recruiters, driving 20% increase in team productivity and improving project delivery timelines',
        'Planned and executed 30+ employee engagement events (town halls, team-building activities, recognition ceremonies) fostering inclusive workplace culture'
      ],
      achievements: 'Single-handedly hired 300+ candidates in 2020 despite pandemic-related challenges and remote hiring constraints | Maintained 92% retention rate for technical hires over 18-month period'
    }
  ]

  const competencies = [
    {
      category: 'Recruiting Expertise',
      items: ['Technical Recruiting', 'Full-Cycle Recruitment', 'Executive Search', 'Diversity & Inclusion', 'High-Volume Hiring', 'RPO & Agency Management']
    },
    {
      category: 'Sourcing & Tools',
      items: ['GitHub/Stack Overflow Sourcing', 'Boolean Search Mastery', 'LinkedIn Recruiter', 'Avature, Greenhouse ATS', 'Slack/Notion Integration', 'Data-Driven Recruiting']
    },
    {
      category: 'Strategic Functions',
      items: ['Employer Branding', 'Talent Pipeline Development', 'Recruiting Process Design', 'Stakeholder Management', 'Team Leadership', 'People Analytics']
    }
  ]

  const certifications = [
    'LinkedIn Certified: Technical Recruiting',
    'Social Recruiting for Recruiters',
    'Employer Branding to Attract Talent',
    'People Analytics',
    'Advanced Interviewing Techniques'
  ]

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{
        '--c50': theme.c50,
        '--c100': theme.c100,
        '--c400': theme.c400,
        '--c600': theme.c600,
        '--c700': theme.c700,
        '--c900': theme.c900
      } as React.CSSProperties}
    >
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur z-50 border-b">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="font-semibold text-2xl tracking-tight">Mustafa Shakil</div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative pb-1 transition-colors text-sm font-medium ${activeSection === link.id ? 'text-[var(--c600)]' : 'hover:text-[var(--c600)] text-slate-700'}`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span layoutId="nav-underline" className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[var(--c600)] rounded-full" />
                )}
              </button>
            ))}
            <div className="relative pl-4 border-l" ref={themeMenuRef}>
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                title="Color theme"
                aria-label="Choose color theme"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 hover:border-[var(--c600)] transition"
              >
                <Palette size={18} style={{ color: theme.dot }} />
              </button>
              {isThemeOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 w-44 z-50">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t); setIsThemeOpen(false) }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 transition"
                    >
                      <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: t.dot }} />
                      <span className="flex-1 text-left">{t.label}</span>
                      {theme.id === t.id && <Check size={14} className="text-slate-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-left py-2">
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Color Theme</div>
              <div className="flex items-center gap-3 flex-wrap">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t)}
                    title={t.label}
                    aria-label={`${t.label} theme`}
                    className="w-8 h-8 rounded-full border-2 transition flex items-center justify-center"
                    style={{ backgroundColor: t.dot, borderColor: theme.id === t.id ? '#0f172a' : 'transparent' }}
                  >
                    {theme.id === t.id && <Check size={14} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative pt-20 min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[var(--c900)] via-[var(--c700)] to-[var(--c600)] text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1), transparent 45%)' }} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[var(--c400)] opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-white opacity-10 blur-3xl" />
        <div className="relative max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur rounded-full text-sm mb-6 tracking-widest uppercase border border-white/10 shadow-lg">Talent Acquisition Leader</div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]">Mustafa Shakil</h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-4 max-w-2xl mx-auto">Manager-level Talent Acquisition professional with 10+ years of experience building high-performing technical teams</p>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto text-sm">Management Consulting · AI Startups · Enterprise Technology</p>
            <div className="flex items-center justify-center gap-3 mb-8">
              <a href="mailto:mustafa_shakil@hotmail.com" aria-label="Email" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:-translate-y-0.5 transition-all">
                <Mail size={16} />
              </a>
              <a href="tel:+923343287869" aria-label="Phone" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:-translate-y-0.5 transition-all">
                <Phone size={16} />
              </a>
              <a href="https://www.linkedin.com/in/mustafa-shakil/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:-translate-y-0.5 transition-all">
                <Linkedin size={16} />
              </a>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:mustafa_shakil@hotmail.com" className="px-8 py-3.5 bg-white text-slate-900 rounded-full font-medium shadow-xl shadow-black/20 hover:bg-slate-100 hover:-translate-y-0.5 transition-all">Get in touch</a>
              <button onClick={downloadResume} className="px-8 py-3.5 border border-white/30 rounded-full flex items-center gap-2 hover:bg-white/10 hover:-translate-y-0.5 transition-all backdrop-blur">
                <Download size={18} /> Download Resume
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="relative max-w-5xl mx-auto px-6 py-20 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="pointer-events-none absolute top-10 -right-24 w-72 h-72 rounded-full bg-[var(--c100)] opacity-60 blur-3xl" />
        <div className="text-center mb-12 relative">
          <div className="text-[var(--c600)] font-semibold text-xs tracking-[3px] uppercase">Biography</div>
          <h2 className="text-4xl font-bold mt-3">About Me</h2>
        </div>
        <div className="relative flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-slate-600 space-y-4 text-base leading-relaxed">
            <p>Manager-level Talent Acquisition professional with 10+ years of experience building high-performing technical teams across management consulting, AI startups, and enterprise technology.</p>
            <p>Proven track record of scaling engineering organizations rapidly while maintaining quality of hire—including 300+ strategic placements and reducing time-to-fill by 40%. Specialized in innovative sourcing techniques (GitHub, Discord, Reddit) to identify outlier technical talent for mission-critical roles in data science, software engineering, and digital consulting.</p>
            <div className="pt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <Mail size={15} className="text-[var(--c600)] shrink-0" />
                <a href="mailto:mustafa_shakil@hotmail.com" className="hover:text-[var(--c600)] transition">mustafa_shakil@hotmail.com</a>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Phone size={15} className="text-[var(--c600)] shrink-0" />
                <a href="tel:+923343287869" className="hover:text-[var(--c600)] transition">+92 334 328 7869</a>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={15} className="text-[var(--c600)] shrink-0" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Linkedin size={15} className="text-[var(--c600)] shrink-0" />
                <a href="https://www.linkedin.com/in/mustafa-shakil/" target="_blank" rel="noreferrer" className="hover:text-[var(--c600)] transition">linkedin.com/in/mustafa-shakil</a>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="p-1.5 bg-gradient-to-br from-[var(--c400)] to-[var(--c700)] rounded-2xl shadow-2xl">
              <img
                src={passportPhoto}
                alt="Mustafa Shakil"
                className="w-64 h-72 object-cover rounded-xl ring-4 ring-white"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* STATS STRIP */}
      <motion.div
        className="bg-gradient-to-r from-[var(--c700)] via-[var(--c600)] to-[var(--c700)] text-white py-12 shadow-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '300+', label: 'Strategic Placements' },
            { value: '40%', label: 'Reduction in Time-to-Fill' },
            { value: '95%', label: 'Offer Acceptance Rate' }
          ].map(stat => (
            <div key={stat.label} className="hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-bold drop-shadow-sm">{stat.value}</div>
              <div className="text-[var(--c100)] text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* EXPERIENCE */}
      <section id="experience" className="relative bg-white py-20 overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-[var(--c50)] opacity-70 blur-3xl" />
        <motion.div
          className="relative max-w-5xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <div className="text-center mb-12">
            <div className="text-[var(--c600)] font-semibold text-xs tracking-[3px] uppercase">Career History</div>
            <h2 className="text-4xl font-bold mt-3">Professional Experience</h2>
          </div>
          <div className="space-y-14">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-[var(--c600)] hover:pl-9 transition-all">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[var(--c600)] ring-4 ring-[var(--c50)] shadow-md" />
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div>
                    <div className="font-bold text-xl text-slate-900">{exp.role}</div>
                    <div className="text-[var(--c600)] font-semibold">{exp.company}</div>
                    <div className="text-slate-400 text-sm">{exp.location}</div>
                  </div>
                  <div className="text-sm font-medium bg-[var(--c50)] text-[var(--c700)] px-3 py-1 rounded-full whitespace-nowrap">{exp.period}</div>
                </div>
                {'progression' in exp && exp.progression && (
                  <div className="mt-2 mb-3 text-xs text-slate-500 italic bg-slate-50 px-3 py-2 rounded-lg">Career Progression: {exp.progression}</div>
                )}
                <ul className="mt-4 space-y-2 text-slate-600 text-sm list-disc pl-5">
                  {exp.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
                </ul>
                {exp.achievements && (
                  <div className="mt-4 p-3 bg-[var(--c50)] border-l-4 border-[var(--c400)] rounded-r-lg text-sm text-slate-700">
                    <span className="font-semibold text-[var(--c700)]">Key Impact: </span>{exp.achievements}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <motion.section
        id="skills"
        className="max-w-5xl mx-auto px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="text-center mb-12">
          <div className="text-[var(--c600)] font-semibold text-xs tracking-[3px] uppercase">Expertise</div>
          <h2 className="text-4xl font-bold mt-3">Core Competencies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competencies.map(group => (
            <div key={group.category} className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <h3 className="font-bold text-slate-900 mb-4 text-base border-b pb-3">{group.category}</h3>
              <ul className="space-y-2">
                {group.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--c600)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* EDUCATION */}
      <section id="education" className="relative bg-[var(--c900)] text-white py-20 overflow-hidden">
        <div className="pointer-events-none absolute -top-20 right-10 w-80 h-80 rounded-full bg-[var(--c600)] opacity-30 blur-3xl" />
        <motion.div
          className="relative max-w-5xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="text-center mb-12">
            <div className="text-[var(--c400)] font-semibold text-xs tracking-[3px] uppercase">Academic Background</div>
            <h2 className="text-4xl font-bold mt-3">Education & Certifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-[var(--c400)] text-xs font-semibold uppercase tracking-widest mb-2">Master's Degree</div>
              <div className="font-bold text-lg">Master of Business Administration (MBA)</div>
              <div className="text-slate-300 text-sm mt-1">Human Resources Management</div>
              <div className="text-slate-400 text-sm mt-2">Iqra University · 2015 – 2017</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-[var(--c400)] text-xs font-semibold uppercase tracking-widest mb-2">Bachelor's Degree</div>
              <div className="font-bold text-lg">Bachelor of Business Administration (BBA)</div>
              <div className="text-slate-300 text-sm mt-1">Human Resources Management</div>
              <div className="text-slate-400 text-sm mt-2">Iqra University · 2011 – 2015</div>
            </div>
          </div>
          <div>
            <h3 className="text-center font-bold text-lg mb-6 text-slate-300">Professional Certifications</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map(cert => (
                <div key={cert} className="px-4 py-2 bg-white/10 rounded-full text-sm text-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--c400)] shrink-0" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="py-7 text-center text-sm text-slate-500 border-t">
        © {new Date().getFullYear()} Mustafa Shakil · All rights reserved.
      </footer>

      {/* FLOATING CONTACT BUBBLE */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40" ref={contactRef}>
        {isContactOpen && (
          <div className="mb-3 flex flex-col gap-3 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 w-72">
            <div className="text-xs font-semibold uppercase tracking-widest text-[var(--c600)] mb-1">Contact</div>
            <a href="mailto:mustafa_shakil@hotmail.com" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[var(--c600)] transition">
              <Mail size={15} className="text-[var(--c600)] shrink-0" />
              mustafa_shakil@hotmail.com
            </a>
            <a href="tel:+923343287869" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[var(--c600)] transition">
              <Phone size={15} className="text-[var(--c600)] shrink-0" />
              +92 334 328 7869
            </a>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin size={15} className="text-[var(--c600)] shrink-0" />
              Islamabad, Pakistan
            </div>
            <a href="https://www.linkedin.com/in/mustafa-shakil/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[var(--c600)] transition">
              <Linkedin size={15} className="text-[var(--c600)] shrink-0" />
              linkedin.com/in/mustafa-shakil
            </a>
          </div>
        )}
        <button
          onClick={() => setIsContactOpen(!isContactOpen)}
          aria-label="Toggle contact info"
          className="w-14 h-14 rounded-full bg-[var(--c600)] text-white shadow-2xl flex items-center justify-center hover:bg-[var(--c700)] transition ml-auto"
        >
          {isContactOpen ? <X size={22} /> : <Mail size={22} />}
        </button>
      </div>
    </div>
  )
}

export default App





