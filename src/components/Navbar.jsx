import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/',          label: 'Overview'        },
  { to: '/terminal',  label: 'Terminal'        },
  { to: '/bot',       label: 'Bot performance' },
  { to: '/pricing',   label: 'Pricing'         },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav style={{
      background: 'var(--white)', borderBottom: '2px solid var(--gold2)',
      padding: '0 32px', height: 60, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 1px 8px rgba(0,0,0,.06)'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
        <div style={{ width: 36, height: 36, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 20, height: 20, border: '1.5px solid var(--gold3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Source Code Pro, monospace', fontSize: 7, color: 'var(--gold3)', fontWeight: 500, letterSpacing: '.5px' }}>HG</div>
        </div>
        <div style={{ borderLeft: '2px solid var(--gold2)', paddingLeft: 12 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, color: 'var(--navy)', letterSpacing: '.5px', lineHeight: 1.1 }}>HubGenius Finance</div>
          <div style={{ fontSize: 9, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3 }}>EST. 2026 · TORONTO</div>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: 2 }}>
        {links.map(({ to, label }) => {
          const active = pathname === to
          return (
            <Link key={to} to={to} style={{
              background: 'transparent', border: 'none',
              color: active ? 'var(--navy)' : 'var(--text2)',
              padding: '8px 16px', fontSize: 12,
              fontFamily: 'Source Sans 3, sans-serif', fontWeight: active ? 600 : 500,
              letterSpacing: '.3px', textDecoration: 'none',
              borderBottom: active ? '2px solid var(--gold2)' : '2px solid transparent',
              marginBottom: -2, display: 'inline-block'
            }}>{label}</Link>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, color: 'var(--text3)', border: '1px solid var(--border2)', padding: '4px 10px', background: 'var(--off)' }}>
          FREE ACCOUNT
        </span>
        <Link to="/pricing">
          <button className="btn-navy" style={{ padding: '7px 18px', fontSize: 11 }}>Upgrade to Pro</button>
        </Link>
      </div>
    </nav>
  )
}
