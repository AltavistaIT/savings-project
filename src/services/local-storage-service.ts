export class LocalStorageService {
  static setItem(key: string, value: any) {
    if (!value) return;
    const parsedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, parsedValue);
  }

  static getItem(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}
