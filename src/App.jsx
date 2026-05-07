import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CurrencyProvider } from './context/CurrencyContext'
import { PricesProvider }   from './context/PricesContext'
import { NewsProvider }     from './context/NewsContext'
import TopBar    from './components/TopBar'
import Navbar    from './components/Navbar'
import Ticker    from './components/Ticker'
import MobileNav from './components/MobileNav'
import Landing   from './pages/Landing'
import Terminal  from './pages/Terminal'
import Bot       from './pages/Bot'
import Pricing   from './pages/Pricing'

export default function App() {
  return (
    <CurrencyProvider>
      <PricesProvider>
        <NewsProvider>
          <BrowserRouter>
            <TopBar />
            <Navbar />
            <Ticker />
            <div className="page-content" style={{ paddingBottom: 'var(--mobile-nav-height, 0)' }}>
              <Routes>
                <Route path="/"         element={<Landing  />} />
                <Route path="/terminal" element={<Terminal />} />
                <Route path="/bot"      element={<Bot      />} />
                <Route path="/pricing"  element={<Pricing  />} />
              </Routes>
            </div>
            <MobileNav />
          </BrowserRouter>
        </NewsProvider>
      </PricesProvider>
    </CurrencyProvider>
  )
}
