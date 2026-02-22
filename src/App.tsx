import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Support from './pages/Support'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Admin from './pages/Admin'
import DeleteAccount from './pages/DeleteAccount'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="support" element={<Support />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="delete-account" element={<DeleteAccount />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
