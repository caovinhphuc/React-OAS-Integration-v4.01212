import { requestJson } from "./apiClient";

export const fetchSmartAutomationData = () =>
  requestJson("/api/smart-automation/dashboard", {}, { agents: [], actions: [] });
