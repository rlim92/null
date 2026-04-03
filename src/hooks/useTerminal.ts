import { useState, useCallback, useRef } from 'react'
import type { TerminalLine, ElementType } from '../types'
import { executeCommand } from '../data/terminal'

const KNOWN_COMMANDS = [
  'help', 'about', 'projects', 'skills', 'contact', 'theme',
  'lore', 'neofetch', 'fortune', 'clear', 'sudo', 'rm',
  'hack', 'whoami', 'ls', 'cat', 'pwd', 'cd', 'exit',
  'hello', 'hi', 'rich', 'emilia', 'quad', 'rock', 'dark',
  'matrix', 'ping', 'date',
]

const WELCOME_LINES: TerminalLine[] = [
  { type: 'system', content: '' },
  { type: 'system', content: '  Welcome to null terminal v1.0.0' },
  { type: 'system', content: '  Type "help" for available commands.' },
  { type: 'system', content: '' },
]

export function useTerminal(
  currentElement: ElementType,
  onSetElement: (el: ElementType) => void
) {
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_LINES)
  const [input, setInput] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const commandHistory = useRef<string[]>([])

  const submit = useCallback(() => {
    if (!input.trim() && !input) return

    const inputLine: TerminalLine = { type: 'input', content: input }
    const result = executeCommand(input, currentElement)

    if (result.action?.type === 'clear') {
      setLines(WELCOME_LINES)
      setInput('')
      setHistoryIndex(-1)
      return
    }

    if (result.action?.type === 'setElement') {
      onSetElement(result.action.value)
    }

    const outputLines: TerminalLine[] = result.lines.map((content) => ({
      type: 'output' as const,
      content,
      color: result.color,
    }))

    if (input.trim()) {
      commandHistory.current = [input.trim(), ...commandHistory.current.slice(0, 49)]
    }

    setLines((prev) => [...prev, inputLine, ...outputLines])
    setInput('')
    setHistoryIndex(-1)
  }, [input, currentElement, onSetElement])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        submit()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const history = commandHistory.current
        if (history.length === 0) return
        const newIndex = Math.min(historyIndex + 1, history.length - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex <= 0) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setInput(commandHistory.current[newIndex])
        }
      } else if (e.key === 'Tab') {
        e.preventDefault()
        if (!input) return
        const match = KNOWN_COMMANDS.find((c) => c.startsWith(input.toLowerCase()))
        if (match) setInput(match)
      }
    },
    [submit, historyIndex, input]
  )

  return { lines, input, setInput, handleKeyDown, submit }
}
