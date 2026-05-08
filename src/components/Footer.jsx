import { Link } from 'react-router-dom'
import DisclaimerBanner from './DisclaimerBanner'

const links = [
  { label: 'Terms of Service', to: '/terms'   },
  { label: 'Privacy Policy',   to: '/privacy' },
  { label: 'Risk Disclaimer',  to: '/legal'   },
  { label: 'Contact',          to: '/contact' },
]

export default function Footer() {
  return (
    <>
    <footer style={{
      background: 'var(--navy)', padding: '28px 32px',
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      gap: 20, alignItems: 'start'
    }} className="site-footer">

      <div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: 'var(--white)', fontWeight: 600 }}>HubGenius Finance</div>
        <div style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, marginTop: 2 }}>HUBGENIUS.FINANCE</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', fontFamily: 'Source Code Pro, monospace', marginTop: 8 }}>© 2026 HubGenius Inc. Toronto, Ontario M8Z 0G5, Canada</div>
      </div>

      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', lineHeight: 1.6, textAlign: 'center' }}>
        Market data and AI-generated signals are for{' '}
        <strong style={{ color: 'rgba(255,255,255,.5)' }}>informational purposes only</strong>{' '}
        and do not constitute financial advice. Trading involves substantial risk of loss.
        <div style={{ marginTop: 8 }}>
          <Link to="/legal" style={{ color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', fontSize: 9, letterSpacing: 1, textDecoration: 'none' }}>
            Read full risk disclaimer →
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {links.map(l => (
          <Link key={l.label} to={l.to} style={{
            fontSize: 10, color: 'rgba(255,255,255,.4)',
            fontFamily: 'Source Sans 3, sans-serif',
            cursor: 'pointer', letterSpacing: '.5px', textDecoration: 'none'
          }}
            onMouseEnter={e => e.target.style.color = 'var(--gold3)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.4)'}
          >{l.label}</Link>
        ))}
      </div>
    </footer>
    <DisclaimerBanner />
    </>
  )
}
