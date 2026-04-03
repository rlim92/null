import { useEffect, useRef } from 'react'
import { useElement } from '../../context/ElementContext'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]()=+-*&^%$#@!~'

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { elementData } = useElement()
  const colorsRef = useRef(elementData.colors)

  // Keep colors ref in sync without re-running the animation effect
  useEffect(() => {
    colorsRef.current = elementData.colors
  }, [elementData.colors])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const fontSize = 14
    let columns: number[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const colCount = Math.floor(canvas.width / fontSize)
      // Preserve existing drop positions, add new ones
      const newCols = Array.from({ length: colCount }, (_, i) =>
        columns[i] ?? Math.random() * -100
      )
      columns = newCols
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      const primary = colorsRef.current.primary

      for (let i = 0; i < columns.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = columns[i] * fontSize

        // Head character is brighter
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff'
        } else {
          // Use element color with varying opacity
          const opacity = 0.15 + Math.random() * 0.25
          ctx.fillStyle = primary + Math.floor(opacity * 255).toString(16).padStart(2, '0')
        }

        ctx.fillText(char, x, y)

        // Reset when off screen with random chance
        if (y > canvas.height && Math.random() > 0.98) {
          columns[i] = 0
        }
        columns[i] += 0.5 + Math.random() * 0.5
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  )
}
