#!/usr/bin/env node
/**
 * Synchronise la liste des projets GitLab vers src/data/gitlab-projects.json.
 *
 * Usage (PowerShell) :
 *   $env:GITLAB_TOKEN = "<token>"; npm run sync:gitlab
 * Usage (bash) :
 *   GITLAB_TOKEN=<token> npm run sync:gitlab
 * Sans token (dépôts publics uniquement) :
 *   GITLAB_USER=youssef.lamouchi npm run sync:gitlab
 *
 * Variables :
 *   GITLAB_TOKEN  Personal Access Token, scope `read_api` uniquement.
 *   GITLAB_USER   Nom d'utilisateur : sans token, liste ses dépôts publics.
 *   GITLAB_URL    Instance GitLab (défaut : https://gitlab.com).
 *   GITLAB_SCOPE  "owned" (défaut : dépôts de ton namespace) ou "membership"
 *                 (inclut les dépôts de groupes, ex. ceux de l'entreprise).
 *
 * Sécurité :
 * - Le token n'est lu que depuis l'environnement de ce processus Node. Il n'est
 *   jamais écrit sur disque ni inclus dans le bundle (pas de préfixe VITE_).
 * - Seules des métadonnées sont écrites : nom, description, extrait du README,
 *   technologies détectées depuis les manifests. Aucun fichier source, .env,
 *   clé ou config n'est copié.
 * - Lecture seule : aucune requête d'écriture vers GitLab.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const TOKEN = process.env.GITLAB_TOKEN;
const USER = process.env.GITLAB_USER;
const BASE = (process.env.GITLAB_URL || 'https://gitlab.com').replace(/\/+$/, '');
const SCOPE = process.env.GITLAB_SCOPE === 'membership' ? 'membership' : 'owned';
const OUT = fileURLToPath(new URL('../src/data/gitlab-projects.json', import.meta.url));

if (!TOKEN && !USER) {
  console.error(
    'Définis GITLAB_TOKEN (scope read_api) ou GITLAB_USER (dépôts publics seulement). Voir l’en-tête du script.'
  );
  process.exit(1);
}

const api = async (path, { raw = false } = {}) => {
  const res = await fetch(`${BASE}/api/v4${path}`, {
    headers: TOKEN ? { 'PRIVATE-TOKEN': TOKEN } : {},
  });
  if (res.status === 404) return { data: null, res };
  if (!res.ok) throw new Error(`GitLab ${res.status} sur ${path.split('?')[0]}`);
  return { data: raw ? await res.text() : await res.json(), res };
};

/** Parcourt toutes les pages via l'en-tête x-next-page. */
const listProjects = async () => {
  const all = [];
  // Sans token : seuls les dépôts publics de l'utilisateur sont visibles.
  const endpoint = TOKEN
    ? `/projects?${SCOPE}=true`
    : `/users/${encodeURIComponent(USER)}/projects?visibility=public`;
  let page = '1';
  while (page) {
    const { data, res } = await api(
      `${endpoint}&per_page=100&page=${page}&order_by=last_activity_at&simple=false`
    );
    if (!data) throw new Error(`Utilisateur ou projets introuvables (${endpoint.split('?')[0]})`);
    all.push(...data);
    page = res.headers.get('x-next-page');
  }
  return all;
};

const enc = encodeURIComponent;

const readFile = async (id, ref, path) => {
  const { data } = await api(`/projects/${id}/repository/files/${enc(path)}/raw?ref=${enc(ref)}`, {
    raw: true,
  });
  return data;
};

