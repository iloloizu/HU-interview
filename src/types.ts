export type SkillTrack = 'Technical' | 'Business' | 'Soft Skills';

export interface Course {
  id: string;
  title: string;
  description: string;
  track: SkillTrack;
  thumbnail?: string;
  durationMinutes?: number;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  skills?: string[];
}

export interface Completion {
  courseId: string;
  completedAt: string; // ISO date
}

export interface User {
  id: string;
  name: string;
  department: 'Engineering' | 'Sales' | 'HR';
  completedCourseIds: string[];
  completions?: Completion[];
}

export type BadgeLevel = 'Bronze' | 'Silver' | 'Gold';

export interface BadgeDefinition {
  level: BadgeLevel;
  threshold: number; // number of completed courses required
}

export interface Track {
  id: string;
  title: string;
  description: string;
  courseIds: string[];
}

export interface RoiMetrics {
  trainingEfficiencyPct: number; // 10–25
  productivityGainPct: number;   // 5–15
  engagementBoostPct: number;    // +10 (driven by badges)
  retentionImprovementPct: number; // 2
}
