import { badgeDefinitions } from '../data/mockData';
import { useAppState } from '../state/AppState';
import { BadgeCard } from '../components/BadgeCard';
import { getBadgeLabel } from '../utils/badges';

export default function Badges() {
  const { selectors } = useAppState();
  const { currentUser, completedCount, earnedBadges, earnedTrackTitles } = selectors;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123 mb-4">Badges & Gamification</h1>
      <p className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80 mb-6">Complete more courses to unlock higher-level badges and complete tracks to earn Master Badges.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {badgeDefinitions.map((b) => (
          <div key={b.level} className="flex flex-col gap-2">
            <BadgeCard level={b.level} label={getBadgeLabel(b.level, currentUser.department)} />
            <div className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">Requires {b.threshold} completed courses</div>
            {earnedBadges.includes(b.level) ? (
              <div className="text-sm font-medium text-pms-576">Unlocked ✔</div>
            ) : (
              <div className="text-sm text-pms-425">{Math.max(b.threshold - completedCount, 0)} more to unlock</div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-3 text-pms-2965 data-[theme=dark]:text-pms-123">Master Badges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {earnedTrackTitles.length === 0 && (
          <div className="text-sm text-pms-425">No Master Badges yet. Explore <a className="underline text-pms-2965" href="/tracks">tracks</a>.</div>
        )}
        {earnedTrackTitles.map((t) => (
          <div key={t} className="border border-pms-576 rounded-md px-4 py-3 bg-pms-576/10 text-pms-576">Master Badge: {t}</div>
        ))}
      </div>
    </div>
  );
}
