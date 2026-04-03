import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ElementProvider, useElement } from './context/ElementContext'
import MatrixRain from './components/layout/MatrixRain'
import Navbar from './components/layout/Navbar'
import ElementSelector from './components/layout/ElementSelector'
import Footer from './components/layout/Footer'
import MapHero from './components/sections/MapHero'
import About from './components/sections/About'
import Terminal from './components/sections/Terminal'
import Contact from './components/sections/Contact'
import ProjectModal from './components/ui/ProjectModal'
import { useKonamiCode } from './hooks/useKonamiCode'
import { ELEMENT_ORDER } from './data/elements'
import type { Project } from './types'

function KonamiOverlay() {
  const { setElement } = useElement()
  const [active, setActive] = useState(false)

  const handleKonami = useCallback(() => {
    setActive(true)
    let i = 0
    const interval = setInterval(() => {
      setElement(ELEMENT_ORDER[i % ELEMENT_ORDER.length])
      i++
      if (i >= 18) {
        clearInterval(interval)
        setElement('void')
        setTimeout(() => setActive(false), 2500)
      }
    }, 150)
  }, [setElement])

  useKonamiCode(handleKonami)

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          style={{ background: 'rgba(5, 0, 10, 0.85)' }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="text-center"
          >
            <p className="text-4xl sm:text-6xl font-bold font-mono glow-text" style={{ color: '#a0a0a0' }}>
              Primal Form Unlocked
            </p>
            <p className="mt-4 text-neutral-500 text-sm font-mono">The void consumes all.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="crt-flicker">
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Scanline overlay */}
      <div className="scanline-overlay" />

      <Navbar />
      <KonamiOverlay />

      <main className="relative z-10 pb-8">
        <Terminal />
        <About />
        <MapHero onSelectProject={setSelectedProject} />
        <Contact />
      </main>

      <Footer />
      <ElementSelector />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <ElementProvider>
      <AppContent />
    </ElementProvider>
  )
}
