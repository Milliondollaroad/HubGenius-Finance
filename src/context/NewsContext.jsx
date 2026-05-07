import { createContext, useContext } from 'react'
import { useLiveNews } from '../hooks/useLiveNews'

const NewsContext = createContext()

export function NewsProvider({ children }) {
  const live = useLiveNews()
  return (
    <NewsContext.Provider value={live}>
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  return useContext(NewsContext)
}
