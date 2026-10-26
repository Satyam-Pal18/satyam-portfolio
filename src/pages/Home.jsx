// src/pages/Home.jsx
import { motion } from 'framer-motion'
import HeroSection    from '../components/HeroSection'
import AboutSection   from '../components/AboutSection'
import SkillsSection  from '../components/SkillsSection'
import ServicesSection from '../components/ServicesSection'
import ProjectCard    from '../components/ProjectCard'
import FadeUp         from '../components/FadeUp'
import { projects }   from '../data/projects'
import { Link }       from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
}

export default function Home() {
  const featured = projects.filter(p => p.featured).slice(0, 3)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <HeroSection />
      <AboutSection />
      <SkillsSection />

      {/* Featured Projects Preview */}
      <section className="py-20 sm:py-28 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-3">Work</p>
              <h2 className="font-display font-black text-4xl md:text-5xl">
                Featured <span className="gradient-text">projects</span>
              </h2>
            </div>
            <Link to="/projects" className="btn-ghost text-sm whitespace-nowrap">
              View all →
            </Link>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* CTA Banner */}
      <section className="py-20 sm:py-24 bg-dark-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="glass-orange rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none" />
              <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-4">Let's work together</p>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
                Have a project in mind?
              </h2>
              <p className="text-white/50 mb-10 max-w-md mx-auto">
                I'm currently available for freelance work. If you have a project that you want to get started, think you need my help with something, or just fancy saying hey — then get in touch.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="btn-orange">
                  Start a Conversation ↗
                </Link>
                <Link to="/resume" className="btn-ghost">
                  View Resume
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </motion.div>
  )
}
