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
              Hey, I'm Rich. Software engineer who likes building things end-to-end —
              from system design to deployment. I've worked across full-stack web, real-time
              systems, and AI tooling, and I'm always looking for the next thing to build.
            </p>
            <p>
              The projects on the map are things I've shipped across different domains —
              each one named after a force of nature. The elemental theme ties them
              together as part of a larger world I've been building on the side.
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
