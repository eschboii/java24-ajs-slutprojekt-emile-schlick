import { useState, useEffect } from 'react';
import { onValue } from 'firebase/database';
import { membersRef } from '../../firebase/config';
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
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState('all');
  const [member, setMember] = useState('all');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setFilter(filterProp);
    setSort(sortProp);
    setCategory(categoryProp);
    setMember(memberProp);
  }, [filterProp, sortProp, categoryProp, memberProp]);

  useEffect(() => {
    onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setMembers([]);
      const list = Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
      setMembers(list);
    });
  }, []);

  if (!isOpen) return null;

  return (
    <aside className="filter-sidebar">
      <h2>Filter</h2>

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
        <button onClick={() => onApply({ filter, sort, category, member })}>
          Tillämpa filter
        </button>
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
