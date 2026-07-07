import { getServerUser } from '@/lib/userAuth';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import FallbackImage from '@/components/ui/FallbackImage';
import { getCharacterAvatar } from '@/utils/assetMap';

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const user = await getServerUser();
  const t = await getTranslations({ locale, namespace: 'Common' });

  if (!user) {
    redirect(`/${locale}/auth/login`);
  }

  const travelerCharId = user.gender === 'female' ? 'traveler-girl' : 'traveler-boy';
  const avatarUrl = getCharacterAvatar(travelerCharId, user.gender);

  return (
    <main className="min-h-[calc(100vh-64px)] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header Cover */}
          <div className="h-48 relative bg-gradient-to-r from-[#1a1a24] to-[#2a2a35] border-b border-white/10">
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/assets/backgrounds/mondstadt.webp)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 to-transparent" />
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8 relative -mt-16 flex flex-col sm:flex-row gap-6 items-end sm:items-center">
            
            <div className="w-32 h-32 rounded-full border-4 border-[#0a0a0f] overflow-hidden bg-black relative shrink-0">
              <FallbackImage
                src={avatarUrl}
                alt={user.username}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 mt-4 sm:mt-16 w-full">
              <h1 className="text-3xl font-black uppercase tracking-widest text-[#f0d080]">
                {user.username}
              </h1>
              <p className="text-white/50 text-sm font-medium">{user.email}</p>
            </div>
            
            <div className="w-full sm:w-auto mt-4 sm:mt-16 flex justify-start sm:justify-end">
               <button className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold uppercase tracking-wider text-xs transition-colors">
                 Edit Profile
               </button>
            </div>

          </div>

          {/* Stats / Details */}
          <div className="px-8 py-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Gender</p>
                <p className="text-lg font-black text-white capitalize">{user.gender}</p>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Traveler</p>
                <p className="text-lg font-black text-white">{user.gender === 'female' ? 'PlayerGirl' : 'PlayerBoy'}</p>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Favorites</p>
                <p className="text-lg font-black text-[#c8a84b]">-</p>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Status</p>
                <p className="text-lg font-black text-emerald-400">Active</p>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
