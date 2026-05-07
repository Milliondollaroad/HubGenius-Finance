import { useNavigate } from 'react-router-dom'
import { TRADES } from '../data'
import Footer from '../components/Footer'

const stats = [
  { val: '+$12.40', label: 'Total P&L',      cls: 'up'  },
  { val: '23',      label: 'Total trades',    cls: ''    },
  { val: '65%',     label: 'Win rate',        cls: 'up'  },
  { val: '$187.40', label: 'Account value',   cls: ''    },
  { val: '2 : 1',   label: 'Avg risk/reward', cls: 'up'  },
  { val: '2 / 3',   label: 'Open positions',  cls: ''    },
]

const open = [
  { asset: 'BTC', dir: 'Long', entry: '$103,800', sl: '$100,686', tp: '$110,028', pnl: '+$4.20', pos: true },
  { asset: 'ETH', dir: 'Long', entry: '$3,810',   sl: '$3,695',   tp: '$4,040',   pnl: '+$6.80', pos: true },
]

export default function Bot() {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ padding: '24px 32px' }}>
        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '2px solid var(--gold2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 24, height: 2, background: 'var(--gold2)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>Live performance</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>Bot performance — Testnet</h1>
          <p style={{ fontSize: 12, color: 'var(--text2)' }}>All trades executed autonomously. Full transparency — no cherry-picking.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: '2px solid var(--navy)', padding: 16 }}>
              <div className={s.cls} style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 600, color: 'var(--navy)' }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trade history */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', marginBottom: 14 }}>
          <div style={{ padding: '12px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'var(--navy)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>Trade history</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="live-dot" />
              <span style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'Source Code Pro, monospace' }}>Bot active — Testnet</span>
            </div>
          </div>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px 60px 1fr 80px 70px', gap: 8, padding: '7px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)' }}>
            {['Asset','Dir','Entry price','P & L','Time'].map(h => (
              <span key={h} style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {TRADES.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 60px 1fr 80px 70px', gap: 8, padding: '9px 16px', borderBottom: i < TRADES.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', fontSize: 11, fontFamily: 'Source Code Pro, monospace' }}>
              <span style={{ fontWeight: 500, color: 'var(--navy)' }}>{t.asset}</span>
              <span className={t.dir === 'Long' ? 'up' : 'down'} style={{ fontWeight: 500 }}>{t.dir}</span>
              <span style={{ color: 'var(--text2)' }}>{t.entry}</span>
              <span className={t.pos ? 'up' : 'down'} style={{ fontWeight: 500 }}>{t.pnl}</span>
              <span style={{ color: 'var(--text4)' }}>{t.time}</span>
            </div>
          ))}
        </div>

        {/* Open positions */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', marginBottom: 20 }}>
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
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 60px 1fr 90px 90px 70px', gap: 8, padding: '9px 16px', borderBottom: i < open.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', fontSize: 11, fontFamily: 'Source Code Pro, monospace' }}>
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
        <div style={{ background: 'var(--gold-light)', border: '1px solid var(--gold3)', padding: 20, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--navy)', fontWeight: 600, marginBottom: 6 }}>Copy these trades automatically with Pro</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 14 }}>Every trade the bot makes gets mirrored to your Hyperliquid account in real time.</div>
          <button className="btn-navy" onClick={() => navigate('/pricing')} style={{ padding: '10px 28px' }}>View Pro plan — $39/month</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
