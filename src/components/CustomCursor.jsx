// src/components/CustomCursor.jsx
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only enable custom cursor if device supports fine pointer (mouse / trackpad)
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100, mouseY = -100
    let ringX  = -100, ringY  = -100
    let isVisible = false
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        ringX = mouseX
        ringY = mouseY
        dot.style.opacity = '1'
        ring.style.opacity = '1'
        document.body.classList.add('custom-cursor-active')
      }

      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-hover], input, textarea, select')) {
        ring.classList.add('hovered')
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-hover], input, textarea, select')) {
        ring.classList.remove('hovered')
      }
    }

    const onMouseLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      isVisible = false
      document.body.classList.remove('custom-cursor-active')
    }

    const onMouseEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
      isVisible = true
      document.body.classList.add('custom-cursor-active')
    }

    const animate = () => {
      if (isVisible) {
        ringX += (mouseX - ringX) * 0.12
        ringY += (mouseY - ringY) * 0.12
        ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
      />
    </>
  )
}
