import type { Course } from '../types';
import { useAppState } from '../state/AppState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function CourseCard({ course, isCompleted }: { course: Course; isCompleted: boolean }) {
  const { state, dispatch } = useAppState();
  const onToggle = () => {
    dispatch({ type: 'TOGGLE_COMPLETE_COURSE', userId: state.currentUserId, courseId: course.id });
  };

  // Map tracks to tertiary colors
  const trackStyles = {
    Technical: 'bg-pms-2995/15 text-pms-2995 border-pms-2995',
    Business: 'bg-pms-158/15 text-pms-158 border-pms-158',
    'Soft Skills': 'bg-pms-576/15 text-pms-576 border-pms-576',
  } as const;
  const tagClass = trackStyles[course.track];

  return (
    <div className="border border-pms-2165/30 rounded-md overflow-hidden bg-white shadow-sm flex flex-col data-[theme=dark]:bg-black/20 data-[theme=dark]:border-pms-425/40">
      <Link to={`/courses/${course.id}`} className="h-28 bg-pms-2165/15 flex items-center justify-center text-4xl data-[theme=dark]:bg-pms-425/20">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <FontAwesomeIcon icon={faGraduationCap} className="text-pms-2965 data-[theme=dark]:text-pms-123" />
        )}
      </Link>
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Link to={`/courses/${course.id}`} className="font-semibold text-lg text-pms-2965 data-[theme=dark]:text-pms-000c">{course.title}</Link>
          <span className={`text-xs px-2 py-1 rounded border ${tagClass}`}>{course.track}</span>
        </div>
        <p className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">{course.description}</p>
        <button
          onClick={onToggle}
          className={`mt-auto inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border transition-colors ${
            isCompleted
              ? 'bg-pms-2965 text-pms-000c border-pms-2965 data-[theme=dark]:bg-pms-186 data-[theme=dark]:border-pms-186 data-[theme=dark]:text-pms-000c'
              : 'bg-pms-000c text-pms-2965 border-pms-2965 hover:bg-pms-2965/10 data-[theme=dark]:bg-transparent data-[theme=dark]:text-pms-123 data-[theme=dark]:border-pms-123 data-[theme=dark]:hover:bg-pms-123/10'
          }`}
        >
          {isCompleted ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
    </div>
  );
}
