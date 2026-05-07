// ─── CRYPTO TOP 100 (CoinGecko IDs + display) ───────────────────────────────
export const CRYPTO = [
  { id:'BTC',  name:'Bitcoin',          cgId:'bitcoin',            sym:'BITSTAMP:BTCUSD',    sig:'BUY'  },
  { id:'ETH',  name:'Ethereum',         cgId:'ethereum',           sym:'BITSTAMP:ETHUSD',    sig:'BUY'  },
  { id:'SOL',  name:'Solana',           cgId:'solana',             sym:'BITSTAMP:SOLUSD',    sig:'BUY'  },
  { id:'BNB',  name:'BNB',              cgId:'binancecoin',        sym:'BINANCE:BNBUSD',     sig:'HOLD' },
  { id:'XRP',  name:'XRP',              cgId:'ripple',             sym:'BITSTAMP:XRPUSD',    sig:'BUY'  },
  { id:'DOGE', name:'Dogecoin',         cgId:'dogecoin',           sym:'BINANCE:DOGEUSD',    sig:'HOLD' },
  { id:'ADA',  name:'Cardano',          cgId:'cardano',            sym:'BINANCE:ADAUSD',     sig:'HOLD' },
  { id:'TRX',  name:'TRON',             cgId:'tron',               sym:'BINANCE:TRXUSD',     sig:'HOLD' },
  { id:'AVAX', name:'Avalanche',        cgId:'avalanche-2',        sym:'BINANCE:AVAXUSD',    sig:'BUY'  },
  { id:'LINK', name:'Chainlink',        cgId:'chainlink',          sym:'BINANCE:LINKUSD',    sig:'BUY'  },
  { id:'TON',  name:'Toncoin',          cgId:'the-open-network',   sym:'BINANCE:TONUSD',     sig:'HOLD' },
  { id:'SHIB', name:'Shiba Inu',        cgId:'shiba-inu',          sym:'BINANCE:SHIBUSD',    sig:'HOLD' },
  { id:'DOT',  name:'Polkadot',         cgId:'polkadot',           sym:'BINANCE:DOTUSD',     sig:'HOLD' },
  { id:'BCH',  name:'Bitcoin Cash',     cgId:'bitcoin-cash',       sym:'BINANCE:BCHUSD',     sig:'HOLD' },
  { id:'NEAR', name:'NEAR Protocol',    cgId:'near',               sym:'BINANCE:NEARUSD',    sig:'BUY'  },
  { id:'LTC',  name:'Litecoin',         cgId:'litecoin',           sym:'BITSTAMP:LTCUSD',    sig:'HOLD' },
  { id:'UNI',  name:'Uniswap',          cgId:'uniswap',            sym:'BINANCE:UNIUSD',     sig:'BUY'  },
  { id:'ICP',  name:'Internet Computer',cgId:'internet-computer',  sym:'BINANCE:ICPUSD',     sig:'HOLD' },
  { id:'APT',  name:'Aptos',            cgId:'aptos',              sym:'BINANCE:APTUSD',     sig:'HOLD' },
  { id:'POL',  name:'Polygon',          cgId:'matic-network',      sym:'BINANCE:MATICUSD',   sig:'HOLD' },
  { id:'ETC',  name:'Ethereum Classic', cgId:'ethereum-classic',   sym:'BINANCE:ETCUSD',     sig:'HOLD' },
  { id:'STX',  name:'Stacks',           cgId:'blockstack',         sym:'BINANCE:STXUSD',     sig:'HOLD' },
  { id:'FIL',  name:'Filecoin',         cgId:'filecoin',           sym:'BINANCE:FILUSD',     sig:'HOLD' },
  { id:'ATOM', name:'Cosmos',           cgId:'cosmos',             sym:'BINANCE:ATOMUSD',    sig:'HOLD' },
  { id:'HBAR', name:'Hedera',           cgId:'hedera-hashgraph',   sym:'BINANCE:HBARUSD',    sig:'HOLD' },
  { id:'ARB',  name:'Arbitrum',         cgId:'arbitrum',           sym:'BINANCE:ARBUSD',     sig:'HOLD' },
  { id:'OP',   name:'Optimism',         cgId:'optimism',           sym:'BINANCE:OPUSD',      sig:'HOLD' },
  { id:'VET',  name:'VeChain',          cgId:'vechain',            sym:'BINANCE:VETUSD',     sig:'HOLD' },
  { id:'MKR',  name:'Maker',            cgId:'maker',              sym:'BINANCE:MKRUSD',     sig:'HOLD' },
  { id:'GRT',  name:'The Graph',        cgId:'the-graph',          sym:'BINANCE:GRTUSD',     sig:'HOLD' },
  { id:'AAVE', name:'Aave',             cgId:'aave',               sym:'BINANCE:AAVEUSD',    sig:'BUY'  },
  { id:'ALGO', name:'Algorand',         cgId:'algorand',           sym:'BINANCE:ALGOUSD',    sig:'HOLD' },
  { id:'SAND', name:'The Sandbox',      cgId:'the-sandbox',        sym:'BINANCE:SANDUSD',    sig:'HOLD' },
  { id:'MANA', name:'Decentraland',     cgId:'decentraland',       sym:'BINANCE:MANAUSD',    sig:'HOLD' },
  { id:'AXS',  name:'Axie Infinity',    cgId:'axie-infinity',      sym:'BINANCE:AXSUSD',     sig:'HOLD' },
  { id:'FTM',  name:'Fantom',           cgId:'fantom',             sym:'BINANCE:FTMUSD',     sig:'HOLD' },
  { id:'RUNE', name:'THORChain',        cgId:'thorchain',          sym:'BINANCE:RUNEUSD',    sig:'HOLD' },
  { id:'INJ',  name:'Injective',        cgId:'injective-protocol', sym:'BINANCE:INJUSD',     sig:'BUY'  },
  { id:'SUI',  name:'Sui',              cgId:'sui',                sym:'BINANCE:SUIUSD',     sig:'BUY'  },
  { id:'SEI',  name:'Sei',              cgId:'sei-network',        sym:'BINANCE:SEIUSD',     sig:'HOLD' },
  { id:'TIA',  name:'Celestia',         cgId:'celestia',           sym:'BINANCE:TIAUSD',     sig:'HOLD' },
  { id:'WIF',  name:'dogwifhat',        cgId:'dogwifcoin',         sym:'BINANCE:WIFUSD',     sig:'HOLD' },
  { id:'PEPE', name:'Pepe',             cgId:'pepe',               sym:'BINANCE:PEPEUSD',    sig:'HOLD' },
  { id:'BONK', name:'Bonk',             cgId:'bonk',               sym:'BINANCE:BONKUSD',    sig:'HOLD' },
  { id:'JUP',  name:'Jupiter',          cgId:'jupiter-exchange-solana', sym:'BINANCE:JUPUSD', sig:'BUY' },
  { id:'HYPE', name:'Hyperliquid',      cgId:'hyperliquid',        sym:'BINANCE:HYPEUSDT',   sig:'BUY'  },
  { id:'PYTH', name:'Pyth Network',     cgId:'pyth-network',       sym:'BINANCE:PYTHUSD',    sig:'HOLD' },
  { id:'STRK', name:'Starknet',         cgId:'starknet',           sym:'BINANCE:STRKUSD',    sig:'HOLD' },
  { id:'W',    name:'Wormhole',         cgId:'wormhole',           sym:'BINANCE:WUSD',       sig:'HOLD' },
  { id:'ENA',  name:'Ethena',           cgId:'ethena',             sym:'BINANCE:ENAUSD',     sig:'HOLD' },
  { id:'ZK',   name:'ZKsync',           cgId:'zksync',             sym:'BINANCE:ZKUSD',      sig:'HOLD' },
]

