export const Seal = ({ className = '', text = 'С' }: { className?: string; text?: string }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden><circle cx="50" cy="50" r="46" fill="#6d1a2b"/><circle cx="50" cy="50" r="38" fill="none" stroke="#e7c97f" strokeWidth="2" strokeDasharray="3 3"/>
  <text x="50" y="62" textAnchor="middle" fontSize="38" fontFamily="Playfair Display,serif" fontWeight="900" fill="#e7c97f">{text}</text></svg>)
