// src/pages/Projects.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import ProjectCard from '../components/ProjectCard'
import { projects, categories } from '../data/projects'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Header */}
      <section className="pt-32 pb-16 bg-dark-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-4">Portfolio</p>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-tight mb-6">
              Things I've <span className="gradient-text">built</span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              A curated collection of projects that showcase my skills in frontend development, React.js, and modern web applications.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-dark-800/50 sticky top-[72px] z-30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full font-display font-medium text-sm transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'glass text-white/50 hover:text-white border border-white/5'
                }`}
                whileTap={{ scale: 0.96 }}
              >
                {cat}
                <span className="ml-2 text-xs opacity-60">
                  {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-white/30 font-body">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>
    </motion.div>
  )
}
