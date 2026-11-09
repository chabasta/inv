import { useEffect, useState } from 'react'
export const useHashRoute = () => { const [h, s] = useState(location.hash); useEffect(() => { const f = () => s(location.hash); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, []); return h }
