// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiArrowUpRight,
  FiHeart
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

const socials = [
  { icon: FiGithub,   href: 'https://github.com/Satyam-Pal18',   label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/satyam-pal-a68822254', label: 'LinkedIn' },
  { icon: FaWhatsapp, href: 'https://wa.me/917984933274',        label: 'WhatsApp' },
  { icon: FiMail,     href: 'mailto:satyampal426@gmail.com',       label: 'Email' },
]

const links = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Services', path: '/services' },
  { label: 'Resume',   path: '/resume' },
  { label: 'Contact',  path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#070707] border-t border-white/5 pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow & top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-orange-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Col 1: Brand & Status (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display font-black text-3xl gradient-text tracking-tight">SP.</span>
                <span className="h-4 w-px bg-white/20" />
                <span className="text-white/60 text-xs font-mono tracking-widest uppercase">Satyam Pal</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Frontend developer crafting responsive, pixel-perfect, and high-performance digital experiences with React.js & modern web standards.
              </p>
            </div>

            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-full glass border border-white/10 w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs font-medium text-white/80">Available for Freelance & Roles</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {links.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="group inline-flex items-center gap-1.5 text-white/60 hover:text-orange-400 text-sm transition-colors duration-200"
                  >
                    <span className="text-orange-500/0 group-hover:text-orange-400 transition-colors text-xs font-mono">›</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Details (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Direct Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:satyampal426@gmail.com"
                className="group flex items-start gap-3 p-3 rounded-xl glass border border-white/5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                  <FiMail size={15} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-white/40 uppercase">Email</p>
                  <p className="text-xs font-medium text-white/80 group-hover:text-orange-400 truncate transition-colors">
                    satyampal426@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl glass border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                  <FiMapPin size={15} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/40 uppercase">Location</p>
                  <p className="text-xs font-medium text-white/80">Ahmedabad, Gujarat, India 🇮🇳</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Socials & Quick Connect (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Connect
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl glass border border-white/5 text-white/70 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/10 transition-all text-xs font-medium"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label={label}
                >
                  <Icon size={14} className="shrink-0" />
                  <span className="truncate">{label}</span>
                </motion.a>
              ))}
            </div>
            <Link
              to="/contact"
              className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:text-white transition-all text-xs font-display font-semibold group shadow-sm"
            >
              <span>Get In Touch</span>
              <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p className="font-mono">
            © {new Date().getFullYear()} <span className="text-white/80 font-medium">Satyam Pal</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <FiHeart size={12} className="text-orange-500 fill-orange-500 animate-pulse" />
            <span>in Ahmedabad, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
