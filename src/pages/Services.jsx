// src/pages/Services.jsx
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import ServicesSection from '../components/ServicesSection'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const process = [
  { num: '01', title: 'Discovery',    desc: 'Understanding your goals, target audience, and project requirements in detail.' },
  { num: '02', title: 'Architecture', desc: 'Planning component hierarchy, state management, and API contracts before development.' },
  { num: '03', title: 'Development',  desc: 'Building with clean, scalable React code — responsive, accessible, and performant.' },
  { num: '04', title: 'Delivery',     desc: 'Testing, optimization, and handing over a polished product ready for launch.' },
]

export default function Services() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Header */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-dark-900 relative overflow-hidden">
        <div className="absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-4">Services</p>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl leading-tight mb-6">
              How I can <span className="gradient-text">help you</span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
              From pixel-perfect UI to production-ready React apps — I deliver work that stands out.
            </p>
          </FadeUp>
        </div>
      </section>

      <ServicesSection />

      {/* Process */}
      <section className="py-20 sm:py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-3">My Process</p>
            <h2 className="font-display font-black text-4xl md:text-5xl">
              How it <span className="gradient-text">works</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

            {process.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div className="glass rounded-3xl p-7 border border-white/5 hover:border-orange-500/15 transition-colors text-center group">
                  <div className="font-display font-black text-4xl gradient-text mb-4">{step.num}</div>
                  <h3 className="font-display font-bold text-white text-lg mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-800/50">
        <FadeUp className="text-center px-6">
          <p className="text-white/50 mb-6">Ready to start your project?</p>
          <Link to="/contact" className="btn-orange inline-flex items-center gap-2">
            Let's Talk ↗
          </Link>
        </FadeUp>
      </section>
    </motion.div>
  )
}
