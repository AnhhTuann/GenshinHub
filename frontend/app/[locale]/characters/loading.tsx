export default function CharactersLoading() {
  return (
    <main className="min-h-screen bg-[#06060a] pt-[100px] pb-24 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto animate-pulse">
        <div className="mb-8">
          <div className="h-10 w-48 bg-white/10 rounded-md mb-2"></div>
          <div className="h-5 w-64 bg-white/5 rounded-md"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-white/5 rounded-xl border border-white/10"></div>
          ))}
        </div>
      </div>
    </main>
  );
}
