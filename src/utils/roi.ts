import type { RoiMetrics } from '../types';

// Clamp helper
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// progressFraction: 0..1, earnedBadges: 0..3
export function computeRoi(progressFraction: number, earnedBadges: number): RoiMetrics {
  const p = clamp(progressFraction, 0, 1);
  // Scale within provided ranges based on progress; bias slightly upward when badges increase
  const trainingEfficiencyPct = Math.round(10 + p * 15); // 10–25
  const productivityGainPct = Math.round(5 + p * 10);    // 5–15
  const engagementBoostPct = 10 + earnedBadges * 2;      // base +10, bonus per badge level
  const retentionImprovementPct = 2;                     // fixed 2
  return { trainingEfficiencyPct, productivityGainPct, engagementBoostPct, retentionImprovementPct };
}
