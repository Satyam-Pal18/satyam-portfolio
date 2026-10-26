// src/pages/Resume.jsx
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import { FiDownload, FiExternalLink } from 'react-icons/fi'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function Resume() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Header */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 bg-dark-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/4 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div>
              <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-4">Resume</p>
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl">
                My <span className="gradient-text">CV</span>
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                download="Satyam_Pal_Frontend_Resume.pdf"
                className="btn-orange flex items-center gap-2 text-sm"
              >
                <FiDownload size={15} />
                Download PDF
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-2 text-sm"
              >
                <FiExternalLink size={15} />
                Open
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Resume card */}
      <section className="pb-20 sm:pb-24 bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="glass rounded-2xl sm:rounded-3xl border border-white/5 overflow-hidden">
              {/* Resume header */}
              <div className="bg-gradient-to-r from-orange-500/10 to-transparent border-b border-white/5 p-6 sm:p-10 md:p-14">
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-1">Satyam Pal</h2>
                <p className="text-orange-400 font-body text-base sm:text-lg mb-4">Frontend Developer</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/50 text-xs sm:text-sm font-mono">
                  <span>+91 79849 33274</span>
                  <span>·</span>
                  <span>satyampal426@gmail.com</span>
                  <span>·</span>
                  <span>Ahmedabad, Gujarat</span>
                  <span>·</span>
                  <a
                    href="https://linkedin.com/in/satyam-pal-a68822254"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors"
                  >
                    linkedin.com/in/satyam-pal-a68822254
                  </a>
                  <span>·</span>
                  <a
                    href="https://github.com/Satyam-Pal18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors"
                  >
                    github.com/satyam-Pal18
                  </a>
                </div>
              </div>

              <div className="p-6 sm:p-10 md:p-14 grid md:grid-cols-3 gap-8 md:gap-12">
                {/* Left column */}
                <div className="md:col-span-1 space-y-10">
                  {/* Technical Skills */}
                  <div>
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5 section-title">
                      Technical Skills
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-mono text-orange-400 mb-2 font-semibold">Frontend</p>
                        <div className="space-y-1.5">
                          {[
                            'React.js',
                            'JavaScript (ES6+)',
                            'HTML5 / CSS3',
                            'Tailwind CSS',
                            'Bootstrap',
                            'Redux Toolkit',
                            'Framer Motion',
                          ].map(s => (
                            <div key={s} className="flex items-center gap-2 text-xs text-white/65">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-mono text-orange-400 mb-2 font-semibold">Backend & Database</p>
                        <div className="space-y-1.5">
                          {['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'MySQL / SQL'].map(s => (
                            <div key={s} className="flex items-center gap-2 text-xs text-white/65">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-mono text-orange-400 mb-2 font-semibold">Tools & AI</p>
                        <div className="space-y-1.5">
                          {[
                            'Git & GitHub',
                            'VS Code & Postman',
                            'Figma',
                            'ChatGPT, Claude, Cursor, Gemini',
                          ].map(s => (
                            <div key={s} className="flex items-center gap-2 text-xs text-white/65">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5 section-title">
                      Languages
                    </h3>
                    <div className="space-y-2 text-sm text-white/60">
                      <div className="flex justify-between"><span>English</span><span className="text-orange-400">Proficient</span></div>
                      <div className="flex justify-between"><span>Hindi</span><span className="text-orange-400">Native</span></div>
                      <div className="flex justify-between"><span>Gujarati</span><span className="text-orange-400">Native</span></div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5 section-title">
                      Achievements
                    </h3>
                    <div className="space-y-3">
                      <div className="glass p-3.5 rounded-xl border border-white/5">
                        <p className="text-xs font-semibold text-white">Hackathon Winner</p>
                        <p className="text-[11px] text-orange-400 font-mono mt-0.5">Excelsior AI Hackathon ’26</p>
                        <p className="text-[10px] text-white/40 mt-1">Excelsior Technologies · 08 August 2026</p>
                      </div>
                      <div className="glass p-3.5 rounded-xl border border-white/5">
                        <p className="text-xs font-semibold text-white">3rd Rank Winner</p>
                        <p className="text-[11px] text-orange-400 font-mono mt-0.5">24h Hackathon - 2023</p>
                        <p className="text-[10px] text-white/40 mt-1">B.H Gardi College Of Eng. & Tech.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="md:col-span-2 space-y-10">
                  {/* Professional Summary */}
                  <div>
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4 section-title">
                      Professional Summary
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Frontend Developer with 1+ year of professional experience building responsive, production-ready web applications using React.js, JavaScript, Tailwind CSS, HTML5, CSS3, and REST APIs. Experienced in developing admin dashboards, healthcare management systems, reusable UI components, API integrations, and responsive user interfaces. Hands-on knowledge of Node.js, Express.js, MySQL, authentication, and form validation. Proficient in leveraging AI-assisted development tools for efficient development, debugging, and problem-solving.
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-6 section-title">
                      Experience
                    </h3>
                    <div className="space-y-7">
                      <div className="border-l-2 border-orange-500/30 pl-5">
                        <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                          <p className="font-display font-bold text-white">Frontend Developer</p>
                          <span className="text-xs font-mono text-white/40">Jul 2025 - Oct 2026</span>
                        </div>
                        <p className="text-orange-400 text-xs font-mono mb-2">Excelsior Technologies</p>
                        <ul className="space-y-1.5">
                          {[
                            'Developed reusable React.js components and responsive interfaces for production applications.',
                            'Integrated REST APIs and implemented dynamic, data-driven application modules.',
                            'Converted Figma designs into responsive and pixel-accurate interfaces.',
                            'Collaborated with developers and cross-functional teams to develop, debug, test, and improve features.',
                            'Used AI-assisted tools including ChatGPT, Claude, Cursor, and Gemini for development and debugging.',
                          ].map(b => (
                            <li key={b} className="text-white/50 text-sm flex gap-2 leading-relaxed">
                              <span className="text-orange-500 mt-1">›</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-l-2 border-orange-500/20 pl-5">
                        <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                          <p className="font-display font-bold text-white">Trainee Frontend Developer</p>
                          <span className="text-xs font-mono text-white/40">Jan 2025 - Jun 2025</span>
                        </div>
                        <p className="text-orange-400 text-xs font-mono mb-2">QSpiders Training Institute</p>
                        <ul className="space-y-1.5">
                          {[
                            'Built frontend applications using React.js, JavaScript, HTML, CSS, and REST APIs.',
                            'Developed responsive interfaces and reusable components through project-based development.',
                          ].map(b => (
                            <li key={b} className="text-white/50 text-sm flex gap-2 leading-relaxed">
                              <span className="text-orange-500 mt-1">›</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-6 section-title">
                      Education
                    </h3>
                    <div className="border-l-2 border-cyan-500/30 pl-5">
                      <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                        <p className="font-display font-bold text-white">Bachelor of Engineering - Information Technology</p>
                        <span className="text-xs font-mono text-white/40">2021 - 2025</span>
                      </div>
                      <p className="text-cyan-400 text-xs font-mono">B.H Gardi College Of Engineering & Technology, GTU</p>
                    </div>
                  </div>

                  {/* Key Projects */}
                  <div>
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-6 section-title">
                      Key Projects
                    </h3>
                    <div className="space-y-4">
                      <div className="glass rounded-xl p-5 border border-white/5">
                        <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                          <p className="font-display font-semibold text-white text-base">Physiotherapy Management Platform (PMP)</p>
                          <span className="text-xs font-mono text-orange-400">React.js · TailwindCSS · Node.js · Express.js · MySQL · REST APIs</span>
                        </div>
                        <ul className="space-y-1.5 text-white/50 text-xs">
                          <li className="flex gap-2">
                            <span className="text-orange-500 mt-0.5">›</span>
                            <span>Contributed to a production healthcare platform covering patients, therapists, appointments, exercises, services, clinics, and reports.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-orange-500 mt-0.5">›</span>
                            <span>Developed role-based modules for Super Admin, Admin, Staff, and Patient.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-orange-500 mt-0.5">›</span>
                            <span>Integrated REST APIs for patient management, appointments, therapist slots, services, earnings, and reports.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-orange-500 mt-0.5">›</span>
                            <span>Implemented forms, validation, authentication flows, pagination, permissions, and responsive UI.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl p-5 border border-white/5">
                        <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                          <p className="font-display font-semibold text-white text-base">Suxnix - Supplement E-Commerce Platform</p>
                          <span className="text-xs font-mono text-orange-400">React.js</span>
                        </div>
                        <ul className="space-y-1.5 text-white/50 text-xs">
                          <li className="flex gap-2">
                            <span className="text-orange-500 mt-0.5">›</span>
                            <span>Built product listing, category filtering, shopping cart, reusable components, and responsive layouts.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Download CTA */}
          <FadeUp delay={0.2} className="text-center mt-10">
            <p className="text-white/30 text-sm mb-4 font-mono">Want the full PDF version?</p>
            <a href="/resume.pdf" download="Satyam_Pal_Frontend_Resume.pdf" className="btn-orange inline-flex items-center gap-2">
              <FiDownload size={15} />
              Download Resume PDF
            </a>
          </FadeUp>
        </div>
      </section>
    </motion.div>
  )
}
