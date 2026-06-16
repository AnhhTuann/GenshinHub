import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#06060a] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-[8rem] sm:text-[12rem] font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/10 leading-none mb-4 select-none">
          404
        </h1>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Lost in Teyvat?
        </h2>
        
        <p className="text-white/50 text-base sm:text-lg max-w-md mb-8">
          The page you are looking for has been moved to the Abyss or never existed in the first place.
        </p>
        
        <div className="flex gap-4">
          <Link 
            href="/en"
            className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 hover:text-white border border-purple-500/30 font-bold rounded-xl transition-all duration-300"
          >
            Go Home (EN)
          </Link>
          <Link 
            href="/vi"
            className="px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 hover:text-white border border-emerald-500/30 font-bold rounded-xl transition-all duration-300"
          >
            Về Trang Chủ (VI)
          </Link>
        </div>
      </div>
    </div>
  );
}
