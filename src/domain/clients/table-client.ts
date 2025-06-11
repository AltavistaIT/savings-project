import { TablesIdGet200Response } from "@/api";

export interface TableClient {
  getTableById(id: string): Promise<TablesIdGet200Response>;
}
