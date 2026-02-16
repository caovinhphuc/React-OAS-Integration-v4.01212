/**
 * Google APIs Proxy Service
 * Centralized lazy-loaded wrapper for all Google APIs
 * Reduces bundle size by only loading googleapis when actually needed
 *
 * Benefits:
 * - Lazy loads googleapis (170KB library only on API calls)
 * - Centralized error handling
 * - Uniform API interface for all Google services
 * - Easy to add caching/rate limiting later
 */

let googleLibrary = null;
let googleAuth = null;
let googleSheetsClient = null;
let googleDriveClient = null;

// Lazy load the googleapis library only when first needed
async function initGoogle() {
  if (googleLibrary) return googleLibrary;

  try {
    googleLibrary = require("googleapis");
    console.log("📦 Google APIs library loaded");
    return googleLibrary;
  } catch (error) {
    console.error("❌ Failed to load googleapis library:", error.message);
    throw error;
  }
}

// Lazy load Google Auth
async function initGoogleAuth(keyFile) {
  if (googleAuth) return googleAuth;

  try {
    const { google } = await initGoogle();
    const GoogleAuth = google.auth.GoogleAuth;

    const serviceAccountEmail =
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
    const serviceAccountPrivateKey =
      process.env.GOOGLE_PRIVATE_KEY || process.env.REACT_APP_GOOGLE_PRIVATE_KEY;
    const serviceAccountProjectId =
      process.env.GOOGLE_PROJECT_ID || process.env.REACT_APP_GOOGLE_PROJECT_ID;

    const normalizedPrivateKey = serviceAccountPrivateKey
      ? serviceAccountPrivateKey.replace(/\\n/g, "\n")
      : null;

    const scopes = [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.readonly",
    ];

    if (keyFile) {
      googleAuth = new GoogleAuth({
        keyFile,
        scopes,
      });
    } else if (serviceAccountEmail && normalizedPrivateKey) {
      googleAuth = new GoogleAuth({
        credentials: {
          type: "service_account",
          client_email: serviceAccountEmail,
          private_key: normalizedPrivateKey,
          project_id: serviceAccountProjectId,
        },
        scopes,
      });
    } else {
      throw new Error("Google credentials not configured");
    }

    console.log("🔐 Google Auth initialized");
    return googleAuth;
  } catch (error) {
    console.error("❌ Google Auth initialization failed:", error.message);
    throw error;
  }
}

// Get Sheets client (lazy)
async function getSheetsClient(keyFile) {
  if (googleSheetsClient) return googleSheetsClient;

  try {
    const { google } = await initGoogle();
    const auth = await initGoogleAuth(keyFile);

    googleSheetsClient = google.sheets({ version: "v4", auth });
    console.log("📊 Google Sheets client initialized");
    return googleSheetsClient;
  } catch (error) {
    console.error("❌ Sheets client failed:", error.message);
    throw error;
  }
}

// Get Drive client (lazy)
async function getDriveClient(keyFile) {
  if (googleDriveClient) return googleDriveClient;

  try {
    const { google } = await initGoogle();
    const auth = await initGoogleAuth(keyFile);

    googleDriveClient = google.drive({ version: "v3", auth });
    console.log("🗂️ Google Drive client initialized");
    return googleDriveClient;
  } catch (error) {
    console.error("❌ Drive client failed:", error.message);
    throw error;
  }
}

// Sheets API wrapper
class GoogleSheetsProxy {
  constructor(keyFile) {
    this.keyFile = keyFile;
  }

  async readSheet(spreadsheetId, range) {
    try {
      const sheets = await getSheetsClient(this.keyFile);
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      return response.data;
    } catch (error) {
      console.error("❌ Sheets read failed:", error.message);
      throw new Error(`Failed to read sheet: ${error.message}`);
    }
  }

  async writeSheet(spreadsheetId, range, values) {
    try {
      const sheets = await getSheetsClient(this.keyFile);
      const response = await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values,
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Sheets write failed:", error.message);
      throw new Error(`Failed to write sheet: ${error.message}`);
    }
  }

