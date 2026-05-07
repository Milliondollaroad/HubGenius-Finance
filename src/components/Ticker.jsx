import { useNavigate } from 'react-router-dom'

const tickers = [
  { name: 'BTC/USD', px: '104,230.00', chg: '▲ 2.14%', dir: 'up',  id: 'BTC'  },
  { name: 'ETH/USD', px: '3,847.00',   chg: '▲ 1.42%', dir: 'up',  id: 'ETH'  },
  { name: 'SOL/USD', px: '178.40',     chg: '▲ 3.21%', dir: 'up',  id: 'SOL'  },
  { name: 'TSLA',    px: '312.50',     chg: '▼ 0.82%', dir: 'down', id: 'TSLA' },
  { name: 'NVDA',    px: '1,089.00',   chg: '▲ 1.92%', dir: 'up',  id: 'NVDA' },
  { name: 'AMD',     px: '176.20',     chg: '▲ 0.71%', dir: 'up',  id: 'AMD'  },
  { name: 'GOLD',    px: '3,324.00',   chg: '▲ 0.44%', dir: 'up',  id: 'GOLD' },
  { name: 'WTI',     px: '58.90',      chg: '▼ 1.21%', dir: 'down', id: 'OIL'  },
  { name: 'DXY',     px: '99.84',      chg: '▼ 0.31%', dir: 'down', id: null   },
  { name: 'US10Y',   px: '4.32%',      chg: '→ Stable', dir: 'neu', id: null   },
]

export default function Ticker({ onAssetClick }) {
  const navigate = useNavigate()

  const handleClick = (id) => {
    if (id) {
      navigate('/terminal', { state: { asset: id } })
      if (onAssetClick) onAssetClick(id)
    }
  }

  return (
    <div style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)', padding: '8px 32px', display: 'flex', gap: 24, overflowX: 'auto', scrollbarWidth: 'none' }}>
      {tickers.map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, flexShrink: 0 }}>
          {i > 0 && <span style={{ width: 1, height: 16, background: 'var(--border2)', flexShrink: 0 }} />}
          <div
            onClick={() => handleClick(t.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: t.id ? 'pointer' : 'default', flexShrink: 0 }}
          >
            <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, fontWeight: 500 }}>{t.name}</span>
            <span style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--text)' }}>{t.px}</span>
            <span className={t.dir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{t.chg}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
