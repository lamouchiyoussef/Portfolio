/**
 * Version statique de la visualisation du Hero, en SVG. Affichée pendant le
 * chargement de la scène 3D, sans WebGL, sur appareil modeste ou quand
 * l'utilisateur préfère réduire les animations.
 */
const NODES = [
  { label: 'Angular', x: 92, y: 120, color: '#F0408B' },
  { label: '.NET 8', x: 318, y: 78, color: '#8B5CF6' },
  { label: 'SQL Server', x: 372, y: 250, color: '#22D3EE' },
  { label: 'Docker', x: 300, y: 382, color: '#3B82F6' },
  { label: 'IoT · MQTT', x: 70, y: 330, color: '#22D3EE' },
  { label: 'IA', x: 200, y: 418, color: '#A78BFA' },
];

const OrbitFallback = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 440 480" className={className} role="img" aria-label="Technologies : Angular, .NET 8, SQL Server, Docker, IoT, IA">
    <defs>
      <radialGradient id="of-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#c4b5fd" />
        <stop offset="45%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="of-ring" x1="0" x2="1">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    <g fill="none" stroke="url(#of-ring)" strokeWidth="1" opacity="0.5">
      <ellipse cx="220" cy="245" rx="190" ry="70" transform="rotate(-20 220 245)" />
      <ellipse cx="220" cy="245" rx="170" ry="95" transform="rotate(35 220 245)" />
      <ellipse cx="220" cy="245" rx="120" ry="175" transform="rotate(10 220 245)" />
    </g>

    {NODES.map((n) => (
      <line key={`l-${n.label}`} x1="220" y1="245" x2={n.x} y2={n.y} stroke={n.color} strokeOpacity="0.3" />
    ))}

    <circle cx="220" cy="245" r="95" fill="url(#of-core)" opacity="0.55" />
    <polygon
      points="220,190 268,218 268,272 220,300 172,272 172,218"
      fill="#1a1033"
      stroke="#22D3EE"
      strokeOpacity="0.6"
    />
    <polygon points="220,212 248,228 248,262 220,278 192,262 192,228" fill="#6d28d9" opacity="0.8" />

    {NODES.map((n) => {
      const w = n.label.length * 7.4 + 30;
      return (
        <g key={n.label} transform={`translate(${n.x - w / 2} ${n.y - 14})`}>
          <rect width={w} height="28" rx="14" fill="#11131A" stroke={n.color} strokeOpacity="0.6" />
          <circle cx="13" cy="14" r="3.5" fill={n.color} />
          <text x="23" y="18.5" fill="#F8FAFC" fontSize="12.5" fontWeight="600" fontFamily="'Plus Jakarta Sans', Inter, sans-serif">
            {n.label}
          </text>
        </g>
      );
    })}
  </svg>
);

export default OrbitFallback;
