//style.ts

type Color = 'zinc' | 'rose' | 'amber' | 'lime' | 'emerald' | 'blue' | 'violet'

export const variants: Record<
  Color,
  { bg: string; text: string; fill: string }
> = {
  zinc: { bg: 'bg-zinc-200', text: 'text-zinc-600', fill: 'fill-zinc-600' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-100', fill: 'fill-rose-100' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-100', fill: 'fill-amber-100' },
  lime: { bg: 'bg-lime-500', text: 'text-lime-100', fill: 'fill-lime-100' },
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-100',
    fill: 'fill-emerald-100',
  },
  blue: { bg: 'bg-blue-500', text: 'text-blue-100', fill: 'fill-blue-100' },
  violet: {
    bg: 'bg-violet-500',
    text: 'text-violet-100',
    fill: 'fill-violet-100',
  },
}
