import { useNavigate } from 'react-router-dom'
import { usePrices }   from '../context/PricesContext'
import { useCurrency } from '../context/CurrencyContext'
import { RATES }       from '../assets'
import CurrencyToggle  from './CurrencyToggle'

const FEATURED = ['BTC','ETH','SOL','TSLA','NVDA','GOLD','OIL','SPX','DXY','US10Y','AAPL','MSFT','BNB','DOGE','ADA','AVAX','LINK','MATIC']

function fmtPrice(usd, currency) {
  if (usd == null) return '...'
  const { symbol, rate } = RATES[currency]
  const v = usd * rate
  if (v >= 10000) return `${symbol}${Math.round(v).toLocaleString()}`
  if (v >= 1)     return `${symbol}${v.toFixed(2)}`
  return `${symbol}${v.toFixed(4)}`
}

const TICKER_STYLES = `
  @keyframes tickerScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .ticker-outer { overflow: hidden; flex: 1; cursor: default; }
  .ticker-track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: tickerScroll 40s linear infinite;
  }
  .ticker-outer:hover .ticker-track {
    animation-play-state: paused;
  }
  .ticker-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 20px;
    border-right: 1px solid var(--border);
    white-space: nowrap;
    cursor: pointer;
    transition: background 0.15s;
  }
  .ticker-item:hover { background: rgba(184,149,46,0.06); }
`

export default function Ticker() {
  const navigate          = useNavigate()
  const { prices, loading, lastUpdate } = usePrices()
  const { currency }      = useCurrency()

  const items = FEATURED.map(id => {
    const p  = prices[id]
    const px = fmtPrice(p?.usd, currency)
    const noConvert = ['DXY','US10Y','EURUSD','GBPUSD'].includes(id)
    const display = noConvert && p?.usd
      ? (id === 'US10Y' ? `${p.usd.toFixed(2)}%` : p.usd.toFixed(2))
      : px
    return { id, display, chg: p?.chg, dir: p?.dir, loading: loading && !p }
  })

  return (
    <div style={{
      background: 'var(--off)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      height: 36,
    }}>
      <style dangerouslySetInnerHTML={{ __html: TICKER_STYLES }} />

      {/* Currency toggle — fixed left */}
      <div style={{
        padding: '0 12px',
        borderRight: '1px solid var(--border)',
        flexShrink: 0,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
        <CurrencyToggle compact={true} />
      </div>

      {/* Scrolling ticker */}
      <div className="ticker-outer">
        <div className="ticker-track">
          {/* Duplicate items for seamless loop */}
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="ticker-item"
              onClick={() => navigate('/terminal', { state: { asset: item.id } })}
            >
              <span style={{
                fontSize: 10,
                color: 'var(--text3)',
                fontFamily: 'Source Code Pro, monospace',
                letterSpacing: 1,
                fontWeight: 500,
              }}>{item.id}</span>
              <span style={{
                fontSize: 11,
                fontFamily: 'Source Code Pro, monospace',
                fontWeight: 500,
                color: item.loading ? 'var(--text4)' : 'var(--text)',
              }}>{item.display}</span>
              {item.chg && (
                <span style={{
                  fontSize: 10,
                  fontFamily: 'Source Code Pro, monospace',
                  fontWeight: 500,
                  color: item.dir === 'up' ? 'var(--green)' : 'var(--red)',
                }}>{item.chg}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live indicator — fixed right */}
      {lastUpdate && (
        <div style={{
          padding: '0 12px',
          borderLeft: '1px solid var(--border)',
          flexShrink: 0,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: '#2d9e5a',
            display: 'inline-block',
            animation: 'blink 1.5s infinite',
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: 9,
            color: 'var(--text4)',
            fontFamily: 'Source Code Pro, monospace',
            whiteSpace: 'nowrap',
          }}>
            {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      )}
    </div>
  )
}
