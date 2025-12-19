// src/shared/services/businessRulesService.ts
import type { CRUDService } from "./crudService";

export interface ValidationContext {
  operation: "create" | "update" | "delete";
  existingData?: unknown;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
}

export interface AutoFix {
  field: string;
  originalValue: unknown;
  fixedValue: unknown;
  reason: string;
}

export interface ValidationResult {
  success: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  autoFixes: AutoFix[];
}

export class BusinessRulesService {
  private crudService: CRUDService;

  constructor(crudService: CRUDService) {
    this.crudService = crudService;
  }

  async validateData(
    data: unknown,
    context: ValidationContext
  ): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const autoFixes: AutoFix[] = [];

    // Basic validation - can be extended with custom rules
    if (!data || typeof data !== "object") {
      errors.push({
        field: "root",
        message: "Data must be an object",
        code: "INVALID_TYPE",
      });
      return { success: false, errors, warnings, autoFixes };
    }

    const record = data as Record<string, unknown>;

    // Example: Required field validation
    if (context.operation === "create") {
      if (!record.id) {
        errors.push({
          field: "id",
          message: "ID is required",
          code: "REQUIRED_FIELD",
        });
      }
    }

    // Example: Auto-fix trimming strings
    Object.keys(record).forEach((key) => {
      const value = record[key];
      if (typeof value === "string" && value !== value.trim()) {
        autoFixes.push({
          field: key,
          originalValue: value,
          fixedValue: value.trim(),
          reason: "Whitespace trimmed",
        });
        record[key] = value.trim();
      }
    });

    return {
      success: errors.length === 0,
      errors,
      warnings,
      autoFixes,
    };
  }
}
