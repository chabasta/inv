export type DatePref = 'exact'|'saturday'|'sunday'|'later'
export interface FormState { activities: string[]; anime: string; custom: string; mood: string; datePref: DatePref|''; date: string }
export interface Invitation { id: string; selected_activities: string[]; selected_anime: string|null; custom_suggestion: string|null; mood: string; selected_date: string|null; date_preference: DatePref; created_at: string }
export const emptyForm: FormState = { activities: [], anime: '', custom: '', mood: '', datePref: '', date: '' }
