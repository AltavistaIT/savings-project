import { SuccessResponse } from "@/api";
import { HttpClientImpl } from "./http-client-impl";

export class InternalApiClientImpl extends HttpClientImpl {
  private url: string = "http://localhost:8081/api";

  constructor() {
    const token = localStorage.getItem("token") || "";
    super(token);
  }

  async request<Request = unknown, Response = SuccessResponse>(
    path: string,
    method: string,
    data?: Request
  ): Promise<Response> {
    return await super.request<Request, Response>(
      `${this.url}${path}`,
      method,
      data
    );
  }
}
