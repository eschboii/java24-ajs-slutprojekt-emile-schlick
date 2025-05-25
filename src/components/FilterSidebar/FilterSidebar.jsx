/**
 * Denna komponent används för att filtrera uppgifter och innehåller tre sektioner:
 *  - Status (ny, pågående, färdig)
 *  - Kategori (UX, Frontend, Backend)
 *  - Sortering (titel, nyast, äldst)
 *
 * Properties:
 * - onApply: funktion som skickar valda filter till app.jsx
 * - onReset: funktion som nollställer filter i app.jsx
 * - isOpen: styr om sidopanelen ska visas eller inte
 * - filterProp, sortProp, categoryProp, memberProp: aktuella värden som properties
 */

import { useState, useEffect } from 'react';
import { FilterSection } from './FilterSection';

export function FilterSidebar({
  onApply,
  onReset,
  isOpen,
  filter: filterProp,
  sort: sortProp,
  category: categoryProp,
  member: memberProp
}) {
  // Lokala state för varje filter
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState('all');
  const [member, setMember] = useState('all');

  // När properties ändras från app.jsx, synkas ett lokalt state
  useEffect(() => {
    setFilter(filterProp);
    setSort(sortProp);
    setCategory(categoryProp);
    setMember(memberProp);
  }, [filterProp, sortProp, categoryProp, memberProp]);

  // Ser till att panelen inte renederas om den är stängd
  if (!isOpen) return null;

  return (
    <aside className="filter-sidebar">
      <h2>Filter</h2>

      {/* Filtrerar uppgifter */}
      <FilterSection
        title="Status"
        options={[
          { label: 'Alla', value: 'all' },
          { label: 'Nya', value: 'new' },
          { label: 'Pågående', value: 'in-progress' },
          { label: 'Färdiga', value: 'finished' },
        ]}
        value={filter}
        onChange={setFilter}
      />

      {/* Filtrering baserat på kategori */}
      <FilterSection
        title="Kategori"
        options={[
          { label: 'Alla', value: 'all' },
          { label: 'UX', value: 'ux' },
          { label: 'Frontend', value: 'frontend' },
          { label: 'Backend', value: 'backend' },
        ]}
        value={category}
        onChange={setCategory}
      />

      {/* Sorteringsalternativ */}
      <FilterSection
        title="Sortera efter"
        options={[
          { label: 'Standard', value: 'default' },
          { label: 'Titel A–Ö 🔽', value: 'title-des' },
          { label: 'Titel Ö–A 🔼', value: 'title-asc' },
          { label: 'Nyast först', value: 'newest' },
          { label: 'Äldst först', value: 'oldest' },
        ]}
        value={sort}
        onChange={setSort}
      />

      <div className="filter-buttons">
        {/* Skickar valda filter till app.jsx */}
        <button onClick={() => onApply({ filter, sort, category, member })}>
          Tillämpa filter
        </button>

        {/* Återställer lokalt och anropar reset i App.jsx */}
        <button
          onClick={() => {
            setFilter("all");
            setSort("default");
            setCategory("all");
            setMember("all");
            onReset();
          }}
        >
          Återställ
        </button>
      </div>
    </aside>
  );
}
