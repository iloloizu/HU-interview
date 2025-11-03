import { useMemo } from 'react';
import { badgeDefinitions, courses } from '../data/mockData';
import { useAppState } from '../state/AppState';

export default function Admin() {
  const { state } = useAppState();

  const { byDept, badgeCounts, trackCompletion } = useMemo(() => {
    const departments = ['Engineering', 'Sales', 'HR'] as const;
    const byDept = departments.map((dept) => {
      const deptUsers = state.users.filter((u) => u.department === dept);
      const total = deptUsers.length || 1;
      const completed = deptUsers.reduce((sum, u) => sum + u.completedCourseIds.length, 0);
      const totalPossible = total * state.courses.length || 1;
      const completionRate = Math.round((completed / totalPossible) * 100);
      return { dept, users: deptUsers.length, completionRate };
    });

    const badgeCounts = { Bronze: 0, Silver: 0, Gold: 0 } as Record<string, number>;
    for (const u of state.users) {
      const count = u.completedCourseIds.length;
      for (const b of badgeDefinitions) {
        if (count >= b.threshold) badgeCounts[b.level]++;
      }
    }

    const trackCompletion = courses.reduce<Record<string, { completed: number; total: number }>>((acc, c) => {
      if (!acc[c.track]) acc[c.track] = { completed: 0, total: state.users.length };
      for (const u of state.users) {
        if (u.completedCourseIds.includes(c.id)) acc[c.track].completed++;
      }
      return acc;
    }, {});

    return { byDept, badgeCounts, trackCompletion };
  }, [state]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123 mb-6">Admin – Aggregated Analytics</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-pms-2965 data-[theme=dark]:text-pms-123">Department Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {byDept.map((row) => (
            <div key={row.dept} className="border border-pms-2165/30 rounded-md p-4 bg-white shadow-sm data-[theme=dark]:bg-black/20 data-[theme=dark]:border-pms-425/40">
              <div className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">{row.dept}</div>
              <div className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123">{row.completionRate}%</div>
              <div className="text-xs text-pms-425 data-[theme=dark]:text-pms-000c/80">{row.users} users</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-pms-2965 data-[theme=dark]:text-pms-123">Badges Awarded</h2>
        <div className="grid grid-cols-3 gap-4">
          {(['Bronze', 'Silver', 'Gold'] as const).map((lvl) => (
            <div key={lvl} className="border border-pms-2165/30 rounded-md p-4 bg-white shadow-sm data-[theme=dark]:bg-black/20 data-[theme=dark]:border-pms-425/40">
              <div className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">{lvl}</div>
              <div className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123">{badgeCounts[lvl]}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-pms-2965 data-[theme=dark]:text-pms-123">Completion by Skill Track</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(trackCompletion).map(([track, stats]) => {
            const pct = Math.round((stats.completed / (stats.total * Math.max(1, state.courses.filter(c => c.track === track).length))) * 100);
            return (
              <div key={track} className="border border-pms-2165/30 rounded-md p-4 bg-white shadow-sm data-[theme=dark]:bg-black/20 data-[theme=dark]:border-pms-425/40">
                <div className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">{track}</div>
                <div className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123">{pct}%</div>
                <div className="text-xs text-pms-425 data-[theme=dark]:text-pms-000c/80">{stats.completed} completions across {stats.total} users</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
