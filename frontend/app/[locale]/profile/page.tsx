"use client";

import { useUser } from '@/context/UserContext';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import FallbackImage from '@/components/ui/FallbackImage';
import { getCharacterAvatar } from '@/utils/assetMap';
import { useState, useEffect } from 'react';
import { Heart, Star, Users, Loader2 } from 'lucide-react';
import EditProfileModal from './_components/EditProfileModal';

// Components for tabs
import FavoritesTab from './_components/FavoritesTab';
import WishlistTab from './_components/WishlistTab';
import TeamsTab from './_components/TeamsTab';
import CalculatorTab from './_components/CalculatorTab';
import WishCounterTab from './_components/WishCounterTab';
import { Calculator, PieChart } from 'lucide-react';

type Tab = 'profile' | 'favorites' | 'wishlist' | 'teams' | 'calculator' | 'wishcounter';

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const t = useTranslations('Common');
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [showEditModal, setShowEditModal] = useState(false);

  // Simple hash-based routing for tabs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['favorites', 'wishlist', 'teams', 'calculator', 'wishcounter'].includes(hash)) {
        setActiveTab(hash as Tab);
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', tab === 'profile' ? window.location.pathname : '#' + tab);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#e8b64c] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const travelerCharId = user.gender === 'female' ? 'traveler-girl' : 'traveler-boy';
  const avatarUrl = getCharacterAvatar(travelerCharId, user.gender);

  return (
    <main className="min-h-[calc(100vh-64px)] p-4 sm:p-8 relative overflow-hidden" style={{ background: 'var(--bg-void, #0d0c0a)' }}>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Cover */}
        <div className="bg-[#1c1813] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-8">
          <div className="h-48 relative bg-gradient-to-r from-[#231e17] to-[#2b251c] border-b border-white/10">
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/assets/backgrounds/mondstadt.webp)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171410]/90 to-transparent" />
          </div>

          <div className="px-8 pb-8 relative -mt-16 flex flex-col sm:flex-row gap-6 items-end sm:items-center">
            <div className="w-32 h-32 rounded-full border-4 border-[#171410] overflow-hidden bg-black relative shrink-0">
              <FallbackImage
                src={avatarUrl}
                alt={user.username}
                fill
                className="object-cover object-top"
              />
            </div>
            
            <div className="flex-1 mt-4 sm:mt-16 w-full">
              <h1 className="font-cinzel text-3xl font-semibold tracking-tight text-[#f0ead9]">
                {user.displayName || user.username}
              </h1>
              <p className="text-white/50 text-sm font-medium">{user.email}</p>
            </div>
            
            <div className="w-full sm:w-auto mt-4 sm:mt-16 flex justify-start sm:justify-end gap-3">
               <button
                 onClick={() => router.push('/profile/settings')}
                 className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold uppercase tracking-wider text-xs transition-colors text-white/60 hover:text-white"
               >
                 Settings
               </button>
               <button 
                 onClick={() => setShowEditModal(true)}
                 className="px-6 py-2 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors text-black"
                 style={{ background: 'linear-gradient(135deg, #e8b64c 0%, #a97e2f 100%)' }}
               >
                 Edit Profile
               </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-t border-white/5 px-4 hide-scrollbar">
            {[
              { id: 'profile', label: 'Overview', icon: null },
              { id: 'favorites', label: 'Favorites', icon: <Heart className="w-4 h-4" /> },
              { id: 'wishlist', label: 'Wishlist', icon: <Star className="w-4 h-4" /> },
              { id: 'teams', label: 'My Teams', icon: <Users className="w-4 h-4" /> },
              { id: 'calculator', label: 'Calculator', icon: <Calculator className="w-4 h-4" /> },
              { id: 'wishcounter', label: 'Wish Counter', icon: <PieChart className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as Tab)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#e8b64c] text-[#ffdf9e] bg-white/5'
                    : 'border-transparent text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-[#1c1813] border border-white/10 rounded-3xl shadow-2xl p-6 min-h-[400px]">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Gender</p>
                  <p className="text-lg font-black text-white capitalize">{user.gender}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Traveler</p>
                  <p className="text-lg font-black text-white">{user.gender === 'female' ? 'PlayerGirl' : 'PlayerBoy'}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Favorites</p>
                  <p className="text-lg font-black text-[#e8b64c]">{user.favoriteIds?.length || 0}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Teams</p>
                  <p className="text-lg font-black text-[#e8b64c]">{user.teams?.length || 0}</p>
                </div>
              </div>
              {/* Bio section */}
              {(user as any).bio && (
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">About</p>
                  <p className="text-white/80 text-sm leading-relaxed">{(user as any).bio}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && <FavoritesTab user={user} />}
          {activeTab === 'wishlist' && <WishlistTab user={user} />}
          {activeTab === 'teams' && <TeamsTab user={user} />}
          {activeTab === 'calculator' && <CalculatorTab user={user} />}
          {activeTab === 'wishcounter' && <WishCounterTab user={user} />}
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal onClose={() => setShowEditModal(false)} />
      )}
    </main>
  );
}
