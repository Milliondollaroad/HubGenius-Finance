import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('hg_disclaimer_v1')
    if (!seen) setVisible(true)
  }, [])

  const dismiss = () => {
    localStorage.setItem('hg_disclaimer_v1', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="complementary"
      aria-label="Risk disclaimer"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 9999,
        background: 'rgba(10,22,40,0.97)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(154,123,46,0.4)',
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      }}
    >
      <span style={{ fontSize: 13, flexShrink: 0 }}>⚠️</span>
      <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.55)', flex: 1, lineHeight: 1.6, minWidth: 240 }}>
        <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Risk Warning:</strong>{' '}
        Trading crypto assets involves significant risk of loss. AI signals and bot outputs are for informational purposes only — not financial advice. Past performance does not guarantee future results.{' '}
        <Link to="/legal" style={{ color: 'var(--gold3)', textDecoration: 'none', fontFamily: 'Source Code Pro, monospace', fontSize: 10 }}>
          Full disclaimer →
        </Link>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss disclaimer"
        style={{
          background: 'transparent',
          border: '1px solid rgba(154,123,46,0.4)',
          borderRadius: 2,
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          fontSize: 11,
          padding: '6px 16px',
          flexShrink: 0,
          fontFamily: 'Source Code Pro, monospace',
          letterSpacing: '.5px',
        }}
        onMouseEnter={e => e.target.style.borderColor = 'var(--gold3)'}
        onMouseLeave={e => e.target.style.borderColor = 'rgba(154,123,46,0.4)'}
      >
        I understand
      </button>
    </div>
  )
}
