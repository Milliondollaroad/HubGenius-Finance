import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useReveal } from '../hooks/useReveal'

const freeFeatures = [
  { s: 'Market data',  items: ['Live price ticker — all assets', 'Macro indicators (Fear & Greed, M2, DXY)', 'TradingView charts — all timeframes', 'Full bot trade history — public', 'News feed — 30 min delay', 'X intelligence — 30 min delay'] },
  { s: 'Signals',      items: ['✗ AI signals', '✗ Real-time feeds', '✗ Copy-trade bot'], locked: true },
]

const proFeatures = [
  { s: 'Market data — live',  items: ['All assets — crypto, stocks, commodities', 'Live news — zero delay', 'Live X intelligence — all 13 accounts', 'Funding rates + liquidation data', 'Live Fear & Greed + Reddit sentiment'] },
  { s: 'AI signals',          items: ['Full AI signal engine — real-time', 'Entry price, stop loss, take profit', 'eWhispers earnings intelligence', 'WSB + Reddit sentiment tracker'] },
  { s: 'Bot & community',     items: ['Copy-trade the bot directly', 'Gmail + Notion trade alerts', 'Private Discord community', 'Monthly strategy review call', 'Priority support — direct access'] },
]

function FeatureList({ groups }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 24 }}>
      {groups.map(g => (
        <div key={g.s}>
          <div style={{ fontSize: 9, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1.5, textTransform: 'uppercase', margin: '12px 0 5px', paddingTop: 8, borderTop: '1px solid var(--border)' }}>{g.s}</div>
          {g.items.map(item => {
            const locked = item.startsWith('✗')
            const text = locked ? item.slice(2) : item
            return (
              <div key={item} style={{ fontSize: 12, color: locked ? 'var(--text4)' : 'var(--text2)', display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, lineHeight: 1.5 }}>
                <span style={{ color: locked ? 'var(--text4)' : 'var(--green)', fontSize: 11, marginTop: 1, flexShrink: 0, fontWeight: 600 }}>{locked ? '✗' : '✓'}</span>
                {text}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  useReveal()

  return (
    <div className="page-enter">
      <div style={{ padding: '52px 32px' }}>

        <div className="reveal">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'var(--gold2)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>Pricing</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>Transparent access. No surprises.</h1>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 36, maxWidth: 520, lineHeight: 1.8 }}>Start free. Upgrade when the signals prove their value to you.</p>
        </div>

        {/* Toggle */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, color: yearly ? 'var(--text3)' : 'var(--navy)', fontWeight: yearly ? 400 : 600, textTransform: 'uppercase', transition: 'color 0.2s' }}>Monthly</span>
          <button
            onClick={() => setYearly(y => !y)}
            style={{ width: 44, height: 24, background: 'var(--navy)', borderRadius: 12, position: 'relative', cursor: 'pointer', border: 'none', flexShrink: 0, transition: 'background 0.2s' }}
          >
            <div style={{ width: 18, height: 18, background: 'var(--gold3)', borderRadius: '50%', position: 'absolute', top: 3, left: yearly ? 23 : 3, transition: 'left .2s cubic-bezier(0.22,1,0.36,1)' }} />
          </button>
          <span style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, color: yearly ? 'var(--navy)' : 'var(--text3)', fontWeight: yearly ? 600 : 400, textTransform: 'uppercase', transition: 'color 0.2s' }}>Yearly</span>
          <span style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, padding: '3px 10px', background: 'var(--green-bg)', color: 'var(--green)', border: '1px solid rgba(26,107,58,.2)', opacity: yearly ? 1 : 0, transition: 'opacity .3s' }}>
            Save $78 — 2 months free
          </span>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, maxWidth: 720, margin: '0 auto' }}>

          {/* Free */}
          <div className="reveal reveal-d1 card-lift" style={{ background: 'var(--white)', border: '1px solid var(--border2)', padding: '28px 24px' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>Free</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 600, color: 'var(--navy)', lineHeight: 1 }}>$0</span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>/month</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 20, fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>No card required · Always free</div>
            <FeatureList groups={freeFeatures} />
            <button
              className="btn-press"
              style={{ background: 'transparent', color: 'var(--navy)', border: '1px solid var(--navy)', padding: '12px 20px', fontSize: 12, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600, cursor: 'pointer', width: '100%', letterSpacing: '.5px', transition: 'background 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'var(--gold3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)' }}
            >
              Get started free
            </button>
          </div>

          {/* Pro */}
          <div className="reveal reveal-d2 card-lift glow-border" style={{ background: 'var(--gold-light)', border: '2px solid var(--gold2)', padding: '28px 24px' }}>
            <div style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, color: 'var(--gold2)', border: '1px solid var(--gold3)', background: 'var(--white)', padding: '3px 10px', display: 'inline-block', marginBottom: 14, textTransform: 'uppercase' }}>Everything included</div>
            <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>Pro</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 600, color: 'var(--navy)', lineHeight: 1, transition: 'opacity 0.2s' }}>{yearly ? '$390' : '$39'}</span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{yearly ? '/year' : '/month'}</span>
            </div>
            <div style={{ fontSize: 11, color: yearly ? 'var(--green)' : 'var(--text3)', marginBottom: 4, fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px', minHeight: 16, transition: 'color 0.2s' }}>
              {yearly ? "That's $32.50/month — save $78" : '\u00a0'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 20, fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>
              {yearly ? 'Billed once yearly · Cancel anytime' : 'Cancel anytime · No commitment'}
            </div>
            <FeatureList groups={proFeatures} />
            <button
              className="btn-press"
              style={{ background: 'var(--navy)', color: 'var(--gold3)', border: 'none', padding: '12px 20px', fontSize: 12, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600, cursor: 'pointer', width: '100%', letterSpacing: '.5px', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--navy2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
            >
              {yearly ? 'Start Pro — $390/year' : 'Start Pro — $39/month'}
            </button>
          </div>
        </div>

        {/* Guarantee */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 1, background: 'var(--border2)' }} />
          <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>No hidden fees · No auto-renewal surprises · Cancel in one click</span>
          <div style={{ width: 32, height: 1, background: 'var(--border2)' }} />
        </div>

        {/* Disclaimer */}
        <div className="reveal" style={{ marginTop: 44, padding: '20px 24px', background: 'var(--off)', border: '1px solid var(--border2)' }}>
          <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Important disclaimer</div>
          <p style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.7 }}>
            HubGenius Finance provides market data and AI-generated signals for <strong>informational purposes only</strong>. This is <strong>not financial advice</strong>. Trading involves substantial risk of loss. Past performance does not guarantee future results. Never invest capital you cannot afford to lose.{' '}
            <Link to="/legal" style={{ color: 'var(--gold2)', textDecoration: 'none', fontFamily: 'Source Code Pro, monospace' }}>Read full disclaimer →</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
