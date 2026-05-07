import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
    <BrowserRouter>
      <TopBar />
      <Navbar />
      <Ticker />
      <div style={{ paddingBottom: 'var(--mobile-nav-height, 0)' }} className="page-content">
        <Routes>
          <Route path="/"         element={<Landing  />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/bot"      element={<Bot      />} />
          <Route path="/pricing"  element={<Pricing  />} />
        </Routes>
      </div>
      <MobileNav />
    </BrowserRouter>
  )
}