/** Arborescence complète (paginée), limitée pour les gros dépôts. */
const listTree = async (id, ref) => {
  const paths = [];
  let page = '1';
  while (page && paths.length < 3000) {
    const { data, res } = await api(
      `/projects/${id}/repository/tree?ref=${enc(ref)}&recursive=true&per_page=100&page=${page}`
    );
    if (!data) break;
    paths.push(...data.filter((e) => e.type === 'blob').map((e) => e.path));
    page = res.headers.get('x-next-page');
  }
  return paths.filter((p) => !/(^|\/)(node_modules|bin|obj|dist|vendor|\.git)\//.test(p));
};

// --- Détection des technologies à partir des manifests -----------------------

const NPM_MAP = {
  '@angular/core': 'Angular', react: 'React', vue: 'Vue.js', next: 'Next.js', svelte: 'Svelte',
  express: 'Express.js', '@nestjs/core': 'NestJS', typescript: 'TypeScript', tailwindcss: 'Tailwind CSS',
  bootstrap: 'Bootstrap', rxjs: 'RxJS', mongoose: 'MongoDB', mongodb: 'MongoDB', mysql: 'MySQL',
  mysql2: 'MySQL', pg: 'PostgreSQL', prisma: 'Prisma', sequelize: 'Sequelize', mqtt: 'MQTT',
  'socket.io': 'Socket.IO', firebase: 'Firebase', vite: 'Vite', jest: 'Jest', electron: 'Electron',
  'react-native': 'React Native', '@ionic/angular': 'Ionic', 'chart.js': 'Chart.js',
  jsonwebtoken: 'JWT', openai: 'OpenAI API', '@anthropic-ai/sdk': 'Claude API', langchain: 'LangChain',
  '@tensorflow/tfjs': 'TensorFlow.js',
};
const NUGET_MAP = [
  [/^Microsoft\.AspNetCore/, 'ASP.NET Core'], [/^Microsoft\.EntityFrameworkCore/, 'Entity Framework Core'],
  [/EntityFrameworkCore\.SqlServer/, 'SQL Server'], [/MySql|Pomelo/, 'MySQL'], [/Npgsql/, 'PostgreSQL'],
  [/^MQTTnet/, 'MQTT'], [/SignalR/, 'SignalR'], [/Swashbuckle/, 'Swagger'], [/JwtBearer/, 'JWT'],
  [/^Dapper$/, 'Dapper'], [/AutoMapper/, 'AutoMapper'], [/^MediatR/, 'MediatR'], [/xunit|NUnit|MSTest/, 'Tests unitaires'],
];
const PY_MAP = {
  django: 'Django', flask: 'Flask', fastapi: 'FastAPI', pandas: 'pandas', numpy: 'NumPy',
  'scikit-learn': 'scikit-learn', tensorflow: 'TensorFlow', torch: 'PyTorch', openai: 'OpenAI API',
  anthropic: 'Claude API', langchain: 'LangChain', opencv: 'OpenCV', 'opencv-python': 'OpenCV',
};
const AI_TECHS = new Set(['OpenAI API', 'Claude API', 'LangChain', 'TensorFlow', 'TensorFlow.js', 'PyTorch', 'scikit-learn']);

const detect = async (id, ref, tree) => {
  const techs = new Set();
  const has = (re) => tree.some((p) => re.test(p));

  const pkg = tree.find((p) => /(^|\/)package\.json$/.test(p) && p.split('/').length <= 2);
  if (pkg) {
    try {
      const json = JSON.parse((await readFile(id, ref, pkg)) || '{}');
      const deps = { ...json.dependencies, ...json.devDependencies };
      for (const [dep, label] of Object.entries(NPM_MAP)) if (dep in deps) techs.add(label);
      if (!techs.size) techs.add('Node.js');
    } catch { /* package.json invalide : ignoré */ }
  }

  for (const csproj of tree.filter((p) => p.endsWith('.csproj')).slice(0, 5)) {
    const xml = (await readFile(id, ref, csproj)) || '';
    const fw = xml.match(/<TargetFrameworks?>\s*net(\d+)\.0/);
    if (fw) techs.add(`.NET ${fw[1]}`);
    techs.add('C#');
    for (const [, name] of xml.matchAll(/PackageReference\s+Include="([^"]+)"/g))
      for (const [re, label] of NUGET_MAP) if (re.test(name)) techs.add(label);
  }

  const req = tree.find((p) => /(^|\/)requirements\.txt$/.test(p));
  if (req) {
    const txt = ((await readFile(id, ref, req)) || '').toLowerCase();
    for (const [dep, label] of Object.entries(PY_MAP))
      if (new RegExp(`^${dep.replace('.', '\\.')}\\b`, 'm').test(txt)) techs.add(label);
    techs.add('Python');
  }

  if (has(/(^|\/)Dockerfile$/)) techs.add('Docker');
  if (has(/(^|\/)(docker-)?compose\.ya?ml$/)) techs.add('Docker Compose');
  if (has(/^\.gitlab-ci\.yml$/)) techs.add('GitLab CI/CD');
  if (has(/(^|\/)(k8s|kubernetes|manifests)\/.+\.ya?ml$/) || has(/(^|\/)Chart\.yaml$/)) techs.add('Kubernetes');
  if (has(/(^|\/)ansible\.cfg$|(^|\/)playbook.*\.ya?ml$/)) techs.add('Ansible');
  if (has(/ProjectSettings\/ProjectVersion\.txt$/)) techs.add('Unity');
  if (has(/(^|\/)pubspec\.yaml$/)) techs.add('Flutter');
  if (has(/(^|\/)pom\.xml$|(^|\/)build\.gradle(\.kts)?$/)) techs.add('Java');
  if (has(/(^|\/)composer\.json$/)) techs.add('PHP');

  return [...techs];
};

// --- README ---------------------------------------------------------------

const clean = (s) =>
  s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\](\[[^\]]*\])?/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const parseReadme = (md, project) => {
  const lines = md.replace(/\r/g, '').split('\n');

  // Premier paragraphe de texte (hors titres, badges, HTML).
  let summary = '';
  for (const block of md.replace(/\r/g, '').split(/\n\s*\n/)) {
    const t = block.trim();
    if (!t || /^(#|<|!\[|\[!\[|```|\||-{3,})/.test(t)) continue;
    summary = clean(t);
    if (summary.length > 30) break;
  }
  if (summary.length > 420) summary = `${summary.slice(0, 417).replace(/\s+\S*$/, '')}…`;

  // Liste à puces sous un titre « Fonctionnalités / Features ».
  const features = [];
  const start = lines.findIndex((l) => /^#{1,4}\s.*(fonctionnalit|features?|caract[ée]ristiques)/i.test(l));
  if (start >= 0) {
    for (const l of lines.slice(start + 1)) {
      if (/^#{1,4}\s/.test(l)) break;
      const m = l.match(/^\s*[-*+]\s+(.+)/);
      if (m && features.length < 8) features.push(clean(m[1]));
    }
  }

  // Lien de démo explicitement libellé.
  const demo = md.match(/\[(?:[^\]]*\b(?:d[ée]mo|live|en ligne)\b[^\]]*)\]\((https?:\/\/[^)\s]+)\)/i)?.[1];

  // Première image du README (publique seulement, et chemin absolu construit).
  let image;
  const img = md.match(/!\[[^\]]*\]\(([^)\s]+\.(?:png|jpe?g|gif|webp))[^)]*\)/i)?.[1];
  if (img && project.visibility === 'public') {
    image = /^https?:/.test(img)
      ? img
      : `${project.web_url}/-/raw/${project.default_branch}/${img.replace(/^\.?\//, '')}`;
  }

  return { summary, features, demo, image };
};

