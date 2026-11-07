import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { LocaleProvider } from '@/lib/i18n'
import { Toaster } from '@/components/app/Toaster'
import './index.css'

// Hash routing so the studio deploys as a static site with no server rewrites.
//
// Toaster sits inside LocaleProvider because its live region needs a
// translated label, and outside the router because a toast raised just before
// a navigation should survive it.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LocaleProvider>
        <Toaster>
          <App />
        </Toaster>
      </LocaleProvider>
    </HashRouter>
  </StrictMode>,
)