// ─── S&P 500 KEY COMPANIES (TradingView symbols) ─────────────────────────────
export const EQUITIES = [
  // Tech
  { id:'AAPL',  name:'Apple Inc.',            sym:'NASDAQ:AAPL',  sector:'Tech',    sig:'BUY'  },
  { id:'MSFT',  name:'Microsoft',             sym:'NASDAQ:MSFT',  sector:'Tech',    sig:'BUY'  },
  { id:'NVDA',  name:'Nvidia',                sym:'NASDAQ:NVDA',  sector:'Tech',    sig:'BUY'  },
  { id:'GOOGL', name:'Alphabet',              sym:'NASDAQ:GOOGL', sector:'Tech',    sig:'BUY'  },
  { id:'META',  name:'Meta Platforms',        sym:'NASDAQ:META',  sector:'Tech',    sig:'BUY'  },
  { id:'AMZN',  name:'Amazon',                sym:'NASDAQ:AMZN',  sector:'Tech',    sig:'BUY'  },
  { id:'TSLA',  name:'Tesla',                 sym:'NASDAQ:TSLA',  sector:'Auto',    sig:'SELL' },
  { id:'AMD',   name:'Adv. Micro Devices',    sym:'NASDAQ:AMD',   sector:'Tech',    sig:'HOLD' },
  { id:'AVGO',  name:'Broadcom',              sym:'NASDAQ:AVGO',  sector:'Tech',    sig:'BUY'  },
  { id:'ORCL',  name:'Oracle',                sym:'NYSE:ORCL',    sector:'Tech',    sig:'BUY'  },
  { id:'CRM',   name:'Salesforce',            sym:'NYSE:CRM',     sector:'Tech',    sig:'HOLD' },
  { id:'ADBE',  name:'Adobe',                 sym:'NASDAQ:ADBE',  sector:'Tech',    sig:'HOLD' },
  { id:'NFLX',  name:'Netflix',               sym:'NASDAQ:NFLX',  sector:'Media',   sig:'BUY'  },
  { id:'INTC',  name:'Intel',                 sym:'NASDAQ:INTC',  sector:'Tech',    sig:'SELL' },
  { id:'QCOM',  name:'Qualcomm',              sym:'NASDAQ:QCOM',  sector:'Tech',    sig:'HOLD' },
  { id:'NOW',   name:'ServiceNow',            sym:'NYSE:NOW',     sector:'Tech',    sig:'BUY'  },
  { id:'SNOW',  name:'Snowflake',             sym:'NYSE:SNOW',    sector:'Tech',    sig:'HOLD' },
  { id:'UBER',  name:'Uber',                  sym:'NYSE:UBER',    sector:'Tech',    sig:'BUY'  },
  { id:'SHOP',  name:'Shopify',               sym:'NYSE:SHOP',    sector:'Tech',    sig:'BUY'  },
  { id:'PLTR',  name:'Palantir',              sym:'NYSE:PLTR',    sector:'Tech',    sig:'BUY'  },
  // Finance
  { id:'JPM',   name:'JPMorgan Chase',        sym:'NYSE:JPM',     sector:'Finance', sig:'BUY'  },
  { id:'BAC',   name:'Bank of America',       sym:'NYSE:BAC',     sector:'Finance', sig:'HOLD' },
  { id:'GS',    name:'Goldman Sachs',         sym:'NYSE:GS',      sector:'Finance', sig:'BUY'  },
  { id:'MS',    name:'Morgan Stanley',        sym:'NYSE:MS',      sector:'Finance', sig:'BUY'  },
  { id:'V',     name:'Visa',                  sym:'NYSE:V',       sector:'Finance', sig:'BUY'  },
  { id:'MA',    name:'Mastercard',            sym:'NYSE:MA',      sector:'Finance', sig:'BUY'  },
  { id:'BRK.B', name:'Berkshire Hathaway',    sym:'NYSE:BRK.B',   sector:'Finance', sig:'BUY'  },
  { id:'BLK',   name:'BlackRock',             sym:'NYSE:BLK',     sector:'Finance', sig:'BUY'  },
  { id:'COIN',  name:'Coinbase',              sym:'NASDAQ:COIN',  sector:'Finance', sig:'BUY'  },
  { id:'MSTR',  name:'MicroStrategy',         sym:'NASDAQ:MSTR',  sector:'Finance', sig:'BUY'  },
  // Healthcare
  { id:'JNJ',   name:'Johnson & Johnson',     sym:'NYSE:JNJ',     sector:'Health',  sig:'HOLD' },
  { id:'LLY',   name:'Eli Lilly',             sym:'NYSE:LLY',     sector:'Health',  sig:'BUY'  },
  { id:'UNH',   name:'UnitedHealth',          sym:'NYSE:UNH',     sector:'Health',  sig:'HOLD' },
  { id:'PFE',   name:'Pfizer',                sym:'NYSE:PFE',     sector:'Health',  sig:'HOLD' },
  { id:'ABBV',  name:'AbbVie',                sym:'NYSE:ABBV',    sector:'Health',  sig:'BUY'  },
  { id:'MRK',   name:'Merck',                 sym:'NYSE:MRK',     sector:'Health',  sig:'HOLD' },
  // Energy
  { id:'XOM',   name:'Exxon Mobil',           sym:'NYSE:XOM',     sector:'Energy',  sig:'HOLD' },
  { id:'CVX',   name:'Chevron',               sym:'NYSE:CVX',     sector:'Energy',  sig:'HOLD' },
  // Consumer
  { id:'AMZN',  name:'Amazon',                sym:'NASDAQ:AMZN',  sector:'Consumer',sig:'BUY'  },
  { id:'WMT',   name:'Walmart',               sym:'NYSE:WMT',     sector:'Consumer',sig:'HOLD' },
  { id:'HD',    name:'Home Depot',            sym:'NYSE:HD',      sector:'Consumer',sig:'HOLD' },
  { id:'MCD',   name:'McDonald\'s',           sym:'NYSE:MCD',     sector:'Consumer',sig:'HOLD' },
  { id:'SBUX',  name:'Starbucks',             sym:'NASDAQ:SBUX',  sector:'Consumer',sig:'HOLD' },
  { id:'NKE',   name:'Nike',                  sym:'NYSE:NKE',     sector:'Consumer',sig:'HOLD' },
  { id:'DIS',   name:'Walt Disney',           sym:'NYSE:DIS',     sector:'Media',   sig:'HOLD' },
  { id:'PYPL',  name:'PayPal',                sym:'NASDAQ:PYPL',  sector:'Finance', sig:'HOLD' },
  { id:'SQ',    name:'Block Inc.',            sym:'NYSE:SQ',      sector:'Finance', sig:'HOLD' },
  // Industrial
  { id:'CAT',   name:'Caterpillar',           sym:'NYSE:CAT',     sector:'Industry',sig:'HOLD' },
  { id:'BA',    name:'Boeing',                sym:'NYSE:BA',      sector:'Industry',sig:'SELL' },
  { id:'GE',    name:'GE Aerospace',          sym:'NYSE:GE',      sector:'Industry',sig:'BUY'  },
  { id:'RTX',   name:'RTX Corp.',             sym:'NYSE:RTX',     sector:'Industry',sig:'BUY'  },
]

