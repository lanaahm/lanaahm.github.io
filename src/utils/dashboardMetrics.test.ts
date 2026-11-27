import { buildContentOverview, buildDashboardSummary } from './dashboardMetrics';

describe('dashboardMetrics', () => {
  test('buildDashboardSummary computes counts and percentages from collections', () => {
    const summary = buildDashboardSummary({
      portfolio: [{ id: '1' }, { id: '2' }],
      experience: [{ id: '1' }],
      certification: [{ id: '1' }],
      employeeHistory: []
    });

    expect(summary).toHaveLength(4);
    expect(summary[0]).toMatchObject({ title: 'Portfolio', value: '2', percent: 50 });
    expect(summary[3]).toMatchObject({ title: 'Work History', value: '0', percent: 0 });
  });

  test('buildDashboardSummary handles empty state without NaN', () => {
    const summary = buildDashboardSummary();
    summary.forEach((item) => {
      expect(item.value).toBe('0');
      expect(item.percent).toBe(0);
    });
  });

  test('buildContentOverview aggregates total records and chart counts', () => {
    const overview = buildContentOverview({
      portfolio: [{ id: '1' }],
      experience: [{ id: '1' }, { id: '2' }],
      certification: [],
      employeeHistory: [{ id: '1' }]
    });

    expect(overview.value).toBe('4');
    expect(overview.chartData.data).toEqual([1, 2, 0, 1]);
  });
});
