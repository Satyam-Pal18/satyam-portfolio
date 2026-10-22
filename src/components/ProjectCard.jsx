import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // 3D tilt effect (disabled under reduced motion)
  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (card) card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <motion.div
      ref={cardRef}
      className="glass rounded-3xl overflow-hidden border border-white/5 group tilt-card"
      style={{ transition: 'transform 0.15s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px', amount: 0.1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image area — gradient placeholder or real image */}
      <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            width="600"
            height="340"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,122,0,0.3) 0%, transparent 60%)',
              }}
            />
            {/* Centered project title visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-black text-6xl text-white/8 select-none">
                {project.title[0]}
              </span>
            </div>
          </>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-mono px-3 py-1 rounded-full">
            Featured
          </div>
        )}

        {/* Category chip */}
        <div className="absolute bottom-4 left-4 glass text-xs font-mono text-white/70 px-3 py-1 rounded-full border border-white/10">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-orange-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/65 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-xs font-mono px-2.5 py-1 rounded-lg border border-white/10 text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${project.title}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 text-sm font-body transition-all duration-200"
          >
            <FiGithub size={14} />
            Code
          </a>
          {project.live && project.live.trim() !== '' && project.live !== '#' ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-white text-sm font-body transition-all duration-200"
            >
              <FiExternalLink size={14} />
              Live Demo
            </a>
          ) : (
            <span
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-white/5 bg-white/[0.02] text-white/30 text-xs sm:text-sm font-body cursor-not-allowed select-none whitespace-nowrap"
              title="Demo coming soon"
            >
              <FiExternalLink size={13} className="opacity-40 shrink-0" />
              Demo Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
