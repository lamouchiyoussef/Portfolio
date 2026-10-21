import { iconColor, type IconSource } from './iconSource';

/**
 * Logo de technologie : icône officielle (simple-icons) quand elle existe,
 * sinon pictogramme Lucide.
 */
const TechIcon = ({ src, size = 20 }: { src: IconSource; size?: number }) => {
  const color = iconColor(src);
  if ('brand' in src) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden>
        <path d={src.brand.path} />
      </svg>
    );
  }
  const Icon = src.lucide;
  return <Icon size={size} color={color} aria-hidden />;
};

export default TechIcon;
