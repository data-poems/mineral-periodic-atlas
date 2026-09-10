export function publicUrl(path: string, base = import.meta.env.BASE_URL || "/"): string {
  return `${base}${path.replace(/^\//, "")}`;
}
