export function normalizeImagePath(input: string): string {
  let path = input.trim();
  if (!path) return path;

  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      // Keep original path on parse failure.
    }
  }

  path = path.split("?")[0]?.split("#")[0] ?? path;
  path = path.replace(/^\/?public\//, "/");

  const uploadsIndex = path.indexOf("/uploads/");
  if (uploadsIndex !== -1) {
    path = path.slice(uploadsIndex);
  } else if (path.startsWith("uploads/")) {
    path = `/${path}`;
  }

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  return encodeURI(path);
}
