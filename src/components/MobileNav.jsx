import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/',          icon: '⌂', label: 'Home'      },
  { to: '/terminal',  icon: '◈', label: 'Terminal'  },
  { to: '/bot',       icon: '◎', label: 'Bot'       },
  { to: '/pricing',   icon: '◇', label: 'Pricing'   },
]

export default function MobileNav() {
  const { pathname } = useLocation()

  return (
    <nav style={{
      display: 'none',
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      height: 64,
      background: 'var(--navy)',
      borderTop: '2px solid var(--gold2)',
      zIndex: 200,
      gridTemplateColumns: 'repeat(4,1fr)',
    }} className="mobile-nav">
      {tabs.map(({ to, icon, label }) => {
        const active = pathname === to
        return (
          <Link key={to} to={to} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 3, textDecoration: 'none',
            background: 'transparent', border: 'none',
            borderTop: active ? '2px solid var(--gold2)' : '2px solid transparent',
            padding: '8px 0',
          }}>
            <span style={{
              fontSize: 20,
              color: active ? 'var(--gold3)' : 'rgba(255,255,255,.4)',
              fontFamily: 'Source Code Pro, monospace',
              lineHeight: 1
            }}>{icon}</span>
            <span style={{
              fontSize: 9,
              color: active ? 'var(--gold3)' : 'rgba(255,255,255,.4)',
              fontFamily: 'Source Code Pro, monospace',
              letterSpacing: 1,
              textTransform: 'uppercase'
            }}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
