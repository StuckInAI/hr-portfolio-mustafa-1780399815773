import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Linkedin, Mail, Award, Users, Target } from 'lucide-react'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
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
            <p className="text-2xl text-slate-300 mb-8">Transforming organizations through people excellence</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => scrollToSection('contact')} className="px-8 py-3.5 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100">Get in touch</button>
              <a href="https://www.linkedin.com/in/mustafa-shakil/" target="_blank" className="px-8 py-3.5 border border-white/30 rounded-full flex items-center gap-2 hover:bg-white/10">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="about" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-blue-600 font-semibold text-sm tracking-[2px]">BIOGRAPHY</div>
          <h2 className="text-4xl font-semibold mt-3">About Me</h2>
        </div>
        <div className="prose prose-lg max-w-none text-slate-600 text-center">
          <p>Strategic HR professional with 10+ years driving talent acquisition, organizational development, and employee experience at scale. Passionate about building inclusive cultures and leveraging data to unlock human potential.</p>
        </div>
      </section>

      <section id="experience" className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-blue-600 font-semibold text-sm tracking-[2px]">CAREER HIGHLIGHTS</div>
            <h2 className="text-4xl font-semibold mt-3">Experience</h2>
          </div>
          <div className="space-y-8">
            {[
              { role: "Head of People Operations", company: "TechNova", period: "2022 — Present", desc: "Leading people strategy for 700+ employees across 3 continents." },
              { role: "Talent Acquisition Director", company: "Vanguard Labs", period: "2019 — 2022", desc: "Scaled hiring from 200 to 1200 employees in two years." },
              { role: "HR Business Partner", company: "Global Dynamics", period: "2016 — 2019", desc: "Partnered with leadership to build high-performing engineering teams." }
            ].map((exp, i) => (
              <div key={i} className="border-l-2 border-blue-600 pl-8">
                <div className="font-semibold text-xl">{exp.role}</div>
                <div className="text-blue-600">{exp.company} · {exp.period}</div>
                <p className="mt-2 text-slate-600">{exp.desc}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Talent Strategy', 'Leadership Development', 'DEI & Inclusive Hiring', 'Performance Management', 'HR Analytics', 'Change Management', 'Executive Coaching', 'Employer Branding', 'Employee Engagement'].map(skill => (
            <div key={skill} className="px-6 py-5 bg-white rounded-xl border text-center">{skill}</div>
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