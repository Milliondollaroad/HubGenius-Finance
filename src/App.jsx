import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CurrencyProvider } from './context/CurrencyContext'
import { PricesProvider }   from './context/PricesContext'
import { NewsProvider }     from './context/NewsContext'
import { MacroProvider }    from './context/MacroContext'
import TopBar    from './components/TopBar'
import Navbar    from './components/Navbar'
import Ticker    from './components/Ticker'
import MobileNav from './components/MobileNav'

// ─── Lazy-loaded pages — each becomes its own JS chunk ────────────────────
const Landing  = lazy(() => import('./pages/Landing'))
const Terminal = lazy(() => import('./pages/Terminal'))
const Bot      = lazy(() => import('./pages/Bot'))
const Pricing  = lazy(() => import('./pages/Pricing'))
const Legal    = lazy(() => import('./pages/Legal'))
const Terms    = lazy(() => import('./pages/Terms'))
const Privacy  = lazy(() => import('./pages/Privacy'))
const Contact  = lazy(() => import('./pages/Contact'))

// ─── Thin progress bar shown while a route chunk downloads ────────────────
function RouteLoader() {
  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '2px', zIndex: 9999, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: '40%',
          background: 'var(--gold2)',
          animation: 'hg-bar 800ms ease-in-out infinite alternate',
        }} />
      </div>
      <style>{`
        @keyframes hg-bar {
          from { transform: translateX(-10%); width: 30%; }
          to   { transform: translateX(200%); width: 60%; }
        }
      `}</style>
    </>
  )
}

// ─── News + Macro providers only for routes that need live data ───────────
function WithLiveData({ children }) {
  return (
    <NewsProvider>
      <MacroProvider>
        {children}
      </MacroProvider>
    </NewsProvider>
  )
}

export default function App() {
  return (
    <CurrencyProvider>
      <PricesProvider>
        <BrowserRouter>
          <TopBar />
          <Navbar />
          <Ticker />
          <div className="page-content" style={{ paddingBottom: 'var(--mobile-nav-height, 0)' }}>
            <Routes>
              {/* Data-heavy routes: need live news + macro */}
              <Route path="/" element={
                <WithLiveData>
                  <Suspense fallback={<RouteLoader />}><Landing /></Suspense>
                </WithLiveData>
              } />
              <Route path="/terminal" element={
                <WithLiveData>
                  <Suspense fallback={<RouteLoader />}><Terminal /></Suspense>
                </WithLiveData>
              } />
              <Route path="/bot" element={
                <WithLiveData>
                  <Suspense fallback={<RouteLoader />}><Bot /></Suspense>
                </WithLiveData>
              } />

              {/* Light routes: no live data needed */}
              <Route path="/pricing" element={<Suspense fallback={<RouteLoader />}><Pricing /></Suspense>} />
              <Route path="/legal"   element={<Suspense fallback={<RouteLoader />}><Legal   /></Suspense>} />
              <Route path="/terms"   element={<Suspense fallback={<RouteLoader />}><Terms   /></Suspense>} />
              <Route path="/privacy" element={<Suspense fallback={<RouteLoader />}><Privacy /></Suspense>} />
              <Route path="/contact" element={<Suspense fallback={<RouteLoader />}><Contact /></Suspense>} />
            </Routes>
          </div>
          <MobileNav />
        </BrowserRouter>
      </PricesProvider>
    </CurrencyProvider>
  )
}