// ─── COMMODITIES ─────────────────────────────────────────────────────────────
export const COMMODITIES = [
  { id:'GOLD',   name:'Gold',              sym:'TVC:GOLD',      yahoo:'GC=F',    sig:'BUY'  },
  { id:'SILVER', name:'Silver',            sym:'TVC:SILVER',    yahoo:'SI=F',    sig:'BUY'  },
  { id:'OIL',    name:'WTI Crude Oil',     sym:'TVC:USOIL',     yahoo:'CL=F',    sig:'SELL' },
  { id:'BRENT',  name:'Brent Crude',       sym:'TVC:UKOIL',     yahoo:'BZ=F',    sig:'SELL' },
  { id:'NATGAS', name:'Natural Gas',       sym:'TVC:NATURALGAS',yahoo:'NG=F',    sig:'HOLD' },
  { id:'WHEAT',  name:'Wheat',             sym:'CBOT:ZW1!',     yahoo:'ZW=F',    sig:'HOLD' },
  { id:'CORN',   name:'Corn',              sym:'CBOT:ZC1!',     yahoo:'ZC=F',    sig:'HOLD' },
  { id:'SOYBEAN',name:'Soybeans',          sym:'CBOT:ZS1!',     yahoo:'ZS=F',    sig:'HOLD' },
  { id:'COPPER', name:'Copper',            sym:'COMEX:HG1!',    yahoo:'HG=F',    sig:'BUY'  },
  { id:'PLAT',   name:'Platinum',          sym:'TVC:PLATINUM',  yahoo:'PL=F',    sig:'HOLD' },
  { id:'PALL',   name:'Palladium',         sym:'TVC:PALLADIUM', yahoo:'PA=F',    sig:'HOLD' },
  { id:'ALUM',   name:'Aluminium',         sym:'LME:MAL1!',     yahoo:'ALI=F',   sig:'HOLD' },
  { id:'NICKEL', name:'Nickel',            sym:'LME:MNI1!',     yahoo:'NI=F',    sig:'HOLD' },
  { id:'ZINC',   name:'Zinc',              sym:'LME:MZN1!',     yahoo:'ZNC=F',   sig:'HOLD' },
  { id:'COFFEE', name:'Coffee',            sym:'ICEUS:KC1!',    yahoo:'KC=F',    sig:'HOLD' },
  { id:'SUGAR',  name:'Sugar',             sym:'ICEUS:SB1!',    yahoo:'SB=F',    sig:'HOLD' },
  { id:'COTTON', name:'Cotton',            sym:'ICEUS:CT1!',    yahoo:'CT=F',    sig:'HOLD' },
  { id:'COCOA',  name:'Cocoa',             sym:'ICEUS:CC1!',    yahoo:'CC=F',    sig:'HOLD' },
  { id:'LUMBER', name:'Lumber',            sym:'CME:LBR1!',     yahoo:'LBS=F',   sig:'HOLD' },
  { id:'CATTLE', name:'Live Cattle',       sym:'CME:LE1!',      yahoo:'LE=F',    sig:'HOLD' },
]

