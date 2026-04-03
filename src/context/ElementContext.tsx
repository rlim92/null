import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { ElementType, ElementDefinition } from '../types'
import { ELEMENTS, DEFAULT_ELEMENT } from '../data/elements'

interface ElementContextValue {
  element: ElementType
  elementData: ElementDefinition
  setElement: (el: ElementType) => void
}

const ElementContext = createContext<ElementContextValue | null>(null)

function applyElementCSSVars(el: ElementDefinition) {
  const root = document.documentElement
  root.style.setProperty('--element-primary', el.colors.primary)
  root.style.setProperty('--element-secondary', el.colors.secondary)
  root.style.setProperty('--element-accent', el.colors.accent)
  root.style.setProperty('--element-glow', el.colors.glow)
  root.style.setProperty('--element-bg', el.colors.bg)
}

export function ElementProvider({ children }: { children: ReactNode }) {
  const [element, setElementState] = useState<ElementType>(() => {
    const saved = localStorage.getItem('null-element')
    if (saved && saved in ELEMENTS) return saved as ElementType
    return DEFAULT_ELEMENT
  })

  const elementData = ELEMENTS[element]

  const setElement = useCallback((el: ElementType) => {
    setElementState(el)
    localStorage.setItem('null-element', el)
  }, [])

  useEffect(() => {
    applyElementCSSVars(elementData)
  }, [elementData])

  return (
    <ElementContext.Provider value={{ element, elementData, setElement }}>
      {children}
    </ElementContext.Provider>
  )
}

export function useElement() {
  const ctx = useContext(ElementContext)
  if (!ctx) throw new Error('useElement must be used within ElementProvider')
  return ctx
}
