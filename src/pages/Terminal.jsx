import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ASSETS, NEWS, TWEETS } from '../data'

const MACRO = [
  { label: 'Fear & Greed', val: '72',    sub: 'Greed',      dir: 'up'   },
  { label: 'BTC dominance',val: '62.4%', sub: '▲ +0.8%',    dir: 'up'   },
  { label: 'Market cap',   val: '$3.42T',sub: '▲ +$84B',    dir: 'up'   },
  { label: 'Global M2',    val: '$108T', sub: 'Expanding',   dir: 'up'   },
  { label: 'DXY index',    val: '99.84', sub: '▼ Weakening', dir: 'down' },
  { label: 'US 10Y yield', val: '4.32%', sub: 'Stable',      dir: 'neu'  },
]

function sentColor(s) {
  if (s === 'Bullish') return { bg: 'var(--green-bg)', color: 'var(--green)' }
  if (s === 'Bearish') return { bg: 'var(--red-bg)',   color: 'var(--red)'   }
  return { bg: 'var(--off2)', color: 'var(--text3)' }
}

export default function Terminal() {
  const location = useLocation()
  const initId = location.state?.asset || 'BTC'
  const [selId, setSelId]     = useState(initId)
  const setTf = (val) => {
    setTf_state(val)
  }
  const [tf, setTf_state] = useState('60')
  const [sigOpen, setSigOpen] = useState(false)

  useEffect(() => {
    if (location.state?.asset) setSelId(location.state.asset)
  }, [location.state])

  const a = ASSETS[selId]

  const chartContainerRef = useRef(null)

  useEffect(() => {
    if (!chartContainerRef.current) return
    chartContainerRef.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: a.sym,
      interval: tf,
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      backgroundColor: '#f8f6f1',
      gridColor: '#e8e3d8',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      studies: ['RSI@tv-basicstudies', 'MACD@tv-basicstudies'],
      support_host: 'https://www.tradingview.com'
    })
    chartContainerRef.current.appendChild(script)
  }, [selId, tf])

  const cats = [
    { label: 'Cryptocurrency',     ids: ['BTC','ETH','SOL','HYPE'] },
    { label: 'Tokenized equities', ids: ['TSLA','NVDA','AMD']       },
    { label: 'Commodities & FX',   ids: ['GOLD','OIL']              },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 120px)' }}>

      {/* Sidebar */}
      <div style={{ background: 'var(--off)', borderRight: '1px solid var(--border)' }}>
        <div style={{ padding: '12px 16px', background: 'var(--navy)', borderBottom: '2px solid var(--gold2)' }}>
          <div style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, textTransform: 'uppercase' }}>Market overview</div>
        </div>
        {cats.map(cat => (
          <div key={cat.label} style={{ padding: '10px 0' }}>
            <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 2, textTransform: 'uppercase', padding: '4px 16px 8px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>{cat.label}</div>
            {cat.ids.map(id => {
              const d = ASSETS[id]
              const active = selId === id
              return (
                <button key={id} onClick={() => setSelId(id)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 16px', background: active ? 'var(--gold-light)' : 'transparent',
                  border: 'none', borderLeft: active ? '3px solid var(--gold2)' : '3px solid transparent',
                  cursor: 'pointer', textAlign: 'left', marginBottom: 2
                }}>
                  <div>
                    <div style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--text)' }}>{id}</div>
                    <div style={{ fontSize: 9, color: 'var(--text3)' }}>{d.name.split(' / ')[0]}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                    <span className={d.dir} style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{d.px}</span>
                    <span className={d.dir} style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace' }}>{d.chg}</span>
                    <span className={`sp sp-${d.sig === 'BUY' ? 'b' : d.sig === 'SELL' ? 's' : 'h'}`}>{d.sig}</span>
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--white)' }}>

        {/* Macro strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: 8 }}>
          {MACRO.map(m => (
            <div key={m.label} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: '2px solid var(--gold2)', padding: 12 }}>
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</div>
              <div className={m.dir} style={{ fontSize: 17, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--navy)', lineHeight: 1 }}>{m.val}</div>
              <div className={m.dir} style={{ fontSize: 9, marginTop: 3, fontFamily: 'Source Code Pro, monospace' }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: '2px solid var(--navy)' }}>
          <div style={{ padding: '12px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{a.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}>
                <span className={a.dir} style={{ fontSize: 18, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{a.px}</span>
                <span className={a.dir} style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace' }}>{a.chg}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[['1','1m'],['5','5m'],['15','15m'],['60','1H'],['240','4H'],['D','1D']].map(([v,l]) => (
                <button key={v} onClick={() => setTf_state(v)} style={{
                  background: tf === v ? 'var(--navy)' : 'var(--white)',
                  color: tf === v ? 'var(--gold3)' : 'var(--text3)',
                  border: '1px solid var(--border2)', padding: '4px 8px',
                  fontSize: 10, fontFamily: 'Source Code Pro, monospace', cursor: 'pointer'
                }}>{l}</button>
              ))}
            </div>
          </div>
          <div className="tradingview-widget-container" ref={chartContainerRef} style={{ width: '100%', height: 400 }}>
            <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }}></div>
          </div>
        </div>

        {/* Signal */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: '2px solid var(--gold2)' }}>
          <div style={{ padding: '12px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'var(--navy)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>AI Signal — {a.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, padding: '3px 8px', background: 'var(--green-bg)', color: 'var(--green)', border: '1px solid rgba(26,107,58,.2)' }}>Live — Pro</span>
              <button onClick={() => setSigOpen(o => !o)} style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)', padding: '4px 12px', fontSize: 10, fontFamily: 'Source Code Pro, monospace', cursor: 'pointer', letterSpacing: '.5px' }}>
                {sigOpen ? 'Hide detail ▲' : 'Show detail ▼'}
              </button>
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
              <span className={a.sig === 'BUY' ? 'up' : a.sig === 'SELL' ? 'down' : 'neu'}
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600 }}>{a.sig}</span>
              <span style={{ fontSize: 12, color: 'var(--text2)' }}>Confidence: {a.conf} · AI-generated · Updated 2 min ago</span>
            </div>
            {sigOpen && (
              <div style={{ background: 'var(--off)', border: '1px solid var(--border)', padding: 12 }} className="fade-in">
                {[['Direction', a.sd, a.sig === 'BUY' ? 'up' : a.sig === 'SELL' ? 'down' : ''],
                  ['Entry price', a.entry, ''], ['Stop loss', a.sl, 'down'], ['Take profit', a.tp, 'up'],
                  ['Risk / Reward', '2 : 1', 'up'],
                  ['AI reasoning', 'DXY weakening below 100, M2 expanding globally, BTC above 200D EMA, RSI neutral — room to run', '']
                ].map(([label, val, cls]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
                    <span style={{ color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: '.5px' }}>{label}</span>
                    <span className={cls} style={{ fontFamily: 'Source Code Pro, monospace', fontWeight: 500, maxWidth: 260, textAlign: 'right', lineHeight: 1.4 }}>{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Feeds */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[['News feed', NEWS, 'src', 'hl'], ['Market signals — X', TWEETS, 'handle', 'text']].map(([title, items, srcKey, textKey]) => (
            <div key={title} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: '2px solid var(--navy)' }}>
              <div style={{ padding: '10px 14px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, color: 'var(--navy)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>{title}</span>
                <span style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, padding: '2px 8px', background: 'rgba(232,160,32,.1)', color: '#8b6000', border: '1px solid rgba(232,160,32,.3)' }}>30 min delay — free</span>
              </div>
              <div style={{ padding: '0 14px' }}>
                {items.map((item, i) => {
                  const sc = sentColor(item.sent)
                  return (
                    <div key={i} style={{ padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <div style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', color: 'var(--gold2)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>{item[srcKey]}</div>
                      <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.45, margin: '3px 0' }}>{item[textKey]}</div>
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
