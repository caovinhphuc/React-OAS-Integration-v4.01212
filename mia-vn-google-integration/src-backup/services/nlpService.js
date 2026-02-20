import { requestJson } from "./apiClient";

export const fetchNLPDashboardData = () =>
  requestJson("/api/nlp/dashboard", {}, { models: [], insights: [] });
