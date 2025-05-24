import { SlidersHorizontal } from 'lucide-react';

export function FilterToggle({ onClick, isOpen, hasActive }) {
  return (
    <button
      onClick={onClick}
      className={`filter-toggle ${hasActive ? 'active' : ''}`}
      title="Öppna/stäng filterpanel"
    >
      <SlidersHorizontal className="filter-toggle-icon" />
      Filter{hasActive ? ' *' : ''}
    </button>
  );
}