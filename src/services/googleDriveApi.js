/* eslint-disable */
/**
 * Google Drive API Service - Frontend
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

class GoogleDriveApiService {
  /**
   * List files in folder
   */
  async listFiles(folderId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/drive/list`, {
        folderId,
      });

      if (response.data.success) {
        return {
          files: response.data.files || [],
        };
      } else {
        throw new Error(response.data.error || "Failed to list files");
      }
    } catch (error) {
      console.error("❌ listFiles error:", error.message);
      throw error;
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(fileId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/google/drive/metadata/${fileId}`);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to get file metadata");
      }
    } catch (error) {
      console.error("❌ getFileMetadata error:", error.message);
      throw error;
    }
  }

  /**
   * Delete a file
   */
  async deleteFile(fileId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/drive/delete/${fileId}`);

      if (response.data.success) {
        return { success: true };
      } else {
        throw new Error(response.data.error || "Failed to delete file");
      }
    } catch (error) {
      console.error("❌ deleteFile error:", error.message);
      throw error;
    }
  }

  /**
   * Share a file
   */
  async shareFile(fileId, email, role = "reader") {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/drive/share`, {
        fileId,
        email,
        role,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to share file");
      }
    } catch (error) {
      console.error("❌ shareFile error:", error.message);
      throw error;
    }
  }

  /**
   * Rename a file
   */
  async renameFile(fileId, newName) {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/drive/rename`, {
        fileId,
        newName,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to rename file");
      }
    } catch (error) {
      console.error("❌ renameFile error:", error.message);
      throw error;
    }
  }

  /**
   * Create a folder
   */
  async createFolder(folderName, parentFolderId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/google/drive/create-folder`, {
        folderName,
        parentFolderId,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to create folder");
      }
    } catch (error) {
      console.error("❌ createFolder error:", error.message);
      throw error;
    }
  }
}

// Export singleton instance
export const googleDriveApiService = new GoogleDriveApiService();
export default googleDriveApiService;
export default googleDriveApiService;
