import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const links = [
  { to: '/',         label: 'Overview'        },
  { to: '/terminal', label: 'Terminal'        },
  { to: '/bot',      label: 'Bot performance' },
  { to: '/pricing',  label: 'Pricing'         },
]

const NAV_STYLES = `
  .nav-link {
    padding: 8px 14px;
    font-size: 12px;
    color: var(--text2);
    font-family: 'Source Sans 3', sans-serif;
    font-weight: 500;
    letter-spacing: .3px;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    display: inline-block;
    transition: color 0.2s, border-color 0.2s;
  }
  .nav-link:hover { color: var(--navy); }
  .nav-link.active { color: var(--navy); font-weight: 600; border-bottom-color: var(--gold2); }
  .nav-cta {
    background: var(--navy);
    color: var(--gold3);
    border: none;
    padding: 8px 18px;
    font-size: 11px;
    font-family: 'Source Sans 3', sans-serif;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: .5px;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }
  .nav-cta::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212,170,58,0.15) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .nav-cta:hover { background: var(--navy2); box-shadow: 0 4px 16px rgba(10,22,40,0.3); }
  .nav-cta:hover::after { opacity: 1; }
  .nav-cta:active { transform: scale(0.97); }
`

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      background: 'var(--white)',
      borderBottom: '2px solid var(--gold2)',
      padding: '0 24px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 1px 8px rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.3s ease',
    }}>
      <style dangerouslySetInnerHTML={{ __html: NAV_STYLES }} />

      {/* Brand */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32,
          background: 'var(--navy)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--navy2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
        >
          <div style={{
            width: 18, height: 18,
            border: '1.5px solid var(--gold3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Source Code Pro, monospace',
            fontSize: 7, color: 'var(--gold3)', fontWeight: 500,
          }}>HG</div>
        </div>
        <div style={{ borderLeft: '2px solid var(--gold2)', paddingLeft: 10 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.1 }}>HubGenius Finance</div>
          <div className="hide-mobile" style={{ fontSize: 8, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2 }}>EST. 2026 · TORONTO</div>
        </div>
      </Link>

      {/* Nav links */}
      <div className="hide-mobile" style={{ display: 'flex', gap: 2 }}>
        {links.map(({ to, label }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={`nav-link${active ? ' active' : ''}`}
            >{label}</Link>
          )
        })}
      </div>

      {/* CTA */}
      <Link to="/pricing" style={{ textDecoration: 'none' }}>
        <button className="nav-cta">Upgrade to Pro</button>
      </Link>
    </nav>
  )
}
