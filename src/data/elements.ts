import type { ElementDefinition, ElementType } from '../types'

export const ELEMENTS: Record<ElementType, ElementDefinition> = {
  fire: {
    id: 'fire',
    name: 'Fire',
    colors: {
      primary: '#ff4500',
      secondary: '#ff6347',
      accent: '#ffa500',
      glow: 'rgba(255, 69, 0, 0.4)',
      bg: '#1a0a00',
    },
    description: 'Real-time analytics dashboard streaming live crypto data onto customizable visualizations.',
    tagline: 'Forging Code in Fire',
  },
  water: {
    id: 'water',
    name: 'Water',
    colors: {
      primary: '#1e90ff',
      secondary: '#00bfff',
      accent: '#4682b4',
      glow: 'rgba(30, 144, 255, 0.4)',
      bg: '#000a1a',
    },
    description: 'AI-powered knowledge base with document upload, vector search, and RAG-driven chat.',
    tagline: 'Flowing Through Systems',
  },
  lightning: {
    id: 'lightning',
    name: 'Lightning',
    colors: {
      primary: '#ffd700',
      secondary: '#f5c842',
      accent: '#9b59b6',
      glow: 'rgba(255, 215, 0, 0.4)',
      bg: '#0a0a00',
    },
    description: 'Real-time collaborative canvas powered by CRDTs — share a link, edit together instantly.',
    tagline: 'Striking with Precision',
  },
  wind: {
    id: 'wind',
    name: 'Wind',
    colors: {
      primary: '#2ecc71',
      secondary: '#a8d8a8',
      accent: '#87ceab',
      glow: 'rgba(46, 204, 113, 0.4)',
      bg: '#000a06',
    },
    description: 'Webhook relay and inspector — capture and inspect HTTP requests in real time.',
    tagline: 'Carried by Momentum',
  },
  void: {
    id: 'void',
    name: 'Void',
    colors: {
      primary: '#a0a0a0',
      secondary: '#505050',
      accent: '#2a2a2a',
      glow: 'rgba(160, 160, 160, 0.3)',
      bg: '#050505',
    },
    description: 'Elemental card battler — build your deck, master five elements, and battle through a procedural world map.',
    tagline: 'Embracing the Void',
  },
}

export const ELEMENT_ORDER: ElementType[] = ['fire', 'water', 'lightning', 'wind', 'void']

export const DEFAULT_ELEMENT: ElementType = 'void'
