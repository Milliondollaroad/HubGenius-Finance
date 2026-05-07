import { useState, useEffect, useCallback } from 'react'
import { CRYPTO, COMMODITIES, FOREX, INDICES } from '../assets'

const REFRESH_MS = 30000

function fmtChg(chg) {
  if (chg == null) return null
  const sign = chg >= 0 ? '▲' : '▼'
  return `${sign} ${Math.abs(chg).toFixed(2)}%`
}

function makeEntry(usd, chg24h) {
  return {
    usd,
    chg:  fmtChg(chg24h),
    dir:  (chg24h ?? 0) >= 0 ? 'up' : 'down',
  }
}

// Fetch top 100 crypto prices from CoinGecko
async function fetchCrypto() {
  try {
    const ids = CRYPTO.map(c => c.cgId).join(',')
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
    )
    const data = await res.json()
    const result = {}
    CRYPTO.forEach(c => {
      const d = data[c.cgId]
      if (d?.usd) result[c.id] = makeEntry(d.usd, d.usd_24h_change)
    })
    return result
  } catch (e) {
    console.error('CoinGecko error:', e)
    return {}
  }
}

// Fetch single Yahoo Finance symbol via CORS proxy
async function fetchYahoo(sym) {
  try {
    const url   = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=2d`
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
    const res   = await fetch(proxy, { signal: AbortSignal.timeout(8000) })
    const data  = await res.json()
    const meta  = data?.chart?.result?.[0]?.meta
    if (!meta) return null
    const price = meta.regularMarketPrice
    const prev  = meta.previousClose || meta.chartPreviousClose
    const chg   = prev ? ((price - prev) / prev) * 100 : 0
    return { usd: price, chg24h: chg }
  } catch { return null }
}

// Build Yahoo symbol map
const YAHOO_MAP = [
  // Commodities
  ...COMMODITIES.filter(c => c.yahoo).map(c => ({ key: c.id, sym: c.yahoo })),
  // Forex — use Yahoo for majors
  { key: 'EURUSD', sym: 'EURUSD=X' },
  { key: 'GBPUSD', sym: 'GBPUSD=X' },
  { key: 'USDJPY', sym: 'JPY=X'    },
  { key: 'USDCHF', sym: 'CHF=X'    },
  { key: 'AUDUSD', sym: 'AUDUSD=X' },
  { key: 'USDCAD', sym: 'CAD=X'    },
  { key: 'NZDUSD', sym: 'NZDUSD=X' },
  { key: 'EURGBP', sym: 'EURGBP=X' },
  { key: 'EURJPY', sym: 'EURJPY=X' },
  { key: 'GBPJPY', sym: 'GBPJPY=X' },
  // Macro
  { key: 'DXY',    sym: 'DX-Y.NYB' },
  { key: 'US10Y',  sym: '%5ETNX'   },
  { key: 'US2Y',   sym: '%5EIRX'   },
  // Indices
  { key: 'SPX',    sym: '%5EGSPC'  },
  { key: 'NDX',    sym: '%5ENDX'   },
  { key: 'DJI',    sym: '%5EDJI'   },
  { key: 'RUT',    sym: '%5ERUT'   },
  { key: 'VIX',    sym: '%5EVIX'   },
  { key: 'FTSE',   sym: '%5EFTSE'  },
  { key: 'N225',   sym: '%5EN225'  },
  // Top stocks
  { key: 'AAPL',  sym: 'AAPL'  }, { key: 'MSFT',  sym: 'MSFT'  },
  { key: 'NVDA',  sym: 'NVDA'  }, { key: 'GOOGL', sym: 'GOOGL' },
  { key: 'META',  sym: 'META'  }, { key: 'AMZN',  sym: 'AMZN'  },
  { key: 'TSLA',  sym: 'TSLA'  }, { key: 'AMD',   sym: 'AMD'   },
  { key: 'AVGO',  sym: 'AVGO'  }, { key: 'ORCL',  sym: 'ORCL'  },
  { key: 'NFLX',  sym: 'NFLX'  }, { key: 'CRM',   sym: 'CRM'   },
  { key: 'INTC',  sym: 'INTC'  }, { key: 'QCOM',  sym: 'QCOM'  },
  { key: 'UBER',  sym: 'UBER'  }, { key: 'SHOP',  sym: 'SHOP'  },
  { key: 'PLTR',  sym: 'PLTR'  }, { key: 'JPM',   sym: 'JPM'   },
  { key: 'BAC',   sym: 'BAC'   }, { key: 'GS',    sym: 'GS'    },
  { key: 'MS',    sym: 'MS'    }, { key: 'V',     sym: 'V'     },
  { key: 'MA',    sym: 'MA'    }, { key: 'COIN',  sym: 'COIN'  },
  { key: 'MSTR',  sym: 'MSTR'  }, { key: 'JNJ',   sym: 'JNJ'   },
  { key: 'LLY',   sym: 'LLY'   }, { key: 'XOM',   sym: 'XOM'   },
  { key: 'CVX',   sym: 'CVX'   }, { key: 'WMT',   sym: 'WMT'   },
  { key: 'HD',    sym: 'HD'    }, { key: 'DIS',   sym: 'DIS'   },
  { key: 'NKE',   sym: 'NKE'   }, { key: 'PYPL',  sym: 'PYPL'  },
]

export function useLivePrices() {
  const [prices, setPrices]         = useState({})
  const [loading, setLoading]       = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchAll = useCallback(async () => {
    // Fetch crypto first (single API call for all 50)
    const crypto = await fetchCrypto()

    // Fetch stocks/macro/forex in batches of 8 to avoid rate limiting
    const batchSize = 8
    const stockResults = {}
    for (let i = 0; i < YAHOO_MAP.length; i += batchSize) {
      const batch = YAHOO_MAP.slice(i, i + batchSize)
      const results = await Promise.all(batch.map(({ sym, key }) =>
        fetchYahoo(sym).then(d => d ? { key, ...d } : null)
      ))
      results.forEach(r => {
        if (r) stockResults[r.key] = makeEntry(r.usd, r.chg24h)
      })
      // Small delay between batches to be polite to the API
      if (i + batchSize < YAHOO_MAP.length) {
        await new Promise(r => setTimeout(r, 300))
      }
    }

    setPrices(prev => ({ ...prev, ...crypto, ...stockResults }))
    setLastUpdate(new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, REFRESH_MS)
    return () => clearInterval(id)
  }, [fetchAll])

  return { prices, loading, lastUpdate, refetch: fetchAll }
}
