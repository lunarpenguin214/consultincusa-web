import { BRAND } from '../data/brand'
import { Check, X } from 'lucide-react'

export function AntiList() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="bg-brand-paper border-2 border-brand-navy shadow-heritage p-6">
        <p className="text-sm uppercase tracking-widest font-bold text-brand-coral mb-4">
          You’re a fit if
        </p>
        <ul className="space-y-3">
          {BRAND.fitIf.map((item) => (
            <li key={item} className="flex gap-3 text-base">
              <Check className="w-5 h-5 text-brand-coral shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-brand-navy text-white border-2 border-brand-navy shadow-heritage p-6">
        <p className="text-sm uppercase tracking-widest font-bold text-brand-gold mb-4">
          You’re not
        </p>
        <ul className="space-y-3">
          {BRAND.fitNot.map((item) => (
            <li key={item} className="flex gap-3 text-base">
              <X className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
