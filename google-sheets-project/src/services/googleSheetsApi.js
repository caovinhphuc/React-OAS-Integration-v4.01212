class GoogleSheetsApiService {
  async getSheetMetadata(sheetId) {
    // GET /api/sheets/metadata/:sheetId?
  }

  async readSheet(range, sheetId) {
    // GET /api/sheets/read?range=...&sheetId=...
  }

  async addSheet(sheetName, sheetId) {
    // POST /api/sheets/add-sheet
  }

  async writeSheet(data, range, sheetId) {
    // POST /api/sheets/write
  }
}
