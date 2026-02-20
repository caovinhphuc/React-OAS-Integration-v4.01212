import { requestJson } from "./apiClient";

export const fetchTelegramIntegrationData = () =>
  requestJson("/api/telegram/integration", {}, { chats: [], botStatus: "unknown" });
