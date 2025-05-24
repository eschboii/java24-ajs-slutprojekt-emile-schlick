import { useState } from 'react';

export function FilterSection({ title, options = [], value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-section">
      <h3 onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▾' : '▸'}
      </h3>
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
