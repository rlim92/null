import { useState } from 'react'
import { motion } from 'framer-motion'
import { useElement } from '../../context/ElementContext'
import TerminalWindow from '../ui/TerminalWindow'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/rich', cmd: 'open github.com/rich' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rich', cmd: 'open linkedin.com/in/rich' },
  { label: 'Email', href: 'mailto:rich@example.com', cmd: 'mail rich@example.com' },
]

export default function Contact() {
  const { elementData } = useElement()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('rich@example.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      <TerminalWindow id="contact" title="rich@null:~/contact">
        <div className="font-mono text-sm">
          <p className="mb-4">
            <span style={{ color: elementData.colors.primary }}>{'>'} </span>
            <span className="text-neutral-400">cat contact.md</span>
          </p>

          <h2
            className="text-xl sm:text-2xl font-bold mb-2 glow-text"
            style={{ color: elementData.colors.primary }}
          >
            # Contact
          </h2>
          <p className="text-neutral-500 text-xs mb-6">
            Open to opportunities, collaborations, and conversations about code.
          </p>

          <div className="space-y-2">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 px-3 py-2 rounded text-xs transition-all terminal-link group"
                style={{
                  color: '#6b7280',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = elementData.colors.primary
                  e.currentTarget.style.borderColor = `${elementData.colors.primary}30`
                  e.currentTarget.style.background = `${elementData.colors.primary}08`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6b7280'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <span style={{ color: elementData.colors.primary }}>$</span>
                <span className="font-mono">{link.cmd}</span>
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={copyEmail}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-xs text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer bg-transparent border-none font-mono"
          >
            {copied ? '✓ Copied to clipboard' : '$ pbcopy < email.txt'}
          </motion.button>
        </div>
      </TerminalWindow>
    </div>
  )
}
