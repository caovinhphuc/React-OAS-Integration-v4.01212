import { requestJson } from "./apiClient";

export const fetchGoogleSheetsData = () =>
  requestJson("/api/google/sheets", {}, { sheets: [], rows: [] });
