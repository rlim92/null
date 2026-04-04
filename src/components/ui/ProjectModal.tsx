import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '../../types'
import { ELEMENTS } from '../../data/elements'
import { useElement } from '../../context/ElementContext'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const el = ELEMENTS[project.element]
  const { setElement } = useElement()
  const panelRef = useRef<HTMLDivElement>(null)

  // Switch theme to project's element
  useEffect(() => {
    setElement(project.element)
  }, [project.element, setElement])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-start justify-end"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative h-full w-full max-w-2xl overflow-y-auto"
        style={{
          background: `linear-gradient(135deg, #0a0a0a 0%, ${el.colors.bg} 100%)`,
          borderLeft: `1px solid ${el.colors.primary}25`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border transition-colors"
          style={{
            background: 'rgba(10, 10, 10, 0.8)',
            borderColor: `${el.colors.primary}30`,
            color: el.colors.primary,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${el.colors.primary}20`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(10, 10, 10, 0.8)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        <div className="p-6 sm:p-10 pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p
              className="text-xs font-mono uppercase tracking-[0.2em] mb-2"
              style={{ color: el.colors.primary }}
            >
              {el.name} &mdash; {el.tagline}
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold font-mono tracking-tight"
              style={{
                color: el.colors.primary,
                textShadow: `0 0 30px ${el.colors.glow}`,
              }}
            >
              {project.title}
            </h2>
            <p className="text-lg text-neutral-400 mt-2 font-light">
              {project.subtitle}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="h-px my-8 origin-left"
            style={{ background: `linear-gradient(to right, ${el.colors.primary}, transparent)` }}
          />

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h3
              className="text-xs font-mono uppercase tracking-[0.15em] mb-4"
              style={{ color: el.colors.primary }}
            >
              Key Features
            </h3>
            <ul className="space-y-2.5">
              {project.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-neutral-300"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: el.colors.primary }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Architecture */}
          {project.architecture && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <h3
                className="text-xs font-mono uppercase tracking-[0.15em] mb-3"
                style={{ color: el.colors.primary }}
              >
                Architecture
              </h3>
              <div
                className="px-4 py-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: `1px solid ${el.colors.primary}15`,
                  color: el.colors.primary,
                }}
              >
                {project.architecture}
              </div>
            </motion.div>
          )}

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <h3
              className="text-xs font-mono uppercase tracking-[0.15em] mb-3"
              style={{ color: el.colors.primary }}
            >
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-mono"
                  style={{
                    background: `${el.colors.primary}12`,
                    border: `1px solid ${el.colors.primary}25`,
                    color: el.colors.primary,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex gap-3"
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono transition-all"
                style={{
                  background: `${el.colors.primary}15`,
                  border: `1px solid ${el.colors.primary}30`,
                  color: el.colors.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${el.colors.primary}25`
                  e.currentTarget.style.boxShadow = `0 4px 20px ${el.colors.glow}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${el.colors.primary}15`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono transition-all"
                style={{
                  background: el.colors.primary,
                  color: '#0a0a0a',
                }}
              >
                Live Demo &rarr;
              </a>
            )}
          </motion.div>

          {/* Bottom padding for scroll */}
          <div className="h-12" />
        </div>
      </motion.div>
    </motion.div>
  )
}
