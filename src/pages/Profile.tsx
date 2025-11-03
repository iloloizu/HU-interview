import { useAppState } from '../state/AppState';
import { BadgeCard } from '../components/BadgeCard';
import { getBadgeLabel } from '../utils/badges';

export default function Profile() {
  const { selectors } = useAppState();
  const { currentUser, earnedBadges, earnedTrackTitles, recentActivity } = selectors;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123 mb-2">{currentUser.name}</h1>
      <div className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80 mb-6">Department: {currentUser.department}</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-3 text-pms-2965 data-[theme=dark]:text-pms-123">Your Badges</h2>
          <div className="flex flex-col gap-3">
            {earnedBadges.map((b) => (
              <BadgeCard key={b} level={b} label={getBadgeLabel(b, currentUser.department)} />
            ))}
            {earnedTrackTitles.map((t) => (
              <div key={t} className="border border-pms-576 rounded-md px-4 py-3 bg-pms-576/10 text-pms-576">Master Badge: {t}</div>
            ))}
            {earnedBadges.length === 0 && earnedTrackTitles.length === 0 && (
              <div className="text-sm text-pms-425">No badges yet. Start a track or complete courses to earn badges.</div>
            )}
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-3 text-pms-2965 data-[theme=dark]:text-pms-123">Company Activity</h2>
          <div className="flex flex-col gap-3">
            {recentActivity.slice(0, 8).map(({ user, latest }) => (
              <div key={user.id} className="border border-pms-2165/30 rounded-md p-3 bg-white data-[theme=dark]:bg-black/20 data-[theme=dark]:border-pms-425/40">
                <div className="text-sm font-medium text-pms-2965 data-[theme=dark]:text-pms-123">{user.name}</div>
                <div className="text-xs text-pms-425 data-[theme=dark]:text-pms-000c/80">Completed {(latest as any).courseId} on {(latest as any).completedAt.substring(0, 10)}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
