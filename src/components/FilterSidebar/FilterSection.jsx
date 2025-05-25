/**
 * En komponent för filtersektioner i sidomenyn och används för att visa en klickbar rubrik som expanderar med filteralternativ
 * 
 * Properties:
 * - title: Rubriken som visas överst
 * - options: Lista med { label, value }-objekt som visas som knappar
 * - value: Det aktuellt valda värdet
 * - onChange: Funktion som anropas när användaren väljer ett nytt alternativ
 */
import { useState } from 'react';

export function FilterSection({ title, options = [], value, onChange }) {
  // Hanterar ifall sektionen är öppen eller stängd hamburgarmeny
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-section">
      {/* Klickbar rubrik som öppnar och stänger hamburgarmenyn */}
      <h3 onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▾' : '▸'}
      </h3>

      {/* Visar filterknappar om menyn är öppen */}
      {isOpen && (
        <div className="filter-section-content">
          <div className="filter-option-group">
            {options.map((opt) => (
              <button
                key={opt.value}
                className={value === opt.value ? 'active' : ''}
                onClick={() => onChange(opt.value)}
                title={opt.label}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
