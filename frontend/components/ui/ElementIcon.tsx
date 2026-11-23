import FallbackImage from './FallbackImage';

export default function ElementIcon({ element, label, className }: {
  element: string;
  label?: string;
  className?: string;
}) {
  const key = element.toLowerCase();
  return (
    <span className={`atlas-element-icon${className ? ` ${className}` : ''}`} data-element={key}>
      <FallbackImage src={`/assets/elements/${key}.webp`} alt={label ?? ''} width={24} height={24} />
    </span>
  );
}
