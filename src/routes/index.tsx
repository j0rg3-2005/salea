import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  Baby,
  Bike,
  Flower2,
  HeartPulse,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Scale,
  ShieldCheck,
  Smile,
  Sprout,
  WheatOff,
  type LucideIcon,
} from 'lucide-react'

import { BookingButton, BookingProvider } from '@/components/booking'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { brand, faqs, motifs, steps, values } from '@/lib/content'

export const Route = createFileRoute('/')({
  component: Home,
})

const img = (file: string, w: number) => `/.netlify/images?url=/img/${file}&w=${w}&fm=webp&q=78`

const icons: Record<string, LucideIcon> = {
  poids: Scale,
  digestif: Sprout,
  metabolique: HeartPulse,
  intolerances: WheatOff,
  femme: Flower2,
  comportement: Smile,
  sport: Bike,
  famille: Baby,
  vegetal: Leaf,
}

const nav = [
  { href: '#motifs', label: 'Motifs de consultation' },
  { href: '#approche', label: 'Approche' },
  { href: '#deroulement', label: 'Déroulement' },
  { href: '#tarifs', label: 'Remboursement' },
  { href: '#faq', label: 'FAQ' },
]

function Home() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <Motifs />
        <Approche />
        <Deroulement />
        <Tarifs />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <div className="fixed inset-x-4 bottom-4 z-40 sm:hidden">
        <BookingButton className="w-full shadow-lg" />
      </div>
    </BookingProvider>
  )
}

