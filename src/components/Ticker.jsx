import { useNavigate } from 'react-router-dom'
import { usePrices }   from '../context/PricesContext'
import { useCurrency } from '../context/CurrencyContext'
import { RATES }       from '../assets'
import CurrencyToggle  from './CurrencyToggle'

const FEATURED = ['BTC','ETH','SOL','TSLA','NVDA','GOLD','OIL','SPX','DXY','US10Y']

function fmtPrice(usd, currency) {
  if (usd == null) return '...'
  const { symbol, rate } = RATES[currency]
  const v = usd * rate
  if (v >= 10000) return `${symbol}${Math.round(v).toLocaleString()}`
  if (v >= 1)     return `${symbol}${v.toFixed(2)}`
  return `${symbol}${v.toFixed(4)}`
}

export default function Ticker() {
  const navigate          = useNavigate()
  const { prices, loading, lastUpdate } = usePrices()
  const { currency }      = useCurrency()

  return (
    <div style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>
      <div style={{ padding: '6px 12px', borderRight: '1px solid var(--border)', flexShrink: 0 }}>
        <CurrencyToggle compact={true} />
      </div>
      <div style={{ display: 'flex', overflowX: 'auto', padding: '7px 12px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', flex: 1, alignItems: 'center', gap: 0 }}>
        {FEATURED.map((id, i) => {
          const p  = prices[id]
          const px = fmtPrice(p?.usd, currency)
          const noConvert = ['DXY','US10Y','EURUSD','GBPUSD'].includes(id)
          const display = noConvert && p?.usd ? (id === 'US10Y' ? `${p.usd.toFixed(2)}%` : p.usd.toFixed(2)) : px
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {i > 0 && <span style={{ width: 1, height: 14, background: 'var(--border2)', margin: '0 14px', flexShrink: 0 }} />}
              <div onClick={() => navigate('/terminal', { state: { asset: id } })}
                style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, fontWeight: 500 }}>{id}</span>
                <span style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: loading && !p ? 'var(--text4)' : 'var(--text)' }}>{display}</span>
                {p?.chg && <span className={p.dir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{p.chg}</span>}
              </div>
            </div>
          )
        })}
        {lastUpdate && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 16, flexShrink: 0 }}>
            <span style={{ width: 1, height: 14, background: 'var(--border2)', marginRight: 14 }} />
            <span style={{ fontSize: 9, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2d9e5a', display: 'inline-block', animation: 'blink 1.5s infinite' }} />
              Live · {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
