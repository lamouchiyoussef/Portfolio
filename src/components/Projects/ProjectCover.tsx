import React, { useId } from 'react';

/**
 * Couvertures originales des projets, dessinées en SVG : une pseudo-interface
 * qui évoque le domaine de chaque application, sans capture confidentielle ni
 * image de banque d'images. Légères (aucune requête réseau) et nettes à toute taille.
 */
export type CoverKind =
  | 'traceability'
  | 'sensors'
  | 'b2b'
  | 'factory'
  | 'crm'
  | 'ar'
  | 'vision'
  | 'warehouse'
  | 'hr'
  | 'import'
  | 'map'
  | 'education'
  | 'iot';

const V = '#8B5CF6';
const C = '#22D3EE';
const P = '#F0408B';
const MUTED = 'rgba(148,163,184,0.35)';
const LINE = 'rgba(148,163,184,0.18)';

/** Barre de pseudo-texte. */
const Bar = ({ x, y, w, h = 6, c = MUTED, o = 1 }: { x: number; y: number; w: number; h?: number; c?: string; o?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} opacity={o} />
);

const SCENES: Record<CoverKind, React.ReactNode> = {
  traceability: (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${70 + i * 82} 96)`}>
          <rect x="-26" y="-26" width="52" height="52" rx="12" fill="#11131A" stroke={i === 3 ? C : V} strokeOpacity="0.7" />
          <Bar x={-14} y={-6} w={28} c={i === 3 ? C : V} o={0.8} />
          <Bar x={-14} y={6} w={18} />
          {i < 3 && <path d="M30 0 H52" stroke={V} strokeOpacity="0.6" strokeDasharray="4 4" />}
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={70 + i * 40} y={158} width="28" height={8 + ((i * 7) % 18)} rx="3" transform={`translate(0 ${-((i * 7) % 18)})`} fill={i % 2 ? C : V} opacity="0.55" />
      ))}
    </g>
  ),
  sensors: (
    <g>
      <path d="M50 150 C90 140 110 90 150 104 S210 160 250 118 S310 64 350 82" fill="none" stroke={C} strokeWidth="2.5" />
      <path d="M50 150 C90 140 110 90 150 104 S210 160 250 118 S310 64 350 82 V178 H50Z" fill={C} opacity="0.08" />
      <path d="M50 92 H350" stroke={P} strokeDasharray="6 5" strokeOpacity="0.8" />
      <circle cx="318" cy="70" r="7" fill={P} />
      <circle cx="318" cy="70" r="14" fill={P} opacity="0.2" />
      <rect x="236" y="34" width="110" height="24" rx="8" fill="#11131A" stroke={P} strokeOpacity="0.6" />
      <Bar x={248} y={43} w={70} c={P} o={0.8} />
    </g>
  ),
  b2b: (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(56 ${48 + i * 34})`}>
          <rect width="288" height="26" rx="8" fill="#11131A" stroke={LINE} />
          <circle cx="16" cy="13" r="6" fill={i === 1 ? C : V} opacity="0.7" />
          <Bar x={32} y={10} w={90 - i * 10} />
          <Bar x={150} y={10} w={50} o={0.6} />
          <rect x="226" y="6" width="52" height="14" rx="7" fill={[C, V, '#34d399', V][i]} opacity="0.25" />
        </g>
      ))}
    </g>
  ),
  factory: (
    <g>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${100 + i * 92} 100)`}>
          <circle r="34" fill="none" stroke={LINE} strokeWidth="8" />
          <circle r="34" fill="none" stroke={i ? C : V} strokeWidth="8" strokeDasharray={`${i ? 150 : 175} 214`} strokeLinecap="round" transform="rotate(-90)" />
          <Bar x={-14} y={-3} w={28} c="#F8FAFC" o={0.8} />
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(270 ${58 + i * 20})`}>
          <Bar x={0} y={0} w={70} h={8} c={LINE} />
          <Bar x={0} y={0} w={20 + ((i * 23) % 50)} h={8} c={i === 3 ? P : C} o={0.75} />
        </g>
      ))}
      <Bar x={70} y={162} w={260} h={8} c={LINE} />
      <Bar x={70} y={162} w={190} h={8} c={V} o={0.6} />
    </g>
  ),
  crm: (
    <g>
      <rect x="50" y="40" width="190" height="140" rx="10" fill="#11131A" stroke={LINE} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx="70" cy={62 + i * 26} r="7" fill={i % 2 ? C : V} opacity="0.6" />
          <Bar x={86} y={59 + i * 26} w={70 - i * 6} />
          <Bar x={180} y={59 + i * 26} w={40} o={0.5} />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={262 + i * 22} y={180 - (40 + i * 22)} width="14" height={40 + i * 22} rx="3" fill={i === 3 ? C : V} opacity="0.6" />
      ))}
    </g>
  ),
  ar: (
    <g>
      <g stroke={LINE}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`h${i}`} d={`M${60 - i * 8} ${120 + i * 12} H${340 + i * 8}`} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={`v${i}`} d={`M${110 + i * 30} 120 L${80 + i * 40} 180`} />
        ))}
      </g>
      <circle cx="200" cy="96" r="34" fill="none" stroke={C} strokeWidth="2" />
      <circle cx="200" cy="96" r="4" fill={C} />
      <path d="M200 52 V70 M200 122 V140 M156 96 H174 M226 96 H244" stroke={C} strokeWidth="2" />
      <ellipse cx="200" cy="150" rx="44" ry="10" fill={P} opacity="0.25" />
    </g>
  ),
  vision: (
    <g>
      <rect x="70" y="36" width="260" height="150" rx="10" fill="#11131A" stroke={LINE} />
      <path d="M70 150 L140 100 L190 130 L250 80 L330 140 V186 H70Z" fill={V} opacity="0.12" />
      {[
        { x: 96, y: 62, w: 70, h: 56, c: C, t: 52 },
        { x: 196, y: 52, w: 60, h: 72, c: V, t: 44 },
        { x: 262, y: 104, w: 52, h: 58, c: P, t: 38 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill="none" stroke={b.c} strokeWidth="2" />
          <rect x={b.x} y={b.y - 14} width={b.t} height="12" rx="3" fill={b.c} opacity="0.85" />
        </g>
      ))}
    </g>
  ),
  warehouse: (
    <g>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4, 5].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={70 + c * 44}
            y={48 + r * 44}
            width="36"
            height="36"
            rx="6"
            fill={(r * 6 + c) % 7 === 2 ? C : (r + c) % 3 === 0 ? V : '#11131A'}
            opacity={(r * 6 + c) % 7 === 2 ? 0.7 : (r + c) % 3 === 0 ? 0.35 : 1}
            stroke={LINE}
          />
        ))
      )}
      <path d="M70 186 H330" stroke={MUTED} />
    </g>
  ),
  hr: (
    <g>
      <rect x="60" y="40" width="180" height="146" rx="10" fill="#11131A" stroke={LINE} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect key={`${r}-${c}`} x={74 + c * 32} y={64 + r * 28} width="24" height="20" rx="4" fill={(r + c) % 4 === 0 ? V : LINE} opacity={(r + c) % 4 === 0 ? 0.6 : 1} />
        ))
      )}
      <circle cx="296" cy="96" r="42" fill="none" stroke={C} strokeWidth="2" />
      <path d="M296 96 V68 M296 96 L316 108" stroke={C} strokeWidth="3" strokeLinecap="round" />
      <Bar x={256} y={156} w={80} c={C} o={0.5} />
    </g>
  ),
  import: (
    <g>
      <path d="M82 52 H128 L148 72 V170 H82Z" fill="#11131A" stroke={V} strokeOpacity="0.7" />
      {[0, 1, 2, 3].map((i) => (
        <Bar key={i} x={94} y={88 + i * 18} w={42 - (i % 2) * 12} />
      ))}
      <path d="M170 111 H226" stroke={C} strokeWidth="2.5" strokeDasharray="6 5" />
      <path d="M222 102 L234 111 L222 120" fill="none" stroke={C} strokeWidth="2.5" />
      <g transform="translate(296 66)">
        <ellipse cx="0" cy="0" rx="42" ry="12" fill="#11131A" stroke={C} strokeOpacity="0.7" />
        <path d="M-42 0 V90 A42 12 0 0 0 42 90 V0" fill="#11131A" stroke={C} strokeOpacity="0.7" />
        <path d="M-42 30 A42 12 0 0 0 42 30 M-42 60 A42 12 0 0 0 42 60" fill="none" stroke={C} strokeOpacity="0.35" />
      </g>
    </g>
  ),
  map: (
    <g>
      <rect x="50" y="36" width="300" height="150" rx="10" fill="#11131A" stroke={LINE} />
      <path d="M50 120 C110 90 150 150 210 110 S300 80 350 100" fill="none" stroke={C} strokeOpacity="0.35" strokeWidth="10" />
      <path d="M130 36 L170 186 M250 36 L230 186 M50 70 H350" stroke={LINE} strokeWidth="3" />
      {[
        [118, 92, V],
        [204, 132, C],
        [282, 76, P],
        [310, 150, V],
      ].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0 C-12 -14 -12 -30 0 -30 C12 -30 12 -14 0 0Z" fill={c as string} />
          <circle cy="-20" r="4" fill="#11131A" />
        </g>
      ))}
    </g>
  ),
  education: (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${56 + i * 100} 48)`}>
          <rect width="88" height="128" rx="10" fill="#11131A" stroke={LINE} />
          <rect x="8" y="8" width="72" height="44" rx="6" fill={[V, C, P][i]} opacity="0.3" />
          <Bar x={8} y={64} w={60} />
          <Bar x={8} y={78} w={44} o={0.6} />
          <Bar x={8} y={108} w={72} h={6} c={LINE} />
          <Bar x={8} y={108} w={[60, 36, 20][i]} h={6} c={[V, C, P][i]} />
        </g>
      ))}
    </g>
  ),
  iot: (
    <g>
      <g transform="translate(110 110)" fill="none" stroke={C}>
        <circle r="8" fill={C} />
        <path d="M-22 -22 A31 31 0 0 0 -22 22 M22 -22 A31 31 0 0 1 22 22" strokeOpacity="0.8" strokeWidth="2.5" />
        <path d="M-38 -38 A54 54 0 0 0 -38 38 M38 -38 A54 54 0 0 1 38 38" strokeOpacity="0.4" strokeWidth="2.5" />
      </g>
      <rect x="200" y="50" width="150" height="120" rx="10" fill="#11131A" stroke={LINE} />
      <path d="M212 140 L240 116 L262 126 L290 90 L318 104 L338 78" fill="none" stroke={V} strokeWidth="2.5" />
      <Bar x={212} y={64} w={60} c={V} o={0.7} />
    </g>
  ),
};

/** Teinte dominante de chaque couverture, pour varier la grille. */
const TINT: Record<CoverKind, [string, string]> = {
  traceability: [V, C],
  sensors: [C, P],
  b2b: [V, C],
  factory: [C, V],
  crm: [V, C],
  ar: [P, C],
  vision: [V, P],
  warehouse: [C, V],
  hr: [V, C],
  import: [C, V],
  map: [P, V],
  education: [C, P],
  iot: [C, V],
};

const ProjectCover = ({ kind, className = '' }: { kind: CoverKind; className?: string }) => {
  const [a, b] = TINT[kind];
  // Identifiant unique : une même couverture peut apparaître deux fois dans la page.
  const id = `cv-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <radialGradient id={`${id}-a`} cx="15%" cy="0%" r="80%">
          <stop offset="0%" stopColor={a} stopOpacity="0.35" />
          <stop offset="100%" stopColor={a} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-b`} cx="100%" cy="100%" r="70%">
          <stop offset="0%" stopColor={b} stopOpacity="0.25" />
          <stop offset="100%" stopColor={b} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="rgba(255,255,255,0.04)" />
        </pattern>
      </defs>
      <rect width="400" height="225" fill="#0D0F15" />
      <rect width="400" height="225" fill={`url(#${id}-grid)`} />
      <rect width="400" height="225" fill={`url(#${id}-a)`} />
      <rect width="400" height="225" fill={`url(#${id}-b)`} />
      {/* Barre de fenêtre */}
      <g opacity="0.8">
        <circle cx="358" cy="16" r="3.5" fill="#f87171" opacity="0.6" />
        <circle cx="370" cy="16" r="3.5" fill="#facc15" opacity="0.6" />
        <circle cx="382" cy="16" r="3.5" fill="#34d399" opacity="0.6" />
      </g>
      {SCENES[kind]}
    </svg>
  );
};

export default ProjectCover;