function Logo() {
  return (
    <a href="#top" className="flex items-baseline gap-1.5 text-primary" aria-label="Salea Nutrition, accueil">
      <span className="font-display text-2xl font-semibold tracking-tight">{brand.name}</span>
      <span className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">{brand.tagline}</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden items-center gap-6 text-sm lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BookingButton size="default" className="hidden sm:inline-flex" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetTitle className="px-6 pt-6 font-display text-xl">Menu</SheetTitle>
              <SheetDescription className="sr-only">Sections du site</SheetDescription>
              <nav aria-label="Navigation mobile" className="flex flex-col gap-1 px-4">
                {nav.map((n) => (
                  <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-lg hover:bg-muted">
                    {n.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-accent uppercase">{children}</p>
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-secondary/70 blur-3xl" />
      <div className="relative mx-auto grid max-w-content items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>{brand.role} · Cabinet & visio</Eyebrow>
          <h1 className="text-5xl leading-[1.05] font-light tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Retrouver une alimentation <em className="font-normal text-primary">qui vous ressemble</em>.
          </h1>
          <p className="mt-6 max-w-reading text-lg text-muted-foreground">
            Chez Salea Nutrition, chaque accompagnement part de vous : votre santé, vos goûts, votre
            rythme. Des conseils concrets et bienveillants pour manger mieux, durablement — sans
            régime ni interdit.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BookingButton />
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href="#motifs">
                Les motifs de consultation <ArrowRight aria-hidden />
              </a>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" aria-hidden /> Remboursé par l’assurance de base*</li>
            <li className="flex items-center gap-2"><Monitor className="size-4 text-primary" aria-hidden /> Consultations en visio</li>
            <li className="flex items-center gap-2"><Leaf className="size-4 text-primary" aria-hidden /> Approche sans interdits</li>
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-t-[12rem] rounded-b-[2rem] shadow-2xl shadow-primary/15">
            <img
              src={img('hero.png', 900)}
              srcSet={`${img('hero.png', 560)} 560w, ${img('hero.png', 900)} 900w`}
              sizes="(min-width: 1024px) 40vw, 90vw"
              alt="Bol de lentilles, légumes rôtis, avocat et grenade sur une nappe en lin vert"
              width={928}
              height={1152}
              className="aspect-[4/5] w-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 max-w-[15rem] rounded-2xl border border-border bg-card p-4 shadow-lg sm:-left-10">
            <p className="font-display text-lg leading-snug">« Manger est un plaisir, et un soin. »</p>
            <p className="mt-1 text-xs text-muted-foreground">La philosophie de Salea</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Motifs() {
  return (
    <section id="motifs" className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <Eyebrow>Mes services</Eyebrow>
            <h2 className="text-4xl font-light tracking-tight sm:text-5xl">Les motifs de consultation</h2>
          </div>
          <p className="text-muted-foreground md:text-lg">
            Que vous soyez orienté·e par votre médecin ou que vous ayez simplement envie de prendre
            soin de vous, voici les principales situations dans lesquelles je vous accompagne.
          </p>
        </div>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {motifs.map((m) => {
            const Icon = icons[m.id] ?? Leaf
            return (
              <li key={m.id} className="group flex flex-col bg-card p-7 transition-colors hover:bg-muted motion-reduce:transition-none">
                <span className="mb-5 grid size-12 place-items-center rounded-full bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-2xl font-normal">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.summary}</p>
                <ul className="mt-4 space-y-1 text-sm">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <BookingButton motif={m.title} variant="outline" size="sm" className="opacity-90 group-hover:opacity-100">
                    Consulter pour ce motif
                  </BookingButton>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Approche() {
  return (
    <section id="approche" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative">
          <img
            src={img('consultation.png', 1000)}
            srcSet={`${img('consultation.png', 640)} 640w, ${img('consultation.png', 1000)} 1000w`}
            sizes="(min-width: 1024px) 45vw, 92vw"
            alt="Bureau de consultation lumineux avec carnet, tisane et pommes, vue sur les montagnes"
            width={1264}
            height={848}
            loading="lazy"
            className="aspect-[3/2] w-full rounded-[2rem] object-cover"
          />
          <img
            src={img('market.png', 400)}
            alt="Panier de légumes frais du marché"
            width={400}
            height={400}
            loading="lazy"
            className="absolute -right-3 -bottom-10 hidden size-40 rounded-full border-8 border-background object-cover shadow-xl sm:block lg:-right-8 lg:size-48"
          />
        </div>
        <div>
          <Eyebrow>Mon approche</Eyebrow>
          <h2 className="text-4xl font-light tracking-tight sm:text-5xl">Une écoute, pas un régime.</h2>
          <p className="mt-6 text-muted-foreground md:text-lg">
            Diététicienne diplômée, je crois qu’il n’existe pas d’alimentation parfaite, mais une
            alimentation juste pour chacun·e. Mon rôle : vous donner les clés pour comprendre votre
            corps, faire des choix éclairés et retrouver de la sérénité à table.
          </p>
          <p className="mt-4 text-muted-foreground md:text-lg">
            J’accompagne adultes, enfants et familles, en collaboration avec votre médecin traitant
            lorsque c’est nécessaire.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-accent pt-4">
                <dt className="font-display text-lg">{v.title}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Deroulement() {
  return (
    <section id="deroulement" className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-primary-foreground/70 uppercase">Déroulement</p>
        <h2 className="max-w-2xl text-4xl font-light tracking-tight sm:text-5xl">Comment se passe un accompagnement ?</h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="font-display text-6xl font-light text-primary-foreground/30">0{i + 1}</span>
              <h3 className="mt-3 text-2xl font-normal">{s.title}</h3>
              <p className="mt-1 text-sm font-semibold text-[oklch(0.85_0.09_60)]">{s.duration}</p>
              <p className="mt-3 text-primary-foreground/80">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14">
          <BookingButton variant="secondary" />
        </div>
      </div>
    </section>
  )
}

function Tarifs() {
  return (
    <section id="tarifs" className="py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="max-w-2xl">
          <Eyebrow>Tarifs & remboursement</Eyebrow>
          <h2 className="text-4xl font-light tracking-tight sm:text-5xl">Des consultations prises en charge</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h3 className="text-2xl font-normal">Avec prescription médicale</h3>
            <p className="mt-3 text-muted-foreground">
              Les consultations sont remboursées par l’assurance obligatoire des soins (LAMal), après
              déduction de la franchise et de la quote-part. Une prescription couvre 6 séances,
              renouvelable.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex gap-2"><ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden /> Tarif conventionné, facturation directe</li>
              <li className="flex gap-2"><ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden /> Diabète, obésité, troubles digestifs, allergies…</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-secondary/60 p-8">
            <h3 className="text-2xl font-normal">Sans prescription</h3>
            <p className="mt-3 text-muted-foreground">
              Vous pouvez consulter librement. De nombreuses assurances complémentaires participent
              aux frais : renseignez-vous auprès de la vôtre. Le tarif vous est communiqué lors de la
              prise de rendez-vous.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex gap-2"><ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden /> Aucune ordonnance nécessaire</li>
              <li className="flex gap-2"><ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden /> Même accompagnement, au cabinet ou en visio</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">* Sur prescription médicale, selon les conditions de votre assurance.</p>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" className="bg-card py-20 md:py-28">
      <div className="mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>Questions fréquentes</Eyebrow>
          <h2 className="text-4xl font-light tracking-tight sm:text-5xl">Bon à savoir</h2>
          <p className="mt-4 text-muted-foreground">
            Une autre question ? Écrivez-moi via le formulaire de rendez-vous, j’y réponds avec plaisir.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-display text-lg font-normal">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-accent px-6 py-16 text-center text-accent-foreground sm:px-12">
          <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10" />
          <div aria-hidden className="absolute -bottom-32 -left-16 size-80 rounded-full bg-white/10" />
          <h2 className="relative mx-auto max-w-2xl text-4xl font-light tracking-tight text-balance sm:text-5xl">
            Prêt·e à prendre soin de vous ?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-accent-foreground/90">
            Envoyez votre demande en deux minutes. Je vous recontacte rapidement pour fixer le
            rendez-vous qui vous convient.
          </p>
          <div className="relative mt-8 flex justify-center">
            <BookingButton variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border pt-12 pb-28 sm:pb-12">
      <div className="mx-auto grid max-w-content gap-8 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {brand.role}. Conseils nutritionnels personnalisés pour toute la famille.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Consultations</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin className="size-4" aria-hidden /> Au cabinet, sur rendez-vous</li>
            <li className="flex items-center gap-2"><Monitor className="size-4" aria-hidden /> En visioconférence</li>
            <li className="flex items-center gap-2"><Mail className="size-4" aria-hidden /> Réponse sous 48 h ouvrables</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Navigation</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-foreground">{n.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-content px-4 text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Salea Nutrition. Tous droits réservés.
      </p>
    </footer>
  )
}
