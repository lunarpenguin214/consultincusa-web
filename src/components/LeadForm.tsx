import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'

const COUNTRIES = [
  'Brazil', 'Mexico', 'Colombia', 'Argentina', 'Venezuela', 'Peru',
  'Chile', 'India', 'Nigeria', 'Pakistan', 'Philippines', 'Egypt',
  'Bangladesh', 'Vietnam', 'Ukraine', 'Turkey', 'Indonesia', 'Other',
]

const buildSchema = (t: (key: string) => string) =>
  z.object({
    first_name: z.string().min(1, t('form.validation.first_name_required')),
    email: z.string().email(t('form.validation.email_invalid')),
    whatsapp_e164: z
      .string()
      .regex(/^\+\d{6,20}$/, t('form.validation.whatsapp_invalid')),
    country_of_origin: z.string().min(1, t('form.validation.country_required')),
    language: z.enum(['en', 'pt', 'es']),
    opt_in_whatsapp: z.literal(true, {
      errorMap: () => ({ message: t('form.validation.opt_in_required') }),
    }),
  })

type LeadFormValues = z.infer<ReturnType<typeof buildSchema>>

export function LeadForm() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams<{ lang: 'en' | 'pt' | 'es' }>()
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle')

  const schema = buildSchema(t)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { language: lang as 'en' | 'pt' | 'es' },
  })

  const onSubmit = async (data: LeadFormValues) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: `landing_${lang}` }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSubmitState('success')
    } catch (err) {
      console.error(err)
      setSubmitState('error')
    }
  }

  if (submitState === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <p className="text-2xl font-bold text-green-900">{t('form.success_title')}</p>
        <p className="mt-3 text-green-800">{t('form.success_body')}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-ink-300 rounded-lg shadow-md p-6 md:p-8 space-y-4"
    >
      <h2 className="text-2xl font-bold text-ink-900">{t('form.title')}</h2>

      <Field
        label={t('form.first_name')}
        error={errors.first_name?.message}
        input={<input type="text" {...register('first_name')} className={inputCls} />}
      />
      <Field
        label={t('form.email')}
        error={errors.email?.message}
        input={<input type="email" {...register('email')} className={inputCls} />}
      />
      <Field
        label={t('form.whatsapp')}
        error={errors.whatsapp_e164?.message}
        input={<input type="tel" placeholder="+55 ..." {...register('whatsapp_e164')} className={inputCls} />}
      />
      <Field
        label={t('form.country')}
        error={errors.country_of_origin?.message}
        input={
          <select {...register('country_of_origin')} className={inputCls}>
            <option value="">--</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        }
      />

      <label className="flex items-start gap-3 text-sm text-ink-700">
        <input type="checkbox" {...register('opt_in_whatsapp')} className="mt-1" />
        <span>{t('form.opt_in')}</span>
      </label>
      {errors.opt_in_whatsapp?.message && (
        <p className="text-red-600 text-sm">{errors.opt_in_whatsapp.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          'w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-md transition',
          isSubmitting && 'opacity-50 cursor-not-allowed',
        )}
      >
        {isSubmitting ? t('form.submitting') : t('form.submit')}
      </button>

      {submitState === 'error' && <p className="text-red-600 text-sm">{t('form.error')}</p>}
    </form>
  )
}

const inputCls =
  'w-full border border-ink-300 rounded-md px-3 py-2 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none'

function Field({
  label,
  input,
  error,
}: {
  label: string
  input: React.ReactNode
  error?: string
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-700 mb-1">{label}</span>
      {input}
      {error && <span className="block text-red-600 text-sm mt-1">{error}</span>}
    </label>
  )
}
