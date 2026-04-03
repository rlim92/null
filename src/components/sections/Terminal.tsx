import { useRef, useEffect } from 'react'
import { useElement } from '../../context/ElementContext'
import { useTerminal } from '../../hooks/useTerminal'
import TerminalWindow from '../ui/TerminalWindow'

export default function Terminal() {
  const { element, elementData, setElement } = useElement()
  const { lines, input, setInput, handleKeyDown } = useTerminal(element, setElement)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  const focusInput = () => inputRef.current?.focus()

  return (
    <div className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <TerminalWindow id="terminal" title="rich@null:~ — interactive shell">
        <div onClick={focusInput}>
          {/* Output area */}
          <div
            ref={outputRef}
            className="font-mono text-sm leading-relaxed overflow-y-auto"
            style={{ maxHeight: '400px', minHeight: '300px' }}
          >
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line.type === 'input' ? (
                  <span>
                    <span style={{ color: elementData.colors.primary }}>{'>'} </span>
                    <span className="text-neutral-300">{line.content}</span>
                  </span>
                ) : (
                  <span style={{ color: line.color || '#6b7280' }}>{line.content}</span>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center mt-1">
              <span style={{ color: elementData.colors.primary }} className="mr-2">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-neutral-200 font-mono text-sm"
                style={{ caretColor: elementData.colors.primary }}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
              <span className="cursor-blink" style={{ color: elementData.colors.primary }}>█</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-neutral-600 mt-4 font-mono">
          Try "help" to get started. Tab for autocomplete. ↑/↓ for history.
        </p>
      </TerminalWindow>
    </div>
  )
}
