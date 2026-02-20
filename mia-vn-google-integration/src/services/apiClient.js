import getApiBaseUrl from "../utils/getApiBaseUrl";

const API_BASE_URL = getApiBaseUrl();

export const requestJson = async (path, options = {}, fallbackData = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return fallbackData;
    }

    return await response.json();
  } catch (error) {
    return fallbackData;
  }
};
