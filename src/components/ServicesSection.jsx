// src/components/ServicesSection.jsx
import { motion } from 'framer-motion'
import FadeUp from './FadeUp'
import { services } from '../data/services'
import { FiCode, FiLayout, FiSmartphone, FiZap, FiBox, FiCheck } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const iconMap = { FiCode, FiLayout, FiSmartphone, FiZap, FiBox }

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-28 bg-dark-800/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-3">What I Offer</p>
          <h2 className="font-display font-black text-4xl md:text-5xl">
            Services that <span className="gradient-text">deliver</span>
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <FadeUp key={service.id} delay={i * 0.08}>
                <motion.div
                  className="relative overflow-hidden glass rounded-3xl p-7 border border-white/5 group h-full cursor-default"
                  whileHover={{ y: -6, borderColor: `${service.color}30` }}
                  transition={{ type: 'spring', bounce: 0.3 }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300"
                    style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}
                  >
                    <Icon size={20} style={{ color: service.color }} />
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-3">{service.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-5">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map(feat => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-white/35">
                        <FiCheck size={12} style={{ color: service.color }} className="shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${service.color}06, transparent 60%)` }}
                  />
                </motion.div>
              </FadeUp>
            )
          })}
        </div>

        <FadeUp delay={0.3} className="text-center mt-14">
          <Link to="/contact" className="btn-orange inline-flex items-center gap-2">
            Start a Project ↗
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
