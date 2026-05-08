import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import { useReveal } from '../hooks/useReveal'

const features = [
  { n: '01', t: 'AI Signal Engine',        d: 'Claude AI analyzes 13 data sources every 5 minutes — delivers Buy, Sell, or Wait with entry, stop loss, and take profit levels.' },
  { n: '02', t: 'TradingView Charts',      d: 'Professional-grade candlestick charts embedded directly. RSI, MACD, Bollinger Bands. All assets. All timeframes.' },
  { n: '03', t: 'Live News Intelligence',  d: 'Bloomberg, Reuters, CoinDesk, The Block — aggregated and sentiment-scored in real time. Pro gets live, free gets 30-minute delay.' },
  { n: '04', t: 'Market Signals from X',   d: '@elonmusk, @realDonaldTrump, @zerohedge, @truflation, @eWhispers, @WatcherGuru and 7 more — monitored and scored continuously.' },
  { n: '05', t: 'Autonomous Bot',          d: 'Deploys on Hyperliquid DEX 24/7. Reads all signals, manages risk strictly, logs every trade. Non-custodial — your funds, your keys.' },
  { n: '06', t: 'Airdrop Farming',         d: 'Bot activity on Aster, ApeX and Paradex accumulates points passively. Trade and farm simultaneously — two revenue streams at once.' },
]

const trust = [
  ['Non-custodial',    'Your keys, your funds'],
  ['Testnet first',    'Validate before risking capital'],
  ['Open performance', 'Full bot P&L published publicly'],
  ['No hidden fees',   'Transparent pricing always'],
]

const stats = [
  { val: 4,    suffix: '',   label: 'Asset classes'      },
  { val: 13,   suffix: '',   label: 'Signal sources'     },
  { val: 24,   suffix: '/7', label: 'Autonomous trading' },
  { val: 0,    suffix: '$',  label: 'To start', prefix: '$' },
]

