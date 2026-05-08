import { useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { TRADES } from '../data'
import Footer from '../components/Footer'
import { useReveal } from '../hooks/useReveal'

const stats = [
  { val: '+$12.40', label: 'Total P&L',      cls: 'up',  raw: 12.40 },
  { val: '23',      label: 'Total trades',    cls: '',    raw: 23    },
  { val: '65%',     label: 'Win rate',        cls: 'up',  raw: 65    },
  { val: '$187.40', label: 'Account value',   cls: '',    raw: 187   },
  { val: '2 : 1',   label: 'Avg risk/reward', cls: 'up',  raw: null  },
  { val: '2 / 3',   label: 'Open positions',  cls: '',    raw: null  },
]

const open = [
  { asset: 'BTC', dir: 'Long', entry: '$103,800', sl: '$100,686', tp: '$110,028', pnl: '+$4.20', pos: true },
  { asset: 'ETH', dir: 'Long', entry: '$3,810',   sl: '$3,695',   tp: '$4,040',   pnl: '+$6.80', pos: true },
]

export default function Bot() {
  const navigate = useNavigate()
  useReveal()

  return (
    <div className="page-enter">
      <div style={{ padding: '32px 32px 48px' }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '2px solid var(--gold2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 24, height: 2, background: 'var(--gold2)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>Live performance</span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="pulse-dot" />
              <span style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'Source Code Pro, monospace' }}>Bot active — Testnet</span>
            </div>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>Bot performance — Testnet</h1>
          <p style={{ fontSize: 12, color: 'var(--text2)' }}>All trades executed autonomously. Full transparency — no cherry-picking.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 24 }} className="bot-stats">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal reveal-d${(i % 3) + 1} card-lift`}
              style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: '2px solid var(--navy)', padding: '18px 16px', transition: 'border-top-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderTopColor = 'var(--gold2)'}
              onMouseLeave={e => e.currentTarget.style.borderTopColor = 'var(--navy)'}
            >
              <div className={s.cls} style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: 'var(--navy)' }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trade history */}
        <div className="reveal" style={{ background: 'var(--white)', border: '1px solid var(--border)', marginBottom: 16 }}>
          <div style={{ padding: '12px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'var(--navy)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>Trade history</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 60px 1fr 80px 70px', gap: 8, padding: '7px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)' }}>
            {['Asset','Dir','Entry price','P & L','Time'].map(h => (
              <span key={h} style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {TRADES.map((t, i) => (
            <div
              key={i}
              style={{
                display: 'grid', gridTemplateColumns: '60px 60px 1fr 80px 70px',
                gap: 8, padding: '10px 16px',
                borderBottom: i < TRADES.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'center', fontSize: 11,
                fontFamily: 'Source Code Pro, monospace',
                transition: 'background 0.15s',
              }}
              className="trade-row-grid"
              onMouseEnter={e => e.currentTarget.style.background = 'var(--off)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontWeight: 500, color: 'var(--navy)' }}>{t.asset}</span>
              <span className={t.dir === 'Long' ? 'up' : 'down'} style={{ fontWeight: 500 }}>{t.dir}</span>
              <span style={{ color: 'var(--text2)' }}>{t.entry}</span>
              <span className={t.pos ? 'up' : 'down'} style={{ fontWeight: 500 }}>{t.pnl}</span>
              <span style={{ color: 'var(--text4)' }}>{t.time}</span>
            </div>
          ))}
        </div>

        {/* Open positions */}
        <div className="reveal" style={{ background: 'var(--white)', border: '1px solid var(--border)', marginBottom: 24 }}>
          <div style={{ padding: '12px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'var(--navy)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>Open positions</span>
            <span style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace' }}>2 / 3 max</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 60px 1fr 90px 90px 70px', gap: 8, padding: '7px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)' }}>
            {['Asset','Dir','Entry','Stop loss','Take profit','Unrealized'].map(h => (
              <span key={h} style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {open.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'grid', gridTemplateColumns: '60px 60px 1fr 90px 90px 70px',
                gap: 8, padding: '10px 16px',
                borderBottom: i < open.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'center', fontSize: 11, fontFamily: 'Source Code Pro, monospace',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--off)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontWeight: 500, color: 'var(--navy)' }}>{p.asset}</span>
              <span className="up" style={{ fontWeight: 500 }}>{p.dir}</span>
              <span style={{ color: 'var(--text2)' }}>{p.entry}</span>
              <span className="down">{p.sl}</span>
              <span className="up">{p.tp}</span>
              <span className="up" style={{ fontWeight: 500 }}>{p.pnl}</span>
            </div>
          ))}
        </div>

        {/* Upsell */}
        <div
          className="reveal glow-border"
          style={{ background: 'var(--gold-light)', border: '1px solid var(--gold3)', padding: '28px 24px', textAlign: 'center' }}
        >
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'var(--navy)', fontWeight: 600, marginBottom: 8 }}>Copy these trades automatically with Pro</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 18, maxWidth: 440, margin: '0 auto 18px' }}>Every trade the bot makes gets mirrored to your Hyperliquid account in real time.</div>
          <button
            className="btn-press"
            onClick={() => navigate('/pricing')}
            style={{ background: 'var(--navy)', color: 'var(--gold3)', border: 'none', padding: '12px 28px', fontSize: 12, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600, cursor: 'pointer', letterSpacing: '.5px', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--navy2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
          >
            View Pro plan — $39/month
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
