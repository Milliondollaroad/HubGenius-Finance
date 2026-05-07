import { useNavigate } from 'react-router-dom'
import { usePrices }   from '../context/PricesContext'
import { useCurrency } from '../context/CurrencyContext'
import { formatLivePrice } from '../utils'
import CurrencyToggle from './CurrencyToggle'

const TICKER_IDS = ['BTC','ETH','SOL','HYPE','TSLA','NVDA','AMD','GOLD','OIL']

export default function Ticker() {
  const navigate          = useNavigate()
  const { prices, loading, lastUpdate } = usePrices()
  const { currency }      = useCurrency()

  return (
    <div style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>

      {/* Currency toggle */}
      <div style={{ padding: '6px 12px', borderRight: '1px solid var(--border)', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <CurrencyToggle compact={true} />
      </div>

      {/* Live prices scroll */}
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto', padding: '7px 12px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', flex: 1, alignItems: 'center' }}>
        {TICKER_IDS.map((id, i) => {
          const p  = prices[id]
          const px = formatLivePrice(p?.usd, currency)
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
              {i > 0 && <span style={{ width: 1, height: 14, background: 'var(--border2)', flexShrink: 0, marginRight: 0 }} />}
              <div onClick={() => navigate('/terminal', { state: { asset: id } })}
                style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0, paddingRight: 16 }}>
                <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, fontWeight: 500 }}>{id}</span>
                <span style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: loading ? 'var(--text4)' : 'var(--text)' }}>
                  {loading ? '...' : px}
                </span>
                {!loading && p?.chg && (
                  <span className={p.dir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{p.chg}</span>
                )}
              </div>
            </div>
          )
        })}

        {/* DXY */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <span style={{ width: 1, height: 14, background: 'var(--border2)', flexShrink: 0 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, paddingRight: 16 }}>
            <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, fontWeight: 500 }}>DXY</span>
            <span style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--text)' }}>
              {loading ? '...' : prices.DXY?.usd?.toFixed(2) ?? '—'}
            </span>
            {!loading && prices.DXY?.chg && (
              <span className={prices.DXY.dir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{prices.DXY.chg}</span>
            )}
          </div>
        </div>

        {/* US10Y */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <span style={{ width: 1, height: 14, background: 'var(--border2)', flexShrink: 0 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, fontWeight: 500 }}>US10Y</span>
            <span style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--text)' }}>
              {loading ? '...' : prices.US10Y?.usd ? `${prices.US10Y.usd.toFixed(2)}%` : '—'}
            </span>
          </div>
        </div>

        {/* Last update */}
        {lastUpdate && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <span style={{ width: 1, height: 14, background: 'var(--border2)', flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace', paddingLeft: 8 }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: 'var(--green-mid)', marginRight: 4, verticalAlign: 'middle', animation: 'blink 1.5s infinite' }} />
              Live · {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
