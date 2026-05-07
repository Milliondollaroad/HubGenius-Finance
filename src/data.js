// Exchange rates (approximate — in production these would come from a live API)
export const RATES = {
  USD: { symbol: '$',  label: 'USD', rate: 1.0    },
  CAD: { symbol: 'C$', label: 'CAD', rate: 1.3850 },
  EUR: { symbol: '€',  label: 'EUR', rate: 0.9220 },
}

// Base prices in USD — multiply by rate to convert
export const ASSET_BASE = {
  BTC:  { name: 'Bitcoin',          usd: 104230, chg: '▲ 2.14%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entryUSD: 103800, slUSD: 100686, tpUSD: 110028, conf: '74%', sym: 'BITSTAMP:BTCUSD',  cat: 'crypto'    },
  ETH:  { name: 'Ethereum',         usd: 3847,   chg: '▲ 1.42%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entryUSD: 3810,   slUSD: 3695,   tpUSD: 4040,   conf: '68%', sym: 'BITSTAMP:ETHUSD',  cat: 'crypto'    },
  SOL:  { name: 'Solana',           usd: 178.40, chg: '▲ 3.21%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entryUSD: 174.20, slUSD: 168.90, tpUSD: 184.00, conf: '71%', sym: 'BITSTAMP:SOLUSD',  cat: 'crypto'    },
  HYPE: { name: 'Hyperliquid',      usd: 34.80,  chg: '▲ 4.70%', dir: 'up',   sig: 'HOLD', sd: 'Neutral', entryUSD: 34.20,  slUSD: 32.80,  tpUSD: 37.00,  conf: '55%', sym: 'BINANCE:HYPEUSDT', cat: 'crypto'    },
  TSLA: { name: 'Tesla Inc.',       usd: 312.50, chg: '▼ 0.82%', dir: 'down', sig: 'SELL', sd: 'Short',   entryUSD: 315.20, slUSD: 320.00, tpUSD: 305.00, conf: '66%', sym: 'NASDAQ:TSLA',      cat: 'equity'    },
  NVDA: { name: 'Nvidia Corp.',     usd: 1089,   chg: '▲ 1.92%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entryUSD: 1071,   slUSD: 1038,   tpUSD: 1120,   conf: '70%', sym: 'NASDAQ:NVDA',      cat: 'equity'    },
  AMD:  { name: 'Adv. Micro Dev.',  usd: 176.20, chg: '▲ 0.71%', dir: 'up',   sig: 'HOLD', sd: 'Neutral', entryUSD: 175.00, slUSD: 170.00, tpUSD: 183.00, conf: '52%', sym: 'NASDAQ:AMD',       cat: 'equity'    },
  GOLD: { name: 'Gold / Troy oz',   usd: 3324,   chg: '▲ 0.44%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entryUSD: 3310,   slUSD: 3260,   tpUSD: 3420,   conf: '65%', sym: 'TVC:GOLD',         cat: 'commodity' },
  OIL:  { name: 'WTI Crude Oil',    usd: 58.90,  chg: '▼ 1.21%', dir: 'down', sig: 'SELL', sd: 'Short',   entryUSD: 59.80,  slUSD: 61.00,  tpUSD: 56.50,  conf: '60%', sym: 'TVC:USOIL',        cat: 'commodity' },
}

// Helper — format price in selected currency
export function formatPrice(usdValue, currency) {
  const { symbol, rate } = RATES[currency]
  const converted = usdValue * rate
  if (converted >= 10000) return `${symbol}${Math.round(converted).toLocaleString()}`
  if (converted >= 100)   return `${symbol}${converted.toFixed(2)}`
  if (converted >= 1)     return `${symbol}${converted.toFixed(2)}`
  return `${symbol}${converted.toFixed(4)}`
}

// Helper — get full asset object with prices in selected currency
export function getAsset(id, currency = 'USD') {
  const b = ASSET_BASE[id]
  const { symbol, label } = RATES[currency]
  return {
    ...b,
    fullName: `${b.name} / ${label}`,
    px:    formatPrice(b.usd,      currency),
    entry: formatPrice(b.entryUSD, currency),
    sl:    formatPrice(b.slUSD,    currency) + ' (-3.0%)',
    tp:    formatPrice(b.tpUSD,    currency) + ' (+6.0%)',
  }
}

export const NEWS = [
  { src: 'Bloomberg',   hl: 'Fed signals no rate hike through Q3 2026 — dollar weakens across G10 currencies',              time: '44 min ago',  sent: 'Bullish' },
  { src: 'CoinDesk',    hl: 'Bitcoin ETF inflows reach $380M in a single session — institutional demand accelerating',       time: '1h 02m ago',  sent: 'Bullish' },
  { src: 'Reuters',     hl: 'Tesla misses Q1 2026 delivery estimates — shares fall in pre-market trading',                   time: '1h 30m ago',  sent: 'Bearish' },
  { src: 'The Block',   hl: 'Hyperliquid open interest surpasses $2.3B — new all-time record for decentralised perpetuals', time: '2h 00m ago',  sent: 'Bullish' },
  { src: 'MarketWatch', hl: 'Gold holds near all-time high as global M2 money supply continues expansion',                  time: '2h 45m ago',  sent: 'Neutral' },
]

export const TWEETS = [
  { handle: '@zerohedge',   text: 'Fed balance sheet expanding quietly. M2 historically leads crypto by 6-8 weeks. Watch closely.',               time: '52 min ago',  sent: 'Bullish' },
  { handle: '@truflation',  text: 'Real-time CPI now 2.1% — below Fed target. Rate cut probability for June rising significantly.',               time: '1h 08m ago',  sent: 'Bullish' },
  { handle: '@eWhispers',   text: '$NVDA whisper number $0.94 vs. consensus $0.88. Market pricing a beat. Earnings in 12 days.',                  time: '1h 45m ago',  sent: 'Bullish' },
  { handle: '@WatcherGuru', text: 'BREAKING: US Treasury confirms no new bond issuance this quarter. Risk assets rally globally.',                time: '2h 10m ago',  sent: 'Bullish' },
  { handle: '@CoinBureau',  text: 'DXY breaking below 100 is historically one of the strongest signals for BTC upside. Watch this level.',       time: '2h 40m ago',  sent: 'Bullish' },
]

export const TRADES = [
  { asset: 'BTC',  dir: 'Long',  entryUSD: 103800, pnlUSD: 4.20,  pos: true,  time: '14m ago'  },
  { asset: 'ETH',  dir: 'Long',  entryUSD: 3810,   pnlUSD: 6.80,  pos: true,  time: '1h ago'   },
  { asset: 'SOL',  dir: 'Long',  entryUSD: 172.40, pnlUSD: 3.20,  pos: true,  time: '3h ago'   },
  { asset: 'TSLA', dir: 'Short', entryUSD: 315.20, pnlUSD: -1.80, pos: false, time: '5h ago'   },
  { asset: 'BTC',  dir: 'Short', entryUSD: 101200, pnlUSD: -2.10, pos: false, time: '8h ago'   },
  { asset: 'NVDA', dir: 'Long',  entryUSD: 1071,   pnlUSD: 3.24,  pos: true,  time: '12h ago'  },
]
