import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Linkedin, Award, Users, Target } from 'lucide-react'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    
    const messages = JSON.parse(localStorage.getItem('messages') || '[]')
    messages.push({ ...formData, date: new Date().toISOString() })
    localStorage.setItem('messages', JSON.stringify(messages))
    
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 2500)
  }

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' }
  ]

  const experiences = [
    {
      role: "Senior Technical Recruiter",
      company: "Vyro.ai",
      period: "2024 — Present",
      highlights: [
        "Full Lifecycle Recruitment Management: Managed end-to-end recruitment for specialized and niche roles",
        "Vyro's Referral Program: Initiated campaigns improving talent acquisition quality",
        "Automated Onboarding Trackers & Slack-integrated funnel automation",
        "Diverse sourcing via Discord, Reddit, GitHub; Notion playbook created"
      ],
      achievements: "Scaled tech talent with 40+ resources; improved candidate experience via feedback surveys"
    },
    {
      role: "Senior Recruiter, Digital & Analytics Team (EEMEA)",
      company: "McKinsey & Company",
      period: "2022 — 2024",
      highlights: [
        "Streamlined recruitment using digital platforms",
        "Revamped workflows for UAE, Africa, KSA, Pakistan & Egypt",
        "Pioneered diversity & inclusion initiatives; First Hire Index"
      ],
      achievements: "Built Digital Hub in Pakistan; 30% reduction in time-to-fill; 40% increase in diverse hires; hired 50 team members"
    },
    {
      role: "Assistant Manager Human Resources",
      company: "Afiniti Ltd.",
      period: "2015 — 2022",
      highlights: [
        "Full-cycle recruitment & ATS optimization",
        "HRIS digitization, payroll, benefits & expense management",
        "Mass hiring for Data Roles, Software Engineers & Support Functions"
      ],
      achievements: "300+ niche candidates hired single-handedly in 2020; 20% productivity gain; managed 30+ events"
    }
  ]

  const skills = ["ATS Systems", "Technical Recruitment", "Leadership", "Communication", "Design Thinking", "Embracing Diversity", "Operational Efficiency", "Process Analysis", "Vendor Management", "HRIS", "HR Audit", "Payroll Management", "Health Benefits", "Social Media", "Strategic Sourcing"]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur z-50 border-b">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="font-semibold text-2xl tracking-tight">Mustafa Shakil</div>
          
          <div className="hidden md:flex gap-10">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="hover:text-blue-600 transition-colors">
                {link.label}
              </button>
            ))}
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
          </div>
        )}
      </nav>

      <section className="pt-20 min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm mb-4">HR LEADER • TALENT STRATEGIST</div>
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter mb-4">Mustafa Shakil</h1>
            <p className="text-2xl text-slate-300 mb-8">A decade of excellence in talent attraction & recruiting</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => scrollToSection('contact')} className="px-8 py-3.5 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100">Get in touch</button>
              <a href="https://www.linkedin.com/in/mustafa-shakil/" target="_blank" className="px-8 py-3.5 border border-white/30 rounded-full flex items-center gap-2 hover:bg-white/10">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-blue-600 font-semibold text-sm tracking-[2px]">BIOGRAPHY</div>
          <h2 className="text-4xl font-semibold mt-3">About Me</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 prose prose-lg text-slate-600">
            <p>Having around a decade of experience in talent attraction and recruiting for management consultancy and technology. Passionate about connecting talented individuals with the right opportunities and providing a positive candidate experience. Led engagement functions and worked as an HR Generalist.</p>
            <div className="mt-4 flex flex-wrap gap-x-6 text-sm text-slate-500">
              <span>mustafa_shakil@hotmail.com</span> • <span>+92 334 328 7869</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img 
              src="https://uuyrfcqxonpvccrznlao.supabase.co/storage/v1/object/public/prompt-images/build-images/1780401037047-Passport-Photo.jpeg" 
              alt="Mustafa Shakil" 
              className="w-64 h-72 object-cover rounded-2xl shadow-xl" 
            />
          </div>
        </div>
      </section>

      <section id="experience" className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-blue-600 font-semibold text-sm tracking-[2px]">CAREER HIGHLIGHTS</div>
            <h2 className="text-4xl font-semibold mt-3">Experience</h2>
          </div>
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className="border-l-2 border-blue-600 pl-8">
                <div className="font-semibold text-xl">{exp.role}</div>
                <div className="text-blue-600">{exp.company} · {exp.period}</div>
                <ul className="mt-4 space-y-2 text-slate-600 list-disc pl-5">
                  {exp.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
                </ul>
                <div className="mt-4 text-sm font-medium text-slate-700">{exp.achievements}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-blue-600 font-semibold text-sm tracking-[2px]">EXPERTISE</div>
          <h2 className="text-4xl font-semibold mt-3">Core Skills</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map(skill => (
            <div key={skill} className="px-6 py-5 bg-white rounded-xl border text-center text-sm">{skill}</div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-slate-900 text-white py-20">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold">Let's Connect</h2>
            <p className="text-slate-400 mt-3">Open to strategic HR opportunities and collaborations.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 bg-white/10 rounded-xl placeholder:text-white/60" required />
            <input type="email" placeholder="Email address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3.5 bg-white/10 rounded-xl placeholder:text-white/60" required />
            <textarea placeholder="Message" rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-5 py-3.5 bg-white/10 rounded-xl placeholder:text-white/60 resize-y" required />
            <button type="submit" className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-medium rounded-xl transition">
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-7 text-center text-sm text-slate-500 border-t">© {new Date().getFullYear()} Mustafa Shakil. All rights reserved.</footer>
    </div>
  )
}

export default App