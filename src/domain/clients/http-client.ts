export interface HttpClient {
  request<Response>(
    url: string,
    method: string,
    data?: unknown
  ): Promise<Response>;
}
