import {
  ConfigGet200Response,
  CreateTransactionModel,
  ErrorResponse,
  HTTPMethod,
  TablesIdGet200Response,
  TransactionsPost200Response,
} from "@/api";

interface ApiRoutesMap {
  getConfig: {
    requestPayload: null;
    response: ConfigGet200Response;
  };
  getTable: {
    requestPayload: null;
    response: TablesIdGet200Response;
  };
  createTransaction: {
    requestPayload: CreateTransactionModel;
    response: TransactionsPost200Response;
  };
}

const apiRoutesMap: Record<
  keyof ApiRoutesMap,
  {
    path: (id?: string | number, query?: Record<string, string>) => string;
    method: HTTPMethod;
  }
> = {
  getConfig: {
    path: () => "/config",
    method: "GET",
  },
  getTable: {
    path: (id) => `/tables/${id}`,
    method: "GET",
  },
  createTransaction: {
    path: () => "/transactions",
    method: "POST",
  },
};

export class ApiRouteClient {
  private baseUrl = "http://localhost:3000/api";

  constructor() {}

  async fetch<K extends keyof ApiRoutesMap>(
    service: K,
    params: {
      id?: string | number;
      queryParams?: Record<string, string>;
      body?: ApiRoutesMap[K]["requestPayload"];
      options?: NextFetchRequestConfig & {
        headers?: Record<string, string>;
      };
    }
  ): Promise<ApiRoutesMap[K]["response"] & ErrorResponse> {
    const route = apiRoutesMap[service];

    if (!route) {
      throw new Error(`Service ${service} is not defined`);
    }

    const path = route.path(params.id);
    const queryString = this.buildQueryString(params.queryParams);
    const url = `${this.baseUrl}${path}${queryString}`;

    const response = await fetch(url, {
      method: route.method,
      headers: {
        "Content-Type": "application/json",
        ...(params.options?.headers ?? {}),
      },
      body: params.body ? JSON.stringify(params.body) : undefined,
      ...params.options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  }

  private buildQueryString(queryParams?: Record<string, string>): string {
    if (!queryParams || Object.keys(queryParams).length === 0) return "";
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(queryParams).map(([key, value]) => [
          key,
          encodeURIComponent(value),
        ])
      )
    ).toString();
    return `?${query}`;
  }
}
