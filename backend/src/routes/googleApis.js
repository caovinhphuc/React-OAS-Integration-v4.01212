/**
 * Google APIs Router - Proxy Endpoints
 * All Google API calls go through these endpoints
 * Separates backend logic from frontend - frontend never needs googleapis library
 */

const express = require("express");
const path = require("path");
const fs = require("fs");
const { GoogleSheetsProxy, GoogleDriveProxy } = require("../services/googleApisProxy");

const router = express.Router();

// Find credentials file
function getCredentialsFile() {
  const possiblePaths = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
    process.env.GOOGLE_CREDENTIALS_PATH,
    path.join(__dirname, "../../../mia-logistics-469406-eec521c603c0.json"),
    path.join(__dirname, "../../../config/service_account.json"),
    path.join(__dirname, "../../../automation/config/service_account.json"),
    path.join(__dirname, "../../../automation/automation_new/config/service_account.json"),
  ];

  for (const filePath of possiblePaths) {
    if (filePath && fs.existsSync(filePath)) {
      console.log("✅ Found credentials at:", filePath);
      return filePath;
    }
  }

  console.warn("⚠️ No Google credentials file found");
  return null;
}

const credentialsFile = getCredentialsFile();

// ==================== GOOGLE SHEETS ENDPOINTS ====================

// POST /api/google/sheets/read
router.post("/sheets/read", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { spreadsheetId, range } = req.body;
    if (!spreadsheetId || !range) {
      return res.status(400).json({ error: "Missing spreadsheetId or range" });
    }

    const sheetsProxy = new GoogleSheetsProxy(credentialsFile);
    const data = await sheetsProxy.readSheet(spreadsheetId, range);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Sheets read error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/google/sheets/write
router.post("/sheets/write", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { spreadsheetId, range, values } = req.body;
    if (!spreadsheetId || !range || !values) {
      return res.status(400).json({ error: "Missing spreadsheetId, range, or values" });
    }

    const sheetsProxy = new GoogleSheetsProxy(credentialsFile);
    const data = await sheetsProxy.writeSheet(spreadsheetId, range, values);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Sheets write error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/google/sheets/append
router.post("/sheets/append", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { spreadsheetId, range, values } = req.body;
    if (!spreadsheetId || !range || !values) {
      return res.status(400).json({ error: "Missing spreadsheetId, range, or values" });
    }

    const sheetsProxy = new GoogleSheetsProxy(credentialsFile);
    const data = await sheetsProxy.appendSheet(spreadsheetId, range, values);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Sheets append error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/google/sheets/clear
router.post("/sheets/clear", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { spreadsheetId, range } = req.body;
    if (!spreadsheetId || !range) {
      return res.status(400).json({ error: "Missing spreadsheetId or range" });
    }

    const sheetsProxy = new GoogleSheetsProxy(credentialsFile);
    const data = await sheetsProxy.clearSheet(spreadsheetId, range);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Sheets clear error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/google/sheets/metadata/:spreadsheetId
router.get("/sheets/metadata/:spreadsheetId", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { spreadsheetId } = req.params;
    if (!spreadsheetId) {
      return res.status(400).json({ error: "Missing spreadsheetId" });
    }

    const sheetsProxy = new GoogleSheetsProxy(credentialsFile);
    const metadata = await sheetsProxy.getMetadata(spreadsheetId);

    res.json({
      success: true,
      data: metadata,
    });
  } catch (error) {
    console.error("❌ Sheets metadata error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/google/sheets/batch-get
router.post("/sheets/batch-get", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { spreadsheetId, ranges } = req.body;
    if (!spreadsheetId || !ranges) {
      return res.status(400).json({ error: "Missing spreadsheetId or ranges" });
    }

    const sheetsProxy = new GoogleSheetsProxy(credentialsFile);
    const data = await sheetsProxy.batchGetValues(spreadsheetId, ranges);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Sheets batch-get error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ==================== GOOGLE DRIVE ENDPOINTS ====================

// POST /api/google/drive/list
router.post("/drive/list", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { folderId } = req.body;

    const driveProxy = new GoogleDriveProxy(credentialsFile);
    const files = await driveProxy.listFiles(folderId);

    res.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error("❌ Drive list error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/google/drive/metadata/:fileId
router.get("/drive/metadata/:fileId", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { fileId } = req.params;
    if (!fileId) {
      return res.status(400).json({ error: "Missing fileId" });
    }

    const driveProxy = new GoogleDriveProxy(credentialsFile);
    const metadata = await driveProxy.getFileMetadata(fileId);

    res.json({
      success: true,
      data: metadata,
    });
  } catch (error) {
    console.error("❌ Drive metadata error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/google/drive/delete/:fileId
router.post("/drive/delete/:fileId", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { fileId } = req.params;
    if (!fileId) {
      return res.status(400).json({ error: "Missing fileId" });
    }

    const driveProxy = new GoogleDriveProxy(credentialsFile);
    const result = await driveProxy.deleteFile(fileId);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("❌ Drive delete error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/google/drive/share
router.post("/drive/share", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { fileId, email, role = "reader" } = req.body;
    if (!fileId || !email) {
      return res.status(400).json({ error: "Missing fileId or email" });
    }

    const driveProxy = new GoogleDriveProxy(credentialsFile);
    const result = await driveProxy.shareFile(fileId, email, role);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("❌ Drive share error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/google/drive/rename
router.post("/drive/rename", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { fileId, newName } = req.body;
    if (!fileId || !newName) {
      return res.status(400).json({ error: "Missing fileId or newName" });
    }

    const driveProxy = new GoogleDriveProxy(credentialsFile);
    const result = await driveProxy.renameFile(fileId, newName);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("❌ Drive rename error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/google/drive/create-folder
router.post("/drive/create-folder", async (req, res) => {
  try {
    if (!credentialsFile) {
      return res.status(503).json({ error: "Google credentials not configured" });
    }

    const { folderName, parentFolderId } = req.body;
    if (!folderName) {
      return res.status(400).json({ error: "Missing folderName" });
    }

    const driveProxy = new GoogleDriveProxy(credentialsFile);
    const result = await driveProxy.createFolder(folderName, parentFolderId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("❌ Drive create folder error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Google APIs proxy is running",
    credentialsConfigured: !!credentialsFile,
  });
});

module.exports = router;
