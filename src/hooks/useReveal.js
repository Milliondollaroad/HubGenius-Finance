// src/hooks/useReveal.js
// Adds 'visible' class to elements with .reveal when they enter viewport
// Usage: useReveal() — call once in App or per page

import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const els = document.querySelectorAll(
      '.reveal, .reveal-fade, .reveal-scale'
    )
    els.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

// Counter animation hook
export function useCounter(ref, end, duration = 1200) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      let start = 0
      const step = end / (duration / 16)
      const isFloat = String(end).includes('.')
      const timer = setInterval(() => {
        start += step
        if (start >= end) {
          start = end
          clearInterval(timer)
        }
        el.textContent = isFloat ? start.toFixed(1) : Math.floor(start).toLocaleString()
      }, 16)
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, end, duration])
}
