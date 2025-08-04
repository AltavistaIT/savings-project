import { LocalStorageService } from "@/services/local-storage-service";

export function getTxType(categoryId: number) {
  const config = LocalStorageService.getItem("config");
  if (!config || !config.transaction_types) {
    return;
  }
  return config.transaction_types.find(
    (category) => category.id === categoryId
  );
}
