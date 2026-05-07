import { useState, useEffect, useRef, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { ALL_ASSETS, CRYPTO, EQUITIES, COMMODITIES, FOREX, INDICES, ASSET_META, RATES, TWEETS } from '../assets'
import { usePrices }   from '../context/PricesContext'
import { useCurrency } from '../context/CurrencyContext'
import { useNews }     from '../context/NewsContext'
import { useMacro }    from '../context/MacroContext'

function sentColor(s) {
  if (s === 'Bullish') return { bg: 'var(--green-bg)', color: 'var(--green)' }
  if (s === 'Bearish') return { bg: 'var(--red-bg)',   color: 'var(--red)'   }
  return { bg: 'var(--off2)', color: 'var(--text3)' }
}

function fmtPrice(usd, currency) {
  if (usd == null) return '—'
  const { symbol, rate } = RATES[currency]
  const v = usd * rate
  if (v >= 10000) return `${symbol}${Math.round(v).toLocaleString()}`
  if (v >= 1)     return `${symbol}${v.toFixed(2)}`
  if (v >= 0.01)  return `${symbol}${v.toFixed(4)}`
  return `${symbol}${v.toFixed(6)}`
}

const TABS      = ['All', 'Crypto', 'Equities', 'Commodities', 'Forex', 'Indices']
const TAB_DATA  = {
  All:         ALL_ASSETS,
  Crypto:      CRYPTO.map(a      => ({ ...a, cat: 'Crypto'      })),
  Equities:    EQUITIES.map(a    => ({ ...a, cat: 'Equities'    })),
  Commodities: COMMODITIES.map(a => ({ ...a, cat: 'Commodities' })),
  Forex:       FOREX.map(a       => ({ ...a, cat: 'Forex'       })),
  Indices:     INDICES.map(a     => ({ ...a, cat: 'Indices'     })),
}
const NEWS_CATS = ['All', 'Crypto', 'Markets', 'Stocks', 'Macro', 'Commodities']
const REDDIT_TABS = ['All', 'r/wallstreetbets', 'r/CryptoCurrency', 'r/investing', 'r/Bitcoin', 'r/stocks']

export default function Terminal() {
  const location = useLocation()
  const { prices, loading: pricesLoading, lastUpdate } = usePrices()
  const { currency }   = useCurrency()
  const { news, loading: newsLoading, lastUpdate: newsUpdate } = useNews()
  const { fearGreed, globalCrypto, reddit, loading: macroLoading } = useMacro()

  const [selId, setSelId]     = useState(location.state?.asset || 'BTC')
  const [tf, setTf]           = useState('60')
  const [sigOpen, setSigOpen] = useState(false)
  const [tab, setTab]         = useState('Crypto')
  const [newsTab, setNewsTab] = useState('All')
  const [redditTab, setRedditTab] = useState('All')
  const [feedView, setFeedView]   = useState('news') // 'news' | 'reddit' | 'x'
  const [search, setSearch]   = useState('')
  const chartRef              = useRef(null)

  useEffect(() => {
    if (location.state?.asset) setSelId(location.state.asset)
  }, [location.state])

  const selAsset = useMemo(() => ALL_ASSETS.find(a => a.id === selId) || ALL_ASSETS[0], [selId])
  const liveP    = prices[selId]
  const liveUSD  = liveP?.usd
  const livePx   = fmtPrice(liveUSD, currency)
  const liveChg  = liveP?.chg ?? '—'
  const liveDir  = liveP?.dir ?? 'up'
  const meta     = ASSET_META[selId] || { sig: 'HOLD', conf: '60%', sd: 'Neutral' }
  const sigClass = meta.sig === 'BUY' ? 'up' : meta.sig === 'SELL' ? 'down' : 'neu'

  const entryLive = liveUSD ? fmtPrice(liveUSD * 0.997, currency) : '—'
  const slLive    = liveUSD ? `${fmtPrice(liveUSD * 0.970, currency)} (-3%)` : '—'
  const tpLive    = liveUSD ? `${fmtPrice(liveUSD * 1.060, currency)} (+6%)` : '—'

  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return ALL_ASSETS.filter(a =>
      a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)
    ).slice(0, 12)
  }, [search])

  const tabAssets = useMemo(() => TAB_DATA[tab] || ALL_ASSETS, [tab])

  const filteredNews = useMemo(() => {
    if (newsTab === 'All') return news.slice(0, 30)
    return news.filter(n => n.cat === newsTab).slice(0, 20)
  }, [news, newsTab])

  const filteredReddit = useMemo(() => {
    if (redditTab === 'All') return reddit.posts.slice(0, 20)
    return reddit.posts.filter(p => p.sub === redditTab).slice(0, 15)
  }, [reddit.posts, redditTab])

  useEffect(() => {
    if (!chartRef.current) return
    chartRef.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true, symbol: selAsset.sym, interval: tf,
      timezone: 'Etc/UTC', theme: 'light', style: '1', locale: 'en',
      backgroundColor: '#ffffff', currency_id: 'USD',
      hide_top_toolbar: false, hide_legend: false, save_image: false,
      studies: ['RSI@tv-basicstudies', 'MACD@tv-basicstudies'],
      support_host: 'https://www.tradingview.com'
    })
    chartRef.current.appendChild(script)
  }, [selId, tf])

  const selectAsset = (id) => { setSelId(id); setSearch('') }

  // Build macro strip with live data
  const macroStrip = [
    {
      label: 'Fear & Greed',
      val:   fearGreed ? String(fearGreed.value) : '—',
      sub:   fearGreed ? fearGreed.label : 'Loading...',
      dir:   fearGreed ? fearGreed.dir : 'neu',
    },
    {
      label: 'BTC dom.',
      val:   globalCrypto ? `${globalCrypto.btcDominance}%` : '—',
      sub:   globalCrypto?.marketCapDir === 'up' ? '▲ Rising' : '▼ Falling',
      dir:   globalCrypto?.marketCapDir ?? 'neu',
    },
    {
      label: 'Total mkt cap',
      val:   globalCrypto ? globalCrypto.totalMarketCapFormatted : '—',
      sub:   globalCrypto ? `${globalCrypto.marketCapChange24h >= 0 ? '▲' : '▼'} ${Math.abs(globalCrypto.marketCapChange24h ?? 0).toFixed(2)}% 24h` : '',
      dir:   (globalCrypto?.marketCapChange24h ?? 0) >= 0 ? 'up' : 'down',
    },
    {
      label: 'WSB Sentiment',
      val:   reddit.sentiment ? `${reddit.sentiment.score}%` : '—',
      sub:   reddit.sentiment ? reddit.sentiment.label : 'Loading...',
      dir:   reddit.sentiment?.dir ?? 'neu',
    },
    {
      label: 'DXY',
      val:   prices.DXY?.usd ? prices.DXY.usd.toFixed(2) : '—',
      sub:   prices.DXY?.chg ?? '24h chg',
      dir:   prices.DXY?.dir ?? 'up',
    },
    {
      label: 'US 10Y',
      val:   prices.US10Y?.usd ? `${prices.US10Y.usd.toFixed(2)}%` : '—',
      sub:   prices.US10Y?.chg ?? 'Yield',
      dir:   prices.US10Y?.dir ?? 'neu',
    },
    {
      label: 'VIX',
      val:   prices.VIX?.usd ? prices.VIX.usd.toFixed(2) : '—',
      sub:   prices.VIX?.chg ?? 'Volatility',
      dir:   prices.VIX?.dir ?? 'neu',
    },
  ]

  return (
    <div className="terminal-layout" style={{ display: 'flex', height: 'calc(100vh - 112px)', overflow: 'hidden', background: 'var(--white)' }}>

      {/* ── SIDEBAR ── */}
      <div className="terminal-sidebar" style={{ width: 240, background: 'var(--off)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

        {/* Search */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', background: 'var(--white)', flexShrink: 0, position: 'relative' }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search any asset..."
            style={{ width: '100%', background: 'var(--off)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '7px 28px 7px 28px', fontSize: 11, fontFamily: 'Source Code Pro, monospace', outline: 'none', borderRadius: 3 }}
          />
          <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--text3)' }}>⌕</span>
          {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 16 }}>×</button>}

          {searchResults.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--white)', border: '1px solid var(--border2)', borderTop: 'none', zIndex: 200, maxHeight: 300, overflowY: 'auto', boxShadow: '0 4px 16px rgba(0,0,0,.12)' }}>
              {searchResults.map(a => {
                const lp = prices[a.id]
                return (
                  <button key={a.id} onClick={() => selectAsset(a.id)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 12px', background: selId === a.id ? 'var(--gold-light)' : 'transparent',
                    border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left'
                  }}>
                    <div>
                      <div style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 700, color: 'var(--navy)' }}>{a.id}</div>
                      <div style={{ fontSize: 9, color: 'var(--text3)' }}>{a.name} · {a.cat}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className={lp?.dir ?? 'up'} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{lp ? fmtPrice(lp.usd, currency) : '—'}</div>
                      {lp?.chg && <div className={lp.dir} style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace' }}>{lp.chg}</div>}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: '6px 8px', borderBottom: '1px solid var(--border)', background: 'var(--off)', flexShrink: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? 'var(--navy)' : 'transparent',
              color: tab === t ? 'var(--gold3)' : 'var(--text3)',
              border: `1px solid ${tab === t ? 'var(--navy)' : 'var(--border)'}`,
              padding: '3px 7px', fontSize: 9, fontFamily: 'Source Code Pro, monospace',
              cursor: 'pointer', borderRadius: 2, letterSpacing: '.5px'
            }}>{t}</button>
          ))}
        </div>

        {/* Asset count */}
        <div style={{ padding: '5px 12px', fontSize: 8, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace', borderBottom: '1px solid var(--border)', background: 'var(--off)', flexShrink: 0 }}>
          {tabAssets.length} assets · {lastUpdate ? `Live · ${lastUpdate.toLocaleTimeString()}` : 'Loading...'}
        </div>

        {/* Asset list */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {tabAssets.map(a => {
            const lp     = prices[a.id]
            const active = selId === a.id
            const sig    = ASSET_META[a.id]?.sig || a.sig || 'HOLD'
            return (
              <button key={`${a.id}-${a.cat}`} onClick={() => selectAsset(a.id)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 12px', background: active ? 'var(--gold-light)' : 'transparent',
                border: 'none', borderLeft: `3px solid ${active ? 'var(--gold2)' : 'transparent'}`,
                borderBottom: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left'
              }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 11, fontFamily: 'Source Code Pro, monospace', fontWeight: 600, color: 'var(--navy)' }}>{a.id}</span>
                    <span style={{ fontSize: 8, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace' }}>{a.cat}</span>
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 130 }}>{a.name}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
                  <span className={lp?.dir ?? 'up'} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>
                    {pricesLoading && !lp ? '...' : (lp ? fmtPrice(lp.usd, currency) : '—')}
                  </span>
                  {lp?.chg && <span className={lp.dir} style={{ fontSize: 8, fontFamily: 'Source Code Pro, monospace' }}>{lp.chg}</span>}
                  <span className={`sp sp-${sig === 'BUY' ? 'b' : sig === 'SELL' ? 's' : 'h'}`} style={{ fontSize: 7, padding: '1px 4px' }}>{sig}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── MAIN PANEL ── */}
      <div className="terminal-right" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Live macro strip */}
        <div className="macro-strip" style={{ display: 'flex', borderBottom: '2px solid var(--gold2)', flexShrink: 0, background: 'var(--off)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {macroStrip.map((m, i) => (
            <div key={m.label} style={{ flex: 1, minWidth: 90, padding: '7px 10px', textAlign: 'center', borderRight: i < macroStrip.length - 1 ? '1px solid var(--border)' : 'none', flexShrink: 0 }}>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{m.label}</div>
              <div className={m.dir} style={{ fontSize: 13, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, lineHeight: 1 }}>{m.val}</div>
              <div className={m.dir} style={{ fontSize: 8, marginTop: 1, fontFamily: 'Source Code Pro, monospace' }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart header */}
        <div style={{ padding: '10px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, gap: 8, position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{selAsset.name}</span>
                <span style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', border: '1px solid var(--border)', padding: '1px 6px' }}>{selAsset.cat}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <span className={liveDir} style={{ fontSize: 18, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>{pricesLoading && !liveUSD ? 'Loading...' : livePx}</span>
                <span className={liveDir} style={{ fontSize: 10, fontFamily: 'Source Code Pro, monospace' }}>{liveChg}</span>
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 14 }}>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>AI Signal</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className={sigClass} style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600 }}>{meta.sig}</span>
                <span style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace' }}>{meta.conf}</span>
                <button onClick={() => setSigOpen(o => !o)} style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)', padding: '2px 8px', fontSize: 9, fontFamily: 'Source Code Pro, monospace', cursor: 'pointer' }}>
                  {sigOpen ? 'Hide ▲' : 'Detail ▼'}
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[['1','1m'],['5','5m'],['15','15m'],['60','1H'],['240','4H'],['D','1D'],['W','1W']].map(([v,l]) => (
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
            {[['Direction',meta.sd,sigClass],['Entry',entryLive,''],['Stop loss',slLive,'down'],['Take profit',tpLive,'up'],['Risk/reward','2:1','up'],['Confidence',meta.conf,'up']].map(([label,val,cls]) => (
              <div key={label}>
                <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                <div className={cls} style={{ fontSize: 12, fontFamily: 'Source Code Pro, monospace', fontWeight: 500, color: 'var(--navy)' }}>{val}</div>
              </div>
            ))}
          </div>
        )}

        {/* Full height chart */}
        <div ref={chartRef} className="tradingview-widget-container terminal-chart"
          style={{ width: '100%', height: 'calc(100vh - 240px)', minHeight: 400, flexShrink: 0 }}>
          <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }} />
        </div>

        {/* ── INTELLIGENCE FEEDS ── */}
        <div style={{ borderTop: '2px solid var(--navy)', flexShrink: 0 }}>

          {/* Feed selector tabs */}
          <div style={{ padding: '10px 16px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[['news','📰 News'],['reddit','🔴 Reddit / WSB'],['x','𝕏 Signals']].map(([v,l]) => (
                <button key={v} onClick={() => setFeedView(v)} style={{
                  background: feedView === v ? 'var(--navy)' : 'transparent',
                  color: feedView === v ? 'var(--gold3)' : 'var(--text3)',
                  border: `1px solid ${feedView === v ? 'var(--navy)' : 'var(--border)'}`,
                  padding: '5px 12px', fontSize: 10, fontFamily: 'Source Code Pro, monospace',
                  cursor: 'pointer', letterSpacing: '.5px'
                }}>{l}</button>
              ))}
            </div>

            {/* Sub-tabs */}
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {feedView === 'news' && NEWS_CATS.map(c => (
                <button key={c} onClick={() => setNewsTab(c)} style={{
                  background: newsTab === c ? 'var(--gold-light)' : 'transparent',
                  color: newsTab === c ? 'var(--navy)' : 'var(--text3)',
                  border: `1px solid ${newsTab === c ? 'var(--gold2)' : 'var(--border)'}`,
                  padding: '3px 8px', fontSize: 9, fontFamily: 'Source Code Pro, monospace', cursor: 'pointer', borderRadius: 2
                }}>{c}</button>
              ))}
              {feedView === 'reddit' && REDDIT_TABS.map(c => (
                <button key={c} onClick={() => setRedditTab(c)} style={{
                  background: redditTab === c ? 'var(--gold-light)' : 'transparent',
                  color: redditTab === c ? 'var(--navy)' : 'var(--text3)',
                  border: `1px solid ${redditTab === c ? 'var(--gold2)' : 'var(--border)'}`,
                  padding: '3px 8px', fontSize: 9, fontFamily: 'Source Code Pro, monospace', cursor: 'pointer', borderRadius: 2
                }}>{c}</button>
              ))}
            </div>
          </div>

          {/* ── NEWS FEED ── */}
          {feedView === 'news' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="terminal-feeds">
              <div style={{ borderRight: '1px solid var(--border)', maxHeight: 500, overflowY: 'auto' }}>
                <div style={{ padding: '8px 14px', background: 'var(--off)', borderBottom: '1px solid var(--border)', fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', position: 'sticky', top: 0 }}>
                  {newsLoading ? 'Fetching news...' : `${news.length} stories from 17 sources · ${newsUpdate ? newsUpdate.toLocaleTimeString() : ''}`}
                </div>
                <div style={{ padding: '0 14px' }}>
                  {filteredNews.map((item, i) => {
                    const sc = sentColor(item.sent)
                    return (
                      <div key={i} style={{ padding: '10px 0', borderBottom: i < filteredNews.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <span style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', color: 'var(--gold2)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>{item.src}</span>
                          {item.cat && <span style={{ fontSize: 8, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace', border: '1px solid var(--border)', padding: '0 4px' }}>{item.cat}</span>}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5, marginBottom: 4 }}>
                          {item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color='var(--navy)'} onMouseLeave={e => e.target.style.color='inherit'}>{item.hl}</a> : item.hl}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 9, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace' }}>{item.time}</span>
                          <span style={{ fontSize: 9, padding: '1px 6px', fontFamily: 'Source Code Pro, monospace', fontWeight: 500, background: sc.bg, color: sc.color }}>{item.sent}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                <div style={{ padding: '8px 14px', background: 'var(--off)', borderBottom: '1px solid var(--border)', fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', position: 'sticky', top: 0 }}>
                  Sentiment breakdown
                </div>
                {fearGreed && (
                  <div style={{ padding: '14px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Fear & Greed Index — Live</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 600, color: fearGreed.color }}>{fearGreed.value}</span>
                      <span style={{ fontSize: 12, color: fearGreed.color, fontFamily: 'Source Code Pro, monospace' }}>{fearGreed.label}</span>
                    </div>
                    <div style={{ height: 8, background: 'linear-gradient(90deg,#8b1a1a,#e05252,#b8952e,#1a6b3a)', borderRadius: 4, marginBottom: 4, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: -2, width: 12, height: 12, background: 'var(--navy)', borderRadius: '50%', left: `calc(${fearGreed.value}% - 6px)`, border: '2px solid white' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace' }}>
                      <span>Extreme Fear</span><span>Extreme Greed</span>
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 6, fontFamily: 'Source Code Pro, monospace' }}>Change: {fearGreed.change}</div>
                  </div>
                )}
                {reddit.sentiment && (
                  <div style={{ padding: '14px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Reddit sentiment — Live</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                      <span className={reddit.sentiment.dir} style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600 }}>{reddit.sentiment.score}%</span>
                      <span className={reddit.sentiment.dir} style={{ fontSize: 12, fontFamily: 'Source Code Pro, monospace' }}>{reddit.sentiment.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 12, fontSize: 10, fontFamily: 'Source Code Pro, monospace' }}>
                      <span className="up">▲ {reddit.sentiment.bulls} bullish</span>
                      <span className="down">▼ {reddit.sentiment.bears} bearish</span>
                      <span style={{ color: 'var(--text3)' }}>→ {reddit.sentiment.neutral} neutral</span>
                    </div>
                  </div>
                )}
                {globalCrypto && (
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Crypto market — Live</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        ['BTC dominance', `${globalCrypto.btcDominance}%`],
                        ['ETH dominance', `${globalCrypto.ethDominance}%`],
                        ['Total market cap', globalCrypto.totalMarketCapFormatted],
                        ['24h change', `${globalCrypto.marketCapChange24h >= 0 ? '▲' : '▼'} ${Math.abs(globalCrypto.marketCapChange24h).toFixed(2)}%`],
                        ['Active cryptos', globalCrypto.activeCryptos?.toLocaleString()],
                      ].map(([label, val]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'Source Code Pro, monospace', padding: '3px 0', borderBottom: '1px solid var(--border)' }}>
                          <span style={{ color: 'var(--text3)' }}>{label}</span>
                          <span style={{ color: 'var(--navy)', fontWeight: 500 }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── REDDIT FEED ── */}
          {feedView === 'reddit' && (
            <div style={{ maxHeight: 500, overflowY: 'auto' }}>
              <div style={{ padding: '8px 14px', background: 'var(--off)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0 }}>
                <span style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>
                  {reddit.posts.length} posts from 6 subreddits
                </span>
                {reddit.sentiment && (
                  <span className={reddit.sentiment.dir} style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', fontWeight: 500 }}>
                    Overall: {reddit.sentiment.label} ({reddit.sentiment.score}%)
                  </span>
                )}
              </div>
              <div style={{ padding: '0 14px' }}>
                {filteredReddit.map((post, i) => {
                  const sc = sentColor(post.sent)
                  return (
                    <div key={i} style={{ padding: '10px 0', borderBottom: i < filteredReddit.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', color: '#ff4500', fontWeight: 600 }}>{post.sub}</span>
                        {post.flair && <span style={{ fontSize: 8, color: 'var(--text4)', border: '1px solid var(--border)', padding: '0 4px', fontFamily: 'Source Code Pro, monospace' }}>{post.flair}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5, marginBottom: 4 }}>
                        <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color='var(--navy)'} onMouseLeave={e => e.target.style.color='inherit'}>
                          {post.title}
                        </a>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 9, fontFamily: 'Source Code Pro, monospace' }}>
                        <span style={{ color: 'var(--text4)' }}>{post.time}</span>
                        <span style={{ color: 'var(--green)' }}>▲ {post.score?.toLocaleString()}</span>
                        <span style={{ color: 'var(--text4)' }}>💬 {post.comments}</span>
                        <span style={{ padding: '1px 6px', background: sc.bg, color: sc.color, fontWeight: 500 }}>{post.sent}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── X SIGNALS ── */}
          {feedView === 'x' && (
            <div style={{ maxHeight: 500, overflowY: 'auto', padding: '0 14px' }}>
              <div style={{ padding: '8px 0', fontSize: 9, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                Monitored accounts: @elonmusk · @realDonaldTrump · @zerohedge · @truflation · @eWhispers · @WatcherGuru · @CoinBureau · @inversebrah · @AltcoinGordon · @Hyperliquid_X
              </div>
              {TWEETS.map((item, i) => {
                const sc = sentColor(item.sent)
                return (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i < TWEETS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ fontSize: 9, fontFamily: 'Source Code Pro, monospace', color: 'var(--gold2)', letterSpacing: 1, fontWeight: 500, marginBottom: 3 }}>{item.handle}</div>
                    <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5, marginBottom: 4 }}>{item.text}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 9, color: 'var(--text4)', fontFamily: 'Source Code Pro, monospace' }}>{item.time}</span>
                      <span style={{ fontSize: 9, padding: '1px 6px', fontFamily: 'Source Code Pro, monospace', fontWeight: 500, background: sc.bg, color: sc.color }}>{item.sent}</span>
                    </div>
                  </div>
                )
              })}
              <div style={{ padding: '12px 0', fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', lineHeight: 1.6, borderTop: '1px solid var(--border)' }}>
                Live X feed requires X API ($100/month). Showing curated signals. Will be wired when platform generates subscription revenue.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
