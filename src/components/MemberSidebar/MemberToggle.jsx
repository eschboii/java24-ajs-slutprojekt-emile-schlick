/**
 * Knapp som visas i övre högra hörnet för att öppna/stänga sidopanelen för medarbetare och fungerar som filtertoggle
 */

import { Users } from 'lucide-react';

export function MemberToggle({ onClick, isOpen, hasActive }) {
  return (
    <button
      onClick={onClick}
      className={`member-toggle ${hasActive ? 'active' : ''}`}
      title="Öppna/stäng teammedlemmar"
    >
      <Users className="member-toggle-icon" />

      {/* Text med eventuell asterisk vid aktivt filter */}
      Visa medlemmar{hasActive ? ' *' : ''}
    </button>
  );
}
