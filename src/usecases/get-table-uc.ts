import { ErrorResponse } from "@/api";
import { TableClient } from "@/domain/clients/table-client";

export class GetTableUsecase {
  constructor(private readonly tableClient: TableClient) {
    this.handler = this.handler.bind(this);
  }
  async handler(id: string) {
    try {
      const { data } = await this.tableClient.getTableById(id);
      console.log("response", data);
      return data;
    } catch (error) {
      const errMessage: ErrorResponse = JSON.parse((error as Error).message);
      console.log(errMessage.message);
    }
  }
}