// ─── FOREX MAJOR PAIRS ────────────────────────────────────────────────────────
export const FOREX = [
  { id:'EURUSD', name:'EUR / USD',  sym:'FX:EURUSD',  sig:'HOLD' },
  { id:'GBPUSD', name:'GBP / USD',  sym:'FX:GBPUSD',  sig:'HOLD' },
  { id:'USDJPY', name:'USD / JPY',  sym:'FX:USDJPY',  sig:'HOLD' },
  { id:'USDCHF', name:'USD / CHF',  sym:'FX:USDCHF',  sig:'HOLD' },
  { id:'AUDUSD', name:'AUD / USD',  sym:'FX:AUDUSD',  sig:'HOLD' },
  { id:'USDCAD', name:'USD / CAD',  sym:'FX:USDCAD',  sig:'HOLD' },
  { id:'NZDUSD', name:'NZD / USD',  sym:'FX:NZDUSD',  sig:'HOLD' },
  { id:'EURGBP', name:'EUR / GBP',  sym:'FX:EURGBP',  sig:'HOLD' },
  { id:'EURJPY', name:'EUR / JPY',  sym:'FX:EURJPY',  sig:'HOLD' },
  { id:'GBPJPY', name:'GBP / JPY',  sym:'FX:GBPJPY',  sig:'HOLD' },
  { id:'USDBRL', name:'USD / BRL',  sym:'FX:USDBRL',  sig:'HOLD' },
  { id:'USDMXN', name:'USD / MXN',  sym:'FX:USDMXN',  sig:'HOLD' },
  { id:'USDCNY', name:'USD / CNY',  sym:'FX:USDCNY',  sig:'HOLD' },
  { id:'USDINR', name:'USD / INR',  sym:'FX:USDINR',  sig:'HOLD' },
  { id:'USDKRW', name:'USD / KRW',  sym:'FX:USDKRW',  sig:'HOLD' },
  { id:'USDZAR', name:'USD / ZAR',  sym:'FX:USDZAR',  sig:'HOLD' },
  { id:'USDSGD', name:'USD / SGD',  sym:'FX:USDSGD',  sig:'HOLD' },
  { id:'USDHKD', name:'USD / HKD',  sym:'FX:USDHKD',  sig:'HOLD' },
  { id:'EURCHF', name:'EUR / CHF',  sym:'FX:EURCHF',  sig:'HOLD' },
  { id:'AUDCAD', name:'AUD / CAD',  sym:'FX:AUDCAD',  sig:'HOLD' },
  { id:'DXY',    name:'Dollar Index',sym:'TVC:DXY',    sig:'HOLD' },
  { id:'US10Y',  name:'US 10Y Yield',sym:'TVC:US10Y',  sig:'HOLD' },
  { id:'US2Y',   name:'US 2Y Yield', sym:'TVC:US02Y',  sig:'HOLD' },
]

