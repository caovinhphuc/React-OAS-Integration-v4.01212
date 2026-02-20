import { requestJson } from "./apiClient";

export const fetchGoogleAppsScriptData = () =>
  requestJson("/api/google/apps-script", {}, { scripts: [], lastRun: null });
