// src/shared/services/bulkOperationsService.ts
import type { CRUDService } from './crudService';
import type {
  BusinessRulesService,
  ValidationContext,
  ValidationResult,
} from './businessRulesService';

export interface BulkOperation {
  type: 'create' | 'update' | 'delete' | 'upsert';
  data?: unknown[];
  ids?: string[];
  updates?: Array<{ id: string; data: unknown }>;
  keyField?: string;
}

export interface BulkOperationResult {
  success: boolean;
  total: number;
  successful: number;
  failed: number;
  errors: Array<{ id?: string; error: string }>;
  warnings: Array<{ id?: string; warning: string }>;
  autoFixes: Array<{ id?: string; field: string; originalValue: unknown; fixedValue: unknown }>;
  duration: number;
  summary: Record<string, unknown>;
}

export class BulkOperationsService {
  private crudService: CRUDService;
  private businessRulesService: BusinessRulesService;

  constructor(
    crudService: CRUDService,
    businessRulesService: BusinessRulesService
  ) {
    this.crudService = crudService;
    this.businessRulesService = businessRulesService;
  }

  async executeBulkOperation(
    operation: BulkOperation,
    context: ValidationContext
  ): Promise<BulkOperationResult> {
    const startTime = Date.now();
    const errors: Array<{ id?: string; error: string }> = [];
    const warnings: Array<{ id?: string; warning: string }> = [];
    const autoFixes: Array<{
      id?: string;
      field: string;
      originalValue: unknown;
      fixedValue: unknown;
    }> = [];

    let successful = 0;
    let failed = 0;
    let total = 0;

    try {
      switch (operation.type) {
        case 'create':
          if (operation.data) {
            total = operation.data.length;
            for (const item of operation.data) {
              const validation = await this.businessRulesService.validateData(
                item,
                context
              );
              if (validation.success) {
                const result = await this.crudService.create(item);
                if (result.success) {
                  successful++;
                } else {
                  failed++;
                  errors.push({ error: result.error || 'Create failed' });
                }
              } else {
                failed++;
                errors.push(...validation.errors.map((e) => ({ error: e.message })));
              }
              autoFixes.push(
                ...validation.autoFixes.map((f) => ({
                  field: f.field,
                  originalValue: f.originalValue,
                  fixedValue: f.fixedValue,
                }))
              );
            }
          }
          break;

        case 'update':
          if (operation.updates) {
            total = operation.updates.length;
            for (const update of operation.updates) {
              const result = await this.crudService.update(update.id, update.data);
              if (result.success) {
                successful++;
              } else {
                failed++;
                errors.push({ id: update.id, error: result.error || 'Update failed' });
              }
            }
          }
          break;

        case 'delete':
          if (operation.ids) {
            total = operation.ids.length;
            for (const id of operation.ids) {
              const result = await this.crudService.delete(id);
              if (result.success) {
                successful++;
              } else {
                failed++;
                errors.push({ id, error: result.error || 'Delete failed' });
              }
            }
          }
          break;

        case 'upsert':
          // Upsert logic would check if record exists, then create or update
          if (operation.data && operation.keyField) {
            total = operation.data.length;
            // Simplified - would need to check existence first
            for (const item of operation.data) {
              const record = item as Record<string, unknown>;
              const key = String(record[operation.keyField]);
              const existing = await this.crudService.read(key);
              if (existing.success && existing.data) {
                const result = await this.crudService.update(key, item);
                if (result.success) successful++;
                else {
                  failed++;
                  errors.push({ id: key, error: result.error || 'Upsert failed' });
                }
              } else {
                const result = await this.crudService.create(item);
                if (result.success) successful++;
                else {
                  failed++;
                  errors.push({ error: result.error || 'Upsert failed' });
                }
              }
            }
          }
          break;
      }
    } catch (error) {
      errors.push({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    const duration = Date.now() - startTime;

    return {
      success: failed === 0,
      total,
      successful,
      failed,
      errors,
      warnings,
      autoFixes,
      duration,
      summary: {
        operation: operation.type,
        total,
        successful,
        failed,
        duration,
      },
    };
  }
}

