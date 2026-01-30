import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: "https://greenapp.wowportfolio.work", lastModified: now },
    { url: "https://greenapp.wowportfolio.work/catalogue", lastModified: now },
    { url: "https://greenapp.wowportfolio.work/contact", lastModified: now },
    { url: "https://greenapp.wowportfolio.work/a-propos", lastModified: now },
    { url: "https://greenapp.wowportfolio.work/cgv", lastModified: now },
    { url: "https://greenapp.wowportfolio.work/mentions-legales", lastModified: now },
  ];
}
