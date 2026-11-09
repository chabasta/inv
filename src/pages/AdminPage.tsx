import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { listInvitations } from '../services/invitations'
import { ACTIVITIES, MOODS } from '../config/content'
import { fmt } from '../lib/dates'
import type { Invitation } from '../types'

export function AdminPage() {
  const [signed, setSigned] = useState<boolean | null>(null); const [items, setItems] = useState<Invitation[]>([]); const [err, setErr] = useState(''); const [open, setOpen] = useState<string | null>(null)
  const load = useCallback(async () => { try { setItems(await listInvitations()); setErr('') } catch { setErr('Нет доступа или ошибка загрузки (вы не в таблице admins?)') } }, [])
  useEffect(() => { supabase.auth.getSession().then(({ data }) => setSigned(!!data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSigned(!!s)); return () => sub.subscription.unsubscribe() }, [])
  useEffect(() => { if (signed) void load() }, [signed, load])
  const login = async (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); const d = new FormData(e.currentTarget)
    const { error } = await supabase.auth.signInWithPassword({ email: String(d.get('email')), password: String(d.get('password')) }); setErr(error ? 'Неверный логин или пароль' : '') }
  if (signed === null) return <p className="p-8 text-center">Загрузка…</p>
  if (!signed) return (<main className="max-w-sm mx-auto p-6 mt-16"><form onSubmit={login} className="paper p-6 space-y-3"><h1 className="text-2xl font-black text-burgundy">Кабинет директора</h1>
    <input name="email" type="email" required placeholder="Email" className="w-full p-2 bg-parchment border border-gold/60" /><input name="password" type="password" required placeholder="Пароль" className="w-full p-2 bg-parchment border border-gold/60" />
    {err && <p role="alert" className="text-burgundy">{err}</p>}<button className="btn w-full">Войти</button></form></main>)
  return (<main className="max-w-4xl mx-auto p-4"><div className="flex justify-between items-center my-4"><h1 className="text-2xl font-black text-burgundy">Заявки ({items.length})</h1>
    <button className="btn-ghost" onClick={() => supabase.auth.signOut()}><LogOut size={16} />Выйти</button></div>{err && <p role="alert" className="text-burgundy">{err}</p>}
    <div className="grid md:grid-cols-2 gap-4">{items.map(i => { const m = MOODS.find(x => x.id === i.mood); const acts = i.selected_activities.map(a => ACTIVITIES.find(x => x.id === a)); return (
      <motion.article key={i.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="paper p-4">
        <p className="text-xs text-gold font-bold">{new Date(i.created_at).toLocaleString('ru-RU')}</p>
        <p className="text-lg my-1">{m?.emoji} {m?.title}</p><p>📅 {fmt(i.selected_date)}</p><p className="text-sm">{acts.map(a => a?.emoji).join(' ')}</p>
        <button className="underline text-burgundy text-sm mt-2" onClick={() => setOpen(open === i.id ? null : i.id)}>{open === i.id ? 'Скрыть' : 'Подробнее'}</button>
        {open === i.id && <div className="mt-2 text-sm space-y-1"><p><b>Услуги:</b> {acts.map(a => a?.title).join(', ') || '—'}</p><p><b>Аниме:</b> {i.selected_anime ?? '—'}</p><p><b>Идея:</b> {i.custom_suggestion ?? '—'}</p><p><b>Предпочтение даты:</b> {i.date_preference}</p></div>}</motion.article>) })}</div></main>)
}
