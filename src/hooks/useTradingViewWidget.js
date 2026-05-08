// Lazy-loads TradingView widget script only when the chart container
// enters the viewport. Prevents TradingView from blocking initial page paint.
//
// Usage:
//   const containerRef = useTradingViewWidget({ symbol: 'BINANCE:BTCUSDT' })
//   return <div ref={containerRef} style={{ height: 400 }} />

import { useEffect, useRef } from 'react'

const TV_SCRIPT_URL = 'https://s3.tradingview.com/tv.js'
let scriptLoaded = false
let scriptLoading = false
const callbacks = []

function loadTVScript(onLoad) {
  if (scriptLoaded) { onLoad(); return }
  callbacks.push(onLoad)
  if (scriptLoading) return
  scriptLoading = true
  const script = document.createElement('script')
  script.src = TV_SCRIPT_URL
  script.async = true
  script.onload = () => {
    scriptLoaded = true
    scriptLoading = false
    callbacks.forEach(cb => cb())
    callbacks.length = 0
  }
  document.head.appendChild(script)
}

export function useTradingViewWidget({
  symbol = 'BINANCE:BTCUSDT',
  interval = 'D',
  theme = 'light',
  height = 400,
  autosize = true,
} = {}) {
  const containerRef = useRef(null)
  const widgetRef    = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      observer.disconnect()

      loadTVScript(() => {
        if (!window.TradingView || widgetRef.current) return
        const id = `tv_${Math.random().toString(36).slice(2, 9)}`
        container.id = id
        widgetRef.current = new window.TradingView.widget({
          container_id: id,
          symbol, interval, theme,
          style: '1', locale: 'en',
          enable_publishing: false,
          allow_symbol_change: true,
          autosize,
          height: autosize ? undefined : height,
          save_image: false,
        })
      })
    }, { rootMargin: '200px' })

    observer.observe(container)
    return () => { observer.disconnect(); widgetRef.current = null }
  }, [symbol, interval, theme, height, autosize])

  return containerRef
}

export function TradingViewChart({ symbol, interval, theme = 'light', height = 400, style = {} }) {
  const ref = useTradingViewWidget({ symbol, interval, theme, height })
  return (
    <div
      ref={ref}
      style={{ width: '100%', height, ...style }}
      aria-label={`TradingView chart for ${symbol}`}
      role="img"
    />
  )
}
