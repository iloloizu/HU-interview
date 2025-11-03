import { useParams, Link } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faList, faClock, faGraduationCap, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { state, selectors, dispatch } = useAppState();
  const course = state.courses.find((c) => c.id === id);
  const { currentUser } = selectors;
  if (!course) return <div className="container mx-auto px-4 py-6">Course not found.</div>;

  const isCompleted = currentUser.completedCourseIds.includes(course.id);
  const onToggle = () => {
    dispatch({ type: 'TOGGLE_COMPLETE_COURSE', userId: state.currentUserId, courseId: course.id });
  };

  const gallery = [
    course.thumbnail,
    `https://picsum.photos/seed/${course.id}-1/640/360`,
    `https://picsum.photos/seed/${course.id}-2/640/360`,
  ];

  const courseraUrl = `https://www.coursera.org/search?query=${encodeURIComponent(course.title)}`;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/catalog" className="text-pms-2965">← Back to Catalog</Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <img src={course.thumbnail} alt={course.title} className="w-full rounded-md border border-pms-2165/30" />
          <div className="grid grid-cols-3 gap-3 mt-3">
            {gallery.map((src, idx) => (
              <img key={idx} src={src} alt="thumb" className="w-full rounded border border-pms-2165/30" />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-pms-2965 data-[theme=dark]:text-pms-123">{course.title}</h1>
          <p className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80 mt-1">{course.description}</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faGraduationCap} /> Level: {course.level}</div>
            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} /> Duration: {course.durationMinutes} min</div>
            <div className="flex items-start gap-2"><FontAwesomeIcon icon={faList} className="mt-1" />
              <div>Skills: {(course.skills || []).join(', ')}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <a href={courseraUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-pms-2965 text-pms-2965 hover:bg-pms-2965/10">
              <FontAwesomeIcon icon={faExternalLinkAlt} /> Launch on Coursera
            </a>
            <button onClick={onToggle} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border ${isCompleted ? 'bg-pms-2965 text-pms-000c border-pms-2965' : 'border-pms-2965 text-pms-2965 hover:bg-pms-2965/10'}`}>
              <FontAwesomeIcon icon={faCheck} /> {isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
