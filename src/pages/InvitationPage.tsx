import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowRight, CalendarDays, Check, Clock, Loader2 } from 'lucide-react'
import { ACTIVITIES, ANIME, BG, CARD_IMG, EASTER, MOODS } from '../config/content'
import { Certificate } from '../components/Certificate'
import { Seal } from '../components/Seal'
import { useSubmit } from '../hooks/useSubmit'
import { fmt, iso, nextWeekday } from '../lib/dates'
import { validateStep } from '../lib/validation'
import { emptyForm, type DatePref, type FormState } from '../types'
import { toRow } from '../services/invitations'

const TINT: Record<string, string> = { pumpkin: '#8a4a0c', art: '#2d3f6a', philosophy: '#2f5a2a', wine: '#7a1228', movie: '#3d2f6a', culture: '#8a1a1a', sushi: '#7a3a2a' }
const STEPS = ['Выбор развлечений', 'Настроение', 'Дата', 'Подтверждение']
const dm = (d: Date) => `${d.getDate()}.${String(d.getMonth() + 1).padStart(2, '0')}`
const Label = ({ children }: { children: string }) => <dt className="text-xs tracking-widest text-gold font-bold">{children}</dt>
const short = '[@media(max-height:820px)]:hidden'

export function InvitationPage() {
  const [view, setView] = useState<'form' | 'summary' | 'done'>('form'); const [f, setF] = useState<FormState>(emptyForm); const [err, setErr] = useState('')
  const { state, submit } = useSubmit(); const set = (p: Partial<FormState>) => { setF(s => ({ ...s, ...p })); setErr('') }
  const toggle = (id: string) => set({ activities: f.activities.includes(id) ? f.activities.filter(x => x !== id) : [...f.activities, id] })
  useEffect(() => { if (state === 'done') { setView('done'); confetti({ particleCount: 170, spread: 90, origin: { y: .6 }, colors: ['#9a2a40', '#b08d4a', '#f4ead5'] }) } }, [state])
  const ok = [1, 2, 3].map(s => validateStep(s, f) === null)
  const cur = view === 'form' ? (ok.indexOf(false) === -1 ? 3 : ok.indexOf(false)) : 3
  const go = () => { for (const s of [1, 2, 3]) { const e = validateStep(s, f); if (e) return setErr(e) } setView('summary') }
  const r = toRow(f, ''); const mood = MOODS.find(m => m.id === f.mood); const sat = nextWeekday(6), sun = nextWeekday(0)
  const dateBtn = (on: boolean) => `flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-sm transition ${on ? 'border-[#e7a0ac] bg-[#6d1a2b]/70 shadow-[0_0_14px_rgba(231,160,172,.4)]' : 'border-gold/40 hover:border-gold'}`
  return (<div className="stage lg:h-screen" style={{ backgroundImage: `linear-gradient(rgba(10,4,6,.25),rgba(10,4,6,.25)), url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="relative max-w-[1400px] mx-auto px-4 py-3 lg:h-full flex flex-col">
    <header className="flex items-center justify-between gap-4 mb-3"><div><p className="text-xl md:text-2xl font-bold">👑 Компания «Станислав»</p><p className="text-xs text-gold italic">— Основана в 2024 году —</p></div>
      <ol className="hidden lg:flex gap-4 text-sm">{STEPS.map((s, i) => <li key={s} className="flex items-center gap-2"><span className={`w-7 h-7 grid place-items-center rounded-full border ${i === cur ? 'bg-paper text-burgundy font-bold border-paper' : i < cur ? 'bg-gold/30 border-gold' : 'border-gold/50'}`}>{i < cur ? <Check size={14} /> : i + 1}</span>{s}</li>)}</ol>
      <span className="lg:hidden text-sm text-gold">Шаг {cur + 1} из 4</span></header>
    <AnimatePresence mode="wait"><motion.div key={view} className="flex-1 min-h-0" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .25 }}>
    {view === 'form' && <div className="grid lg:grid-cols-[1.55fr_1fr] gap-4 h-full">
      <section className="sheet p-4 md:p-5 flex flex-col min-h-0">
        <div className="text-center"><p className="italic text-xl text-burgundy leading-none">Официальное</p><h1 className="text-3xl md:text-4xl font-black tracking-wide leading-tight">ПРИГЛАШЕНИЕ</h1><p className="font-hand text-2xl md:text-3xl text-burgundy -rotate-2 leading-none">поболбеситься</p></div>
        <p className="text-center text-sm max-w-2xl mx-auto mt-2">Компания «Станислав» имеет честь пригласить Вас на совместное проведение досуга. Для формирования индивидуального развлекательного пакета просим заполнить небольшую анкету.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2"><span className="font-hand text-3xl -rotate-3">Станислав</span><Seal className="w-14 h-14 rotate-12 drop-shadow-lg" />
          <div className="border-2 border-burgundy text-burgundy px-2 py-0.5 -rotate-3 text-center text-[10px] font-bold tracking-wider">УРОВЕНЬ БАЛБЕСНИЧЕСТВА:<br /><span className="text-sm">ПРЕМИАЛЬНЫЙ</span></div></div>
        <h2 className="text-xl font-bold text-center mt-2 mb-2">Наш ассортимент развлечений</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 flex-1 min-h-0">{ACTIVITIES.map(a => { const on = f.activities.includes(a.id); return (
          <motion.button key={a.id} type="button" aria-pressed={on} whileHover={{ y: -3 }} whileTap={{ scale: .96 }} onClick={() => toggle(a.id)}
            className={`relative text-left text-paper p-2 pt-7 rounded-lg overflow-hidden min-h-[110px] border ${on ? 'border-[#e7a0ac] shadow-[0_0_16px_rgba(231,160,172,.55)]' : 'border-black/40'}`} style={{ background: CARD_IMG[a.id] ? `linear-gradient(180deg, rgba(15,6,10,.8), rgba(15,6,10,.4) 55%, rgba(15,6,10,.72)), url(${CARD_IMG[a.id]}) center/cover` : `linear-gradient(155deg, ${TINT[a.id]}, #1a0c10 80%)` }}>
            {!CARD_IMG[a.id] && <span className="absolute -right-1 -top-1 text-5xl opacity-40" aria-hidden>{a.emoji}</span>}
            <span className={`absolute top-1.5 left-1.5 w-5 h-5 rounded-sm border grid place-items-center ${on ? 'bg-burgundy border-paper' : 'border-paper/70'}`}>{on && <Check size={14} />}</span>
            <h3 className="font-bold leading-tight text-sm">{a.title}</h3><p className={`text-[11px] leading-snug mt-1 opacity-90 ${short}`}>{a.text}</p></motion.button>) })}
          <div className="rounded-lg p-2 text-paper border border-gold/40 bg-gradient-to-br from-[#3a1520] to-[#1a0c10]"><h3 className="font-bold leading-tight text-sm">Не нашли подходящий вариант?</h3><p className={`text-[11px] leading-snug mt-1 ${short}`}>Компания «Станислав» открыта к инновациям и готова рассмотреть Ваши предложения.</p></div></div>
        <div className="grid md:grid-cols-2 gap-2 mt-2">
          {f.activities.includes('movie') && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg p-2 text-paper bg-gradient-to-br from-[#5a1a2a] to-[#2a1015]"><h3 className="font-bold text-sm">🎬 Выберите, что посмотрим:</h3>
            <div className="grid grid-cols-2 gap-x-2">{ANIME.map(n => <label key={n} className="flex items-center gap-1.5 text-xs cursor-pointer"><input type="radio" name="anime" className="accent-[#b08d4a]" checked={f.anime === n} onChange={() => set({ anime: n })} />{n}</label>)}</div></motion.div>}
          <div className={`rounded-lg p-2 bg-paper/70 border border-gold/50 ${f.activities.includes('movie') ? '' : 'md:col-span-2'}`}><label htmlFor="c" className="font-hand text-xl">✎ А я вообще хочу...</label>
            <textarea id="c" maxLength={1000} rows={2} placeholder="Напишите свой вариант..." value={f.custom} onChange={e => set({ custom: e.target.value })} className="w-full p-1.5 bg-parchment/80 border border-gold/60 rounded-sm text-sm resize-none focus:outline-burgundy" /></div></div>
      </section>
      <aside className="flex flex-col gap-3 min-h-0">
        <div className="dpanel p-3"><h2 className="mb-2 leading-snug">Какое у Вас сегодня настроение?</h2>
          <div className="grid grid-cols-3 gap-2">{MOODS.map(m => { const on = f.mood === m.id; return (
            <motion.button key={m.id} type="button" aria-pressed={on} whileTap={{ scale: .93 }} onClick={() => set({ mood: m.id })} className={`rounded-lg border p-1.5 text-center text-[11px] leading-tight ${on ? 'border-[#e7a0ac] bg-[#6d1a2b]/70 shadow-[0_0_14px_rgba(231,160,172,.4)]' : 'border-gold/40 hover:border-gold'}`}>
              <motion.div className="text-2xl" animate={on ? { scale: [1, 1.35, 1] } : {}}>{m.emoji}</motion.div>{m.title}</motion.button>) })}</div></div>
        <div className="dpanel p-3"><h2 className="mb-2 leading-snug">Когда Вам будет угодно осчастливить нашу компанию своим присутствием?</h2>
          <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => set({ datePref: 'saturday' as DatePref, date: '' })} className={dateBtn(f.datePref === 'saturday')}><CalendarDays size={18} /><span>Суббота<br /><small className="opacity-70">ближайшая · {dm(sat)}</small></span></button>
            <button type="button" onClick={() => set({ datePref: 'sunday' as DatePref, date: '' })} className={dateBtn(f.datePref === 'sunday')}><CalendarDays size={18} /><span>Воскресенье<br /><small className="opacity-70">ближайшее · {dm(sun)}</small></span></button></div>
          <div className={`${dateBtn(f.datePref === 'exact')} mt-2`}><label htmlFor="d" className="shrink-0">Конкретная дата</label>
            <input id="d" type="date" min={iso(new Date())} value={f.date} onChange={e => set({ datePref: 'exact', date: e.target.value })} className="w-full min-w-0 p-1 rounded bg-black/30 border border-gold/40 text-paper [color-scheme:dark]" /></div>
          <button type="button" onClick={() => set({ datePref: 'later', date: '' })} className={`${dateBtn(f.datePref === 'later')} w-full mt-2`}><Clock size={18} />Договоримся позже</button></div>
        <button className="gold-btn" onClick={go}>Далее <ArrowRight size={20} /></button>
        {err && <p role="alert" className="text-[#ffb3bf] font-bold text-center text-sm">{err}</p>}
        <div className={`sheet p-3 text-xs italic space-y-0.5 ${short}`}>{[EASTER[0], EASTER[2], EASTER[3]].map(t => <p key={t}>★ {t}</p>)}</div>
      </aside></div>}
    {view === 'summary' && <div className="sheet p-6 max-w-2xl mx-auto"><h2 className="text-2xl md:text-3xl font-black text-burgundy mb-4">Ваш индивидуальный пакет балбесничества готов!</h2>
      <dl className="space-y-3"><div><Label>УСЛУГИ</Label><dd>{ACTIVITIES.filter(a => f.activities.includes(a.id)).map(a => <div key={a.id}>{a.emoji} {a.title}</div>)}{!f.activities.length && '—'}</dd></div>
        {r.selected_anime && <div><Label>АНИМЕ</Label><dd>{r.selected_anime}</dd></div>}
        {r.custom_suggestion && <div><Label>СОБСТВЕННОЕ ПРЕДЛОЖЕНИЕ</Label><dd>{r.custom_suggestion}</dd></div>}
        <div><Label>НАСТРОЕНИЕ</Label><dd>{mood?.emoji} {mood?.title}</dd></div><div><Label>ДАТА</Label><dd>{fmt(r.selected_date)}</dd></div></dl>
      {state === 'error' && <p role="alert" className="text-burgundy font-bold mt-4">Не удалось отправить (проверьте сеть и настройки Supabase). Заявка сохранена на устройстве — нажмите кнопку ещё раз.</p>}
      <div className="flex gap-3 justify-between mt-5 flex-wrap"><button className="btn-ghost" onClick={() => setView('form')} disabled={state === 'loading'}>Назад</button>
        <button className="btn" onClick={() => submit(f)} disabled={state === 'loading'}>{state === 'loading' ? <><Loader2 className="animate-spin" size={18} />Отправляем…</> : 'Отправить заявку генеральному директору 💌'}</button></div></div>}
    {view === 'done' && <div className="sheet p-5 text-center relative max-w-2xl mx-auto">
      <motion.div initial={{ scale: 3, opacity: 0, rotate: -30 }} animate={{ scale: 1, opacity: 1, rotate: -12 }} transition={{ type: 'spring', delay: .4 }} className="absolute top-3 right-3 border-4 border-burgundy text-burgundy font-black px-3 py-1 text-xl md:text-2xl tracking-widest rounded-sm bg-paper/80">ОДОБРЕНО</motion.div>
      <Seal className="w-16 h-16 mx-auto mb-2" />
      <h2 className="text-2xl md:text-3xl font-black text-burgundy">Сотрудничество официально согласовано!</h2><p className="italic mb-2">Компания «Станислав» с нетерпением ожидает совместного побалбесничества.</p>
      <p className="font-bold">Ваша заявка успешно зарегистрирована!</p>
      <p className="mb-3 text-sm max-w-lg mx-auto">Компания «Станислав» благодарит Вас за проявленный интерес. Наш единственный и самый квалифицированный сотрудник свяжется с Вами для согласования деталей.</p>
      <Certificate form={f} /><p className="text-xs italic mt-3 opacity-70">{EASTER[1]}</p></div>}
    </motion.div></AnimatePresence></div></div>)
}