// ─── MACRO INDICES ────────────────────────────────────────────────────────────
export const INDICES = [
  { id:'SPX',    name:'S&P 500',         sym:'SP:SPX',        sig:'BUY'  },
  { id:'NDX',    name:'Nasdaq 100',      sym:'NASDAQ:NDX',    sig:'BUY'  },
  { id:'DJI',    name:'Dow Jones',       sym:'DJ:DJI',        sig:'BUY'  },
  { id:'RUT',    name:'Russell 2000',    sym:'TVC:RUT',       sig:'HOLD' },
  { id:'VIX',    name:'VIX Volatility',  sym:'TVC:VIX',       sig:'HOLD' },
  { id:'FTSE',   name:'FTSE 100',        sym:'TVC:UKX',       sig:'HOLD' },
  { id:'DAX',    name:'DAX 40',          sym:'XETR:DAX',      sig:'HOLD' },
  { id:'CAC40',  name:'CAC 40',          sym:'EURONEXT:PX1',  sig:'HOLD' },
  { id:'N225',   name:'Nikkei 225',      sym:'TVC:NI225',     sig:'HOLD' },
  { id:'HSI',    name:'Hang Seng',       sym:'TVC:HSI',       sig:'HOLD' },
  { id:'TSX',    name:'TSX Composite',   sym:'TVC:TSX',       sig:'BUY'  },
]

