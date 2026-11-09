import { useCallback, useEffect, useRef, useState } from 'react'
import { flushPending, submitInvitation, toRow } from '../services/invitations'
import { isConfigured } from '../lib/supabase'
import type { FormState } from '../types'
export function useSubmit() {
  const [state, setState] = useState<'idle'|'loading'|'done'|'error'>('idle')
  const id = useRef(crypto.randomUUID()); const busy = useRef(false)
  useEffect(() => { void flushPending() }, [])
  const submit = useCallback(async (f: FormState) => {
    if (busy.current) return; busy.current = true; setState('loading')
    try { if (!isConfigured) throw new Error('no-config'); await submitInvitation(toRow(f, id.current)); setState('done') }
    catch { setState('error') } finally { busy.current = false }
  }, [])
  return { state, submit }
}
