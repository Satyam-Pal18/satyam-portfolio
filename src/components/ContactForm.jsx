import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiCheck, FiLoader, FiAlertCircle } from 'react-icons/fi'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('')
  const resetTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  const handleChange = (e) => {
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const apiKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    const isPlaceholder =
      !apiKey ||
      apiKey.trim() === '' ||
      apiKey.toLowerCase().includes('your_') ||
      apiKey.toLowerCase().includes('placeholder') ||
      apiKey === 'YOUR_WEB3FORMS_ACCESS_KEY'

    if (isPlaceholder) {
      setStatus('error')
      setErrorMessage('Contact form service is not yet configured with a valid API key. Please contact me directly via email.')
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Inquiry from ${form.name}`,
          from_name: 'Satyam Portfolio',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        resetTimerRef.current = setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Unable to send message. Please try again.')
      }
    } catch (err) {
      console.error('Email submit error:', err)
      setStatus('error')
      setErrorMessage('Network connection error. Please try again or reach out directly.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-describedby={status === 'error' ? 'contact-form-error' : undefined}>
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="text-xs font-mono text-white/70 uppercase tracking-widest block mb-2"
        >
          Your Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your Name"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-white/40 text-sm font-body outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all duration-300"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="text-xs font-mono text-white/70 uppercase tracking-widest block mb-2"
        >
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="hello@example.com"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-white/40 text-sm font-body outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all duration-300"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="text-xs font-mono text-white/70 uppercase tracking-widest block mb-2"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell me about your project..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-white/40 text-sm font-body outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all duration-300 resize-none appearance-none"
        />
      </div>

      {/* Live Region for Screen Readers */}
      <div className="sr-only" role="status" aria-live="polite">
        {status === 'sending' && 'Sending message, please wait.'}
        {status === 'sent' && 'Message sent successfully. Satyam will respond within 24 hours.'}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        aria-busy={status === 'sending'}
        className={`w-full py-4 rounded-2xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
          status === 'sent'
            ? 'bg-green-500/20 border border-green-500/30 text-green-400'
            : status === 'error'
            ? 'bg-red-500/20 border border-red-500/30 text-red-400'
            : 'btn-orange'
        }`}
        whileHover={status === 'idle' || status === 'error' ? { scale: 1.01 } : {}}
        whileTap={status === 'idle' || status === 'error' ? { scale: 0.98 } : {}}
      >
        {status === 'idle' && <><FiSend size={15} /> Send Message</>}
        {status === 'sending' && (
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <FiLoader size={15} />
          </motion.span>
        )}
        {status === 'sent' && <><FiCheck size={15} /> Message Sent!</>}
        {status === 'error' && <><FiAlertCircle size={15} /> Try Again</>}
      </motion.button>

      {status === 'sent' && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          aria-live="polite"
          className="text-center text-green-400/90 text-xs font-mono"
        >
          Thanks! I'll get back to you within 24 hours.
        </motion.p>
      )}

      {status === 'error' && (
        <motion.div
          id="contact-form-error"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          aria-live="assertive"
          className="text-center text-xs font-mono space-y-1.5 pt-1"
        >
          <p className="text-red-400/90 flex items-center justify-center gap-1.5">
            <FiAlertCircle size={13} className="shrink-0" />
            {errorMessage || 'Failed to send message.'}
          </p>
          <p className="text-white/60">
            Or reach out directly at{' '}
            <a
              href="mailto:satyampal426@gmail.com"
              className="text-orange-400 underline hover:text-orange-300 transition-colors"
            >
              satyampal426@gmail.com
            </a>
          </p>
        </motion.div>
      )}
    </form>
  )
}
