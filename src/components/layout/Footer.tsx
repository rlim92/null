import { useElement } from '../../context/ElementContext'

export default function Footer() {
  const { elementData } = useElement()

  return (
    <footer className="relative z-10 py-6 px-4 text-center font-mono mb-8">
      <p className="text-neutral-600 text-xs">
        <span style={{ color: elementData.colors.primary }}>{'// '}</span>
        Built with the elements
        <span className="text-neutral-700"> &mdash; </span>
        &copy; {new Date().getFullYear()} Rich
      </p>
    </footer>
  )
}
