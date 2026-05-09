import { useNavigate } from 'react-router-dom'
import { usePrices }   from '../context/PricesContext'
import { useCurrency } from '../context/CurrencyContext'
import { RATES }       from '../assets'
import CurrencyToggle  from './CurrencyToggle'

const FEATURED = ['BTC','ETH','SOL','TSLA','NVDA','GOLD','OIL','SPX','DXY','US10Y','AAPL','MSFT','BNB','DOGE','ADA']

function fmtPrice(usd, currency) {
  if (usd == null) return '...'
  const { symbol, rate } = RATES[currency]
  const v = usd * rate
  if (v >= 10000) return `${symbol}${Math.round(v).toLocaleString()}`
  if (v >= 1)     return `${symbol}${v.toFixed(2)}`
  return `${symbol}${v.toFixed(4)}`
}

const CSS = `
  @keyframes tickerMove { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
  .tkr-belt { display:flex; align-items:center; animation:tickerMove 35s linear infinite; will-change:transform; }
  .tkr-belt:hover { animation-play-state:paused; }
  .tkr-cell { display:inline-flex; align-items:center; gap:5px; padding:0 18px; border-right:1px solid var(--border); cursor:pointer; white-space:nowrap; height:36px; transition:background 0.15s; flex-shrink:0; }
  .tkr-cell:hover { background:rgba(184,149,46,0.07); }
`

export default function Ticker() {
  const navigate = useNavigate()
  const { prices, loading, lastUpdate } = usePrices()
  const { currency } = useCurrency()

  const items = FEATURED.map(id => {
    const p = prices[id]
    const noConvert = ['DXY','US10Y'].includes(id)
    const display = noConvert && p?.usd
      ? (id === 'US10Y' ? `${p.usd.toFixed(2)}%` : p.usd.toFixed(2))
      : fmtPrice(p?.usd, currency)
    return { id, display, chg: p?.chg, dir: p?.dir }
  })

  const Cell = ({ item, prefix }) => (
    <div key={prefix + item.id} className="tkr-cell" onClick={() => navigate('/terminal', { state: { asset: item.id } })}>
      <span style={{ fontSize:10, color:'var(--text3)', fontFamily:'Source Code Pro,monospace', letterSpacing:1, fontWeight:500 }}>{item.id}</span>
      <span style={{ fontSize:11, fontFamily:'Source Code Pro,monospace', fontWeight:500, color:'var(--text)' }}>{item.display}</span>
      {item.chg && <span style={{ fontSize:10, fontFamily:'Source Code Pro,monospace', color: item.dir==='up' ? 'var(--green)' : 'var(--red)' }}>{item.chg}</span>}
    </div>
  )

  return (
    <div style={{ background:'var(--off)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', height:36, overflow:'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{ padding:'0 10px', borderRight:'2px solid var(--border2)', flexShrink:0, height:'100%', display:'flex', alignItems:'center', background:'var(--off)', zIndex:2 }}>
        <CurrencyToggle compact={true} />
      </div>

      <div style={{ flex:1, overflow:'hidden', height:'100%', display:'flex', alignItems:'center' }}>
        <div className="tkr-belt">
          {items.map((item, i) => <Cell key={'a'+i} item={item} prefix="a" />)}
          {items.map((item, i) => <Cell key={'b'+i} item={item} prefix="b" />)}
        </div>
      </div>

      {lastUpdate && (
        <div style={{ padding:'0 10px', borderLeft:'1px solid var(--border)', flexShrink:0, height:'100%', display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ width:5, height:5, borderRadius:'50%', background:'#2d9e5a', display:'inline-block', animation:'blink 1.5s infinite' }} />
          <span style={{ fontSize:9, color:'var(--text4)', fontFamily:'Source Code Pro,monospace', whiteSpace:'nowrap' }}>{lastUpdate.toLocaleTimeString()}</span>
        </div>
      )}
    </div>
  )
}
