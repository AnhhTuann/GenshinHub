import { Link } from '@/i18n/routing';
import {
  ArrowUpRight,
  Gem,
  Package,
  ScrollText,
  Search,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  href: string;
  label: string;
  desc: string;
  icon: string;
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  characters: Swords,
  weapons: Shield,
  artifacts: Gem,
  tierlist: Trophy,
  teams: Users,
  banners: ScrollText,
  materials: Package,
  showcase: Search,
  tcg: Sparkles,
};

export default function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="feature-hub-grid atlas-quick-links">
      {features.map((feature) => {
        const Icon = FEATURE_ICONS[feature.icon] ?? Search;
        return (
          <Link key={feature.href} href={feature.href} className="atlas-quick-link">
            <span className="atlas-quick-icon"><Icon size={28} aria-hidden="true" /></span>
            <span className="atlas-quick-copy">
              <strong>{feature.label}</strong>
              <span>{feature.desc}</span>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}
