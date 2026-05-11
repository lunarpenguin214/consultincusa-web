import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import clsx from 'clsx'

const schema = z.object({
  email: z.string().email('Enter a valid email.'),
})

type Values = z.infer<typeof schema>

export function LeadFormSimple({ industry }: { industry: 'dtc' | 'agency' | 'newsletter' }) {
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: Values) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, industry, source: window.location.pathname }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-brand-paper border-2 border-brand-navy p-6 shadow-heritage">
        <p className="font-serif text-2xl font-bold text-brand-navy">
          Sent. Check your inbox in 24h.
        </p>
        <p className="mt-2 text-base text-ink-500">
          Your free 1-pager is on the way. Reply to it if you want the full Atlas when it ships.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="your@email.com"
          {...register('email')}
          className="flex-1 border-2 border-brand-navy bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-coral"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            'bg-brand-coral text-white text-base font-bold uppercase tracking-wider px-8 py-3 border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop transition-all',
            isSubmitting && 'opacity-50 cursor-not-allowed',
          )}
        >
          {isSubmitting ? 'Sending…' : 'Download the data'}
        </button>
      </div>
      {errors.email && <span className="text-red-700 text-sm">{errors.email.message}</span>}
      {state === 'error' && (
        <span className="text-red-700 text-sm">Something went wrong. Try again.</span>
      )}
    </form>
  )
}
