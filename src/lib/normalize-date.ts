export function normalizeDate(date?: string | Date) {
  if (!date) return undefined;
  const d = typeof date === "string" ? new Date(date) : new Date(date);
  d.setHours(0, 0, 0, 0); // elimina componente de tiempo
  return d;
}
