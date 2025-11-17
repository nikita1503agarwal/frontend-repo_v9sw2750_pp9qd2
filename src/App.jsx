import { useState } from 'react'
import Hero from './components/Hero'
import Onboarding from './components/Onboarding'
import Wallet from './components/Wallet'

function App() {
  const [registered, setRegistered] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/60 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600" />
            <span className="font-bold text-slate-900">MobiKES</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-700">
            <a href="#onboard" className="hover:text-slate-900">Onboard</a>
            <a href="#demo" className="hover:text-slate-900">Demo</a>
            <a href="/test" className="hover:text-slate-900">Status</a>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        <Hero />
        <Onboarding onRegistered={setRegistered} />
        <Wallet registered={registered} />
      </main>

      <footer className="py-10 text-center text-sm text-slate-500">
        Made for Kenya • KES • Demo only
      </footer>
    </div>
  )
}

export default App
