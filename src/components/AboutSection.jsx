// src/components/AboutSection.jsx
import { motion } from 'framer-motion'
import FadeUp from './FadeUp'
import { FiCode, FiHeart, FiTarget, FiZap } from 'react-icons/fi'

const strengths = [
  { icon: FiCode,   label: 'Clean Code',        desc: 'Readable, scalable, maintainable' },
  { icon: FiZap,    label: 'Fast Learner',       desc: 'Adapts to new tech quickly' },
  { icon: FiHeart,  label: 'Detail-Oriented',    desc: 'Pixel-perfect execution' },
  { icon: FiTarget, label: 'Goal-Driven',        desc: 'Focused on real-world impact' },
]

export default function AboutSection() {
  return (
    <section className="py-28 bg-dark-800/50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-orange-500/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: image / visual */}
          <FadeUp>
            <div className="relative">
              {/* Code-style card */}
              <div className="glass rounded-3xl p-8 font-mono text-sm leading-8 border border-white/5">
                <div className="flex gap-2 mb-6">
                  {['#ff5f57','#febc2e','#28c840'].map(c => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="text-white/55 text-xs mb-4">satyam.config.js</div>
                <p><span className="text-orange-400">const</span> <span className="text-cyan-400">developer</span> <span className="text-white/60">=</span> {'{'}</p>
                <p className="pl-6"><span className="text-green-400">name</span>: <span className="text-orange-300">"Satyam Pal"</span>,</p>
                <p className="pl-6"><span className="text-green-400">role</span>: <span className="text-orange-300">"Frontend Developer"</span>,</p>
                <p className="pl-6"><span className="text-green-400">location</span>: <span className="text-orange-300">"Ahmedabad, India"</span>,</p>
                <p className="pl-6"><span className="text-green-400">passion</span>: <span className="text-orange-300">"Building premium UIs"</span>,</p>
                <p className="pl-6"><span className="text-green-400">available</span>: <span className="text-cyan-400">true</span>,</p>
                <p className="pl-6"><span className="text-green-400">stack</span>: [</p>
                <p className="pl-12"><span className="text-orange-300">"React"</span>, <span className="text-orange-300">"Tailwind"</span>,</p>
                <p className="pl-12"><span className="text-orange-300">"Figma"</span>, <span className="text-orange-300">"JS"</span></p>
                <p className="pl-6">],</p>
                <p>{'}'}</p>
                <p className="mt-4 text-white/60">
                  <span className="text-orange-400">export default</span> developer;
                </p>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 glass-orange rounded-2xl px-5 py-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-2xl font-display font-black gradient-text">1+</p>
                <p className="text-white/60 text-xs">Year of Experience</p>
              </motion.div>
            </div>
          </FadeUp>

          {/* Right: text */}
          <div>
            <FadeUp>
              <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-3">About Me</p>
              <h2 className="font-display font-black text-4xl md:text-5xl leading-tight mb-6 section-title">
                Turning ideas into<br />
                <span className="gradient-text">digital reality</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-white/70 leading-relaxed mb-4">
                I'm Satyam Pal — a Frontend Developer based in Ahmedabad, Gujarat, with 1+ year of hands-on experience building modern web applications. My core expertise centers on React.js, modern JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS, focusing on modular, reusable components and responsive, accessible user interfaces.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                I regularly integrate REST APIs, manage client-side routing with React Router, and maintain structured version control with Git and GitHub. To build a stronger full-stack foundation, I am also actively developing practical skills in Node.js, Express.js, and MySQL.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {strengths.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="glass rounded-2xl p-4 border border-white/5 group hover:border-orange-500/20 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors">
                      <Icon size={15} className="text-orange-400" />
                    </div>
                    <p className="font-display font-semibold text-sm text-white mb-0.5">{label}</p>
                    <p className="text-white/60 text-xs">{desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
