import { useCurrency } from '../context/CurrencyContext'

const CURRENCIES = ['USD', 'CAD', 'EUR']
const LABELS = { USD: '$ USD', CAD: 'C$ CAD', EUR: '€ EUR' }

export default function CurrencyToggle({ compact = false }) {
  const { currency, setCurrency } = useCurrency()

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 2,
      background: 'var(--off)', border: '1px solid var(--border2)',
      padding: 2, borderRadius: 3
    }}>
      {CURRENCIES.map(c => (
        <button key={c} onClick={() => setCurrency(c)} style={{
          background: currency === c ? 'var(--navy)' : 'transparent',
          color: currency === c ? 'var(--gold3)' : 'var(--text3)',
          border: 'none',
          padding: compact ? '3px 7px' : '4px 10px',
          fontSize: compact ? 9 : 10,
          fontFamily: 'Source Code Pro, monospace',
          fontWeight: currency === c ? 600 : 400,
          cursor: 'pointer',
          letterSpacing: '.5px',
          borderRadius: 2,
          transition: 'all .15s',
          whiteSpace: 'nowrap'
        }}>
          {compact ? c : LABELS[c]}
        </button>
      ))}
    </div>
  )
}
