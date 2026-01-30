const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

export function normalizeImagePath(input: string): string {
  let path = input.trim();
  if (!path) return path;

  if (/^https?:\/\//i.test(path)) {
    // If it's already an absolute URL, keep it as-is.
    return encodeURI(path);
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

  // If it's a local uploads path, serve it from the API domain.
  if (path.startsWith("/uploads/") && API_BASE) {
    return encodeURI(`${API_BASE}${path}`);
  }

  return encodeURI(path);
}
