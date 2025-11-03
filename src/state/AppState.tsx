import { createContext, useContext, useMemo, useReducer } from 'react';
import { badgeDefinitions, courses as initialCourses, users as initialUsers, tracks as initialTracks } from '../data/mockData';
import type { BadgeLevel, Course, Track, User } from '../types';

interface State {
  currentUserId: string;
  users: User[];
  courses: Course[];
  tracks: Track[];
}

type Action =
  | { type: 'SET_CURRENT_USER'; userId: string }
  | { type: 'TOGGLE_COMPLETE_COURSE'; userId: string; courseId: string };

const AppStateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  selectors: ReturnType<typeof createSelectors>;
} | null>(null);

const initialState: State = {
  currentUserId: 'u1',
  users: initialUsers,
  courses: initialCourses,
  tracks: initialTracks,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUserId: action.userId };
    case 'TOGGLE_COMPLETE_COURSE': {
      const users = state.users.map((u) => {
        if (u.id !== action.userId) return u;
        const completed = new Set(u.completedCourseIds);
        let completions = Array.isArray(u.completions) ? [...u.completions] : [];
        if (completed.has(action.courseId)) {
          completed.delete(action.courseId);
          completions = completions.filter((c) => c.courseId !== action.courseId);
        } else {
          completed.add(action.courseId);
          completions.push({ courseId: action.courseId, completedAt: new Date().toISOString() });
        }
        return { ...u, completedCourseIds: Array.from(completed), completions };
      });
      return { ...state, users };
    }
    default:
      return state;
  }
}

function createSelectors(state: State) {
  const currentUser = state.users.find((u) => u.id === state.currentUserId)!;
  const completedCount = currentUser.completedCourseIds.length;
  const totalCourses = state.courses.length;
  const progressFraction = totalCourses > 0 ? completedCount / totalCourses : 0;

  const earnedBadges: BadgeLevel[] = badgeDefinitions
    .filter((b) => completedCount >= b.threshold)
    .map((b) => b.level);

  const upcomingCourses = state.courses.filter(
    (c) => !currentUser.completedCourseIds.includes(c.id)
  );

  const earnedTrackTitles = state.tracks
    .filter((t) => t.courseIds.every((cid) => currentUser.completedCourseIds.includes(cid)))
    .map((t) => t.title);

  // Recent activity: last 5 completions from other users
  const others = state.users.filter((u) => u.id !== state.currentUserId);
  const recentActivity = others.map((u) => ({
    user: u,
    latest: (u.completions || []).slice().sort((a, b) => b.completedAt.localeCompare(a.completedAt))[0],
  })).filter((x) => !!x.latest);

  return {
    currentUser,
    completedCount,
    totalCourses,
    progressFraction,
    earnedBadges,
    upcomingCourses,
    earnedTrackTitles,
    recentActivity,
  };
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const selectors = useMemo(() => createSelectors(state), [state]);
  return (
    <AppStateContext.Provider value={{ state, dispatch, selectors }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
