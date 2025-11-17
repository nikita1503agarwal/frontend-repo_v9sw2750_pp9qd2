import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-blue-50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-8">
        <div className="backdrop-blur-xl bg-white/40 rounded-2xl p-8 shadow-[0_8px_30px_rgba(31,38,135,0.15)]">
          <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-700 ring-1 ring-indigo-600/20">
            Kenya • Fintech • KES
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            A modern fintech for Kenya
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Send and receive money in KES, top up via mobile, and move value instantly. Simple, secure, and built for Kenyan phone numbers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#onboard" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-500 transition">Get started</a>
            <a href="#demo" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/70 text-slate-900 font-semibold ring-1 ring-slate-200 hover:bg-white transition">Live demo</a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
