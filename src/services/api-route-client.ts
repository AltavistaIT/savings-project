import {
  AuthLoginPost200Response,
  ConfigGet200Response,
  CreateTableDto,
  CreateTransactionDto,
  LoginDto,
  TablesGet200Response,
  TablesPost200Response,
  TransactionsIdDelete200Response,
  TransactionsPost200Response,
  UpdateTransactionDto,
} from "@/types/internal-api/models";
import { DeepRequired } from "@/types/deep-required";
import { HTTP_METHOD } from "next/dist/server/web/http";

interface ApiRoutesMap {
  login: {
    body: LoginDto;
    pathVariables: null;
    queryParams: null;
    response: AuthLoginPost200Response;
  };
  getConfig: {
    body: null;
    pathVariables: null;
    queryParams: null;
    response: ConfigGet200Response;
  };
  getTableByParams: {
    body: null;
    pathVariables: null;
    queryParams: {
      user_id: string;
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
    method: HTTP_METHOD;
  }
> = {
  login: {
    path: "/auth/login",
    method: "POST",
  },
  getConfig: {
    path: "/config",
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
  private baseUrl = "http://localhost:8081/api";

  constructor(private token?: string) {}

  async fetch<K extends keyof ApiRoutesMap>(
    service: K,
    params: {
      pathVariables?: ApiRoutesMap[K]["pathVariables"];
      queryParams?: ApiRoutesMap[K]["queryParams"];
      body?: ApiRoutesMap[K]["body"];
      options?: RequestInit & {
        next: NextFetchRequestConfig;
      };
    }
  ): Promise<DeepRequired<ApiRoutesMap[K]["response"]> | undefined> {
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

    const headers = new Headers({
      "Content-Type": "application/json",
      ...(params.options?.headers ?? {}),
    });

    if (this.token) {
      headers.set("Authorization", `Bearer ${this.token}`);
    }

    try {
      const response = await fetch(url, {
        method: route.method,
        headers,
        body: params.body ? JSON.stringify(params.body) : undefined,
        ...params.options,
      });

      return await response.json();
    } catch (error) {
      console.error("error", error);
      return;
    }
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
