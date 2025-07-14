import { GetConfigResponse } from "@/api";

interface LSObjectsMap {
  config: GetConfigResponse;
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

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn("Error parsing local storage value", error);
      return null;
    }
  }
}
