import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Footer from '../components/Footer'

const STYLES = `
  @keyframes hgPageEnter { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes hgFadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  @keyframes hgScan { from { top:-2px; } to { top:100vh; } }
  .hg-wrap { animation: hgPageEnter 0.4s ease both; }
  .hg-hl { opacity:0; animation: hgFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
  .hg-hl1 { animation-delay:0.05s; }
  .hg-hl2 { animation-delay:0.18s; }
  .hg-hl3 { animation-delay:0.30s; }
  .hg-hl4 { animation-delay:0.42s; }
  .hg-hl5 { animation-delay:0.54s; }
  .hg-scan { position:fixed; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(184,149,46,0.15),transparent); animation:hgScan 10s linear infinite; pointer-events:none; z-index:9998; }
  .hg-card { transition:transform 0.22s ease,box-shadow 0.22s ease,border-top-color 0.2s ease,background 0.2s ease; }
  .hg-card:hover { transform:translateY(-5px) !important; box-shadow:0 16px 40px rgba(0,0,0,0.12) !important; }
  .hg-reveal { opacity:0; transform:translateY(24px); transition:opacity 0.6s ease,transform 0.6s ease; }
  .hg-visible { opacity:1 !important; transform:translateY(0) !important; }
  .hg-btn-gold:hover { background:#e8c240 !important; }
  .hg-btn-outline:hover { border-color:#d4aa3a !important; color:#d4aa3a !important; }
`

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

