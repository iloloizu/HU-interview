import { useAppState } from '../state/AppState';
import { ProgressBar } from '../components/ProgressBar';
import { BadgeCard } from '../components/BadgeCard';
import { DashboardWidget } from '../components/DashboardWidget';
import { computeRoi } from '../utils/roi';
import { CourseCard } from '../components/CourseCard';
import { getBadgeLabel } from '../utils/badges';

export default function Dashboard() {
  const { selectors } = useAppState();
  const { currentUser, completedCount, totalCourses, progressFraction, earnedBadges, upcomingCourses, earnedTrackTitles } = selectors;
  const roi = computeRoi(progressFraction, earnedBadges.length);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123">Welcome, {currentUser.name}</h1>
          <p className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">Department: {currentUser.department}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">Progress</div>
          <div className="flex items-center gap-3 w-64">
            <ProgressBar value={progressFraction * 100} />
            <div className="text-sm font-medium text-pms-2965 data-[theme=dark]:text-pms-123">{completedCount}/{totalCourses}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <DashboardWidget title="Training Efficiency" value={`${roi.trainingEfficiencyPct}%`} />
        <DashboardWidget title="Productivity Gains" value={`${roi.productivityGainPct}%`} />
        <DashboardWidget title="Engagement via Badges" value={`+${roi.engagementBoostPct}%`} accent="accent" />
        <DashboardWidget title="Retention Improvement" value={`${roi.retentionImprovementPct}%`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-3 text-pms-2965 data-[theme=dark]:text-pms-123">Upcoming Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingCourses.slice(0, 6).map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                isCompleted={currentUser.completedCourseIds.includes(c.id)}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-3 text-pms-2965 data-[theme=dark]:text-pms-123">Badges Earned</h2>
          <div className="flex flex-col gap-3">
            {earnedBadges.length === 0 && earnedTrackTitles.length === 0 && (
              <div className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">No badges yet. Complete courses or tracks to earn badges!</div>
            )}
            {earnedBadges.map((b) => (
              <BadgeCard key={b} level={b} label={getBadgeLabel(b, currentUser.department)} />
            ))}
            {earnedTrackTitles.map((t) => (
              <div key={t} className="border border-pms-576 rounded-md px-4 py-3 bg-pms-576/10 text-pms-576">Master Badge: {t}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
