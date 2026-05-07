import { createContext, useContext, useState } from 'react'

const CurrencyContext = createContext()

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD')
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
