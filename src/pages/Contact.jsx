// src/pages/Contact.jsx
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import ContactForm from '../components/ContactForm'
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const socials = [
  { icon: FiGithub,   label: 'GitHub',    href: 'https://github.com/Satyam-Pal18', color: '#fff' },
  { icon: FiLinkedin, label: 'LinkedIn',   href: 'https://linkedin.com/in/satyam-pal-a68822254', color: '#0a66c2' },
  { icon: FaWhatsapp, label: 'WhatsApp',   href: 'https://wa.me/917984933274',      color: '#25d366' },
  { icon: FiMail,     label: 'Email',      href: 'mailto:satyampal426@gmail.com',    color: '#ff7a00' },
]

const info = [
  { icon: FiMail,   label: 'Email',    value: 'satyampal426@gmail.com' },
  { icon: FiMapPin, label: 'Location', value: 'Ahmedabad, Gujarat, India' },
  { icon: FiPhone,  label: 'Response', value: 'Within 24 hours' },
]

export default function Contact() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Header */}
      <section className="pt-32 pb-16 bg-dark-900 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-4">Contact</p>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-tight mb-6">
              Let's <span className="gradient-text">connect</span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left info (2/5) */}
            <div className="lg:col-span-2 space-y-8">
              <FadeUp>
                <h2 className="font-display font-bold text-2xl text-white mb-6 section-title">
                  Get in touch
                </h2>
                <div className="space-y-5">
                  {info.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-orange-400" />
                      </div>
                      <div>
                        <p className="text-white/30 text-xs font-mono uppercase tracking-wider">{label}</p>
                        <p className="text-white text-sm mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div>
                  <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">Follow me</p>
                  <div className="flex gap-3">
                    {socials.map(({ icon: Icon, label, href, color }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-11 h-11 rounded-2xl glass flex items-center justify-center border border-white/5 text-white/40 hover:text-white transition-all"
                        whileHover={{ y: -3, scale: 1.05, borderColor: color + '40' }}
                        whileTap={{ scale: 0.95 }}
                        style={{ '--hover-color': color }}
                      >
                        <Icon size={17} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Availability card */}
              <FadeUp delay={0.2}>
                <div className="glass-orange rounded-2xl p-6 border border-orange-500/15">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-mono">Available for work</span>
                  </div>
                  <p className="text-white text-sm font-display font-semibold">Open to freelance &amp; full-time roles</p>
                  <p className="text-white/40 text-xs mt-1">Frontend, React.js, Web Apps</p>
                </div>
              </FadeUp>
            </div>

            {/* Right form (3/5) */}
            <FadeUp delay={0.1} className="lg:col-span-3">
              <div className="glass rounded-3xl p-8 md:p-10 border border-white/5">
                <h3 className="font-display font-bold text-xl text-white mb-8">Send a message</h3>
                <ContactForm />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
