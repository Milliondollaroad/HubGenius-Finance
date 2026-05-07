import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ASSETS, NEWS, TWEETS } from '../data'

const MACRO = [
  { label: 'Fear & Greed', val: '72',    sub: 'Greed',    dir: 'up'   },
  { label: 'BTC dom.',     val: '62.4%', sub: '▲ +0.8%',  dir: 'up'   },
  { label: 'Mkt cap',      val: '$3.42T',sub: '▲ +$84B',  dir: 'up'   },
  { label: 'Global M2',    val: '$108T', sub: 'Expanding', dir: 'up'   },
  { label: 'DXY',          val: '99.84', sub: '▼ Weak',    dir: 'down' },
  { label: 'US 10Y',       val: '4.32%', sub: 'Stable',    dir: 'neu'  },
]

function sentColor(s) {
  if (s === 'Bullish') return { bg: 'var(--green-bg)', color: 'var(--green)' }
  if (s === 'Bearish') return { bg: 'var(--red-bg)',   color: 'var(--red)'   }
  return { bg: 'var(--off2)', color: 'var(--text3)' }
}

export default function Terminal() {
  const location = useLocation()
  const [selId, setSelId]     = useState(location.state?.asset || 'BTC')
  const [tf, setTf]           = useState('60')
  const [sigOpen, setSigOpen] = useState(false)
  const chartRef              = useRef(null)

  useEffect(() => {
    if (location.state?.asset) setSelId(location.state.asset)
  }, [location.state])

  const a = ASSETS[selId]

  useEffect(() => {
    if (!chartRef.current) return
    chartRef.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true, symbol: a.sym, interval: tf,
      timezone: 'Etc/UTC', theme: 'light', style: '1', locale: 'en',
      backgroundColor: '#ffffff', hide_top_toolbar: false,
      hide_legend: false, save_image: false,
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

      {/* Sidebar — desktop: vertical | mobile: horizontal scroll */}
      <div className="terminal-sidebar" style={{ width: 210, background: 'var(--off)', borderRight: '1px solid var(--border)', overflowY: 'auto', flexShrink: 0 }}>

        {/* Desktop sidebar header */}
        <div className="hide-mobile" style={{ padding: '9px 14px', background: 'var(--navy)', borderBottom: '2px solid var(--gold2)', position: 'sticky', top: 0 }}>
          <span style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, textTransform: 'uppercase' }}>Markets</span>
        </div>

        {/* Desktop asset list */}
        <div className="hide-mobile">
          {cats.map(cat => (
            <div key={cat.label} style={{ paddingBottom: 4 }}>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, textTransform: 'uppercase', padding: '8px 14px 5px', borderBottom: '1px solid var(--border)' }}>{cat.label}</div>
              {cat.ids.map(id => {
                const d = ASSETS[id]
                const active = selId === id
                return (
                  <button key={id} onClick={() => setSelId(id)} className={`terminal-asset-btn${active ? ' active' : ''}`} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '7px 14px', background: active ? 'var(--gold-light)' : 'transparent',
                    border: 'none', borderLeft: `3px solid ${active ? 'var(--gold2)' : 'transparent'}`,
                    cursor: 'pointer', textAlign: 'left'
                  }}>
                    <div>
                      <div style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--text)' }}>{id}</div>
                      <div style={{ fontSize: 8, color: 'var(--text3)', marginTop: 1 }}>{d.name.split('/')[0].trim()}</div>
                    </div>
                    <div className="terminal-asset-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                      <span className={d.dir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{d.px}</span>
                      <span className={d.dir} style={{ fontSize: 8, fontFamily: 'Source Code Pro, monospace' }}>{d.chg}</span>
                      <span className={`sp sp-${d.sig === 'BUY' ? 'b' : d.sig === 'SELL' ? 's' : 'h'}`} style={{ fontSize: 8, padding: '1px 5px' }}>{d.sig}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Mobile horizontal asset scroll */}
        <div className="hide-desktop terminal-sidebar-assets" style={{ display: 'flex', overflowX: 'auto', padding: 8, gap: 6, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {['BTC','ETH','SOL','HYPE','TSLA','NVDA','AMD','GOLD','OIL'].map(id => {
            const d = ASSETS[id]
            const active = selId === id
            return (
              <button key={id} onClick={() => setSelId(id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                minWidth: 68, padding: '8px 10px',
                background: active ? 'var(--gold-light)' : 'var(--white)',
                border: '1px solid var(--border)',
                borderBottom: `2px solid ${active ? 'var(--gold2)' : 'var(--border)'}`,
                cursor: 'pointer', flexShrink: 0, borderRadius: 4
              }}>
                <div style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 700, color: 'var(--navy)' }}>{id}</div>
                <div className={d.dir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, marginTop: 2 }}>{d.px}</div>
                <div className={d.dir} style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', marginTop: 1 }}>{d.chg}</div>
                <span className={`sp sp-${d.sig === 'BUY' ? 'b' : d.sig === 'SELL' ? 's' : 'h'}`} style={{ fontSize: 8, padding: '1px 5px', marginTop: 3 }}>{d.sig}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right panel */}
      <div className="terminal-right" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Macro strip */}
        <div className="macro-strip" style={{ display: 'flex', borderBottom: '2px solid var(--gold2)', flexShrink: 0, background: 'var(--off)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {MACRO.map((m, i) => (
            <div key={m.label} style={{ flex: 1, minWidth: 80, padding: '7px 10px', textAlign: 'center', borderRight: i < MACRO.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{m.label}</div>
              <div className={m.dir} style={{ fontSize: 13, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, lineHeight: 1 }}>{m.val}</div>
              <div className={m.dir} style={{ fontSize: 8, marginTop: 1, fontFamily: 'Source Code Pro, monospace' }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart header */}
        <div className="terminal-chart-header" style={{ padding: '10px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, gap: 8, position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{a.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 1 }}>
                <span className={a.dir} style={{ fontSize: 17, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{a.px}</span>
                <span className={a.dir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace' }}>{a.chg}</span>
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 12 }}>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>AI Signal</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className={a.sig === 'BUY' ? 'up' : a.sig === 'SELL' ? 'down' : 'neu'}
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600 }}>{a.sig}</span>
                <span style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace' }}>{a.conf}</span>
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
          <div className="signal-detail-grid" style={{ background: 'var(--gold-light)', borderBottom: '1px solid var(--gold3)', padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 12, flexShrink: 0 }} className="fade-in">
            {[['Direction',a.sd,a.sig==='BUY'?'up':a.sig==='SELL'?'down':''],
              ['Entry',a.entry,''],['Stop loss',a.sl,'down'],
              ['Take profit',a.tp,'up'],['Risk/reward','2:1','up'],['Confidence',a.conf,'up']
            ].map(([label,val,cls]) => (
              <div key={label}>
                <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                <div className={cls} style={{ fontSize: 12, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--navy)' }}>{val}</div>
              </div>
            ))}
          </div>
        )}

        {/* Chart — full height on desktop, fixed on mobile */}
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
