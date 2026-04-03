import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useElement } from '../../context/ElementContext'

interface Props {
  title: string
  children: ReactNode
  className?: string
  id?: string
}

export default function TerminalWindow({ title, children, className = '', id }: Props) {
  const { elementData } = useElement()

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`terminal-window ${className}`}
    >
      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span
          className="text-xs font-mono opacity-60 ml-3"
          style={{ color: elementData.colors.primary }}
        >
          {title}
        </span>
        <div className="flex-1" />
      </div>

      {/* Content */}
      <div className="terminal-body">
        {children}
      </div>
    </motion.section>
  )
}
