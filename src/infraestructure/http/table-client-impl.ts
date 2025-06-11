import { HttpClient } from "@/domain/clients/http-client";
import { TableClient } from "@/domain/clients/table-client";
import { TablesIdGet200Response } from "@/api";

export class TableClientImpl implements TableClient {
  constructor(private readonly httpClient: HttpClient) {
    this.getTableById = this.getTableById.bind(this);
  }

  async getTableById(id: string): Promise<TablesIdGet200Response> {
    return await this.httpClient.request(`/tables/${id}`, "GET");
  }
}
