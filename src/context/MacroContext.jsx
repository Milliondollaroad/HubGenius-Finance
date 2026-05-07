import { createContext, useContext } from 'react'
import { useMacroData } from '../hooks/useMacroData'

const MacroContext = createContext()

export function MacroProvider({ children }) {
  const macro = useMacroData()
  return (
    <MacroContext.Provider value={macro}>
      {children}
    </MacroContext.Provider>
  )
}

export function useMacro() {
  return useContext(MacroContext)
}
