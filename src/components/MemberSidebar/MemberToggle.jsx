import { Users } from 'lucide-react';

export function MemberToggle({ onClick, isOpen, hasActive }) {
  return (
    <button
      onClick={onClick}
      className={`member-toggle ${hasActive ? 'active' : ''}`}
      title="Öppna/stäng teammedlemmar"
    >
      <Users className="member-toggle-icon" />
      Visa medlemmar{hasActive ? ' *' : ''}
    </button>
  );
}