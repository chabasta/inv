import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Download } from 'lucide-react'
import { ACTIVITIES, MOODS } from '../config/content'
import { fmt } from '../lib/dates'
import { toRow } from '../services/invitations'
import type { FormState } from '../types'
import { Seal } from './Seal'
export function Certificate({ form }: { form: FormState }) {
  const ref = useRef<HTMLDivElement>(null); const [busy, setBusy] = useState(false)
  const r = toRow(form, ''); const names: string[] = ACTIVITIES.filter(a => form.activities.includes(a.id)).map(a => `${a.emoji} ${a.title}`)
  if (form.custom.trim()) names.push(`✨ ${form.custom.trim()}`)
  const save = async () => { if (!ref.current) return; setBusy(true)
    try { const url = await toPng(ref.current, { pixelRatio: 2, cacheBust: true }); const a = document.createElement('a'); a.href = url; a.download = 'sertifikat-stanislav.png'; a.click() } finally { setBusy(false) } }
  return (<div className="w-full flex flex-col items-center gap-4">
    <div className="w-full overflow-x-auto"><div ref={ref} className="mx-auto w-[520px] bg-paper p-6 border-[6px] border-gold" style={{ borderStyle: 'double' }}>
      <h3 className="text-center text-2xl font-black text-burgundy">СЕРТИФИКАТ ПОБОЛБЕСИТЬСЯ</h3>
      <p className="text-center text-3xl my-3">💞</p>
      <ul className="space-y-1 text-center">{names.map(n => <li key={n}>{n}</li>)}</ul>
      <p className="text-center mt-3 text-sm">Настроение: {MOODS.find(m => m.id === form.mood)?.title}<br />Дата: <b>{fmt(r.selected_date)}</b></p>
      <div className="flex justify-between items-end mt-4"><span className="font-hand text-2xl">Станислав</span><Seal className="w-16 h-16" /></div></div></div>
    <button className="btn-ghost" onClick={save} disabled={busy}><Download size={18} />{busy ? 'Готовим…' : 'Сохранить сертификат в PNG'}</button></div>)
}