function StatCounter({ val, suffix, prefix, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (val === 0) { el.textContent = prefix ? prefix + val : val + suffix; return }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let cur = 0
      const step = val / 40
      const t = setInterval(() => {
        cur += step
        if (cur >= val) { cur = val; clearInterval(t) }
        el.textContent = prefix ? prefix + Math.floor(cur) : Math.floor(cur) + suffix
      }, 30)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [val, suffix, prefix])
  return (
    <div style={{ padding: '22px 24px', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
      <div ref={ref} style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 600, color: 'var(--navy)', lineHeight: 1 }}>
        {prefix ? prefix + val : val + suffix}
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hg-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.hg-reveal').forEach(el => observer.observe(el))
    }, 100)
    return () => { clearTimeout(timer); observer.disconnect() }
  }, [])

  const join = () => {
    if (email && email.includes('@')) { setJoined(true); setEmail('') }
  }

  return (
    <div className="hg-wrap">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="hg-scan" />

      {/* ── Hero — full video, text at bottom ── */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '100vh', maxHeight: '800px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

        {/* Full video — no overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Only a gradient at the very bottom so text is readable */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '65%',
          background: 'linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.7) 50%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Text at the bottom */}
        <div style={{ position: 'relative', zIndex: 2, padding: '0 32px 52px', maxWidth: 760, width: '100%' }}>

          <div className="hg-hl hg-hl1" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, transparent, #d4aa3a)' }} />
            <span style={{ fontSize: 9, color: '#d4aa3a', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3 }}>INSTITUTIONAL-GRADE INTELLIGENCE</span>
          </div>

          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: '#ffffff', lineHeight: 1.1, marginBottom: 16 }}>
            <span className="hg-hl hg-hl2" style={{ display: 'block', fontSize: 'clamp(32px, 5vw, 58px)' }}>Where Wall Street</span>
            <span className="hg-hl hg-hl3" style={{ display: 'block', fontSize: 'clamp(32px, 5vw, 58px)' }}>meets <em style={{ color: '#d4aa3a' }}>decentralised finance</em></span>
          </h1>

          <p className="hg-hl hg-hl4" style={{ fontSize: 15, color: 'rgba(255,255,255,.7)', maxWidth: 520, marginBottom: 28, lineHeight: 1.8, fontWeight: 300 }}>
            Real-time macro intelligence, AI-powered trade signals, and an autonomous bot trading Hyperliquid 24/7.
          </p>

          <div className="hg-hl hg-hl5" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/terminal')}
              className="hg-btn-gold"
              style={{ background: '#d4aa3a', color: '#0a1628', border: 'none', padding: '13px 28px', fontSize: 12, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 700, cursor: 'pointer', letterSpacing: '.5px', transition: 'background 0.2s, transform 0.1s' }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >Open terminal →</button>
            <button
              onClick={() => navigate('/bot')}
              className="hg-btn-outline"
              style={{ background: 'transparent', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)', padding: '13px 28px', fontSize: 12, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 500, cursor: 'pointer', letterSpacing: '.5px', transition: 'border-color 0.2s, color 0.2s, transform 0.1s' }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >View bot performance</button>
          </div>

          <div className="hg-hl hg-hl5" style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', marginTop: 20, fontFamily: 'Source Code Pro, monospace' }}>
            Market data and AI signals for informational purposes only. Past performance does not guarantee future results.
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '3px solid var(--gold2)', background: 'var(--off)' }} className="stats-band">
        <StatCounter val={4}  suffix=""   label="Asset classes" />
        <StatCounter val={13} suffix=""   label="Signal sources" />
        <StatCounter val={24} suffix="/7" label="Autonomous trading" />
        <StatCounter val={0}  suffix=""   prefix="$" label="To start" />
      </div>

      {/* Features */}
      <div style={{ padding: '60px 32px' }}>
        <div className="hg-reveal">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 24, height: 2, background: 'var(--gold2)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>What we provide</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>Institutional intelligence. Accessible price.</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 36, maxWidth: 520, lineHeight: 1.8 }}>Bloomberg Terminal costs $24,000/year. HubGenius Finance delivers the same quality — starting at $0.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 1, background: 'var(--border)' }} className="features">
          {features.map((f, i) => (
            <div
              key={f.n}
              className="hg-card"
              style={{ background: hoveredFeature === i ? '#fdf8ec' : 'var(--white)', padding: '28px 24px', borderTop: hoveredFeature === i ? '3px solid var(--gold2)' : '3px solid transparent', cursor: 'default' }}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, color: hoveredFeature === i ? '#d4aa3a' : 'var(--off3)', fontWeight: 600, marginBottom: 12, transition: 'color 0.2s' }}>{f.n}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, letterSpacing: '.3px' }}>{f.t}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust band */}
      <div style={{ background: 'var(--navy)', padding: '40px 32px', borderTop: '3px solid var(--gold2)', borderBottom: '3px solid var(--gold2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }} className="trust-band">
          {trust.map(([n, l], i) => (
            <div key={n} className="hg-reveal" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {i > 0 && <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,.1)' }} />}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, color: '#d4aa3a', fontWeight: 500 }}>{n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' }}>{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Waitlist */}
      <div className="hg-reveal" style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)', padding: '52px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, color: 'var(--navy)', marginBottom: 8, fontWeight: 600 }}>Join the waitlist</div>
        <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 24 }}>Be first when Pro subscriptions open. Free access always available immediately.</div>
        {joined ? (
          <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'Source Code Pro, monospace' }}>✓ You have been added to the waitlist. We will be in touch.</div>
        ) : (
          <div style={{ display: 'flex', maxWidth: 400, margin: '0 auto', border: '1px solid var(--border2)' }}>
            <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && join()} placeholder="your@email.com"
              style={{ flex: 1, background: 'var(--white)', border: 'none', color: 'var(--text)', padding: '12px 16px', fontSize: 13, outline: 'none', fontFamily: 'Source Sans 3, sans-serif' }} />
            <button onClick={join}
              style={{ background: '#0a1628', color: '#d4aa3a', border: 'none', padding: '12px 20px', fontSize: 11, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600, cursor: 'pointer', letterSpacing: '.5px', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#112040'}
              onMouseLeave={e => e.currentTarget.style.background = '#0a1628'}
            >Join waitlist</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
