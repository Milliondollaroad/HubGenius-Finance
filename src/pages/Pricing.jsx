import { useState } from 'react'
import Footer from '../components/Footer'

const freeFeatures = [
  { s: 'Market data',    items: ['Live price ticker — all assets', 'Macro indicators (Fear & Greed, M2, DXY)', 'TradingView charts — all timeframes', 'Full bot trade history — public'] },
  { s: 'Feeds',         items: ['News feed — 30 min delay', 'X intelligence — 30 min delay'] },
  { s: 'Signals',       items: ['✗ AI signals', '✗ Stocks & commodities signals', '✗ Copy-trade bot'], locked: true },
]

const proFeatures = [
  { s: 'Market data — live', items: ['All assets — crypto, stocks, commodities', 'Live news — zero delay', 'Live X intelligence — all 13 accounts', 'Funding rates + liquidation data'] },
  { s: 'AI signals',         items: ['Full AI signal engine — real-time', 'Entry price, stop loss, take profit', 'eWhispers earnings intelligence', 'WSB + Reddit sentiment tracker'] },
  { s: 'Bot & community',    items: ['Copy-trade the bot directly', 'Gmail + Notion trade alerts', 'Private Discord community', 'Monthly strategy review call', 'Priority support — direct access'] },
]

function FeatureList({ groups }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 22 }}>
      {groups.map(g => (
        <div key={g.s}>
          <div style={{ fontSize: 9, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1.5, textTransform: 'uppercase', margin: '10px 0 4px', paddingTop: 8, borderTop: '1px solid var(--border)' }}>{g.s}</div>
          {g.items.map(item => {
            const locked = item.startsWith('✗')
            const text = locked ? item.slice(2) : item
            return (
              <div key={item} style={{ fontSize: 12, color: locked ? 'var(--text4)' : 'var(--text2)', display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 7, lineHeight: 1.4 }}>
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

  return (
    <div>
      <div style={{ padding: '52px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 24, height: 2, background: 'var(--gold2)' }} />
          <span style={{ fontSize: 9, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>Pricing</span>
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>Transparent access. No surprises.</h1>
        <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 32, maxWidth: 520, lineHeight: 1.7 }}>Start free. The free tier is genuinely useful — not a crippled demo. Upgrade when the signals prove their value to you.</p>

        {/* Billing toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 36 }}>
          <span style={{ fontSize: 12, fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, color: yearly ? 'var(--text3)' : 'var(--navy)', fontWeight: yearly ? 400 : 500, textTransform: 'uppercase' }}>Monthly</span>
          <button onClick={() => setYearly(y => !y)} style={{
            width: 44, height: 24, background: 'var(--navy)', borderRadius: 12,
            position: 'relative', cursor: 'pointer', border: 'none', flexShrink: 0
          }}>
            <div style={{ width: 18, height: 18, background: 'var(--gold3)', borderRadius: '50%', position: 'absolute', top: 3, left: yearly ? 23 : 3, transition: 'left .2s ease' }} />
          </button>
          <span style={{ fontSize: 12, fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, color: yearly ? 'var(--navy)' : 'var(--text3)', fontWeight: yearly ? 500 : 400, textTransform: 'uppercase' }}>Yearly</span>
          <span style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, padding: '3px 10px', background: 'var(--green-bg)', color: 'var(--green)', border: '1px solid rgba(26,107,58,.2)', opacity: yearly ? 1 : 0, transition: 'opacity .2s' }}>
            Save $78 — 2 months free
          </span>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, maxWidth: 720, margin: '0 auto' }}>

          {/* Free */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border2)', padding: '28px 24px' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Free</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 600, color: 'var(--navy)', lineHeight: 1 }}>$0</span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>/month</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 18, fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>No card required · Always free</div>
            <FeatureList groups={freeFeatures} />
            <button className="btn-outline" style={{ width: '100%' }}>Get started free</button>
          </div>

          {/* Pro */}
          <div style={{ background: 'var(--gold-light)', border: '2px solid var(--gold2)', padding: '28px 24px' }}>
            <div style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, color: 'var(--gold2)', border: '1px solid var(--gold3)', background: 'var(--white)', padding: '3px 10px', display: 'inline-block', marginBottom: 14, textTransform: 'uppercase' }}>Everything included</div>
            <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Pro</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 600, color: 'var(--navy)', lineHeight: 1 }}>{yearly ? '$390' : '$39'}</span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{yearly ? '/year' : '/month'}</span>
            </div>
            <div style={{ fontSize: 11, color: yearly ? 'var(--green)' : 'var(--text3)', marginBottom: 4, fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px', minHeight: 16 }}>
              {yearly ? "That's $32.50/month — save $78" : '\u00a0'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 18, fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>
              {yearly ? 'Billed once yearly · Cancel anytime' : 'Cancel anytime · No commitment'}
            </div>
            <FeatureList groups={proFeatures} />
            <button className="btn-navy" style={{ width: '100%' }}>
              {yearly ? 'Start Pro — $390/year' : 'Start Pro — $39/month'}
            </button>
          </div>
        </div>

        {/* Guarantee */}
        <div style={{ textAlign: 'center', marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 1, background: 'var(--border2)' }} />
          <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>No hidden fees · No auto-renewal surprises · Cancel in one click</span>
          <div style={{ width: 32, height: 1, background: 'var(--border2)' }} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
