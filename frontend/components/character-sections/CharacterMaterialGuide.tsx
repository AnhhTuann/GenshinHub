import { useLocale } from 'next-intl';
import { Package } from 'lucide-react';
import FallbackImage from '@/components/ui/FallbackImage';

interface Material {
  nameEn: string;
  iconUrl?: string | null;
}

interface Props {
  kind: 'ascension' | 'talent';
  rows: { level: string; mora: number; items: { materialId: string; count: number }[] }[];
  totals: Record<string, number>;
  totalMora: number;
  getMaterial: (id: string) => Material;
  resolveIcon: (url: string) => string;
  pending?: boolean;
  noMaterials?: boolean;
}

const moraIcon = '/assets/items/UI_ItemIcon_202.webp';

function MaterialIcon({ src, size }: { src?: string | null; size: string }) {
  return (
    <span className="guide-material-icon">
      {src ? <FallbackImage src={src} alt="" fill sizes={size} className="object-contain" /> : <Package size={20} aria-hidden="true" />}
    </span>
  );
}

export default function CharacterMaterialGuide({ kind, rows, totals, totalMora, getMaterial, resolveIcon, pending = false, noMaterials = false }: Props) {
  const locale = useLocale();

  const emptyNote = () => {
    if (noMaterials) {
      if (kind === 'ascension') {
        return locale === 'vi'
          ? 'Nhân vật này không cần nguyên liệu đột phá. Cấp độ tăng thông qua Miliastra Wonderland.'
          : 'This character does not require ascension materials. Levels are raised through Miliastra Wonderland.';
      }
      return locale === 'vi'
        ? 'Nhân vật này không cần nguyên liệu thiên phú. Thiên phú tự động tăng theo đột phá.'
        : 'This character does not require talent materials. Talents level up automatically with ascension.';
    }
    if (pending) {
      return locale === 'vi'
        ? 'Nguyên liệu của nhân vật này chưa được công bố đầy đủ.'
        : "This character's materials have not been fully announced.";
    }
    return locale === 'vi'
      ? 'Chưa có dữ liệu nguyên liệu cho nhân vật này.'
      : 'Material costs are unavailable for this character.';
  };

  if (rows.length === 0) {
    return (
      <div className="character-material-guide" data-kind={kind}>
        <p className="guide-material-note">{emptyNote()}</p>
      </div>
    );
  }

  const summary = [
    { id: 'mora', count: totalMora, nameEn: 'Mora', iconUrl: moraIcon },
    ...Object.entries(totals).map(([id, count]) => ({ ...getMaterial(id), id, count })),
  ];

  return (
    <div className="character-material-guide" data-kind={kind}>
      <ul className="guide-material-summary" aria-label="Total materials">
        {summary.map(({ id, count, nameEn, iconUrl }) => (
          <li key={id}>
            <MaterialIcon src={iconUrl} size="44px" />
            <div>
              <span className="guide-material-name">{nameEn}</span>
              <span className="guide-material-total">{count.toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>

      <table className="guide-material-table">
        <thead>
          <tr>
            <th scope="col">Level</th>
            <th scope="col">Mora</th>
            <th scope="col">Materials</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ level, mora, items }, index) => (
            <tr key={`${level}-${index}`}>
              <th scope="row">{level}</th>
              <td className="guide-mora-value">{mora.toLocaleString()}</td>
              <td>
                <ul className="guide-material-items">
                  {items.map(({ materialId, count }, itemIndex) => {
                    const material = getMaterial(materialId);
                    return (
                      <li key={`${materialId}-${itemIndex}`} title={material.nameEn}>
                        <MaterialIcon src={material.iconUrl ? resolveIcon(material.iconUrl) : undefined} size="36px" />
                        <span className="sr-only">{material.nameEn}: </span>
                        <span className="guide-material-count">{count}</span>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
