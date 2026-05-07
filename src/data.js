export const ASSETS = {
  BTC:  { name: 'Bitcoin / USD',        px: '$104,230.00', chg: '▲ 2.14%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entry: '$103,800', sl: '$100,686 (-3.0%)', tp: '$110,028 (+6.0%)', conf: '74%', sym: 'COINBASE:BTCUSD',  cat: 'crypto'    },
  ETH:  { name: 'Ethereum / USD',       px: '$3,847.00',   chg: '▲ 1.42%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entry: '$3,810',   sl: '$3,695 (-3.0%)',   tp: '$4,040 (+6.0%)',   conf: '68%', sym: 'COINBASE:ETHUSD',  cat: 'crypto'    },
  SOL:  { name: 'Solana / USD',         px: '$178.40',     chg: '▲ 3.21%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entry: '$174.20',  sl: '$168.90 (-3.0%)',  tp: '$184.00 (+6.0%)',  conf: '71%', sym: 'COINBASE:SOLUSD',  cat: 'crypto'    },
  HYPE: { name: 'Hyperliquid / USD',    px: '$34.80',      chg: '▲ 4.70%', dir: 'up',   sig: 'HOLD', sd: 'Neutral', entry: '$34.20',   sl: '$32.80',           tp: '$37.00',           conf: '55%', sym: 'BINANCE:HYPEUSDT', cat: 'crypto'    },
  TSLA: { name: 'Tesla Inc.',           px: '$312.50',     chg: '▼ 0.82%', dir: 'down', sig: 'SELL', sd: 'Short',   entry: '$315.20',  sl: '$320.00 (+3.0%)',  tp: '$305.00 (-6.0%)',  conf: '66%', sym: 'NASDAQ:TSLA',      cat: 'equity'    },
  NVDA: { name: 'Nvidia Corp.',         px: '$1,089.00',   chg: '▲ 1.92%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entry: '$1,071',   sl: '$1,038 (-3.0%)',   tp: '$1,120 (+6.0%)',   conf: '70%', sym: 'NASDAQ:NVDA',      cat: 'equity'    },
  AMD:  { name: 'Adv. Micro Devices',   px: '$176.20',     chg: '▲ 0.71%', dir: 'up',   sig: 'HOLD', sd: 'Neutral', entry: '$175.00',  sl: '$170.00',          tp: '$183.00',          conf: '52%', sym: 'NASDAQ:AMD',       cat: 'equity'    },
  GOLD: { name: 'Gold / USD',           px: '$3,324.00',   chg: '▲ 0.44%', dir: 'up',   sig: 'BUY',  sd: 'Long',    entry: '$3,310',   sl: '$3,260 (-3.0%)',   tp: '$3,420 (+6.0%)',   conf: '65%', sym: 'TVC:GOLD',         cat: 'commodity' },
  OIL:  { name: 'WTI Crude Oil',        px: '$58.90',      chg: '▼ 1.21%', dir: 'down', sig: 'SELL', sd: 'Short',   entry: '$59.80',   sl: '$61.00 (+3.0%)',   tp: '$56.50 (-6.0%)',   conf: '60%', sym: 'TVC:USOIL',        cat: 'commodity' },
}

export const NEWS = [
  { src: 'Bloomberg',  hl: 'Fed signals no rate hike through Q3 2026 — dollar weakens across G10 currencies',                    time: '44 min ago',  sent: 'Bullish' },
  { src: 'CoinDesk',   hl: 'Bitcoin ETF inflows reach $380M in a single session — institutional demand accelerating',             time: '1h 02m ago',  sent: 'Bullish' },
  { src: 'Reuters',    hl: 'Tesla misses Q1 2026 delivery estimates — shares fall in pre-market trading',                         time: '1h 30m ago',  sent: 'Bearish' },
  { src: 'The Block',  hl: 'Hyperliquid open interest surpasses $2.3B — new all-time record for decentralised perpetuals',       time: '2h 00m ago',  sent: 'Bullish' },
  { src: 'MarketWatch',hl: 'Gold holds near all-time high as global M2 money supply continues expansion',                        time: '2h 45m ago',  sent: 'Neutral' },
]

export const TWEETS = [
  { handle: '@zerohedge',    text: 'Fed balance sheet expanding quietly. M2 historically leads crypto by 6-8 weeks. Watch closely.',                    time: '52 min ago',  sent: 'Bullish' },
  { handle: '@truflation',   text: 'Real-time CPI now 2.1% — below Fed target. Rate cut probability for June rising significantly.',                    time: '1h 08m ago',  sent: 'Bullish' },
  { handle: '@eWhispers',    text: '$NVDA whisper number $0.94 vs. consensus $0.88. Market pricing a beat. Earnings in 12 days.',                      time: '1h 45m ago',  sent: 'Bullish' },
  { handle: '@WatcherGuru',  text: 'BREAKING: US Treasury confirms no new bond issuance this quarter. Risk assets rally globally.',                     time: '2h 10m ago',  sent: 'Bullish' },
  { handle: '@CoinBureau',   text: 'DXY breaking below 100 is historically one of the strongest signals for BTC upside. Watch this level.',            time: '2h 40m ago',  sent: 'Bullish' },
]

export const TRADES = [
  { asset: 'BTC',  dir: 'Long',  entry: '$103,800', pnl: '+$4.20',  pos: true,  time: '14m ago'  },
  { asset: 'ETH',  dir: 'Long',  entry: '$3,810',   pnl: '+$6.80',  pos: true,  time: '1h ago'   },
  { asset: 'SOL',  dir: 'Long',  entry: '$172.40',  pnl: '+$3.20',  pos: true,  time: '3h ago'   },
  { asset: 'TSLA', dir: 'Short', entry: '$315.20',  pnl: '-$1.80',  pos: false, time: '5h ago'   },
  { asset: 'BTC',  dir: 'Short', entry: '$101,200', pnl: '-$2.10',  pos: false, time: '8h ago'   },
  { asset: 'NVDA', dir: 'Long',  entry: '$1,071',   pnl: '+$3.24',  pos: true,  time: '12h ago'  },
]
