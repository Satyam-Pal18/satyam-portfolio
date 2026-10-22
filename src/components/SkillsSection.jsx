// src/components/SkillsSection.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeUp from './FadeUp'
import { skillCategories } from '../data/skills'

function SkillBar({ name, level, color, index }) {
  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-body text-white/80">{name}</span>
        <span className="text-xs font-mono text-white/60">{level}%</span>
      </div>
      <div
        className="h-1.5 bg-white/5 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency: ${level}%`}
      >
        <motion.div
          className="h-full rounded-full relative shimmer"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.07 + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const [active, setActive] = useState(0)
  const category = skillCategories[active]

  return (
    <section className="py-28 bg-dark-900 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-3">My Skills</p>
          <h2 className="font-display font-black text-4xl md:text-5xl">
            Tools of the <span className="gradient-text">trade</span>
          </h2>
        </FadeUp>

        {/* Category tabs */}
        <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-3 mb-14">
          <div role="tablist" aria-label="Skill categories" className="flex flex-wrap justify-center gap-3">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.label}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`px-5 py-2.5 rounded-full font-display font-medium text-sm transition-all duration-300 ${
                  active === i
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'glass text-white/65 hover:text-white border border-white/5'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Skill bars */}
          <div>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {category.skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Visual: radar / polygon */}
          <FadeUp delay={0.2}>
            <div className="relative flex items-center justify-center h-72">
              {/* Circular glow bg */}
              <div className="absolute w-64 h-64 rounded-full bg-orange-500/5 blur-2xl" />

              {/* Skill circles */}
              <div className="relative w-64 h-64">
                {category.skills.map((skill, i) => {
                  const angle = (i / category.skills.length) * 2 * Math.PI - Math.PI / 2
                  const radius = 100
                  const x = 128 + radius * Math.cos(angle)
                  const y = 128 + radius * Math.sin(angle)
                  const size = 14 + (skill.level / 100) * 20

                  return (
                    <div
                      key={skill.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ left: x, top: y }}
                    >
                      <motion.div
                        className="flex flex-col items-center pointer-events-auto"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: 'spring', bounce: 0.4 }}
                      >
                        <div
                          className="rounded-full flex items-center justify-center text-xs font-mono font-bold"
                          style={{
                            width: size + 20,
                            height: size + 20,
                            background: `${skill.color}22`,
                            border: `1.5px solid ${skill.color}55`,
                            color: skill.color,
                            fontSize: 10,
                          }}
                        >
                          {skill.level}
                        </div>
                        <span className="text-white/65 text-xs mt-1 whitespace-nowrap font-body">
                          {skill.name}
                        </span>
                      </motion.div>
                    </div>
                  )
                })}

                {/* Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none z-10">
                  <motion.div
                    key={category.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center justify-center text-center"
                  >
                    <span className="text-2xl leading-none select-none mb-1.5 filter drop-shadow-[0_0_8px_rgba(255,122,0,0.5)]">
                      {category.icon}
                    </span>
                    <span className="text-xs font-mono font-medium tracking-wider text-white/70 whitespace-nowrap">
                      {category.label}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
