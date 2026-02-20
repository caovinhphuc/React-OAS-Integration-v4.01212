import { requestJson } from "./apiClient";

export const authenticateUser = async (email, password) => {
  const result = await requestJson(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    null
  );

  const token = result?.token || result?.authToken;
  const sessionId = result?.sessionId;

  if (!token) {
    throw new Error("Authentication failed");
  }

  localStorage.setItem("authToken", token);
  if (sessionId) {
    localStorage.setItem("sessionId", sessionId);
  }

  return result;
};