// ─── COMBINED SEARCH INDEX ────────────────────────────────────────────────────
export const ALL_ASSETS = [
  ...CRYPTO.map(a    => ({ ...a, cat: 'Crypto'      })),
  ...EQUITIES.map(a  => ({ ...a, cat: 'Equities', cgId: null })),
  ...COMMODITIES.map(a=>({ ...a, cat: 'Commodities',cgId: null })),
  ...FOREX.map(a     => ({ ...a, cat: 'Forex',       cgId: null })),
  ...INDICES.map(a   => ({ ...a, cat: 'Indices',     cgId: null })),
]

// ─── COINGECKO BATCH IDS (top 50 for free tier rate limit) ───────────────────
export const CG_BATCH = CRYPTO.slice(0, 50).map(c => c.cgId).join(',')

// ─── STATIC SIGNAL DATA (AI updates these) ───────────────────────────────────
export const ASSET_META = Object.fromEntries(
  ALL_ASSETS.map(a => [a.id, { sig: a.sig || 'HOLD', conf: '62%', sd: 'Neutral' }])
)

// ─── RATES ───────────────────────────────────────────────────────────────────
export const RATES = {
  USD: { symbol: '$',  label: 'USD', rate: 1.0    },
  CAD: { symbol: 'C$', label: 'CAD', rate: 1.3850 },
  EUR: { symbol: '€',  label: 'EUR', rate: 0.9220 },
}

