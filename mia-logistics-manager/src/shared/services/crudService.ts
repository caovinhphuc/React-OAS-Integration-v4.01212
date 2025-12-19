// src/shared/services/crudService.ts
export interface CRUDConfig {
  baseUrl: string;
  resource: string;
  idField?: string;
  defaultLimit?: number;
  defaultPage?: number;
}

export interface CRUDQuery {
  page?: number;
  limit?: number;
  sort?: Array<{ field: string; direction: "asc" | "desc" }>;
  filters?: Array<{ field: string; operator: string; value: unknown }>;
  search?: string;
}

export interface CRUDResult {
  success: boolean;
  data?: unknown;
  error?: string;
  message?: string;
}

export interface CRUDListResult {
  success: boolean;
  data: unknown[];
  total: number;
  page: number;
  limit: number;
  error?: string;
}

export class CRUDService {
  private config: CRUDConfig;

  constructor(config: CRUDConfig) {
    this.config = {
      idField: "id",
      defaultLimit: 20,
      defaultPage: 1,
      ...config,
    };
  }

  async create(data: unknown): Promise<CRUDResult> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/${this.config.resource}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return { success: response.ok, data: result, error: result.error };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async read(id: string): Promise<CRUDResult> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/${this.config.resource}/${id}`
      );
      const result = await response.json();
      return { success: response.ok, data: result, error: result.error };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async update(id: string, data: Partial<unknown>): Promise<CRUDResult> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/${this.config.resource}/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return { success: response.ok, data: result, error: result.error };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async delete(id: string): Promise<CRUDResult> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/${this.config.resource}/${id}`,
        { method: "DELETE" }
      );
      return { success: response.ok };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async list(query?: CRUDQuery): Promise<CRUDListResult> {
    try {
      const params = new URLSearchParams();
      params.append("page", String(query?.page ?? this.config.defaultPage));
      params.append("limit", String(query?.limit ?? this.config.defaultLimit));
      if (query?.search) params.append("search", query.search);
      if (query?.sort) {
        params.append("sort", JSON.stringify(query.sort));
      }
      if (query?.filters) {
        params.append("filters", JSON.stringify(query.filters));
      }

      const response = await fetch(
        `${this.config.baseUrl}/${this.config.resource}?${params}`
      );
      const result = await response.json();
      return {
        success: response.ok,
        data: result.data || [],
        total: result.total || 0,
        page: query?.page ?? this.config.defaultPage ?? 1,
        limit: query?.limit ?? this.config.defaultLimit ?? 20,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        total: 0,
        page: query?.page ?? this.config.defaultPage ?? 1,
        limit: query?.limit ?? this.config.defaultLimit ?? 20,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
