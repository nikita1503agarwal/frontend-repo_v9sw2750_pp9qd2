import { useEffect, useState } from 'react'

export default function Wallet() {
  const [phone, setPhone] = useState('')
  const [wallet, setWallet] = useState(null)
  const [amount, setAmount] = useState('')
  const [toPhone, setToPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadWallet = async () => {
    if (!phone) return
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/wallet/${encodeURIComponent(phone)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to fetch wallet')
      setWallet(data)
    } catch (e) {
      setWallet(null)
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  const topup = async () => {
    if (!phone || !amount) return
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/wallet/topup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount: parseFloat(amount) })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Top up failed')
      await loadWallet()
      setAmount('')
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  const transfer = async () => {
    if (!phone || !toPhone || !amount) return
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/wallet/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from_phone: phone, to_phone: toPhone, amount: parseFloat(amount) })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Transfer failed')
      await loadWallet()
      setAmount('')
      setToPhone('')
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="demo" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900">Wallet demo</h2>
        <p className="mt-2 text-slate-600">Query your wallet, top up, and send funds.</p>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3 bg-white rounded-2xl p-5 ring-1 ring-slate-200">
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone (07XXXXXXXX)" className="w-full px-4 py-3 rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            <button onClick={loadWallet} disabled={loading || !phone} className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 disabled:opacity-60">Load Wallet</button>

            {wallet && (
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-white to-indigo-50 ring-1 ring-slate-200">
                <p className="text-slate-500 text-sm">Balance</p>
                <p className="text-3xl font-extrabold text-slate-900">KES {wallet.balance.toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className="space-y-3 bg-white rounded-2xl p-5 ring-1 ring-slate-200">
            <h3 className="font-semibold text-slate-900">Top up</h3>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (KES)" type="number" className="w-full px-4 py-3 rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            <button onClick={topup} disabled={loading || !amount || !phone} className="w-full px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 disabled:opacity-60">Top up</button>
          </div>

          <div className="space-y-3 bg-white rounded-2xl p-5 ring-1 ring-slate-200">
            <h3 className="font-semibold text-slate-900">Transfer</h3>
            <input value={toPhone} onChange={(e) => setToPhone(e.target.value)} placeholder="Recipient phone" className="w-full px-4 py-3 rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (KES)" type="number" className="w-full px-4 py-3 rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            <button onClick={transfer} disabled={loading || !amount || !phone || !toPhone} className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-60">Send</button>
          </div>
        </div>
      </div>
    </section>
  )
}
