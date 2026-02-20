import { requestJson } from "./apiClient";

export const fetchDashboardData = () =>
  requestJson("/api/dashboard", {}, { stats: {}, charts: [] });

export const fetchLiveDashboardData = () =>
  requestJson("/api/dashboard/live", {}, { stats: {}, events: [] });
