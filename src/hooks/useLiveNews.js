import { useState, useEffect, useCallback } from 'react'

const REFRESH_MS = 5 * 60 * 1000 // 5 minutes
const PROXY = 'https://api.allorigins.win/raw?url='

// ─── SENTIMENT SCORING ────────────────────────────────────────────────────────
const BULL_WORDS = ['surge','rally','soar','jump','gain','rise','bullish','buy','record','high','boost','beat','strong','grow','profit','upturn','breakout','rebound','recovery','expand','approve','launch','partnership','upgrade']
const BEAR_WORDS = ['crash','fall','drop','plunge','decline','bearish','sell','low','loss','miss','weak','risk','warning','ban','hack','lawsuit','fine','fear','recession','layoff','cut','downgrade','dump','fraud','scam']

function scoreSentiment(text) {
  const t = text.toLowerCase()
  const bulls = BULL_WORDS.filter(w => t.includes(w)).length
  const bears = BEAR_WORDS.filter(w => t.includes(w)).length
  if (bulls > bears) return 'Bullish'
  if (bears > bulls) return 'Bearish'
  return 'Neutral'
}

function timeAgo(dateStr) {
  try {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1)   return 'Just now'
    if (mins < 60)  return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24)   return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  } catch { return '' }
}

// ─── RSS PARSER ───────────────────────────────────────────────────────────────
function parseRSS(xml, source) {
  try {
    const parser = new DOMParser()
    const doc    = parser.parseFromString(xml, 'text/xml')
    const items  = Array.from(doc.querySelectorAll('item')).slice(0, 8)
    return items.map(item => {
      const title   = item.querySelector('title')?.textContent?.trim() || ''
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() || ''
      const link    = item.querySelector('link')?.textContent?.trim() || ''
      return {
        src:  source,
        hl:   title.replace(/<!\[CDATA\[|\]\]>/g, '').trim(),
        time: timeAgo(pubDate),
        sent: scoreSentiment(title),
        link,
        raw:  pubDate,
      }
    }).filter(i => i.hl)
  } catch { return [] }
}

// ─── CRYPTOPANIC ──────────────────────────────────────────────────────────────
async function fetchCryptoPanic() {
  try {
    const url = 'https://cryptopanic.com/api/v1/posts/?auth_token=free&public=true&kind=news'
    const res = await fetch(`${PROXY}${encodeURIComponent(url)}`)
    const data = await res.json()
    return (data.results || []).slice(0, 10).map(item => ({
      src:  item.source?.title || 'CryptoPanic',
      hl:   item.title,
      time: timeAgo(item.published_at),
      sent: scoreSentiment(item.title),
      link: item.url,
      raw:  item.published_at,
      cat:  'Crypto',
    }))
  } catch { return [] }
}

// ─── RSS FEEDS ────────────────────────────────────────────────────────────────
async function fetchRSS(url, source, cat) {
  try {
    const res = await fetch(`${PROXY}${encodeURIComponent(url)}`)
    const xml = await res.text()
    return parseRSS(xml, source).map(i => ({ ...i, cat }))
  } catch { return [] }
}

const RSS_SOURCES = [
  // Crypto
  { url: 'https://coindesk.com/arc/outboundfeeds/rss/',                    src: 'CoinDesk',    cat: 'Crypto'  },
  { url: 'https://cointelegraph.com/rss',                                  src: 'CoinTelegraph',cat: 'Crypto'  },
  { url: 'https://decrypt.co/feed',                                        src: 'Decrypt',     cat: 'Crypto'  },
  { url: 'https://theblock.co/rss.xml',                                    src: 'The Block',   cat: 'Crypto'  },
  { url: 'https://bitcoinmagazine.com/.rss/full/',                         src: 'Bitcoin Mag', cat: 'Crypto'  },
  // Finance & Macro
  { url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',                 src: 'WSJ Markets', cat: 'Markets' },
  { url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',               src: 'WSJ Business',cat: 'Markets' },
  { url: 'https://finance.yahoo.com/news/rssindex',                        src: 'Yahoo Finance',cat: 'Markets'},
  { url: 'https://www.investing.com/rss/news.rss',                         src: 'Investing.com',cat: 'Markets'},
  { url: 'https://feeds.marketwatch.com/marketwatch/topstories/',          src: 'MarketWatch', cat: 'Markets' },
  { url: 'https://www.ft.com/news-feed?format=rss',                        src: 'FT',          cat: 'Markets' },
  // Stocks
  { url: 'https://feeds.a.dj.com/rss/RSSOpinion.xml',                     src: 'WSJ Opinion', cat: 'Stocks'  },
  { url: 'https://seekingalpha.com/market_currents.xml',                   src: 'Seeking Alpha',cat: 'Stocks' },
  // Macro
  { url: 'https://www.federalreserve.gov/feeds/press_all.xml',             src: 'Federal Reserve',cat:'Macro' },
  { url: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',                   src: 'WSJ World',   cat: 'Macro'   },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml',       src: 'NY Times',    cat: 'Macro'   },
  // Commodities
  { url: 'https://oilprice.com/rss/main',                                  src: 'OilPrice',    cat: 'Commodities'},
  { url: 'https://www.mining.com/feed/',                                   src: 'Mining.com',  cat: 'Commodities'},
]

export function useLiveNews() {
  const [news, setNews]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchAll = useCallback(async () => {
    // Fetch all sources in parallel
    const [cryptoPanic, ...rssResults] = await Promise.all([
      fetchCryptoPanic(),
      ...RSS_SOURCES.map(s => fetchRSS(s.url, s.src, s.cat))
    ])

    // Merge all results
    const all = [
      ...cryptoPanic,
      ...rssResults.flat(),
    ]

    // Deduplicate by headline similarity
    const seen = new Set()
    const deduped = all.filter(item => {
      const key = item.hl.substring(0, 40).toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    // Sort by time (most recent first)
    deduped.sort((a, b) => {
      try {
        return new Date(b.raw) - new Date(a.raw)
      } catch { return 0 }
    })

    setNews(deduped.slice(0, 100)) // keep top 100
    setLastUpdate(new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, REFRESH_MS)
    return () => clearInterval(id)
  }, [fetchAll])

  return { news, loading, lastUpdate, refetch: fetchAll }
}
