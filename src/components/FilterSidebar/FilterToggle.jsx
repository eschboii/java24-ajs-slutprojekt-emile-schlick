/**
 * En filterknapp som visa i övre vänstra hörnet och används för att öppna/stänga filterpanelen
 *
 * Properties:
 * - onClick: funktion som växlar visning när knappen klickas 
 * - isOpen: används inte här direkt men kan användas vid behov
 * - hasActive: boolean, avgör om filtret har aktiva val visar * om sant
 */

// Importerar ikonbiblioteket lucide-react
import { SlidersHorizontal } from 'lucide-react';

export function FilterToggle({ onClick, isOpen, hasActive }) {
  return (
    <button
      onClick={onClick}
      className={`filter-toggle ${hasActive ? 'active' : ''}`}
      title="Öppna/stäng filterpanel"
    >
      {/* Ikon från lucide-react */}
      <SlidersHorizontal className="filter-toggle-icon" />

      {/* Text som visar aktiv status med * om något filter är valt */}
      Filter{hasActive ? ' *' : ''}
    </button>
  );
}
