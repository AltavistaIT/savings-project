import {
  ConfigGet200Response,
  CreateTableDto,
  CreateTransactionDto,
  HTTPMethod,
  TablesGet200Response,
  TablesPost200Response,
  TransactionsIdDelete200Response,
  TransactionsPost200Response,
  UpdateTransactionDto,
} from "@/api";
import { TablesIdGet200Response } from "@/api/models/TablesIdGet200Response";
import { DeepRequired } from "@/domain/types/utils";

interface ApiRoutesMap {
  getConfig: {
    body: null;
    pathVariables: null;
    queryParams: null;
    response: ConfigGet200Response;
  };
  getTable: {
    body: null;
    pathVariables: { id: string };
    queryParams: null;
    response: TablesIdGet200Response;
  };
  getTableByParams: {
    body: null;
    pathVariables: null;
    queryParams: {
      user_id: number;
      type_id: number;
      month_year: string;
    };
    response: TablesGet200Response;
  };
  createTable: {
    body: CreateTableDto;
    pathVariables: null;
    queryParams: null;
    response: TablesPost200Response;
  };
  createTransaction: {
    body: CreateTransactionDto;
    pathVariables: null;
    queryParams: null;
    response: TransactionsPost200Response;
  };
  updateTransaction: {
    body: UpdateTransactionDto;
    pathVariables: { id: string };
    queryParams: null;
    response: TransactionsPost200Response;
  };
  deleteTransaction: {
    body: null;
    pathVariables: { id: string };
    queryParams: null;
    response: TransactionsIdDelete200Response;
  };
}

const apiRoutesMap: Record<
  keyof ApiRoutesMap,
  {
    path: string;
    method: HTTPMethod;
  }
> = {
  getConfig: {
    path: "/config",
    method: "GET",
  },
  getTable: {
    path: `/tables/:id`,
    method: "GET",
  },
  getTableByParams: {
    path: `/tables`,
    method: "GET",
  },
  createTable: {
    path: "/tables",
    method: "POST",
  },
  createTransaction: {
    path: "/transactions",
    method: "POST",
  },
  updateTransaction: {
    path: "/transactions/:id",
    method: "PATCH",
  },
  deleteTransaction: {
    path: "/transactions/:id",
    method: "DELETE",
  },
};

export class ApiRouteClient {
  private baseUrl = "http://localhost:3000/api";

  constructor() {}

  async fetch<K extends keyof ApiRoutesMap>(
    service: K,
    params: {
      pathVariables?: ApiRoutesMap[K]["pathVariables"];
      queryParams?: ApiRoutesMap[K]["queryParams"];
      body?: ApiRoutesMap[K]["body"];
      options?: NextFetchRequestConfig & {
        headers?: Record<string, string>;
      };
    }
  ): Promise<DeepRequired<ApiRoutesMap[K]["response"]>> {
    const route = apiRoutesMap[service];
    if (!route) {
      throw new Error(`Service ${service} is not defined`);
    }

    const rawPath = this.replacePathVariables(
      route.path,
      params.pathVariables ?? undefined
    );
    const queryString = this.buildQueryString(params.queryParams);
    const url = `${this.baseUrl}${rawPath}${queryString}`;
    console.log("url", url);

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

  private replacePathVariables(
    path: string,
    pathVariables?: Record<string, string>
  ): string {
    if (!pathVariables) return path;

    return path.replace(/:([a-zA-Z_]+)/g, (_, key) => {
      const value = pathVariables[key];
      if (!value) throw new Error(`Path variable "${key}" not provided`);
      return encodeURIComponent(value);
    });
  }

  private buildQueryString(
    queryParams?: ApiRoutesMap[keyof ApiRoutesMap]["queryParams"]
  ): string {
    if (!queryParams || Object.keys(queryParams).length === 0) {
      return "";
    }

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