function StatCounter({ val, suffix, prefix, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || val === 0) { if (el) el.textContent = prefix ? `${prefix}${val}` : `${val}${suffix}`; return }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let cur = 0
      const step = val / 40
      const t = setInterval(() => {
        cur += step
        if (cur >= val) { cur = val; clearInterval(t) }
        el.textContent = prefix ? `${prefix}${Math.floor(cur)}` : `${Math.floor(cur)}${suffix}`
      }, 30)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [val, suffix, prefix])

  return (
    <div style={{ padding: '22px 24px', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
      <div ref={ref} style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 600, color: 'var(--navy)', lineHeight: 1 }}>
        {prefix ? `${prefix}${val}` : `${val}${suffix}`}
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, marginTop: 6, textTransform: 'uppercase' }}>{label}</div>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  useReveal()

  const join = () => {
    if (email && email.includes('@')) { setJoined(true); setEmail('') }
  }

  return (
    <div className="page-enter">
      {/* Scanline effect */}
      <div className="scanline" />

      {/* ── Hero ── */}
      <div style={{ background: 'var(--navy)', padding: '80px 32px 64px', position: 'relative', overflow: 'hidden' }} className="grid-bg">
        {/* Radial glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(184,149,46,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>

          {/* Eyebrow */}
          <div className="hero-line hero-line-1" style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold3))' }} />
            <span style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3 }}>INSTITUTIONAL-GRADE INTELLIGENCE</span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, var(--gold3), transparent)' }} />
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 52, fontWeight: 600, color: 'var(--white)', lineHeight: 1.12, marginBottom: 20 }}>
            <span className="hero-line hero-line-2" style={{ display: 'block' }}>Where Wall Street</span>
            <span className="hero-line hero-line-3" style={{ display: 'block' }}>meets <em style={{ color: 'var(--gold3)' }}>decentralised</em></span>
            <span className="hero-line hero-line-4" style={{ display: 'block' }}><em style={{ color: 'var(--gold3)' }}>finance</em></span>
          </h1>

          <p className="hero-line hero-line-5" style={{ fontSize: 15, color: 'rgba(255,255,255,.6)', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.8, fontWeight: 300 }}>
            Real-time macro intelligence, AI-powered trade signals, and an autonomous bot trading Hyperliquid 24/7 — built for serious traders who demand institutional quality.
          </p>

          {/* CTAs */}
          <div className="hero-line hero-line-5" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/terminal')}
              className="btn-press"
              style={{
                background: 'var(--gold3)', color: 'var(--navy)', border: 'none',
                padding: '13px 28px', fontSize: 12, fontFamily: 'Source Sans 3, sans-serif',
                fontWeight: 700, cursor: 'pointer', letterSpacing: '.5px',
                transition: 'background 0.2s, transform 0.12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e8c240'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold3)'}
            >
              Open terminal →
            </button>
            <button
              onClick={() => navigate('/bot')}
              className="btn-press"
              style={{
                background: 'transparent', color: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(255,255,255,0.2)', padding: '13px 28px',
                fontSize: 12, fontFamily: 'Source Sans 3, sans-serif',
                fontWeight: 500, cursor: 'pointer', letterSpacing: '.5px',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold3)'; e.currentTarget.style.color = 'var(--gold3)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
            >
              View bot performance
            </button>
          </div>

          <div className="hero-line hero-line-5" style={{ fontSize: 10, color: 'rgba(255,255,255,.2)', marginTop: 28, fontFamily: 'Source Code Pro, monospace' }}>
            Market data and AI signals for informational purposes only. Past performance does not guarantee future results.
          </div>
        </div>
      </div>

      {/* ── Stats band ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '3px solid var(--gold2)', background: 'var(--off)' }} className="stats-band">
        {stats.map(s => <StatCounter key={s.label} {...s} />)}
      </div>

      <div className="section-divider" />

      {/* ── Features ── */}
      <div style={{ padding: '60px 32px' }}>
        <div className="reveal">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 24, height: 2, background: 'var(--gold2)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>What we provide</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>Institutional intelligence. Accessible price.</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 36, maxWidth: 520, lineHeight: 1.8 }}>Bloomberg Terminal costs $24,000/year. HubGenius Finance delivers the same quality of macro intelligence, news aggregation, and AI-powered signals — starting at $0.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 1, background: 'var(--border)' }} className="features">
          {features.map((f, i) => (
            <div
              key={f.n}
              className={`reveal reveal-d${(i % 3) + 1} card-lift`}
              style={{
                background: hoveredFeature === i ? 'var(--gold-light)' : 'var(--white)',
                padding: '28px 24px',
                borderTop: '3px solid transparent',
                cursor: 'default',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { setHoveredFeature(i); e.currentTarget.style.borderTopColor = 'var(--gold2)' }}
              onMouseLeave={e => { setHoveredFeature(null); e.currentTarget.style.borderTopColor = 'transparent' }}
            >
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, color: 'var(--off3)', fontWeight: 600, marginBottom: 12, transition: 'color 0.2s', ...(hoveredFeature === i ? { color: 'var(--gold3)' } : {}) }}>{f.n}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, letterSpacing: '.3px' }}>{f.t}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />

      {/* ── Trust band ── */}
      <div style={{ background: 'var(--navy)', padding: '40px 32px', borderTop: '3px solid var(--gold2)', borderBottom: '3px solid var(--gold2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }} className="trust-band">
          {trust.map(([n, l], i) => (
            <div key={n} className={`reveal reveal-d${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {i > 0 && <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,.1)' }} />}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, color: 'var(--gold3)', fontWeight: 500 }}>{n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' }}>{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Waitlist ── */}
      <div className="reveal" style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)', padding: '52px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, color: 'var(--navy)', marginBottom: 8, fontWeight: 600 }}>Join the waitlist</div>
        <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 24 }}>Be first when Pro subscriptions open. Free access always available immediately.</div>
        {joined ? (
          <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>✓ You have been added to the waitlist. We will be in touch.</div>
        ) : (
          <div style={{ display: 'flex', gap: 0, maxWidth: 400, margin: '0 auto', border: '1px solid var(--border2)', transition: 'border-color 0.2s' }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--gold2)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border2)'}
          >
            <input
              value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && join()}
              placeholder="your@email.com"
              style={{ flex: 1, background: 'var(--white)', border: 'none', color: 'var(--text)', padding: '12px 16px', fontSize: 13, outline: 'none', fontFamily: 'Source Sans 3, sans-serif' }}
            />
            <button
              onClick={join}
              className="btn-press"
              style={{ background: 'var(--navy)', color: 'var(--gold3)', border: 'none', padding: '12px 20px', fontSize: 11, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600, cursor: 'pointer', letterSpacing: '.5px', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--navy2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
            >
              Join waitlist
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