// ─── NEWS ─────────────────────────────────────────────────────────────────────
export const NEWS = [
  { src: 'Bloomberg',   hl: 'Fed signals no rate hike through Q3 2026 — dollar weakens across G10 currencies',              time: '44 min ago',  sent: 'Bullish' },
  { src: 'CoinDesk',    hl: 'Bitcoin ETF inflows reach $380M in a single session — institutional demand accelerating',       time: '1h 02m ago',  sent: 'Bullish' },
  { src: 'Reuters',     hl: 'Tesla misses Q1 2026 delivery estimates — shares fall in pre-market trading',                   time: '1h 30m ago',  sent: 'Bearish' },
  { src: 'The Block',   hl: 'Hyperliquid open interest surpasses $2.3B — new all-time record for decentralised perpetuals', time: '2h 00m ago',  sent: 'Bullish' },
  { src: 'MarketWatch', hl: 'Gold holds near all-time high as global M2 money supply continues expansion',                  time: '2h 45m ago',  sent: 'Neutral' },
  { src: 'WSJ',         hl: 'S&P 500 rallies as tech earnings beat expectations across the board',                          time: '3h 00m ago',  sent: 'Bullish' },
  { src: 'FT',          hl: 'Oil slides on demand concerns as OPEC+ signals production increase',                           time: '3h 30m ago',  sent: 'Bearish' },
]

export const TWEETS = [
  { handle: '@zerohedge',    text: 'Fed balance sheet expanding quietly. M2 historically leads crypto by 6-8 weeks. Watch closely.',               time: '52 min ago',  sent: 'Bullish' },
  { handle: '@truflation',   text: 'Real-time CPI now 2.1% — below Fed target. Rate cut probability for June rising significantly.',               time: '1h 08m ago',  sent: 'Bullish' },
  { handle: '@eWhispers',    text: '$NVDA whisper number $0.94 vs. consensus $0.88. Market pricing a beat. Earnings in 12 days.',                  time: '1h 45m ago',  sent: 'Bullish' },
  { handle: '@WatcherGuru',  text: 'BREAKING: US Treasury confirms no new bond issuance this quarter. Risk assets rally globally.',                time: '2h 10m ago',  sent: 'Bullish' },
  { handle: '@CoinBureau',   text: 'DXY breaking below 100 is historically one of the strongest signals for BTC upside. Watch this level.',       time: '2h 40m ago',  sent: 'Bullish' },
  { handle: '@elonmusk',     text: 'The dollar is being debased at an alarming rate.',                                                             time: '3h 00m ago',  sent: 'Bullish' },
  { handle: '@AltcoinGordon',text: 'ETH/BTC ratio forming a reversal pattern. Ethereum could significantly outperform over the next 2 weeks.',    time: '3h 20m ago',  sent: 'Bullish' },
]

export const TRADES = [
  { asset: 'BTC',  dir: 'Long',  entryUSD: 79800,  pnlUSD: 4.20,  pos: true,  time: '14m ago'  },
  { asset: 'ETH',  dir: 'Long',  entryUSD: 2280,   pnlUSD: 6.80,  pos: true,  time: '1h ago'   },
  { asset: 'SOL',  dir: 'Long',  entryUSD: 148.20, pnlUSD: 3.20,  pos: true,  time: '3h ago'   },
  { asset: 'TSLA', dir: 'Short', entryUSD: 295.20, pnlUSD: -1.80, pos: false, time: '5h ago'   },
  { asset: 'BTC',  dir: 'Short', entryUSD: 82100,  pnlUSD: -2.10, pos: false, time: '8h ago'   },
  { asset: 'NVDA', dir: 'Long',  entryUSD: 1071,   pnlUSD: 3.24,  pos: true,  time: '12h ago'  },
]
