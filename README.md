# Salea Nutrition

Site vitrine d'une diététicienne : présentation des motifs de consultation, de l'approche, du déroulement d'un suivi, du remboursement et une FAQ — avec un bouton **« Prendre rendez-vous »** présent partout sur la page, qui ouvre un formulaire de demande de rendez-vous.

## Technologies

- TanStack Start (React 19) + Vite, Tailwind CSS 4, composants shadcn/ui
- Netlify Forms pour les demandes de rendez-vous (consultables dans l'interface Netlify, onglet *Forms*)
- Netlify Image CDN pour servir les images optimisées

## Lancer en local

```bash
pnpm install
netlify dev   # ou : pnpm dev
```

Les textes du site se modifient dans `src/lib/content.ts`.

## Pistes d'évolution

- Ajouter l'adresse du cabinet, le téléphone et une carte
- Connecter un agenda en ligne (ex. Cal.com / Calendly) pour une réservation en temps réel
- Configurer les notifications e-mail des demandes dans Netlify (Forms › Notifications)
