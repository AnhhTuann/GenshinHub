export interface TcgDetailResponse {
  response: number;
  data: TcgCardData;
}

export interface TcgCardData {
  id: number;
  name: string;
  type: string;
  tags: Record<string, string>;
  props: {
    GCG_PROP_HP?: number;
    GCG_PROP_ENERGY?: number;
  };
  icon: string;
  route: string;
  storyTitle?: string;
  storyDetail?: string;
  source?: string;
  dictionary: Record<string, TcgDictionaryEntry>;
  talent: Record<string, TcgTalent>;
  relatedEntries?: { id: number; name: string; type: string; icon: string }[];
}

export interface TcgDictionaryEntry {
  name: string;
  description: string;
  cost?: Record<string, number> | null;
  params?: Record<string, any>;
  tags?: Record<string, string> | null;
  icon?: string | null;
  effect?: number;
}

export interface TcgTalent {
  name: string;
  description: string;
  cost?: Record<string, number> | null; 
  params: Record<string, any>;
  tags: Record<string, string>;
  icon: string;
  keywords?: Record<string, string>;
  subSkills?: Record<string, any>;
}

/**
 * Fetches detailed TCG card data from Yatta API
 * @param id The ID of the card
 * @param locale 'en' or 'vi'
 */
export async function getTcgCardDetail(id: string, locale: string = 'en'): Promise<TcgCardData | null> {
  const lang = locale === 'vi' ? 'vi' : 'en';
  try {
    const res = await fetch(`https://gi.yatta.moe/api/v2/${lang}/gcg/${id}`, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch TCG card ${id}: ${res.status}`);
      return null;
    }
    
    const data: TcgDetailResponse = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching TCG card ${id}:`, error);
    return null;
  }
}
