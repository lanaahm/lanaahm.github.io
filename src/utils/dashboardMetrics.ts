import type { ContentOverview, SummaryCardItem } from '../types/domain';

export interface MetricsInput {
  portfolio?: unknown[];
  experience?: unknown[];
  certification?: unknown[];
  employeeHistory?: unknown[];
}

const safeLength = (items?: unknown[]): number => (Array.isArray(items) ? items.length : 0);

const toPercent = (count: number, total: number): number => {
  if (total <= 0) return 0;
  return Math.round((count / total) * 100);
};

/**
 * Builds summary card metrics from real portfolio collections.
 */
export const buildDashboardSummary = ({
  portfolio = [],
  experience = [],
  certification = [],
  employeeHistory = []
}: MetricsInput = {}): SummaryCardItem[] => {
  const counts = {
    portfolio: safeLength(portfolio),
    experience: safeLength(experience),
    certification: safeLength(certification),
    employeeHistory: safeLength(employeeHistory)
  };
  const total =
    counts.portfolio + counts.experience + counts.certification + counts.employeeHistory;

  return [
    {
      title: 'Portfolio',
      subtitle: 'Published projects',
      value: String(counts.portfolio),
      percent: toPercent(counts.portfolio, total)
    },
    {
      title: 'Skills',
      subtitle: 'Tracked experience items',
      value: String(counts.experience),
      percent: toPercent(counts.experience, total)
    },
    {
      title: 'Certifications',
      subtitle: 'Earned credentials',
      value: String(counts.certification),
      percent: toPercent(counts.certification, total)
    },
    {
      title: 'Work History',
      subtitle: 'Employment records',
      value: String(counts.employeeHistory),
      percent: toPercent(counts.employeeHistory, total)
    }
  ];
};

/**
 * Builds chart summary data for the overview highlight box.
 */
export const buildContentOverview = ({
  portfolio = [],
  experience = [],
  certification = [],
  employeeHistory = []
}: MetricsInput = {}): ContentOverview => {
  const values = [
    safeLength(portfolio),
    safeLength(experience),
    safeLength(certification),
    safeLength(employeeHistory)
  ];
  const total = values.reduce((sum, count) => sum + count, 0);

  return {
    title: 'Total Records',
    value: String(total),
    chartData: {
      labels: ['Portfolio', 'Skills', 'Certs', 'History'],
      data: values
    }
  };
};
