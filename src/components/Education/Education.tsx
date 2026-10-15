import React from 'react';
import { GraduationCap, Award, HeartHandshake, MapPin } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';

const DEGREES = [
  {
    date: '2022 — 2026',
    title: "Cycle d'Ingénierie Cloud",
    note: 'Cours du soir, en parallèle de mon poste',
    school: 'ESPRIT — École Supérieure Privée d’Ingénierie et de Technologie',
    location: 'Tunis',
  },
  {
    date: '2019 — 2022',
    title: 'Licence appliquée en Technologie de l’informatique',
    school: 'Institut Supérieur des Études Technologiques (ISET) de Siliana',
    location: 'Siliana',
  },
];

const CERTIFICATIONS = ['Développement de jeux vidéo', 'Python in your pocket'];

const VOLUNTEERING = [
  { org: 'Croissant-Rouge Tunisien', role: 'Bénévole', date: '2024 — Présent' },
  { org: 'JCI Ariana', role: 'Membre', date: '2021 — 2022' },
];

const Education = () => {
  return (
    <Section id="education">
      <Backdrop variant="cyan" />

      <SectionHeading
        eyebrow="Formation"
        title="Apprendre en continu"
        description="Un diplôme d'ingénieur préparé le soir, pendant que j'appliquais le jour ce que j'apprenais."
      />

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Diplômes */}
        <div className="space-y-5">
          {DEGREES.map((d, i) => (
            <article
              key={d.title}
              className="reveal glass glass-hover group flex gap-5 p-6 sm:p-7"
              style={{ '--reveal-delay': `${i * 110}ms` } as React.CSSProperties}
            >
              <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-cyan-glow/10 text-accent-soft transition-transform duration-500 group-hover:scale-110">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <span className="font-mono text-xs text-accent-soft">{d.date}</span>
                <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-white">
                  {d.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-400">{d.school}</p>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} />
                    {d.location}
                  </span>
                  {d.note && <span className="text-cyan-glow/80">{d.note}</span>}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Certifications & bénévolat */}
        <div
          className="reveal flex flex-col gap-5"
          style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
        >
          <div className="glass p-6 sm:p-7">
            <h3 className="mb-4 flex items-center gap-2.5 font-display text-base font-semibold text-white">
              <Award className="h-[18px] w-[18px] text-amber-300" />
              Certifications
            </h3>
            <ul className="space-y-2.5">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass flex-1 p-6 sm:p-7">
            <h3 className="mb-4 flex items-center gap-2.5 font-display text-base font-semibold text-white">
              <HeartHandshake className="h-[18px] w-[18px] text-pink-400" />
              Bénévolat
            </h3>
            <ul className="space-y-4">
              {VOLUNTEERING.map((v) => (
                <li key={v.org}>
                  <p className="text-sm font-medium text-slate-200">{v.org}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {v.role} · {v.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Education;
