export const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
/** Ближайший предстоящий день недели (6=сб, 0=вс); если сегодня — сегодня. */
export function nextWeekday(dow: number, from = new Date()) { const d = new Date(from.getFullYear(), from.getMonth(), from.getDate()); d.setDate(d.getDate() + ((dow - d.getDay() + 7) % 7)); return d }
export const fmt = (s: string|null) => s ? new Date(s + 'T00:00:00').toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'}) : 'Договоримся позже'
