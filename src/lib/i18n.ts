/**
 * Petit utilitaire i18n — pas de lib externe, on garde le bundle léger.
 * Les chaînes courtes (nav, footer, CTA) sont ici. Les contenus longs
 * (manifeste, bio, services) viennent des Content Collections / MDX.
 */

export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

type Dict = Record<string, string>;

const fr: Dict = {
  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.contact': 'Contact',
  'nav.menu.open': 'Ouvrir le menu',
  'nav.menu.close': 'Fermer le menu',
  'cta.brief': 'Un projet ? Parlons-en.',
  'home.clients.title': 'Ils m’ont fait confiance',
  'footer.contact': 'Contact',
  'footer.nav': 'Navigation',
  'footer.legal': 'Mentions légales',
  'footer.rgpd': 'Confidentialité',
  'footer.credit': '© Nils Bronner — Photographe, Strasbourg',
  'lang.switch': 'EN',
};

const en: Dict = {
  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.contact': 'Contact',
  'nav.menu.open': 'Open menu',
  'nav.menu.close': 'Close menu',
  'cta.brief': 'Got a project? Let’s talk.',
  'home.clients.title': 'Trusted by',
  'footer.contact': 'Contact',
  'footer.nav': 'Navigation',
  'footer.legal': 'Legal notice',
  'footer.rgpd': 'Privacy',
  'footer.credit': '© Nils Bronner — Photographer, Strasbourg',
  'lang.switch': 'FR',
};

const DICTS: Record<Locale, Dict> = { fr, en };

export function t(locale: Locale, key: string): string {
  return DICTS[locale]?.[key] ?? DICTS[DEFAULT_LOCALE][key] ?? key;
}

/** Extrait la locale courante depuis Astro.url.pathname. */
export function getLocale(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return seg === 'en' ? 'en' : 'fr';
}

/** Construit un chemin localisé. fr = sans préfixe (default), en = /en/... */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'fr') return clean === '/' ? '/' : clean;
  return clean === '/' ? '/en' : `/en${clean}`;
}

/** Inverse la locale courante pour le switch FR/EN. */
export function altLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr';
}
