import { requestJson } from "./apiClient";

export const fetchAdvancedAnalyticsData = () =>
  requestJson("/api/analytics/advanced", {}, { metrics: [], trends: [] });
