/**
 * Générateur de gradient déterministe à partir d'un slug.
 * Sert de placeholder visuel premium tant que les vraies images
 * ne sont pas en place. Chaque projet a son empreinte chromatique.
 */

const PALETTES: Array<[string, string, string]> = [
  ['#1a1a1a', '#3a2820', '#6b4a2a'], // brun chaud
  ['#0f1419', '#1d2731', '#3a4a5c'], // bleu nuit
  ['#2a1810', '#4a2818', '#7a3a20'], // terre cuite
  ['#0a0a0a', '#1f1f1f', '#3a3a3a'], // graphite
  ['#1a1410', '#2f1f15', '#5c3a25'], // tabac
  ['#0d1117', '#1a2030', '#2a3548'], // anthracite bleuté
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function gradientFor(slug: string): {
  background: string;
  filter: string;
} {
  const palette = PALETTES[hash(slug) % PALETTES.length];
  const angle = (hash(slug) % 90) + 135;
  return {
    background: `linear-gradient(${angle}deg, ${palette[0]} 0%, ${palette[1]} 55%, ${palette[2]} 100%)`,
    filter: 'contrast(1.05) saturate(0.85)',
  };
}
