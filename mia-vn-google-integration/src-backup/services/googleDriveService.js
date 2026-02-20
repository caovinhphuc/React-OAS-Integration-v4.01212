import { requestJson } from "./apiClient";

export const fetchGoogleDriveData = () =>
  requestJson("/api/google/drive", {}, { files: [], folders: [] });
