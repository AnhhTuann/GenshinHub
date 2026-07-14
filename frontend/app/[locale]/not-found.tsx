import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative overflow-hidden"
      style={{ background: '#04040a' }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.06) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(127,90,240,0.05) 0%, transparent 65%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(79,195,247,0.04) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* Floating element particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🔥', '💧', '🌿', '⚡', '🌀', '❄️', '🪨'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-10 animate-float"
            style={{
              left: `${10 + i * 13}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* 404 number */}
        <div className="relative mb-6">
          <h1
            className="text-[8rem] sm:text-[12rem] font-black leading-none select-none"
            style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              background: 'linear-gradient(135deg, #fff8e1 0%, #f0c84b 35%, #c8a84b 65%, rgba(200,168,75,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 40px rgba(200,168,75,0.25))',
            }}
          >
            404
          </h1>
          {/* Glowing orb behind */}
          <div
            className="absolute inset-0 -z-10 rounded-full m-auto w-48 h-48"
            style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }}
          />
        </div>

        {/* Paimon emoji */}
        <div className="text-5xl mb-4 animate-float">🌙</div>

        <h2
          className="text-2xl sm:text-3xl font-black text-white mb-3"
          style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)' }}
        >
          Lost in Teyvat?
        </h2>

        <p className="text-white/40 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
          This page has been swallowed by the Abyss or never existed in Teyvat. Let Paimon guide you back!
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.4))' }} />
          <span style={{ color: '#c8a84b' }}>✦</span>
          <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, rgba(200,168,75,0.4), transparent)' }} />
        </div>

        {/* CTA buttons — both gold-themed */}
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/en"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, rgba(200,168,75,0.20), rgba(200,168,75,0.10))',
              border: '1px solid rgba(200,168,75,0.35)',
              color: '#f0d080',
              boxShadow: '0 4px 20px rgba(200,168,75,0.08)',
            }}
          >
            🌏 Go Home (EN)
          </Link>
          <Link
            href="/vi"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            🌏 Về Trang Chủ (VI)
          </Link>
        </div>
      </div>
    </div>
  );
}
