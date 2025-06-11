import { HttpClient } from "@/domain/clients/http-client";

export class HttpClientImpl implements HttpClient {
  constructor(private token?: string) {}

  async request<Request = unknown, Response = unknown>(
    url: string,
    method: string,
    data?: Request
  ): Promise<Response> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      };

      const options: RequestInit = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      };

      console.log("Request:", { url, method, headers, body: options.body });

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(errorResponse);
      }

      const responseData: Response = await response.json();
      console.log("Response data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Network or processing error:", (error as Error).message);
      throw new Error((error as Error).message);
    }
  }
}
