import { requestJson } from "./apiClient";

export const fetchAIDashboardData = () =>
  requestJson("/api/ai/dashboard", {}, { items: [], summary: null });
