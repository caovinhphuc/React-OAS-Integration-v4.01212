const normalizeApiBaseUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== "string") {
    return "";
  }

  const trimmed = rawUrl.trim().replace(/\/+$/, "");

  if (trimmed.endsWith("/api")) {
    return trimmed.slice(0, -4);
  }

  return trimmed;
};

const getApiBaseUrl = () => {
  const envApiUrl = process.env.REACT_APP_API_URL || process.env.VITE_API_URL;
  const envApiBaseUrl = process.env.REACT_APP_API_BASE_URL || process.env.VITE_API_BASE_URL;

  const configuredUrl = normalizeApiBaseUrl(envApiUrl || envApiBaseUrl);
  if (configuredUrl) {
    return configuredUrl;
  }

  if (process.env.NODE_ENV === "production") {
    return "https://react-google-backend.onrender.com";
  }

  return "http://localhost:3001";
};

export default getApiBaseUrl;
