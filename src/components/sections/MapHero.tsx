import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useElement } from '../../context/ElementContext'
import { PROJECTS } from '../../data/projects'
import { ELEMENTS } from '../../data/elements'
import TerminalWindow from '../ui/TerminalWindow'
import type { Project } from '../../types'

interface Props {
  onSelectProject: (project: Project) => void
}

export default function MapHero({ onSelectProject }: Props) {
  const { elementData } = useElement()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 relative z-10"
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold font-mono tracking-tighter glow-text"
          style={{ color: elementData.colors.primary }}
        >
          null
        </h1>
        <p className="text-neutral-500 text-xs sm:text-sm mt-2 font-mono tracking-wider">
          <span className="text-neutral-600">$</span> Software Engineer
        </p>
        <p className="text-neutral-600 text-[11px] sm:text-xs mt-3 max-w-md mx-auto leading-relaxed">
          Each project is a force of nature. Click a marker on the map to explore.
        </p>
      </motion.div>

      {/* Map in terminal window */}
      <TerminalWindow
        title="rich@null:~/map — forces of nature"
        className="w-full max-w-5xl"
      >
        <div className="relative">
          {/* Map image */}
          <img
            src={import.meta.env.BASE_URL + 'map.jpeg'}
            alt="Elemental World Map"
            className="w-full h-auto rounded-md"
            style={{
              border: `1px solid rgba(255, 255, 255, 0.05)`,
              filter: 'brightness(0.85) contrast(1.1)',
            }}
            draggable={false}
          />

          {/* Dim overlay when hovering a project */}
          <AnimatePresence>
            {hoveredId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{ background: 'rgba(0, 0, 0, 0.35)' }}
              />
            )}
          </AnimatePresence>

          {/* Hotspots */}
          {PROJECTS.map((project) => {
            const el = ELEMENTS[project.element]
            const isHovered = hoveredId === project.id

            return (
              <div
                key={project.id}
                className="absolute"
                style={{
                  left: `${project.hotspot.x}%`,
                  top: `${project.hotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Outer glow pulse */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 72,
                    height: 72,
                    left: -36,
                    top: -36,
                    background: `radial-gradient(circle, ${el.colors.primary}25 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Clickable hotspot */}
                <motion.button
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full cursor-pointer z-10"
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle, #ffffff 0%, ${el.colors.primary} 60%, ${el.colors.primary}40 100%)`
                      : `radial-gradient(circle, #ffffffcc 0%, ${el.colors.primary}cc 50%, ${el.colors.primary}40 100%)`,
                    border: `2px solid ${isHovered ? '#ffffff' : el.colors.primary}`,
                    boxShadow: isHovered
                      ? `0 0 20px ${el.colors.glow}, 0 0 40px ${el.colors.glow}, 0 0 8px #ffffff80`
                      : `0 0 12px ${el.colors.glow}, 0 0 4px #ffffff60`,
                  }}
                  animate={isHovered ? { scale: 1.4 } : {
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={isHovered ? { duration: 0.2 } : {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileTap={{ scale: 0.9 }}
                  title={project.title}
                />

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 whitespace-nowrap z-20 pointer-events-none"
                    >
                      <div
                        className="px-3 py-2 rounded text-xs font-mono"
                        style={{
                          background: 'rgba(10, 10, 10, 0.95)',
                          border: `1px solid ${el.colors.primary}40`,
                          boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px ${el.colors.glow}`,
                          color: el.colors.primary,
                        }}
                      >
                        <div className="font-bold">{project.title}</div>
                        <div className="text-neutral-500 text-xs mt-0.5">{project.subtitle}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </TerminalWindow>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-neutral-600 text-xs mt-4 font-mono tracking-widest"
      >
        CLICK A MARKER TO EXPLORE
      </motion.p>
    </div>
  )
}
