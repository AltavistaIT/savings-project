import { HTTPMethod } from "@/api";

export class InternalAPIClient {
  private url = "http://localhost:8081/api";

  constructor(public token?: string) {}

  async request<Response = unknown>(
    path: string,
    method: HTTPMethod,
    data?: any,
    options?: NextFetchRequestConfig & {
      headers?: Record<string, string>;
    }
  ): Promise<Response> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };

    const url = `${this.url}${path}`;
    const requestOptions: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(errorResponse);
      }

      const responseData: Response = await response.json();
      return responseData;
    } catch (error) {
      const err = JSON.parse((error as Error).message);
      return err;
    }
  }
}
