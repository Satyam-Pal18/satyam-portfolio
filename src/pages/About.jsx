// src/pages/About.jsx
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import { FiMapPin, FiMail, FiBriefcase, FiBook, FiAward, FiCode } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const timeline = [
  {
    period: 'Jul 2025 - Oct 2026',
    category: 'Experience',
    type: 'work',
    icon: FiBriefcase,
    title: 'Frontend Developer',
    org: 'Excelsior Technologies · Ahmedabad',
    badge: 'Latest Role',
    desc: 'Developed production-ready React.js components, integrated REST APIs, converted Figma designs into pixel-accurate responsive interfaces, and used AI-assisted tools (ChatGPT, Claude, Cursor) for rapid development and debugging.',
  },
  {
    period: 'Jan 2025 - Jun 2025',
    category: 'Training',
    type: 'training',
    icon: FiCode,
    title: 'Trainee Frontend Developer',
    org: 'QSpiders Training Institute',
    badge: 'Frontend Track',
    desc: 'Hands-on project-based training building frontend web applications with React.js, modern JavaScript (ES6+), HTML5, CSS3, and REST API integrations.',
  },
  {
    period: '2021 - 2025',
    category: 'Education',
    type: 'edu',
    icon: FiBook,
    title: 'Bachelor of Engineering (Information Technology)',
    org: 'B.H Gardi College Of Engineering & Technology, GTU',
    badge: 'Graduated',
    desc: 'Comprehensive engineering degree with focus on software development, web engineering, responsive user interfaces, and database fundamentals (MySQL).',
  },
  {
    period: '2023 & 2026',
    category: 'Achievement',
    type: 'award',
    icon: FiAward,
    title: 'Hackathon Winner & Tech Competitions',
    org: 'Excelsior AI Hackathon & 24h Hackathon',
    badge: 'Awards',
    desc: 'Winner at Excelsior AI Hackathon ’26 organized by Excelsior Technologies and secured 3rd Rank in the 24-hour Hackathon 2023 at B.H Gardi College Of Engineering & Technology.',
  },
]

const typeTheme = {
  work:     { color: '#ff7a00', bg: 'rgba(255, 122, 0, 0.1)',   border: 'rgba(255, 122, 0, 0.35)' },
  training: { color: '#ff9a40', bg: 'rgba(255, 154, 64, 0.1)',  border: 'rgba(255, 154, 64, 0.35)' },
  edu:      { color: '#22d3ee', bg: 'rgba(34, 211, 238, 0.1)',  border: 'rgba(34, 211, 238, 0.35)' },
  award:    { color: '#c084fc', bg: 'rgba(192, 132, 252, 0.1)', border: 'rgba(192, 132, 252, 0.35)' },
}

export default function About() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-dark-900 relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-4">About Me</p>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-tight mb-6">
              The person<br />
              behind the <span className="gradient-text">code</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              I'm Satyam Pal — a Frontend Developer who transforms ideas into polished, performant digital experiences. Driven by curiosity, fueled by coffee.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Bio + info */}
      <section className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Career objective */}
            <FadeUp>
              <h2 className="font-display font-bold text-2xl text-white mb-5 section-title">Career Objective</h2>
              <p className="text-white/50 leading-relaxed mb-4">
                I turn ideas into interactive digital experiences — building responsive, intuitive, and visually polished web applications with React.js and modern frontend technologies.
              </p>
              <p className="text-white/50 leading-relaxed mb-4">
                I enjoy solving real-world problems through clean code, reusable components, and responsive user interfaces. My goal is to keep growing as a developer, take on meaningful challenges, and build products that make technology feel simple and useful.
              </p>
              <p className="text-white/50 leading-relaxed">
                I'm excited to collaborate with creative teams, contribute to impactful projects, and turn complex ideas into seamless user experiences.
              </p>
            </FadeUp>

            {/* Info card */}
            <FadeUp delay={0.1}>
              <div className="glass rounded-3xl p-8 border border-white/5 space-y-5">
                {[
                  { icon: FiMapPin,   label: 'Location', value: 'Ahmedabad, Gujarat, India' },
                  { icon: FiMail,     label: 'Email',    value: 'satyampal426@gmail.com' },
                  { icon: FiBriefcase,label: 'Status',   value: 'Open to opportunities' },
                  { icon: FiBook,     label: 'Education','value': 'Bachelor of Engineering (Information Technology)' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white/30 text-xs font-mono uppercase tracking-wider">{label}</p>
                      <p className="text-white text-sm font-body mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-dark-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeUp className="text-center mb-16">
            <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-3">Journey</p>
            <h2 className="font-display font-black text-4xl md:text-5xl">
              My <span className="gradient-text">timeline</span>
            </h2>
            <p className="text-white/50 text-sm max-w-md mx-auto mt-3">
              A chronological overview of my professional experience, education, and achievements.
            </p>
          </FadeUp>

          <div className="relative">
            {/* Vertical glowing connector line */}
            <div className="absolute left-6 md:left-8 top-3 bottom-8 w-0.5 bg-gradient-to-b from-orange-500 via-orange-500/30 to-transparent" />

            <div className="space-y-10 pl-16 md:pl-20">
              {timeline.map((item, i) => {
                const Icon = item.icon
                const theme = typeTheme[item.type]
                return (
                  <FadeUp key={item.title} delay={i * 0.1}>
                    <div className="relative group">
                      {/* Timeline Node Icon Badge */}
                      <div
                        className="absolute -left-16 md:-left-20 top-1.5 w-11 h-11 rounded-2xl glass flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg"
                        style={{
                          borderColor: theme.border,
                          backgroundColor: '#0c0c0c',
                          boxShadow: `0 0 20px ${theme.border}`,
                        }}
                      >
                        <Icon size={18} style={{ color: theme.color }} />
                      </div>

                      {/* Timeline Card */}
                      <div className="glass rounded-2xl p-6 md:p-7 border border-white/5 hover:border-orange-500/30 hover:bg-dark-700/60 transition-all duration-300 shadow-xl">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium"
                              style={{ color: theme.color, backgroundColor: theme.bg, border: `1px solid ${theme.border}` }}
                            >
                              {item.category}
                            </span>
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-white/40 glass border border-white/5">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs font-semibold text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            {item.period}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-orange-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm font-mono mt-1 mb-3" style={{ color: theme.color }}>
                          {item.org}
                        </p>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-800/50">
        <FadeUp className="text-center px-6">
          <Link to="/contact" className="btn-orange inline-flex items-center gap-2">
            Let's work together ↗
          </Link>
        </FadeUp>
      </section>
    </motion.div>
  )
}
