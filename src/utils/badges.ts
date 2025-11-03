import type { BadgeLevel, User } from '../types';

export function getBadgeLabel(level: BadgeLevel, department: User['department']): string {
  const domain = {
    Engineering: 'UI Development',
    Sales: 'Sales',
    HR: 'People Operations',
  }[department];

  const suffix = {
    Bronze: 'Practitioner',
    Silver: 'Advanced Practitioner',
    Gold: 'Expert Practitioner',
  }[level];

  return `${domain} ${suffix}`;
}
