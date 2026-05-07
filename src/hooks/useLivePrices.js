import { useState, useEffect } from 'react'

const CRYPTO_IDS = 'bitcoin,ethereum,solana,hyperliquid'
const REFRESH_MS = 30000

const DEFAULT_PRICES = {
  BTC:  { usd: null, chg: null, dir: 'up'  },
  ETH:  { usd: null, chg: null, dir: 'up'  },
  SOL:  { usd: null, chg: null, dir: 'up'  },
  HYPE: { usd: null, chg: null, dir: 'up'  },
  TSLA: { usd: null, chg: null, dir: 'up'  },
  NVDA: { usd: null, chg: null, dir: 'up'  },
  AMD:  { usd: null, chg: null, dir: 'up'  },
  GOLD: { usd: null, chg: null, dir: 'up'  },
  OIL:  { usd: null, chg: null, dir: 'up'  },
  DXY:  { usd: null, chg: null, dir: 'up'  },
  US10Y:{ usd: null, chg: null, dir: 'neu' },
}

function fmtChg(chg) {
  if (chg == null) return '—'
  const sign = chg >= 0 ? '▲' : '▼'
  return `${sign} ${Math.abs(chg).toFixed(2)}%`
}

export function useLivePrices() {
  const [prices, setPrices]       = useState(DEFAULT_PRICES)
  const [loading, setLoading]     = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchCrypto = async () => {
    try {
      const res  = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_IDS}&vs_currencies=usd&include_24hr_change=true`
      )
      const data = await res.json()
      return {
        BTC:  { usd: data.bitcoin?.usd,        chg24h: data.bitcoin?.usd_24h_change        },
        ETH:  { usd: data.ethereum?.usd,        chg24h: data.ethereum?.usd_24h_change       },
        SOL:  { usd: data.solana?.usd,          chg24h: data.solana?.usd_24h_change         },
        HYPE: { usd: data.hyperliquid?.usd,     chg24h: data.hyperliquid?.usd_24h_change    },
      }
    } catch { return null }
  }

  const fetchYahoo = async (sym, key) => {
    try {
      const url   = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=2d`
      const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
      const res   = await fetch(proxy)
      const data  = await res.json()
      const meta  = data?.chart?.result?.[0]?.meta
      if (!meta) return null
      const price = meta.regularMarketPrice
      const prev  = meta.previousClose || meta.chartPreviousClose
      const chg   = prev ? ((price - prev) / prev) * 100 : 0
      return { key, usd: price, chg24h: chg }
    } catch { return null }
  }

  const fetchAll = async () => {
    const YAHOO_SYMBOLS = [
      { sym: 'TSLA',      key: 'TSLA'  },
      { sym: 'NVDA',      key: 'NVDA'  },
      { sym: 'AMD',       key: 'AMD'   },
      { sym: 'GC=F',      key: 'GOLD'  },
      { sym: 'CL=F',      key: 'OIL'   },
      { sym: 'DX-Y.NYB',  key: 'DXY'   },
      { sym: '%5ETNX',    key: 'US10Y' },
    ]

    const [crypto, ...yahooResults] = await Promise.all([
      fetchCrypto(),
      ...YAHOO_SYMBOLS.map(({ sym, key }) => fetchYahoo(sym, key))
    ])

    setPrices(prev => {
      const next = { ...prev }

      if (crypto) {
        Object.entries(crypto).forEach(([id, d]) => {
          if (d?.usd) next[id] = { usd: d.usd, chg: fmtChg(d.chg24h), dir: (d.chg24h ?? 0) >= 0 ? 'up' : 'down' }
        })
      }

      yahooResults.forEach(r => {
        if (r?.usd) next[r.key] = { usd: r.usd, chg: fmtChg(r.chg24h), dir: (r.chg24h ?? 0) >= 0 ? 'up' : 'down' }
      })

      return next
    })

    setLastUpdate(new Date())
    setLoading(false)
  }

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, REFRESH_MS)
    return () => clearInterval(id)
  }, [])

  return { prices, loading, lastUpdate, refetch: fetchAll }
}
