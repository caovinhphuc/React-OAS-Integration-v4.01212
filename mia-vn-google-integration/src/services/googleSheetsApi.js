/**
 * Google Sheets API Service - Frontend
 * Calls backend proxy instead of direct Google APIs
 *
 * Benefits:
 * - Frontend never needs googleapis library (saves 170KB)
 * - All API calls go through backend proxy
 * - Consistent error handling
 * - Easy to add caching/rate limiting
 */

import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.VITE_API_BASE_URL ||
  "http://localhost:3001/api";

class GoogleSheetsApiService {
  /**
   * Read data from sheet
   */
  async readSheet(range = "A1:Z1000", spreadsheetId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/sheets/read`, {
        spreadsheetId,
        range,
      });

      if (response.data.success) {
        return {
          data: response.data.data.values || [],
          range: response.data.data.range,
          majorDimension: response.data.data.majorDimension || "ROWS",
        };
      } else {
        throw new Error(response.data.error || "Failed to read sheet");
      }
    } catch (error) {
      console.error("❌ readSheet error:", error.message);
      throw error;
    }
  }

  /**
   * Write data to sheet
   */
  async writeSheet(range, values, spreadsheetId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/sheets/write`, {
        spreadsheetId,
        range,
        values,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to write sheet");
      }
    } catch (error) {
      console.error("❌ writeSheet error:", error.message);
      throw error;
    }
  }

  /**
   * Append data to sheet
   */
  async appendToSheet(range, values, spreadsheetId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/sheets/append`, {
        spreadsheetId,
        range,
        values,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to append to sheet");
      }
    } catch (error) {
      console.error("❌ appendToSheet error:", error.message);
      throw error;
    }
  }

  /**
   * Get sheet metadata
   */
  async getSheetMetadata(spreadsheetId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/google/sheets/metadata/${spreadsheetId}`);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to get metadata");
      }
    } catch (error) {
      console.error("❌ getSheetMetadata error:", error.message);
      throw error;
    }
  }

  /**
   * Clear sheet data
   */
  async clearSheet(range, spreadsheetId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/sheets/clear`, {
        spreadsheetId,
        range,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to clear sheet");
      }
    } catch (error) {
      console.error("❌ clearSheet error:", error.message);
      throw error;
    }
  }

  /**
   * Batch get multiple ranges
   */
  async batchGetValues(spreadsheetId, ranges) {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/sheets/batch-get`, {
        spreadsheetId,
        ranges,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to batch get");
      }
    } catch (error) {
      console.error("❌ batchGetValues error:", error.message);
      throw error;
    }
  }
}

// Export singleton instance
export const googleSheetsApiService = new GoogleSheetsApiService();
export default googleSheetsApiService;
