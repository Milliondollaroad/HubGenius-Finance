import { useState, useEffect, useCallback } from 'react'

const REFRESH_MS = 5 * 60 * 1000 // 5 minutes
const PROXY = 'https://api.allorigins.win/raw?url='

// ─── FEAR & GREED ─────────────────────────────────────────────────────────────
async function fetchFearGreed() {
  try {
    const res  = await fetch('https://api.alternative.me/fng/?limit=2')
    const data = await res.json()
    const current  = data.data[0]
    const previous = data.data[1]
    const value    = parseInt(current.value)
    const prevVal  = parseInt(previous.value)
    const chg      = value - prevVal
    return {
      value,
      label:      current.value_classification,
      change:     chg >= 0 ? `▲ ${chg} pts` : `▼ ${Math.abs(chg)} pts`,
      dir:        value >= 50 ? 'up' : 'down',
      color:      value >= 75 ? '#1a6b3a' : value >= 50 ? '#b8952e' : value >= 25 ? '#e05252' : '#8b1a1a',
      updated:    new Date(parseInt(current.timestamp) * 1000).toLocaleTimeString(),
    }
  } catch (e) {
    console.error('Fear & Greed error:', e)
    return null
  }
}

// ─── BTC DOMINANCE + TOTAL MARKET CAP ─────────────────────────────────────────
async function fetchGlobalCrypto() {
  try {
    const res  = await fetch('https://api.coingecko.com/api/v3/global')
    const data = await res.json()
    const d    = data.data
    const btcDom    = d.market_cap_percentage?.btc
    const ethDom    = d.market_cap_percentage?.eth
    const totalMcap = d.total_market_cap?.usd
    const mcapChg   = d.market_cap_change_percentage_24h_usd
    return {
      btcDominance: btcDom ? parseFloat(btcDom.toFixed(1)) : null,
      ethDominance: ethDom ? parseFloat(ethDom.toFixed(1)) : null,
      totalMarketCap: totalMcap,
      totalMarketCapFormatted: totalMcap ? formatMcap(totalMcap) : null,
      marketCapChange24h: mcapChg ? parseFloat(mcapChg.toFixed(2)) : null,
      marketCapDir: (mcapChg ?? 0) >= 0 ? 'up' : 'down',
      activeCryptos: d.active_cryptocurrencies,
    }
  } catch (e) {
    console.error('CoinGecko global error:', e)
    return null
  }
}

function formatMcap(val) {
  if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`
  if (val >= 1e9)  return `$${(val / 1e9).toFixed(1)}B`
  return `$${val.toLocaleString()}`
}

// ─── REDDIT / WSB SENTIMENT ───────────────────────────────────────────────────
const REDDIT_FEEDS = [
  { url: 'https://www.reddit.com/r/wallstreetbets/hot.json?limit=20',    sub: 'r/wallstreetbets' },
  { url: 'https://www.reddit.com/r/CryptoCurrency/hot.json?limit=20',    sub: 'r/CryptoCurrency' },
  { url: 'https://www.reddit.com/r/investing/hot.json?limit=15',          sub: 'r/investing'      },
  { url: 'https://www.reddit.com/r/Bitcoin/hot.json?limit=15',            sub: 'r/Bitcoin'        },
  { url: 'https://www.reddit.com/r/ethereum/hot.json?limit=10',           sub: 'r/ethereum'       },
  { url: 'https://www.reddit.com/r/stocks/hot.json?limit=10',             sub: 'r/stocks'         },
]

const BULL_WORDS = ['moon','bullish','surge','rally','pump','buy','long','gains','profit','breakout','ATH','explosive','send it','green','calls','up only','100x','diamond hands']
const BEAR_WORDS = ['crash','bearish','dump','sell','short','loss','rekt','red','puts','capitulation','fear','scam','rug','liquidated','margin call','bankrupt']

function scoreReddit(title) {
  const t = title.toLowerCase()
  const bulls = BULL_WORDS.filter(w => t.includes(w)).length
  const bears = BEAR_WORDS.filter(w => t.includes(w)).length
  if (bulls > bears) return 'Bullish'
  if (bears > bulls) return 'Bearish'
  return 'Neutral'
}

function timeAgo(utcSeconds) {
  const diff = Date.now() / 1000 - utcSeconds
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

async function fetchRedditFeed(url, sub) {
  try {
    const res  = await fetch(`${PROXY}${encodeURIComponent(url)}`, {
      headers: { 'Accept': 'application/json' }
    })
    const data = await res.json()
    const posts = data?.data?.children || []
    return posts
      .filter(p => !p.data.stickied && p.data.score > 50)
      .slice(0, 6)
      .map(p => ({
        sub,
        title:  p.data.title,
        score:  p.data.score,
        comments: p.data.num_comments,
        time:   timeAgo(p.data.created_utc),
        url:    `https://reddit.com${p.data.permalink}`,
        sent:   scoreReddit(p.data.title),
        upvoteRatio: p.data.upvote_ratio,
        flair:  p.data.link_flair_text || '',
      }))
  } catch { return [] }
}

async function fetchAllReddit() {
  try {
    const results = await Promise.all(
      REDDIT_FEEDS.map(f => fetchRedditFeed(f.url, f.sub))
    )
    const all = results.flat()

    // Calculate overall sentiment score
    const bulls  = all.filter(p => p.sent === 'Bullish').length
    const bears  = all.filter(p => p.sent === 'Bearish').length
    const total  = all.length || 1
    const score  = Math.round((bulls / total) * 100)

    // Sort by score descending
    all.sort((a, b) => b.score - a.score)

    return {
      posts: all.slice(0, 30),
      sentiment: {
        score,
        label:  score >= 60 ? 'Bullish' : score <= 40 ? 'Bearish' : 'Neutral',
        dir:    score >= 60 ? 'up' : score <= 40 ? 'down' : 'neu',
        bulls,
        bears,
        neutral: total - bulls - bears,
        total,
      }
    }
  } catch (e) {
    console.error('Reddit error:', e)
    return { posts: [], sentiment: null }
  }
}

// ─── MAIN HOOK ────────────────────────────────────────────────────────────────
export function useMacroData() {
  const [fearGreed, setFearGreed]   = useState(null)
  const [globalCrypto, setGlobal]   = useState(null)
  const [reddit, setReddit]         = useState({ posts: [], sentiment: null })
  const [loading, setLoading]       = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchAll = useCallback(async () => {
    const [fg, global, red] = await Promise.all([
      fetchFearGreed(),
      fetchGlobalCrypto(),
      fetchAllReddit(),
    ])
    if (fg)     setFearGreed(fg)
    if (global) setGlobal(global)
    setReddit(red)
    setLastUpdate(new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, REFRESH_MS)
    return () => clearInterval(id)
  }, [fetchAll])

  return { fearGreed, globalCrypto, reddit, loading, lastUpdate, refetch: fetchAll }
}
