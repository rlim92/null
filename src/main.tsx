import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

console.log('%cnull', 'color: #a0a0a0; font-size: 24px; font-weight: bold; font-family: monospace;')
console.log('%cIf you are reading this, you might belong to the Void.', 'color: #707070; font-size: 13px;')
console.log('%cTry the terminal on the site — type "help" to begin.', 'color: #666; font-size: 12px;')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
