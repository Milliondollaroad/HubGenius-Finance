import { useState, useEffect } from 'react'

export default function TopBar() {
  const [clocks, setClocks] = useState('')

  useEffect(() => {
    const update = () => {
      const ny = new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })
      const ld = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London',   hour: '2-digit', minute: '2-digit' })
      const tk = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo',      hour: '2-digit', minute: '2-digit' })
      setClocks(`New York: ${ny}  ·  London: ${ld}  ·  Tokyo: ${tk}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ background: 'var(--navy)', padding: '6px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {[
          ['Markets open', true],
          ['BTC $104,230', false],
          ['ETH $3,847', false],
          ['F&G 72 — Greed', false],
          ['DXY 99.84 ▼', false],
        ].map(([label, isLive], i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,.15)', display: 'inline-block' }} />}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>
              {isLive && <span className="live-dot" />}
              {label}
            </span>
          </span>
        ))}
      </div>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>
        {clocks}
      </span>
    </div>
  )
}
