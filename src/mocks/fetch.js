/**
 * Fetch Mock
 * Global fetch mock for API testing
 */

global.fetch = jest.fn((url, options = {}) => {
  // Default successful response
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: async () => ({}),
    text: async () => "",
    blob: async () => new Blob(),
    headers: new Headers(),
    url: url,
  });
});

// Helper to set mock response
export const mockFetchResponse = (response) => {
  global.fetch.mockResolvedValueOnce({
    ok: response.ok !== undefined ? response.ok : true,
    status: response.status || 200,
    statusText: response.statusText || "OK",
    json: async () => response.data || {},
    text: async () => response.text || "",
    headers: new Headers(response.headers || {}),
    url: response.url || "",
  });
};

// Helper to set mock error
export const mockFetchError = (error) => {
  global.fetch.mockRejectedValueOnce(error);
};

export default global.fetch;
