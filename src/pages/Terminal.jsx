import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ASSET_BASE, NEWS, TWEETS, RATES } from '../data'
import { usePrices }   from '../context/PricesContext'
import { useCurrency } from '../context/CurrencyContext'
import { formatLivePrice } from '../utils'
import CurrencyToggle from '../components/CurrencyToggle'

function sentColor(s) {
  if (s === 'Bullish') return { bg: 'var(--green-bg)', color: 'var(--green)' }
  if (s === 'Bearish') return { bg: 'var(--red-bg)',   color: 'var(--red)'   }
  return { bg: 'var(--off2)', color: 'var(--text3)' }
}

const MACRO_STATIC = [
  { label: 'Fear & Greed', val: '47',    sub: 'Neutral',   dir: 'neu', live: false },
  { label: 'BTC dom.',     val: '62.4%', sub: '▲ +0.8%',   dir: 'up',  live: false },
  { label: 'Mkt cap',      val: '$3.2T', sub: 'Live data',  dir: 'up',  live: false },
  { label: 'Global M2',    val: '$108T', sub: 'Expanding',  dir: 'up',  live: false },
  { label: 'DXY',          val: null,    sub: '24h chg',    dir: 'up',  live: true, key: 'DXY'  },
  { label: 'US 10Y',       val: null,    sub: 'Yield',      dir: 'neu', live: true, key: 'US10Y'},
]

