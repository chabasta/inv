import type { FormState } from '../types'
import { iso } from './dates'
export function validateStep(step: number, f: FormState): string | null {
  if (step === 1) { if (!f.activities.length && !f.custom.trim()) return 'Выберите хотя бы одну услугу или предложите свою идею'
    if (f.activities.includes('movie') && !f.anime) return 'Укажите, что смотрим в «Кинозале»'
    if (f.custom.length > 1000) return 'Слишком длинное предложение (макс. 1000 символов)' }
  if (step === 2 && !f.mood) return 'Выберите настроение'
  if (step === 3) { if (!f.datePref) return 'Выберите дату'
    if (f.datePref === 'exact' && (!f.date || f.date < iso(new Date()))) return 'Выберите дату не раньше сегодняшней' }
  return null
}
