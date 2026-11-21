import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/archivo-black/400.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/cabin/400.css'
import '@fontsource/cabin/400-italic.css'
import '@fontsource/cabin/600-italic.css'
import '@fontsource/cabin/700.css'
import './index.css'
import App from './App'

const printRoot = document.createElement('div')
printRoot.id = 'print-root'
document.body.appendChild(printRoot)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