// --- Programme principal ----------------------------------------------------

const main = async () => {
  const projects = await listProjects();
  console.log(`${projects.length} dépôt(s) trouvé(s) sur ${BASE} (${TOKEN ? `scope : ${SCOPE}` : `publics de ${USER}`}).`);

  const out = [];
  const skipped = [];

  for (const p of projects) {
    const label = p.path_with_namespace;
    try {
      if (p.empty_repo || !p.default_branch) {
        skipped.push([label, 'dépôt vide']);
        continue;
      }
      const ref = p.default_branch;
      const tree = await listTree(p.id, ref);
      const readmePath = tree.find((f) => /^readme(\.md|\.markdown|\.txt)?$/i.test(f));
      const readme = readmePath ? (await readFile(p.id, ref, readmePath)) || '' : '';
      const parsed = parseReadme(readme, p);
      const technologies = await detect(p.id, ref, tree);
      const { data: langs } = await api(`/projects/${p.id}/languages`);
      const languages = Object.entries(langs || {})
        .filter(([, pct]) => pct >= 5)
        .map(([name]) => name);

      if (!p.description && !parsed.summary && !technologies.length && !languages.length) {
        skipped.push([label, 'pas assez d’informations (ni description, ni README, ni manifest)']);
        continue;
      }

      out.push({
        id: p.id,
        path: label,
        name: p.name,
        description: (p.description || '').trim(),
        readmeSummary: parsed.summary,
        features: parsed.features,
        technologies,
        languages,
        topics: p.topics || p.tag_list || [],
        visibility: p.visibility,
        webUrl: p.web_url,
        demoUrl: parsed.demo,
        image: parsed.image,
        archived: Boolean(p.archived),
        createdAt: p.created_at,
        lastActivityAt: p.last_activity_at,
        usesAI: technologies.some((t) => AI_TECHS.has(t)),
      });
      console.log(`  ✓ ${label} (${p.visibility})`);
    } catch (err) {
      skipped.push([label, err.message]);
    }
  }

  await writeFile(OUT, `${JSON.stringify(out, null, 2)}\n`, 'utf8');

  console.log(`\n${out.length} projet(s) écrit(s) dans src/data/gitlab-projects.json.`);
  const hidden = out.filter((p) => p.visibility !== 'public').length;
  if (hidden)
    console.log(`${hidden} dépôt(s) privé(s)/interne(s) : masqués tant qu'ils ne sont pas validés dans gitlab-overrides.ts.`);
  if (skipped.length) {
    console.log('\nIgnorés :');
    for (const [name, why] of skipped) console.log(`  - ${name} : ${why}`);
  }
};

main().catch((err) => {
  console.error(`Échec de la synchronisation : ${err.message}`);
  // exitCode plutôt que exit() : laisse se fermer les sockets fetch (crash libuv sous Windows sinon).
  process.exitCode = 1;
});
