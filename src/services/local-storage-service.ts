import { ConfigAggregate } from "@/api";

interface LSObjectsMap {
  config: ConfigAggregate;
}

export class LocalStorageService {
  static setItem<K extends keyof LSObjectsMap>(key: K, value: LSObjectsMap[K]) {
    if (!value) return;
    const parsedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, parsedValue);
  }

  static getItem<K extends keyof LSObjectsMap>(key: K): LSObjectsMap[K] | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}
