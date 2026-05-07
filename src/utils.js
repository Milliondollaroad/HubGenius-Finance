import { RATES } from './data'

export function formatLivePrice(usdValue, currency) {
  if (usdValue == null) return '—'
  const { symbol, rate } = RATES[currency]
  const val = usdValue * rate
  if (val >= 10000)  return `${symbol}${Math.round(val).toLocaleString()}`
  if (val >= 100)    return `${symbol}${val.toFixed(2)}`
  if (val >= 1)      return `${symbol}${val.toFixed(2)}`
  return `${symbol}${val.toFixed(4)}`
}

export function formatPct(chg) {
  if (chg == null) return '—'
  return chg
}