  async appendSheet(spreadsheetId, range, values) {
    try {
      const sheets = await getSheetsClient(this.keyFile);
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values,
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Sheets append failed:", error.message);
      throw new Error(`Failed to append sheet: ${error.message}`);
    }
  }

  async getMetadata(spreadsheetId) {
    try {
      const sheets = await getSheetsClient(this.keyFile);
      const response = await sheets.spreadsheets.get({
        spreadsheetId,
      });
      return response.data;
    } catch (error) {
      console.error("❌ Sheets metadata failed:", error.message);
      throw new Error(`Failed to get metadata: ${error.message}`);
    }
  }

  async clearSheet(spreadsheetId, range) {
    try {
      const sheets = await getSheetsClient(this.keyFile);
      const response = await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range,
      });
      return response.data;
    } catch (error) {
      console.error("❌ Sheets clear failed:", error.message);
      throw new Error(`Failed to clear sheet: ${error.message}`);
    }
  }

  async batchGetValues(spreadsheetId, ranges) {
    try {
      const sheets = await getSheetsClient(this.keyFile);
      const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId,
        ranges,
      });
      return response.data;
    } catch (error) {
      console.error("❌ Sheets batch get failed:", error.message);
      throw new Error(`Failed to batch get: ${error.message}`);
    }
  }
}

// Drive API wrapper
class GoogleDriveProxy {
  constructor(keyFile) {
    this.keyFile = keyFile;
  }

  async listFiles(folderId = null) {
    try {
      const drive = await getDriveClient(this.keyFile);

      let query = "trashed=false";
      if (folderId) {
        query += ` and '${folderId}' in parents`;
      }

      const response = await drive.files.list({
        pageSize: 100,
        fields: "files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink)",
        q: query,
      });

      return response.data.files || [];
    } catch (error) {
      console.error("❌ Drive list failed:", error.message);
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  async getFileMetadata(fileId) {
    try {
      const drive = await getDriveClient(this.keyFile);
      const response = await drive.files.get({
        fileId,
        fields: "id, name, mimeType, size, createdTime, modifiedTime, webViewLink, owners, parents",
      });
      return response.data;
    } catch (error) {
      console.error("❌ Drive metadata failed:", error.message);
      throw new Error(`Failed to get metadata: ${error.message}`);
    }
  }

  async uploadFile(fileMetadata, fileData) {
    try {
      const drive = await getDriveClient(this.keyFile);
      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: fileMetadata.mimeType,
          body: fileData,
        },
        fields: "id, webViewLink",
      });
      return response.data;
    } catch (error) {
      console.error("❌ Drive upload failed:", error.message);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async deleteFile(fileId) {
    try {
      const drive = await getDriveClient(this.keyFile);
      await drive.files.delete({
        fileId,
      });
      return { success: true };
    } catch (error) {
      console.error("❌ Drive delete failed:", error.message);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async shareFile(fileId, email, role = "reader") {
    try {
      const drive = await getDriveClient(this.keyFile);
      const response = await drive.permissions.create({
        fileId,
        requestBody: {
          role,
          type: "user",
          emailAddress: email,
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Drive share failed:", error.message);
      throw new Error(`Failed to share file: ${error.message}`);
    }
  }

  async renameFile(fileId, newName) {
    try {
      const drive = await getDriveClient(this.keyFile);
      const response = await drive.files.update({
        fileId,
        requestBody: {
          name: newName,
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Drive rename failed:", error.message);
      throw new Error(`Failed to rename file: ${error.message}`);
    }
  }

  async createFolder(folderName, parentFolderId = null) {
    try {
      const drive = await getDriveClient(this.keyFile);

      const fileMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
      };

      if (parentFolderId) {
        fileMetadata.parents = [parentFolderId];
      }

      const response = await drive.files.create({
        requestBody: fileMetadata,
        fields: "id, webViewLink",
      });

      return response.data;
    } catch (error) {
      console.error("❌ Drive create folder failed:", error.message);
      throw new Error(`Failed to create folder: ${error.message}`);
    }
  }
}

module.exports = {
  GoogleSheetsProxy,
  GoogleDriveProxy,
  initGoogle,
};
