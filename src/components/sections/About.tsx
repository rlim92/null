import { useElement } from '../../context/ElementContext'
import TerminalWindow from '../ui/TerminalWindow'

export default function About() {
  const { elementData } = useElement()

  return (
    <div className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      <TerminalWindow id="about" title="rich@null:~/about.md">
        <div className="font-mono text-sm leading-relaxed">
          <p className="mb-4">
            <span style={{ color: elementData.colors.primary }}>{'>'} </span>
            <span className="text-neutral-400">cat about.md</span>
          </p>

          <h2
            className="text-xl sm:text-2xl font-bold mb-4 glow-text"
            style={{ color: elementData.colors.primary }}
          >
            # About
          </h2>

          <div className="space-y-3 text-neutral-400 text-xs sm:text-sm">
            <p>
              Hey, I'm Rich. Software engineer still figuring things out, one project at a time.
              I like building stuff, breaking stuff, and occasionally shipping stuff that works.
            </p>
            <p>
              The four projects on the map below are things I've been working on across
              different domains — each one named after a force of nature because I thought
              that would be cool. The whole elemental theme is from a fantasy world I've been
              writing on the side, just for fun.
            </p>
            <p>
              Thanks for checking this out.
            </p>
          </div>
        </div>
      </TerminalWindow>
    </div>
  )
}
