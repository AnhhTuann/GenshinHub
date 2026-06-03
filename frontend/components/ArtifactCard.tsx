import { ArtifactBuild } from '@/types/character';

export default function ArtifactCard({ artifact }: { artifact: ArtifactBuild }) {
  return (
    <div className="bg-[#0b0b0e] border border-gray-800 rounded-xl p-5 mb-4">
      <div className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-4">
        <div className="w-12 h-12 bg-yellow-900/20 rounded-lg flex items-center justify-center text-yellow-500 text-xl border border-yellow-700/30">✨</div>
        <div>
          <h4 className="font-bold text-gray-100 text-lg">{artifact.setName}</h4>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{artifact.pieces}-Piece Set</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center mb-4">
        <div className="bg-[#15151a] p-3 rounded-lg border border-gray-800/50 flex flex-col justify-center">
          <span className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Sands</span>
          <span className="text-gray-200 font-semibold text-sm">{artifact.sands.join(' / ')}</span>
        </div>
        <div className="bg-[#15151a] p-3 rounded-lg border border-gray-800/50 flex flex-col justify-center">
          <span className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Goblet</span>
          <span className="text-gray-200 font-semibold text-sm">{artifact.goblet.join(' / ')}</span>
        </div>
        <div className="bg-[#15151a] p-3 rounded-lg border border-gray-800/50 flex flex-col justify-center">
          <span className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Circlet</span>
          <span className="text-gray-200 font-semibold text-sm">{artifact.circlet.join(' / ')}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-4">
        <span className="text-gray-500 text-[10px] font-bold uppercase mb-2 block">Sub-stats Priority</span>
        <div className="flex flex-wrap items-center gap-2">
          {artifact.subStatsPriority.map((stat, sIdx) => (
            <div key={sIdx} className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded border ${sIdx === 0 ? 'bg-gray-800 border-gray-600 text-gray-200' : 'border-gray-800 text-gray-400'}`}>
                {stat}
              </span>
              {sIdx < artifact.subStatsPriority.length - 1 && <span className="text-gray-700 text-[10px]">➔</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
