import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useElement } from '../../context/ElementContext'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const NAV_LINKS = [
  { id: 'terminal', label: '~', prefix: '' },
  { id: 'about', label: 'about', prefix: '/' },
  { id: 'hero', label: 'map', prefix: '/' },
  { id: 'contact', label: 'contact', prefix: '/' },
]

export default function Navbar() {
  const { elementData } = useElement()
  const active = useScrollSpy()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(13, 13, 13, 0.92)' : 'rgba(13, 13, 13, 0.6)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(255, 255, 255, 0.06)' : 'transparent'}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Left: traffic lights + title */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <button
              onClick={() => scrollTo('hero')}
              className="font-mono text-sm font-bold tracking-tight cursor-pointer bg-transparent border-none"
              style={{ color: elementData.colors.primary }}
            >
              rich@null<span className="text-neutral-500">:</span><span className="text-neutral-400">~</span><span className="text-neutral-500">$</span>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-3 py-1.5 text-xs rounded transition-all duration-200 cursor-pointer bg-transparent border-none font-mono"
                style={{
                  color: active === link.id ? elementData.colors.primary : '#6b7280',
                  background: active === link.id ? `${elementData.colors.primary}10` : 'transparent',
                  textShadow: active === link.id
                    ? `0 0 8px ${elementData.colors.glow}`
                    : 'none',
                }}
              >
                <span className="text-neutral-600">{link.prefix}</span>{link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-4 h-px transition-all duration-200"
              style={{
                background: elementData.colors.primary,
                transform: mobileOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
              }}
            />
            <span
              className="block w-4 h-px transition-all duration-200"
              style={{
                background: elementData.colors.primary,
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-4 h-px transition-all duration-200"
              style={{
                background: elementData.colors.primary,
                transform: mobileOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-14 left-0 right-0 z-40 md:hidden"
            style={{
              background: 'rgba(13, 13, 13, 0.95)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="flex flex-col p-3 gap-0.5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-4 py-2.5 text-left text-xs rounded transition-all cursor-pointer bg-transparent border-none font-mono"
                  style={{
                    color: active === link.id ? elementData.colors.primary : '#6b7280',
                    background: active === link.id ? `${elementData.colors.primary}10` : 'transparent',
                  }}
                >
                  <span className="text-neutral-600">$ cd </span>{link.prefix}{link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
