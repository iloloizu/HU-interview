import { Link } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import { ProgressBar } from '../components/ProgressBar';

export default function Tracks() {
  const { state, selectors } = useAppState();
  const { currentUser } = selectors;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123 mb-4">Learning Tracks</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {state.tracks.map((t) => {
          const total = t.courseIds.length;
          const completed = t.courseIds.filter((id) => currentUser.completedCourseIds.includes(id)).length;
          const done = completed === total && total > 0;
          return (
            <div key={t.id} className="border border-pms-2165/30 rounded-md p-4 bg-white shadow-sm data-[theme=dark]:bg-black/20 data-[theme=dark]:border-pms-425/40">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-pms-2965 data-[theme=dark]:text-pms-123">{t.title}</h3>
                {done && <span className="text-xs px-2 py-1 rounded bg-pms-576/15 text-pms-576 border border-pms-576">Master Badge</span>}
              </div>
              <p className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80 mt-1">{t.description}</p>
              <div className="mt-3"><ProgressBar value={(completed / total) * 100} /></div>
              <div className="text-xs text-pms-425 data-[theme=dark]:text-pms-000c/80 mt-1">{completed}/{total} completed</div>
              <Link to={`/tracks/${t.id}`} className="inline-block mt-3 text-sm text-pms-2965 underline">View Track</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
