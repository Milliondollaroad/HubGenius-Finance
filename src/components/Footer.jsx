export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, alignItems: 'start' }}>
      <div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: 'var(--white)', fontWeight: 600 }}>HubGenius Finance</div>
        <div style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, marginTop: 2 }}>HUBGENIUS.FINANCE</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', fontFamily: 'Source Code Pro, monospace', marginTop: 8 }}>© 2026 HubGenius Inc. Toronto, Canada</div>
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', lineHeight: 1.6, textAlign: 'center' }}>
        Market data and AI-generated signals are provided for informational purposes only and do not constitute financial advice. Trading derivatives involves substantial risk of loss. Never invest capital you cannot afford to lose. HubGenius Finance is not a registered investment adviser.
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        {['Terms of Service', 'Privacy Policy', 'Risk Disclaimer', 'Contact'].map(l => (
          <span key={l} style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', fontFamily: 'Source Sans 3, sans-serif', cursor: 'pointer', letterSpacing: '.5px' }}
            onMouseEnter={e => e.target.style.color = 'var(--gold3)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.4)'}
          >{l}</span>
        ))}
      </div>
    </footer>
  )
}
