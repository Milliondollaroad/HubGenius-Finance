import { createContext, useContext } from 'react'
import { useLivePrices } from '../hooks/useLivePrices'

const PricesContext = createContext()

export function PricesProvider({ children }) {
  const live = useLivePrices()
  return (
    <PricesContext.Provider value={live}>
      {children}
    </PricesContext.Provider>
  )
}

export function usePrices() {
  return useContext(PricesContext)
}
