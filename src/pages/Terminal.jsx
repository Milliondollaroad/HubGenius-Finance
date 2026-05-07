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
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', overflow: 'hidden', background: 'var(--white)' }}>

      {/* Compact macro strip */}
      <div style={{ display: 'flex', borderBottom: '2px solid var(--gold2)', flexShrink: 0, background: 'var(--off)' }}>
        {MACRO.map((m, i) => (
          <div key={m.label} style={{ flex: 1, padding: '7px 10px', textAlign: 'center', borderRight: i < MACRO.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{m.label}</div>
            <div className={m.dir} style={{ fontSize: 13, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, lineHeight: 1 }}>{m.val}</div>
            <div className={m.dir} style={{ fontSize: 8, marginTop: 1, fontFamily: 'Source Code Pro, monospace' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        <div style={{ width: 210, background: 'var(--off)', borderRight: '1px solid var(--border)', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ padding: '9px 14px', background: 'var(--navy)', borderBottom: '2px solid var(--gold2)', position: 'sticky', top: 0 }}>
            <span style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, textTransform: 'uppercase' }}>Markets</span>
          </div>
          {cats.map(cat => (
            <div key={cat.label} style={{ paddingBottom: 4 }}>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, textTransform: 'uppercase', padding: '8px 14px 5px', borderBottom: '1px solid var(--border)' }}>{cat.label}</div>
              {cat.ids.map(id => {
                const d = ASSETS[id]
                const active = selId === id
                return (
                  <button key={id} onClick={() => setSelId(id)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '7px 14px', background: active ? 'var(--gold-light)' : 'transparent',
                    border: 'none', borderLeft: `3px solid ${active ? 'var(--gold2)' : 'transparent'}`,
                    cursor: 'pointer', textAlign: 'left'
                  }}>
                    <div>
                      <div style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--text)' }}>{id}</div>
                      <div style={{ fontSize: 8, color: 'var(--text3)', marginTop: 1 }}>{d.name.split('/')[0].trim()}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
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

        {/* Right — scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

          {/* Chart header bar */}
          <div style={{ padding: '10px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, flexWrap: 'wrap', gap: 8, position: 'sticky', top: 0, zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{a.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 1 }}>
                  <span className={a.dir} style={{ fontSize: 17, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{a.px}</span>
                  <span className={a.dir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace' }}>{a.chg}</span>
                </div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
                <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>AI Signal</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={a.sig === 'BUY' ? 'up' : a.sig === 'SELL' ? 'down' : 'neu'}
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600 }}>{a.sig}</span>
                  <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace' }}>{a.conf}</span>
                  <button onClick={() => setSigOpen(o => !o)} style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)', padding: '2px 8px', fontSize: 9, fontFamily: 'Source Code Pro, monospace', cursor: 'pointer' }}>
                    {sigOpen ? 'Hide ▲' : 'Detail ▼'}
                  </button>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 2 }}>
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

          {/* Signal detail expandable */}
          {sigOpen && (
            <div style={{ background: 'var(--gold-light)', borderBottom: '1px solid var(--gold3)', padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16, flexShrink: 0 }} className="fade-in">
              {[['Direction',a.sd,a.sig==='BUY'?'up':a.sig==='SELL'?'down':''],
                ['Entry',a.entry,''],['Stop loss',a.sl,'down'],
                ['Take profit',a.tp,'up'],['Risk/reward','2 : 1','up'],['Confidence',a.conf,'up']
              ].map(([label,val,cls]) => (
                <div key={label}>
                  <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                  <div className={cls} style={{ fontSize: 13, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--navy)' }}>{val}</div>
                </div>
              ))}
            </div>
          )}

          {/* FULL HEIGHT CHART */}
          <div ref={chartRef} className="tradingview-widget-container"
            style={{ width: '100%', height: 'calc(100vh - 240px)', minHeight: 500, flexShrink: 0 }}>
            <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }} />
          </div>

          {/* Scroll down for news */}
          <div style={{ textAlign: 'center', padding: '8px 0', background: 'var(--off)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1 }}>
            ↓ Scroll for news & market signals
          </div>

          {/* News + Feeds below chart */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flexShrink: 0 }}>
            {[['News feed', NEWS, 'src', 'hl'], ['Market signals — X', TWEETS, 'handle', 'text']].map(([title, items, srcKey, textKey], col) => (
              <div key={title} style={{ borderRight: col === 0 ? '1px solid var(--border)' : 'none', borderTop: '2px solid var(--navy)' }}>
                <div style={{ padding: '10px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: 'var(--navy)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>{title}</span>
                  <span style={{ fontSize: 8, fontFamily: 'Source Code Pro, monospace', padding: '2px 6px', background: 'rgba(232,160,32,.1)', color: '#8b6000', border: '1px solid rgba(232,160,32,.3)' }}>30 min delay</span>
                </div>
                <div style={{ padding: '0 16px' }}>
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
    </div>
  )
}
