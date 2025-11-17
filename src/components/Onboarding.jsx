import { useState } from 'react'

const initial = { name: '', email: '', phone: '', national_id: '' }

export default function Onboarding({ onRegistered }) {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, national_id: form.national_id || null })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Registration failed')
      onRegistered?.(data)
      setForm(initial)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="onboard" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Create your wallet</h2>
            <p className="mt-2 text-slate-600">Register with your Kenyan phone to get a KES wallet.</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="phone" placeholder="Phone (e.g., 07XXXXXXXX)" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required />
                <input name="national_id" placeholder="National ID (optional)" value={form.national_id} onChange={handleChange} className="w-full px-4 py-3 rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button disabled={loading} className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-500 disabled:opacity-60">
                {loading ? 'Creating...' : 'Create Wallet'}
              </button>
            </form>
          </div>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-indigo-50 ring-1 ring-slate-200">
            <h3 className="font-semibold text-slate-900">What you get</h3>
            <ul className="mt-3 space-y-2 text-slate-600 list-disc list-inside">
              <li>KES wallet linked to your phone</li>
              <li>Instant top-ups and transfers</li>
              <li>Clear transaction history</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
