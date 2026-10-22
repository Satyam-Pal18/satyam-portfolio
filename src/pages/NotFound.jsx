// src/pages/NotFound.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiHome, FiArrowRight } from 'react-icons/fi'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function NotFound() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 bg-dark-900 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        <div className="glass rounded-3xl p-10 md:p-14 border border-white/5 relative">
          <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-2">Error 404</p>
          <h1 className="font-display font-black text-7xl md:text-8xl gradient-text glow-text mb-4">
            404
          </h1>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
            Page not found
          </h2>
          <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
            The page you are looking for doesn't exist, was removed, or is temporarily unavailable.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-orange flex items-center gap-2">
              <FiHome size={16} />
              Back to Home
            </Link>
            <Link to="/projects" className="btn-ghost flex items-center gap-2">
              View Projects
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
