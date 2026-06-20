export default function CharacterDetailLoading() {
  return (
    <main className="min-h-screen bg-[#06060a] text-white animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(320px, 55vw, 520px)' }}>
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-16 bg-white/10 rounded-lg"></div>
              <div className="h-6 w-16 bg-white/10 rounded-lg"></div>
            </div>
            <div>
              <div className="h-12 sm:h-16 w-64 sm:w-96 bg-white/10 rounded-lg mb-2"></div>
              <div className="h-5 w-48 bg-white/5 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 pb-16 sm:pb-24">
        <div className="w-full flex flex-col gap-5">
          {/* Overview */}
          <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="h-4 w-24 bg-white/10 rounded mb-5"></div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-white/5 border border-white/[0.05] rounded-xl"></div>
              ))}
            </div>
          </section>

          {/* 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-start">
            <div className="h-96 bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl"></div>
            <div className="flex flex-col gap-5">
              <div className="h-64 bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl"></div>
              <div className="h-64 bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
