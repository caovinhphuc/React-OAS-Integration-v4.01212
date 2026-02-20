import { requestJson } from "./apiClient";

export const fetchAutomationDashboardData = () =>
  requestJson("/api/automation/dashboard", {}, { jobs: [], status: "idle" });
