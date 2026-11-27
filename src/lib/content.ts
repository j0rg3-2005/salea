// Contenu éditorial du site — modifiez les textes ici sans toucher aux composants.

export const brand = {
  name: 'Salea',
  tagline: 'Nutrition',
  role: 'Diététicienne diplômée',
}

export type Motif = {
  id: string
  title: string
  summary: string
  points: string[]
}

export const motifs: Motif[] = [
  {
    id: 'poids',
    title: 'Gestion du poids',
    summary:
      'Perdre, prendre ou stabiliser son poids durablement, sans régime restrictif ni culpabilité.',
    points: ['Surpoids et obésité', 'Prise de poids souhaitée', 'Effet yo-yo'],
  },
  {
    id: 'digestif',
    title: 'Troubles digestifs',
    summary:
      'Ballonnements, inconfort, transit irrégulier : retrouver un ventre apaisé grâce à une alimentation adaptée.',
    points: ['Syndrome de l’intestin irritable', 'Régime pauvre en FODMAPs', 'Reflux, constipation'],
  },
  {
    id: 'metabolique',
    title: 'Diabète & maladies métaboliques',
    summary:
      'Comprendre son traitement, équilibrer ses repas et mieux vivre au quotidien avec sa maladie.',
    points: ['Diabète de type 1, 2 et gestationnel', 'Cholestérol, hypertension', 'Stéatose hépatique'],
  },
  {
    id: 'intolerances',
    title: 'Allergies & intolérances',
    summary:
      'Manger varié et savoureux malgré les évictions, sans risque de carences.',
    points: ['Maladie cœliaque, sans gluten', 'Intolérance au lactose', 'Allergies alimentaires'],
  },
  {
    id: 'femme',
    title: 'Grossesse & santé de la femme',
    summary:
      'Accompagner chaque étape : désir d’enfant, grossesse, allaitement, ménopause.',
    points: ['Grossesse et allaitement', 'SOPK, endométriose', 'Ménopause'],
  },
  {
    id: 'comportement',
    title: 'Relation à l’alimentation',
    summary:
      'Apaiser le rapport à la nourriture, réapprendre à écouter sa faim et ses envies.',
    points: ['Compulsions, grignotage', 'Alimentation émotionnelle', 'Troubles du comportement alimentaire'],
  },
  {
    id: 'sport',
    title: 'Nutrition du sport',
    summary:
      'Optimiser ses performances, sa récupération et son énergie, en loisir comme en compétition.',
    points: ['Préparation d’un objectif', 'Hydratation et récupération', 'Sports d’endurance'],
  },
  {
    id: 'famille',
    title: 'Enfants & familles',
    summary:
      'Des repas sereins à la maison et des enfants qui grandissent en bonne santé.',
    points: ['Diversification alimentaire', 'Enfants sélectifs', 'Surpoids de l’enfant'],
  },
  {
    id: 'vegetal',
    title: 'Alimentation végétale',
    summary:
      'Adopter une alimentation végétarienne ou végane équilibrée et couvrir tous ses besoins.',
    points: ['Transition végétarienne', 'Protéines, fer, B12', 'Équilibre au quotidien'],
  },
]

export const steps = [
  {
    title: 'Premier rendez-vous',
    duration: '60 min',
    text: 'Nous faisons connaissance : vos habitudes, votre histoire, vos objectifs et vos contraintes. Ensemble, nous définissons des priorités réalistes.',
  },
  {
    title: 'Un plan sur mesure',
    duration: 'Personnalisé',
    text: 'Pas de menu imposé : des repères concrets, des idées de repas et des outils adaptés à votre rythme de vie et à vos goûts.',
  },
  {
    title: 'Consultations de suivi',
    duration: '30–45 min',
    text: 'Nous ajustons au fil des semaines, célébrons les progrès et levons les obstacles. Au cabinet ou en visioconférence.',
  },
]

export const values = [
  { title: 'Sans interdits', text: 'Le plaisir de manger fait partie de la santé.' },
  { title: 'Basé sur la science', text: 'Des conseils fondés sur les recommandations actuelles.' },
  { title: 'À votre rythme', text: 'Des petits pas durables plutôt qu’un changement radical.' },
]

export const faqs = [
  {
    q: 'Les consultations sont-elles remboursées ?',
    a: 'Oui. Sur prescription médicale, les consultations diététiques sont prises en charge par l’assurance de base (LAMal) pour de nombreuses indications : diabète, obésité, troubles digestifs, allergies, maladies cardiovasculaires, etc. Sans prescription, certaines assurances complémentaires participent aux frais.',
  },
  {
    q: 'Faut-il une ordonnance de mon médecin ?',
    a: 'Elle n’est pas obligatoire pour consulter, mais elle est nécessaire au remboursement par l’assurance de base. La prescription est valable pour 6 séances et peut être renouvelée.',
  },
  {
    q: 'Que dois-je apporter au premier rendez-vous ?',
    a: 'Votre prescription médicale si vous en avez une, vos dernières analyses de sang et la liste de vos traitements. Si vous le souhaitez, notez ce que vous mangez sur 2 à 3 jours : c’est un excellent point de départ.',
  },
  {
    q: 'Proposez-vous des consultations en ligne ?',
    a: 'Oui, toutes les consultations peuvent se faire en visioconférence, avec la même qualité de suivi qu’au cabinet.',
  },
  {
    q: 'Combien de séances faut-il prévoir ?',
    a: 'Cela dépend de vos objectifs. En moyenne, un accompagnement comprend 4 à 6 séances réparties sur quelques mois.',
  },
  {
    q: 'Comment annuler ou déplacer un rendez-vous ?',
    a: 'Il suffit de prévenir au moins 24 heures à l’avance par e-mail ou téléphone. Les rendez-vous non excusés pourront être facturés.',
  },
]