export default function Terminal() {
  const location          = useLocation()
  const { prices, loading, lastUpdate, refetch } = usePrices()
  const { currency }      = useCurrency()
  const [selId, setSelId] = useState(location.state?.asset || 'BTC')
  const [tf, setTf]       = useState('60')
  const [sigOpen, setSigOpen] = useState(false)
  const chartRef          = useRef(null)

  useEffect(() => {
    if (location.state?.asset) setSelId(location.state.asset)
  }, [location.state])

  const base   = ASSET_BASE[selId]
  const live   = prices[selId]
  const liveUSD = live?.usd
  const livePx  = formatLivePrice(liveUSD, currency)
  const liveChg = live?.chg ?? '—'
  const liveDir = live?.dir ?? 'up'

  // Compute entry/sl/tp from live price
  const { symbol } = RATES[currency]
  const rate = RATES[currency].rate
  const entryLive = liveUSD ? formatLivePrice(liveUSD * 0.997, currency) : base.entryUSD
  const slLive    = liveUSD ? `${formatLivePrice(liveUSD * 0.970, currency)} (-3.0%)` : '—'
  const tpLive    = liveUSD ? `${formatLivePrice(liveUSD * 1.060, currency)} (+6.0%)` : '—'

  useEffect(() => {
    if (!chartRef.current) return
    chartRef.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true, symbol: base.sym, interval: tf,
      timezone: 'Etc/UTC', theme: 'light', style: '1', locale: 'en',
      backgroundColor: '#ffffff', currency_id: 'USD',
      hide_top_toolbar: false, hide_legend: false, save_image: false,
      studies: ['RSI@tv-basicstudies', 'MACD@tv-basicstudies'],
      support_host: 'https://www.tradingview.com'
    })
    chartRef.current.appendChild(script)
  }, [selId, tf])

  const cats = [
    { label: 'Crypto',   ids: ['BTC','ETH','SOL','HYPE'] },
    { label: 'Equities', ids: ['TSLA','NVDA','AMD']       },
    { label: 'Macro',    ids: ['GOLD','OIL']              },
  ]

  return (
    <div className="terminal-layout" style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 112px)', overflow: 'hidden', background: 'var(--white)' }}>

      {/* Sidebar */}
      <div className="terminal-sidebar" style={{ width: 220, background: 'var(--off)', borderRight: '1px solid var(--border)', overflowY: 'auto', flexShrink: 0 }}>

        {/* Desktop */}
        <div className="hide-mobile">
          <div style={{ padding: '9px 14px', background: 'var(--navy)', borderBottom: '2px solid var(--gold2)', position: 'sticky', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, textTransform: 'uppercase' }}>Markets</span>
            {lastUpdate && <span style={{ fontSize: 8, color: 'rgba(255,255,255,.4)', fontFamily: 'Source Code Pro, monospace' }}>Live</span>}
          </div>
          {cats.map(cat => (
            <div key={cat.label} style={{ paddingBottom: 4 }}>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, textTransform: 'uppercase', padding: '8px 14px 5px', borderBottom: '1px solid var(--border)' }}>{cat.label}</div>
              {cat.ids.map(id => {
                const lp     = prices[id]
                const active = selId === id
                const px     = formatLivePrice(lp?.usd, currency)
                return (
                  <button key={id} onClick={() => setSelId(id)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '7px 14px', background: active ? 'var(--gold-light)' : 'transparent',
                    border: 'none', borderLeft: `3px solid ${active ? 'var(--gold2)' : 'transparent'}`,
                    cursor: 'pointer', textAlign: 'left'
                  }}>
                    <div>
                      <div style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--text)' }}>{id}</div>
                      <div style={{ fontSize: 8, color: 'var(--text3)', marginTop: 1 }}>{ASSET_BASE[id].name}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                      <span className={lp?.dir ?? 'up'} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>
                        {loading ? '...' : px}
                      </span>
                      {lp?.chg && <span className={lp.dir} style={{ fontSize: 8, fontFamily: 'Source Code Pro, monospace' }}>{lp.chg}</span>}
                      <span className={`sp sp-${ASSET_BASE[id].sig === 'BUY' ? 'b' : ASSET_BASE[id].sig === 'SELL' ? 's' : 'h'}`} style={{ fontSize: 8, padding: '1px 5px' }}>{ASSET_BASE[id].sig}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="hide-desktop" style={{ display: 'flex', overflowX: 'auto', padding: 8, gap: 6, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {['BTC','ETH','SOL','HYPE','TSLA','NVDA','AMD','GOLD','OIL'].map(id => {
            const lp     = prices[id]
            const active = selId === id
            const px     = formatLivePrice(lp?.usd, currency)
            return (
              <button key={id} onClick={() => setSelId(id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                minWidth: 72, padding: '8px 10px',
                background: active ? 'var(--gold-light)' : 'var(--white)',
                border: '1px solid var(--border)',
                borderBottom: `2px solid ${active ? 'var(--gold2)' : 'var(--border)'}`,
                cursor: 'pointer', flexShrink: 0, borderRadius: 4
              }}>
                <div style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 700, color: 'var(--navy)' }}>{id}</div>
                <div className={lp?.dir ?? 'up'} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, marginTop: 2 }}>{loading ? '...' : px}</div>
                {lp?.chg && <div className={lp.dir} style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', marginTop: 1 }}>{lp.chg}</div>}
                <span className={`sp sp-${ASSET_BASE[id].sig === 'BUY' ? 'b' : ASSET_BASE[id].sig === 'SELL' ? 's' : 'h'}`} style={{ fontSize: 8, padding: '1px 5px', marginTop: 3 }}>{ASSET_BASE[id].sig}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right panel */}
      <div className="terminal-right" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Macro strip */}
        <div className="macro-strip" style={{ display: 'flex', borderBottom: '2px solid var(--gold2)', flexShrink: 0, background: 'var(--off)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {MACRO_STATIC.map((m, i) => {
            const val = m.live ? (m.key === 'US10Y' ? (prices[m.key]?.usd ? `${prices[m.key].usd.toFixed(2)}%` : '—') : prices[m.key]?.usd?.toFixed(2) ?? '—') : m.val
            const dir = m.live ? (prices[m.key]?.dir ?? m.dir) : m.dir
            const sub = m.live ? (prices[m.key]?.chg ?? m.sub) : m.sub
            return (
              <div key={m.label} style={{ flex: 1, minWidth: 80, padding: '7px 10px', textAlign: 'center', borderRight: i < MACRO_STATIC.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{m.label}</div>
                <div className={dir} style={{ fontSize: 13, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, lineHeight: 1 }}>{val}</div>
                <div className={dir} style={{ fontSize: 8, marginTop: 1, fontFamily: 'Source Code Pro, monospace' }}>{sub}</div>
              </div>
            )
          })}
        </div>

        {/* Chart header */}
        <div style={{ padding: '10px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, gap: 8, position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{base.name} / {RATES[currency].label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 1 }}>
                <span className={liveDir} style={{ fontSize: 17, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{loading ? 'Loading...' : livePx}</span>
                <span className={liveDir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace' }}>{liveChg}</span>
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 12 }}>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>AI Signal</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className={base.sig === 'BUY' ? 'up' : base.sig === 'SELL' ? 'down' : 'neu'}
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600 }}>{base.sig}</span>
                <span style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace' }}>{base.conf}</span>
                <button onClick={() => setSigOpen(o => !o)} style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)', padding: '2px 8px', fontSize: 9, fontFamily: 'Source Code Pro, monospace', cursor: 'pointer' }}>
                  {sigOpen ? 'Hide ▲' : 'Detail ▼'}
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[['1','1m'],['5','5m'],['15','15m'],['60','1H'],['240','4H'],['D','1D']].map(([v,l]) => (
              <button key={v} onClick={() => setTf(v)} style={{
                background: tf === v ? 'var(--navy)' : 'var(--white)',
                color: tf === v ? 'var(--gold3)' : 'var(--text3)',
                border: '1px solid var(--border2)', padding: '4px 8px',
                fontSize: 10, fontFamily: 'Source Code Pro, monospace', cursor: 'pointer'
              }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Signal detail */}
        {sigOpen && (
          <div style={{ background: 'var(--gold-light)', borderBottom: '1px solid var(--gold3)', padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))', gap: 12, flexShrink: 0 }}>
            {[
              ['Direction',  base.sd,   base.sig === 'BUY' ? 'up' : base.sig === 'SELL' ? 'down' : ''],
              ['Entry',      entryLive, ''],
              ['Stop loss',  slLive,    'down'],
              ['Take profit',tpLive,    'up'],
              ['Risk/reward','2 : 1',   'up'],
              ['Confidence', base.conf, 'up'],
            ].map(([label, val, cls]) => (
              <div key={label}>
                <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                <div className={cls} style={{ fontSize: 12, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--navy)' }}>{val}</div>
              </div>
            ))}
          </div>
        )}

        {/* Full height chart */}
        <div ref={chartRef} className="tradingview-widget-container terminal-chart"
          style={{ width: '100%', height: 'calc(100vh - 240px)', minHeight: 320, flexShrink: 0 }}>
          <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }} />
        </div>

        {/* Scroll hint */}
        <div style={{ textAlign: 'center', padding: '7px 0', background: 'var(--off)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, flexShrink: 0 }}>
          ↓ Scroll for news & market signals
        </div>

        {/* Feeds */}
        <div className="terminal-feeds" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flexShrink: 0 }}>
          {[['News feed', NEWS, 'src', 'hl'], ['Market signals — X', TWEETS, 'handle', 'text']].map(([title, items, srcKey, textKey], col) => (
            <div key={title} style={{ borderRight: col === 0 ? '1px solid var(--border)' : 'none', borderTop: '2px solid var(--navy)' }}>
              <div style={{ padding: '10px 14px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, color: 'var(--navy)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>{title}</span>
                <span style={{ fontSize: 8, fontFamily: 'Source Code Pro, monospace', padding: '2px 6px', background: 'rgba(232,160,32,.1)', color: '#8b6000', border: '1px solid rgba(232,160,32,.3)' }}>30 min delay</span>
              </div>
              <div style={{ padding: '0 14px' }}>
                {items.map((item, i) => {
                  const sc = sentColor(item.sent)
                  return (
                    <div key={i} style={{ padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <div style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', color: 'var(--gold2)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500, marginBottom: 3 }}>{item[srcKey]}</div>
                      <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5, marginBottom: 4 }}>{item[textKey]}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 9, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace' }}>{item.time}</span>
                        <span style={{ fontSize: 9, padding: '1px 6px', fontFamily: 'Source Code Pro, monospace', fontWeight: 500, background: sc.bg, color: sc.color }}>{item.sent}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
