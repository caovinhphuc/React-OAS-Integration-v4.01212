// src/shared/services/exportService.ts
import type { CRUDService } from "./crudService";

export interface ExportConfig {
  format: "excel" | "pdf" | "csv";
  fields?: string[];
  filename?: string;
  includeHeaders?: boolean;
}

export interface ExportResult {
  success: boolean;
  url?: string;
  blob?: Blob;
  filename?: string;
  error?: string;
}

export class ExportService {
  private crudService: CRUDService;

  constructor(crudService: CRUDService) {
    this.crudService = crudService;
  }

  async exportToExcel(config: ExportConfig): Promise<ExportResult> {
    try {
      const result = await this.crudService.list({ limit: 10000 });
      if (!result.success) {
        return { success: false, error: "Failed to fetch data" };
      }

      // Simple CSV conversion (can be enhanced with proper Excel library)
      const csv = this.convertToCSV(result.data, config.fields);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      return {
        success: true,
        url,
        blob,
        filename: config.filename || "export.csv",
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async exportToPDF(config: ExportConfig): Promise<ExportResult> {
    // PDF export would require a PDF library like jsPDF or pdfkit
    return {
      success: false,
      error: "PDF export not yet implemented",
    };
  }

  async exportToCSV(config: ExportConfig): Promise<ExportResult> {
    try {
      const result = await this.crudService.list({ limit: 10000 });
      if (!result.success) {
        return { success: false, error: "Failed to fetch data" };
      }

      const csv = this.convertToCSV(result.data, config.fields);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      return {
        success: true,
        url,
        blob,
        filename: config.filename || "export.csv",
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private convertToCSV(data: unknown[], fields?: string[]): string {
    if (data.length === 0) return "";

    const headers = fields || Object.keys(data[0] as Record<string, unknown>);
    const rows = data.map((item) => {
      const record = item as Record<string, unknown>;
      return headers.map((field) => {
        const value = record[field];
        if (value === null || value === undefined) return "";
        return String(value).replace(/"/g, '""');
      });
    });

    const csvRows = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ];

    return csvRows.join("\n");
  }
}
