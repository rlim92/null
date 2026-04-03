export type ElementType = 'fire' | 'water' | 'lightning' | 'wind' | 'void'

export interface ElementColors {
  primary: string
  secondary: string
  accent: string
  glow: string
  bg: string
}

export interface ElementDefinition {
  id: ElementType
  name: string
  nation: string
  animal: string
  weapon: string
  sacredItem: string
  disaster: string
  disasterAttack: string
  foodPrep: string
  colors: ElementColors
  description: string
  tagline: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  tech: string[]
  architecture?: string
  element: ElementType
  github?: string
  live?: string
  hotspot: { x: number; y: number } // percentage position on map
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system'
  content: string
  color?: string
}
