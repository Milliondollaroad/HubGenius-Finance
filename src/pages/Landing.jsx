import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Footer from '../components/Footer'

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

export default function Landing() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const join = () => {
    if (email && email.includes('@')) { setJoined(true); setEmail('') }
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '72px 32px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,1) 40px,rgba(255,255,255,1) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,1) 40px,rgba(255,255,255,1) 41px)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold3)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3 }}>INSTITUTIONAL-GRADE INTELLIGENCE</span>
            <div style={{ width: 40, height: 1, background: 'var(--gold3)' }} />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 46, fontWeight: 600, color: 'var(--white)', lineHeight: 1.15, marginBottom: 14 }}>
            Where Wall Street<br />meets <em style={{ color: 'var(--gold3)' }}>decentralised finance</em>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7, fontWeight: 300 }}>
            Real-time macro intelligence, AI-powered trade signals, and an autonomous bot trading Hyperliquid 24/7 — built for serious traders who demand institutional quality.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => navigate('/terminal')}>Open terminal</button>
            <button className="btn-outline-white" onClick={() => navigate('/bot')}>View bot performance</button>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', marginTop: 24 }}>
            Market data and AI signals for informational purposes only. Past performance does not guarantee future results.
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '3px solid var(--gold2)', background: 'var(--off)' }}>
        {[['4','Asset classes'],['13','Signal sources'],['24/7','Autonomous trading'],['$0','To start']].map(([n,l]) => (
          <div key={l} style={{ padding: '22px 24px', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 600, color: 'var(--navy)' }}>{n}</div>
            <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, marginTop: 3, textTransform: 'uppercase' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: '52px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 24, height: 2, background: 'var(--gold2)' }} />
          <span style={{ fontSize: 9, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>What we provide</span>
        </div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>Institutional intelligence. Accessible price.</h2>
        <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 28, maxWidth: 520, lineHeight: 1.7 }}>Bloomberg Terminal costs $24,000/year. HubGenius Finance delivers the same quality of macro intelligence, news aggregation, and AI-powered signals — starting at $0.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 1, background: 'var(--border)' }}>
          {features.map(f => (
            <div key={f.n} style={{ background: 'var(--white)', padding: 24, borderTop: '3px solid transparent', transition: 'border-color .15s' }}
              onMouseEnter={e => e.currentTarget.style.borderTopColor = 'var(--gold2)'}
              onMouseLeave={e => e.currentTarget.style.borderTopColor = 'transparent'}
            >
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'var(--off3)', fontWeight: 600, marginBottom: 10 }}>{f.n}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6, letterSpacing: '.3px' }}>{f.t}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust band */}
      <div style={{ background: 'var(--navy)', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20, borderTop: '3px solid var(--gold2)' }}>
        {trust.map(([n, l], i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {i > 0 && <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,.1)' }} />}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: 'var(--gold3)', fontWeight: 500 }}>{n}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, marginTop: 3, textTransform: 'uppercase' }}>{l}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Waitlist */}
      <div style={{ background: 'var(--off)', borderTop: '3px solid var(--gold2)', borderBottom: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: 'var(--navy)', marginBottom: 6, fontWeight: 600 }}>Join the waitlist</div>
        <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>Be first when Pro subscriptions open. Free access always available immediately.</div>
        {joined ? (
          <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>You have been added to the waitlist. We will be in touch.</div>
        ) : (
          <div style={{ display: 'flex', gap: 0, maxWidth: 400, margin: '0 auto', border: '1px solid var(--border2)' }}>
            <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && join()}
              placeholder="your@email.com"
              style={{ flex: 1, background: 'var(--white)', border: 'none', color: 'var(--text)', padding: '11px 14px', fontSize: 13, outline: 'none', fontFamily: 'Source Sans 3, sans-serif' }}
            />
            <button onClick={join} className="btn-navy" style={{ padding: '11px 20px', fontSize: 11, letterSpacing: '.5px', whiteSpace: 'nowrap' }}>Join waitlist</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
