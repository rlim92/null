import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useElement } from '../../context/ElementContext'
import { ELEMENTS, ELEMENT_ORDER } from '../../data/elements'
import type { ElementType } from '../../types'

const ELEMENT_ICONS: Record<ElementType, string> = {
  fire: 'icons/fire.png',
  water: 'icons/water.png',
  lightning: 'icons/lightning.png',
  wind: 'icons/wind.png',
  void: 'icons/void.png',
}

function ElementIcon({ el, size }: { el: ElementType; size: number }) {
  return (
    <img
      src={import.meta.env.BASE_URL + ELEMENT_ICONS[el]}
      alt={ELEMENTS[el].name}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
      draggable={false}
    />
  )
}

export default function ElementSelector() {
  const { element, setElement, elementData } = useElement()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 right-0 mb-0"
          >
            <div
              className="max-w-6xl mx-auto px-4 sm:px-6 pb-2"
            >
              <div
                className="flex items-center justify-center gap-2 sm:gap-3 p-3 rounded-t-lg"
                style={{
                  background: 'rgba(13, 13, 13, 0.95)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderBottom: 'none',
                }}
              >
                <span className="text-neutral-600 text-xs font-mono mr-2 hidden sm:inline">
                  $ theme
                </span>
                {ELEMENT_ORDER.map((el) => (
                  <motion.button
                    key={el}
                    onClick={() => { setElement(el); setOpen(false) }}
                    className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded text-xs cursor-pointer border transition-all font-mono overflow-hidden"
                    style={{
                      borderColor: el === element ? ELEMENTS[el].colors.primary + '60' : 'rgba(255, 255, 255, 0.04)',
                      background: el === element ? `${ELEMENTS[el].colors.primary}15` : 'transparent',
                      color: el === element ? ELEMENTS[el].colors.primary : '#4b5563',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={ELEMENTS[el].name}
                  >
                    <ElementIcon el={el} size={18} />
                    <span className="hidden sm:inline">{el}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status bar */}
      <div
        className="border-t"
        style={{
          background: 'rgba(20, 20, 20, 0.9)',
          backdropFilter: 'blur(8px)',
          borderColor: 'rgba(255, 255, 255, 0.04)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-7 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none transition-colors"
              style={{ color: elementData.colors.primary }}
            >
              <ElementIcon el={element} size={14} />
              <span>{ELEMENTS[element].name}</span>
              <span className="text-neutral-600 text-[10px]">{open ? '▼' : '▲'}</span>
            </button>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-600 hidden sm:inline">{ELEMENTS[element].nation}</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-600">
            <span className="hidden sm:inline">UTF-8</span>
            <span className="hidden sm:inline">TypeScript</span>
            <span>null v1.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
