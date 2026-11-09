import { supabase } from '../lib/supabase'
import { iso, nextWeekday } from '../lib/dates'
import type { FormState, Invitation } from '../types'
const QUEUE = 'stanislav:pending'
export function toRow(f: FormState, id: string) {
  const date = f.datePref === 'exact' ? f.date : f.datePref === 'saturday' ? iso(nextWeekday(6)) : f.datePref === 'sunday' ? iso(nextWeekday(0)) : null
  return { id, selected_activities: f.activities, selected_anime: f.activities.includes('movie') ? f.anime || null : null,
    custom_suggestion: f.custom.trim() || null, mood: f.mood, selected_date: date, date_preference: f.datePref }
}
type Row = ReturnType<typeof toRow>
/** Идемпотентно: id создаётся на клиенте, дубликат (23505) = уже сохранено. */
async function insert(row: Row) {
  const { error } = await supabase.from('invitations').insert(row)
  if (error && error.code !== '23505') throw error
}
export async function submitInvitation(row: Row) {
  localStorage.setItem(QUEUE, JSON.stringify(row)) // заявка не теряется при сбое сети
  await insert(row); localStorage.removeItem(QUEUE)
}
export async function flushPending() {
  const raw = localStorage.getItem(QUEUE); if (!raw) return false
  try { await insert(JSON.parse(raw) as Row); localStorage.removeItem(QUEUE); return true } catch { return false }
}
export async function listInvitations(): Promise<Invitation[]> {
  const { data, error } = await supabase.from('invitations').select('*').order('created_at', { ascending: false })
  if (error) throw error; return data as Invitation[]
}
