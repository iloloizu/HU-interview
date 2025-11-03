import { useAppState } from '../state/AppState';
import { CourseCard } from '../components/CourseCard';

export default function Catalog() {
  const { state, selectors } = useAppState();
  const { currentUser } = selectors;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123">Course Catalog</h1>
        <div className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">Click a course to mark as complete.</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {state.courses.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            isCompleted={currentUser.completedCourseIds.includes(c.id)}
          />
        ))}
      </div>
    </div>
  );
}
