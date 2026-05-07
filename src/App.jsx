import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CurrencyProvider } from './context/CurrencyContext'
import { PricesProvider }   from './context/PricesContext'
import { NewsProvider }     from './context/NewsContext'
import { MacroProvider }    from './context/MacroContext'
import TopBar    from './components/TopBar'
import Navbar    from './components/Navbar'
import Ticker    from './components/Ticker'
import MobileNav from './components/MobileNav'
import Landing   from './pages/Landing'
import Terminal  from './pages/Terminal'
import Bot       from './pages/Bot'
import Pricing   from './pages/Pricing'
import Legal     from './pages/Legal'
import Terms     from './pages/Terms'
import Privacy   from './pages/Privacy'
import Contact   from './pages/Contact'

export default function App() {
  return (
    <CurrencyProvider>
      <PricesProvider>
        <NewsProvider>
          <MacroProvider>
            <BrowserRouter>
              <TopBar />
              <Navbar />
              <Ticker />
              <div className="page-content" style={{ paddingBottom: 'var(--mobile-nav-height, 0)' }}>
                <Routes>
                  <Route path="/"          element={<Landing  />} />
                  <Route path="/terminal"  element={<Terminal />} />
                  <Route path="/bot"       element={<Bot      />} />
                  <Route path="/pricing"   element={<Pricing  />} />
                  <Route path="/legal"     element={<Legal    />} />
                  <Route path="/terms"     element={<Terms    />} />
                  <Route path="/privacy"   element={<Privacy  />} />
                  <Route path="/contact"   element={<Contact  />} />
                </Routes>
              </div>
              <MobileNav />
            </BrowserRouter>
          </MacroProvider>
        </NewsProvider>
      </PricesProvider>
    </CurrencyProvider>
  )
}
