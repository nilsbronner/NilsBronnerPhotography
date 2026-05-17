# Nils Bronner — Portfolio

Site portfolio premium du photographe Nils Bronner (Strasbourg).

## Stack

- **Astro 4** (SSG) + **MDX** pour les case studies
- **Tailwind CSS** pour le styling
- **React** en îlots pour les composants animés
- **Motion** (ex-Framer Motion) — import depuis `motion/react`
- **TypeScript strict**
- Déploiement **Vercel**, analytics **Plausible**

## Commandes

```bash
npm install      # installer les deps
npm run dev      # serveur local http://localhost:4321
npm run build    # build production
npm run preview  # prévisualiser le build
```

## Arborescence

```
src/
  components/
    motion/         # composants React avec Motion (îlots)
    ...             # composants Astro statiques
  content/
    projects/       # case studies MDX
  layouts/
  lib/
    motion-config.ts  # variants Motion centralisés (source unique)
  pages/
    fr/ en/         # routing i18n (FR par défaut)
  styles/
```

## Règles Motion (critique)

Voir `src/lib/motion-config.ts`. Aucune animation ad hoc dans les composants — tout passe par les variants exportés. Durées plafonnées à 1000 ms. `useReducedMotion` partout.
