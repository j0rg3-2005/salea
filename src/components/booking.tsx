import { createContext, useContext, useState, type FormEvent, type ReactNode } from 'react'
import { CalendarCheck, CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { motifs } from '@/lib/content'
import { cn } from '@/lib/utils'

type BookingContextValue = { open: (motif?: string) => void }

const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [motif, setMotif] = useState('')

  return (
    <BookingContext.Provider
      value={{
        open: (m) => {
          setMotif(m ?? '')
          setIsOpen(true)
        },
      }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-medium">
              Prendre rendez-vous
            </DialogTitle>
            <DialogDescription>
              Indiquez vos disponibilités : je vous recontacte sous 48&nbsp;h ouvrables pour
              confirmer la date et l’heure de votre consultation.
            </DialogDescription>
          </DialogHeader>
          <BookingForm key={motif + String(isOpen)} defaultMotif={motif} />
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  )
}

export function BookingButton({
  motif,
  className,
  size = 'lg',
  variant = 'default',
  children = 'Prendre rendez-vous',
}: {
  motif?: string
  className?: string
  size?: 'default' | 'sm' | 'lg'
  variant?: 'default' | 'outline' | 'secondary'
  children?: ReactNode
}) {
  const { open } = useBooking()
  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      onClick={() => open(motif)}
      className={cn('rounded-full', className)}
    >
      <CalendarCheck aria-hidden />
      {children}
    </Button>
  )
}

type State = 'idle' | 'pending' | 'success' | 'error'

const selectClass =
  'h-9 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm'

function BookingForm({ defaultMotif }: { defaultMotif: string }) {
  const [state, setState] = useState<State>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/booking-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      if (/\bdata-netlify\s*=/i.test(await response.text())) {
        throw new Error('Form handling is unavailable')
      }
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle2 className="size-12 text-primary" aria-hidden />
        <p className="font-display text-xl">Merci, votre demande est bien envoyée !</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Je reviens vers vous très rapidement pour fixer ensemble votre rendez-vous.
        </p>
      </div>
    )
  }

  return (
    <form
      name="rendez-vous"
      method="POST"
      action="/booking-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state === 'error') setState('idle')
      }}
    >
      <input type="hidden" name="form-name" value="rendez-vous" />
      <p hidden>
        <label>
          Ne pas remplir
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="bk-name">Nom et prénom</Label>
          <Input id="bk-name" name="name" autoComplete="name" required maxLength={100} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bk-email">E-mail</Label>
          <Input id="bk-email" name="email" type="email" autoComplete="email" required maxLength={254} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bk-phone">Téléphone</Label>
          <Input id="bk-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} />
        </div>
        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="bk-motif">Motif de consultation</Label>
          <select id="bk-motif" name="motif" defaultValue={defaultMotif} required className={selectClass}>
            <option value="" disabled>
              Choisissez un motif…
            </option>
            {motifs.map((m) => (
              <option key={m.id} value={m.title}>
                {m.title}
              </option>
            ))}
            <option value="Autre">Autre / je ne sais pas encore</option>
          </select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bk-type">Type de consultation</Label>
          <select id="bk-type" name="consultation" defaultValue="Première consultation" className={selectClass}>
            <option>Première consultation</option>
            <option>Consultation de suivi</option>
          </select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bk-mode">Lieu</Label>
          <select id="bk-mode" name="mode" defaultValue="Au cabinet" className={selectClass}>
            <option>Au cabinet</option>
            <option>En visioconférence</option>
          </select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bk-date">Date souhaitée</Label>
          <Input id="bk-date" name="date" type="date" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bk-slot">Moment préféré</Label>
          <select id="bk-slot" name="creneau" defaultValue="Indifférent" className={selectClass}>
            <option>Indifférent</option>
            <option>Matin</option>
            <option>Midi</option>
            <option>Après-midi</option>
            <option>Fin de journée</option>
          </select>
        </div>
        <fieldset className="grid gap-2 sm:col-span-2">
          <legend className="mb-1 text-sm font-medium">Avez-vous une prescription médicale ?</legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {['Oui', 'Non', 'Je ne sais pas'].map((v) => (
              <label key={v} className="flex items-center gap-2">
                <input type="radio" name="prescription" value={v} defaultChecked={v === 'Non'} className="accent-[var(--primary)]" />
                {v}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="bk-message">Message (facultatif)</Label>
          <Textarea
            id="bk-message"
            name="message"
            rows={3}
            maxLength={2000}
            placeholder="Quelques mots sur vos attentes, vos disponibilités…"
          />
        </div>
        {state === 'error' && (
          <p role="alert" className="text-sm text-destructive sm:col-span-2">
            Votre demande n’a pas pu être envoyée. Vos informations sont conservées : merci de
            réessayer dans un instant.
          </p>
        )}
        <Button type="submit" size="lg" className="rounded-full sm:col-span-2">
          {state === 'pending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
        </Button>
        <p className="text-xs text-muted-foreground sm:col-span-2">
          Vos données sont traitées de manière confidentielle et utilisées uniquement pour
          organiser votre rendez-vous.
        </p>
      </fieldset>
    </form>
  )
}
