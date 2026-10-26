// src/components/HeroSection.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiArrowRight } from 'react-icons/fi'
import DeveloperAvatar3D from './DeveloperAvatar3D'

// Typewriter hook
const ROLES = ['Frontend Developer', 'React Developer', 'Web Developer']

// Exact Introduction Script - 6 Paragraphs
const INTRODUCTION_PARAGRAPHS = [
  "Hello, and welcome to my portfolio.",
  "I'm Satyam Pal, a Frontend Developer with over a year of experience building responsive, user-focused web applications.",
  "My work focuses on React.js, JavaScript, and modern frontend technologies, with an emphasis on clean code, reusable components, performance, and thoughtful user interface design.",
  "Throughout my development journey, I've worked on real-world application features, API integrations, and dynamic dashboards, turning design concepts into functional digital experiences.",
  "I believe great development combines technical precision with a strong understanding of user needs.",
  "Feel free to explore my work and discover the projects I've been building.",
]

function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex % words.length]
    let timeout

    if (!deleting) {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), speed)
      } else {
        timeout = setTimeout(() => setDeleting(true), pause)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), speed / 2)
      } else {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

// Particle canvas
function ParticleCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    let animId

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = W
          if (p.x > W) p.x = 0
          if (p.y < 0) p.y = H
          if (p.y > H) p.y = 0
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,122,0,${p.alpha})`
        ctx.fill()
      })
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(draw)
      }
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      if (prefersReducedMotion) draw()
    }
    window.addEventListener('resize', onResize)
    return () => {
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none opacity-50" />
}

export default function HeroSection() {
  const typed = useTypewriter(ROLES)

  // Speech & Subtitle State
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [activeParagraph, setActiveParagraph] = useState(0)
  const [showSubtitles, setShowSubtitles] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const isSpeakingRef = useRef(false)
  const speechTimeoutRef = useRef(null)
  const activeParagraphRef = useRef(0)

  // Sync ref with state
  isSpeakingRef.current = isSpeaking
  activeParagraphRef.current = activeParagraph

  // Preload speech synthesis voices on mount & cleanup on unmount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      const onVoicesChanged = () => window.speechSynthesis.getVoices()
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged)

      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged)
        window.speechSynthesis.cancel()
        isSpeakingRef.current = false
        if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current)
      }
    }
  }, [])

  // Stop speech playback completely
  const stopSpeech = useCallback(() => {
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    isSpeakingRef.current = false
    setIsSpeaking(false)
    setShowSubtitles(false)
  }, [])

  // Chained paragraph speaker
  const speakParagraph = useCallback((index) => {
    if (!isSpeakingRef.current) return

    // All paragraphs completed
    if (index >= INTRODUCTION_PARAGRAPHS.length) {
      isSpeakingRef.current = false
      setIsSpeaking(false)
      setIsCompleted(true)
      // Retain the final subtitle briefly for 3s, then close
      speechTimeoutRef.current = setTimeout(() => {
        setShowSubtitles(false)
      }, 3000)
      return
    }

    setActiveParagraph(index)

    // Check Web Speech API support
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // Fallback for browsers without speech synthesis
      speechTimeoutRef.current = setTimeout(() => {
        if (isSpeakingRef.current) speakParagraph(index + 1)
      }, 3600)
      return
    }

    // Cancel any overlapping utterance
    window.speechSynthesis.cancel()

    const textToSpeak = INTRODUCTION_PARAGRAPHS[index]
    const utterance = new SpeechSynthesisUtterance(textToSpeak)

    // Select natural, professional English voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice =
      voices.find(
        (v) =>
          (v.lang === 'en-US' || v.lang.startsWith('en')) &&
          (v.name.includes('Google') ||
            v.name.includes('Natural') ||
            v.name.includes('Samantha') ||
            v.name.includes('David') ||
            v.name.includes('Daniel') ||
            v.name.includes('Guy'))
      ) || voices.find((v) => v.lang.startsWith('en')) || voices[0]

    if (preferredVoice) utterance.voice = preferredVoice
    utterance.rate = 0.98
    utterance.pitch = 1.0

    utterance.onend = () => {
      if (!isSpeakingRef.current) return
      // Natural pause between paragraphs
      speechTimeoutRef.current = setTimeout(() => {
        if (isSpeakingRef.current) {
          speakParagraph(index + 1)
        }
      }, 350)
    }

    utterance.onerror = () => {
      if (!isSpeakingRef.current) return
      // Gracefully advance to next paragraph if speech event errors
      speechTimeoutRef.current = setTimeout(() => {
        if (isSpeakingRef.current) speakParagraph(index + 1)
      }, 800)
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  // Toggle "Meet Me" button
  const toggleSpeech = useCallback(() => {
    if (isSpeaking) {
      stopSpeech()
    } else {
      stopSpeech()
      isSpeakingRef.current = true
      setIsSpeaking(true)
      setShowSubtitles(true)
      setIsCompleted(false)
      speakParagraph(0)
    }
  }, [isSpeaking, speakParagraph, stopSpeech])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative min-h-0 lg:landscape:min-h-screen flex items-center overflow-hidden bg-dark-900">
      <ParticleCanvas />

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-orange-500/8 blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,122,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-12 lg:pb-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — text & buttons (Preserved) */}
          <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-xl mx-auto md:max-w-none md:mx-0">
            <motion.div variants={item} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-orange-500" />
              <span className="font-mono text-xs text-orange-500 tracking-widest uppercase">
                Available for work
              </span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display font-black text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text glow-text">Satyam</span>
              <span className="text-white">.</span>
            </motion.h1>

            <motion.div variants={item} className="flex items-center gap-2 mb-6 h-10 sm:h-12">
              <span className="font-display font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl text-white/80">
                {typed}
              </span>
              <span className="typewriter-cursor" />
            </motion.div>

            <motion.p
              variants={item}
              className="text-white/50 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mb-8 sm:mb-10"
            >
              I build exceptional digital experiences with React.js — translating design into
              pixel-perfect, performant code. Based in Ahmedabad, India. 🇮🇳
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
              <a
                href="/resume.pdf"
                download="Satyam_Pal_Frontend_Resume.pdf"
                className="btn-ghost flex items-center gap-2"
              >
                <FiDownload size={16} />
                Download CV
              </a>
              <Link
                to="/contact"
                className={`btn-orange flex items-center gap-2 group transition-all duration-300 ${
                  isCompleted
                    ? 'ring-2 ring-orange-400/80 shadow-[0_0_25px_rgba(255,122,0,0.4)]'
                    : ''
                }`}
              >
                Get In Touch
                <FiArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>

            {/* Stats (Preserved) */}
            <motion.div variants={item} className="grid grid-cols-3 gap-2 sm:gap-6 max-w-sm sm:max-w-md">
              {[
                { num: '5+', label: 'Projects Built' },
                { num: '1+', label: 'Year Experience' },
                { num: '∞', label: 'Coffee Cups' },
              ].map(({ num, label }) => (
                <div key={label} className="text-left">
                  <p className="font-display font-black text-xl sm:text-2xl gradient-text">{num}</p>
                  <p className="text-white/40 text-[11px] sm:text-xs mt-0.5 leading-tight">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Cartoon Developer Character, Orbit & Meet Me Button */}
          <motion.div
            className="relative flex flex-col items-center justify-center w-full"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* 3D Character Area with Halo Orbit Rings */}
            <div className="relative flex items-center justify-center">
              {/* Rotating Dashed Orange Rings */}
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border border-dashed border-orange-500/15 animate-spin-slow pointer-events-none" />
              <div
                className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border border-orange-500/10 animate-spin-slow pointer-events-none"
                style={{ animationDirection: 'reverse', animationDuration: '14s' }}
              />

              {/* Orbital glowing dots */}
              {[0, 120, 240].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={{ rotate: [deg, deg + 360] }}
                  transition={{ duration: 12 + i * 3, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className="w-3 h-3 rounded-full bg-orange-500/70 shadow-[0_0_8px_rgba(255,122,0,0.6)]"
                    style={{ transform: 'translateX(clamp(115px, 14vw, 160px))' }}
                  />
                </motion.div>
              ))}

              {/* Animated 3D Cartoon Developer Boy */}
              <div className="relative z-10 flex items-center justify-center">
                <DeveloperAvatar3D isSpeaking={isSpeaking} />
              </div>

              {/* Floating Tech Badges */}
              <motion.div
                className="absolute -left-2 sm:-left-4 md:-left-4 lg:-left-8 top-8 sm:top-12 glass-orange rounded-2xl px-3 py-2 sm:px-4 sm:py-3 z-10 pointer-events-none"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 font-mono">Main Stack</p>
                <p className="text-xs sm:text-sm font-display font-bold text-orange-400">React.js</p>
              </motion.div>

              <motion.div
                className="absolute -right-2 sm:-right-4 md:-right-4 lg:-right-8 bottom-12 sm:bottom-16 glass rounded-2xl px-3 py-2 sm:px-4 sm:py-3 z-10 pointer-events-none"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 font-mono">Styling</p>
                <p className="text-xs sm:text-sm font-display font-bold text-white">Tailwind CSS</p>
              </motion.div>
            </div>

            {/* Meet Me Action Button */}
            <div className="relative z-20 mt-3 flex flex-col items-center">
              <motion.button
                onClick={toggleSpeech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full font-display font-semibold text-sm transition-all duration-300 flex items-center gap-2.5 shadow-lg ${
                  isSpeaking
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-orange-500/50 ring-2 ring-orange-400/60'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-orange-500/30'
                }`}
                aria-label={isSpeaking ? 'Stop speaking introduction' : 'Meet Me - Play voice introduction'}
              >
                {isSpeaking ? (
                  <>
                    {/* Animated sound-wave equalizer bars */}
                    <span className="flex items-center gap-1 h-3.5" aria-hidden="true">
                      <span className="w-1 bg-white rounded-full animate-[soundbar_0.8s_ease-in-out_infinite]" />
                      <span className="w-1 bg-white rounded-full animate-[soundbar_0.6s_ease-in-out_infinite_0.15s]" />
                      <span className="w-1 bg-white rounded-full animate-[soundbar_0.9s_ease-in-out_infinite_0.3s]" />
                      <span className="w-1 bg-white rounded-full animate-[soundbar_0.7s_ease-in-out_infinite_0.1s]" />
                    </span>
                    <span>Speaking...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs">▶</span>
                    <span>Meet Me</span>
                  </>
                )}
              </motion.button>

              {/* Subtitles Area */}
              <AnimatePresence>
                {showSubtitles && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-sm sm:max-w-md mt-4 p-4 rounded-2xl glass-orange border border-orange-500/30 backdrop-blur-xl shadow-2xl relative z-30"
                  >
                    {/* Subtitle Header with Status Indicator */}
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSpeaking ? 'bg-orange-500 animate-ping' : 'bg-green-400'
                          }`}
                        />
                        <span className="text-[11px] font-mono font-semibold text-orange-400 uppercase tracking-wider">
                          {isSpeaking ? 'Satyam Speaking' : 'Introduction Complete'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-white/50">
                        {activeParagraph + 1} / {INTRODUCTION_PARAGRAPHS.length}
                      </span>
                    </div>

                    {/* Active Paragraph Text */}
                    <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-body transition-all duration-300">
                      {INTRODUCTION_PARAGRAPHS[activeParagraph]}
                    </p>

                    {/* Sound Waves & Stop Control while Speaking */}
                    {isSpeaking && (
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-[11px] text-white/50 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1 h-2.5 bg-orange-400 rounded-full animate-[soundbar_0.8s_ease-in-out_infinite]" />
                          <span className="w-1 h-3.5 bg-orange-500 rounded-full animate-[soundbar_0.6s_ease-in-out_infinite_0.2s]" />
                          <span className="w-1 h-2 bg-orange-400 rounded-full animate-[soundbar_0.9s_ease-in-out_infinite_0.4s]" />
                          <span className="text-orange-400 text-[10px] ml-1">Live Voice Sync</span>
                        </div>
                        <button
                          onClick={stopSpeech}
                          className="text-white/60 hover:text-orange-400 transition-colors text-[10px] uppercase tracking-wider"
                          aria-label="Stop audio introduction"
                        >
                          Stop [✕]
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint (Preserved) */}
        <motion.div
          className="relative mt-8 sm:mt-10 mx-auto lg:mx-0 lg:mt-0 lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center gap-2 w-fit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-white/20 text-xs font-mono tracking-widest uppercase">Scroll</p>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-orange-500/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  )
}

