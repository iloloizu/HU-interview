import { useParams, Link } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import { CourseCard } from '../components/CourseCard';

export default function TrackDetail() {
  const { id } = useParams<{ id: string }>();
  const { state, selectors } = useAppState();
  const track = state.tracks.find((t) => t.id === id);
  const { currentUser } = selectors;
  if (!track) return <div className="container mx-auto px-4 py-6">Track not found.</div>;

  const trackCourses = state.courses.filter((c) => track.courseIds.includes(c.id));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/tracks" className="text-pms-2965">← Back to Tracks</Link>
      </div>
      <h1 className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123 mb-4">{track.title}</h1>
      <p className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80 mb-6">{track.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {trackCourses.map((c) => (
          <CourseCard key={c.id} course={c} isCompleted={currentUser.completedCourseIds.includes(c.id)} />
        ))}
      </div>
    </div>
  );
}
