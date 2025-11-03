import type { BadgeLevel } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

const levelToStyles: Record<BadgeLevel, { bg: string; text: string; border: string }> = {
  Bronze: { bg: 'bg-pms-425/15', text: 'text-pms-425', border: 'border-pms-425' },
  Silver: { bg: 'bg-pms-2165/20', text: 'text-pms-2165', border: 'border-pms-2165' },
  Gold: { bg: 'bg-pms-1245/20', text: 'text-pms-1245', border: 'border-pms-1245' },
};

export function BadgeCard({ level, label }: { level: BadgeLevel; label?: string }) {
  const styles = levelToStyles[level];
  const text = label ?? `${level} Badge`;
  return (
    <div className={`border ${styles.border} ${styles.bg} ${styles.text} rounded-md px-4 py-3 flex items-center gap-3`}>
      <FontAwesomeIcon icon={faMedal} className="text-xl" />
      <div className="font-semibold">{text}</div>
    </div>
  );
}
