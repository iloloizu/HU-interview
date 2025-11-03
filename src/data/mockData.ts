import type { BadgeDefinition, Course, Track, User } from '../types';

const thumb = (seed: string) => `https://picsum.photos/seed/${seed}/640/360`;

export const courses: Course[] = [
  { id: 'c1', title: 'React Fundamentals', description: 'Components, hooks, and state.', track: 'Technical', thumbnail: thumb('c1'), durationMinutes: 120, level: 'Beginner', skills: ['JSX', 'Hooks', 'State'] },
  { id: 'c2', title: 'TypeScript Basics', description: 'Types for safer code.', track: 'Technical', thumbnail: thumb('c2'), durationMinutes: 90, level: 'Beginner', skills: ['Types', 'Interfaces', 'Generics'] },
  { id: 'c3', title: 'Data-Driven Decision Making', description: 'Leverage analytics in business.', track: 'Business', thumbnail: thumb('c3'), durationMinutes: 75, level: 'Intermediate', skills: ['KPIs', 'Dashboards'] },
  { id: 'c4', title: 'Effective Communication', description: 'Clear writing and speaking.', track: 'Soft Skills', thumbnail: thumb('c4'), durationMinutes: 60, level: 'Beginner', skills: ['Writing', 'Presenting'] },
  { id: 'c5', title: 'Agile Project Management', description: 'Scrum and Kanban essentials.', track: 'Business', thumbnail: thumb('c5'), durationMinutes: 80, level: 'Intermediate', skills: ['Scrum', 'Kanban'] },
  { id: 'c6', title: 'Problem Solving Workshop', description: 'Frameworks and practice.', track: 'Soft Skills', thumbnail: thumb('c6'), durationMinutes: 70, level: 'Intermediate', skills: ['Root Cause', 'Ideation'] },
  { id: 'c7', title: 'API Design Principles', description: 'REST, versioning, and DX.', track: 'Technical', thumbnail: thumb('c7'), durationMinutes: 100, level: 'Advanced', skills: ['REST', 'Versioning'] },
  { id: 'c8', title: 'Sales Discovery 101', description: 'Qualify and uncover needs.', track: 'Business', thumbnail: thumb('c8'), durationMinutes: 65, level: 'Beginner', skills: ['Discovery', 'Questioning'] },
  { id: 'c9', title: 'Leadership for New Managers', description: 'Coaching and feedback.', track: 'Soft Skills', thumbnail: thumb('c9'), durationMinutes: 85, level: 'Intermediate', skills: ['Coaching', 'Feedback'] },
];

export const badgeDefinitions: BadgeDefinition[] = [
  { level: 'Bronze', threshold: 2 },
  { level: 'Silver', threshold: 4 },
  { level: 'Gold', threshold: 6 },
];

export const tracks: Track[] = [
  { id: 't1', title: 'Frontend Foundations', description: 'Build modern web UIs.', courseIds: ['c1', 'c2', 'c7'] },
  { id: 't2', title: 'Business Essentials', description: 'Analytics and agile ops.', courseIds: ['c3', 'c5', 'c8'] },
  { id: 't3', title: 'Leadership Launch', description: 'Grow people skills.', courseIds: ['c4', 'c6', 'c9'] },
];

// Helper to create recent ISO dates
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

export const users: User[] = [
  { id: 'u1', name: 'Jaevin Reed', department: 'Sales', completedCourseIds: ['c1'], completions: [{ courseId: 'c1', completedAt: daysAgo(5) }] },
  { id: 'u2', name: 'Liam Chen', department: 'Engineering', completedCourseIds: ['c1', 'c2'], completions: [{ courseId: 'c1', completedAt: daysAgo(14) }, { courseId: 'c2', completedAt: daysAgo(10) }] },
  { id: 'u3', name: 'Noah Patel', department: 'Engineering', completedCourseIds: [], completions: [] },
  { id: 'u4', name: 'Mia Rodriguez', department: 'Sales', completedCourseIds: ['c8'], completions: [{ courseId: 'c8', completedAt: daysAgo(2) }] },
  { id: 'u5', name: 'Ethan Davis', department: 'Sales', completedCourseIds: ['c3', 'c5'], completions: [{ courseId: 'c3', completedAt: daysAgo(9) }, { courseId: 'c5', completedAt: daysAgo(7) }] },
  { id: 'u6', name: 'Sophia Nguyen', department: 'HR', completedCourseIds: ['c4'], completions: [{ courseId: 'c4', completedAt: daysAgo(20) }] },
  { id: 'u7', name: 'Oliver Smith', department: 'HR', completedCourseIds: [], completions: [] },
  { id: 'u8', name: 'Emma Wilson', department: 'Engineering', completedCourseIds: ['c7'], completions: [{ courseId: 'c7', completedAt: daysAgo(3) }] },
  { id: 'u9', name: 'James Brown', department: 'Sales', completedCourseIds: ['c5', 'c8'], completions: [{ courseId: 'c5', completedAt: daysAgo(12) }, { courseId: 'c8', completedAt: daysAgo(1) }] },
  { id: 'u10', name: 'Isabella Garcia', department: 'Engineering', completedCourseIds: ['c1', 'c2', 'c7'], completions: [{ courseId: 'c1', completedAt: daysAgo(30) }, { courseId: 'c2', completedAt: daysAgo(22) }, { courseId: 'c7', completedAt: daysAgo(15) }] },
];
