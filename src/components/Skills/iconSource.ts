import type { LucideIcon } from 'lucide-react';
import type { SimpleIcon } from 'simple-icons';

/** Icône officielle (simple-icons) ou pictogramme Lucide avec sa couleur. */
export type IconSource = { brand: SimpleIcon; color?: string } | { lucide: LucideIcon; color: string };

const tooDark = (hex: string) => {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70;
};

/** Couleur d'affichage : les marques trop sombres sont éclaircies pour le fond noir. */
export const iconColor = (src: IconSource) =>
  'brand' in src
    ? src.color ?? (tooDark(src.brand.hex) ? '#E2E8F0' : `#${src.brand.hex}`)
    : src.color;
