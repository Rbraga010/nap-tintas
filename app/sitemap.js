import { SITE_URL } from "./lib/constants";

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/bio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/institucional`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/colorindo-com-a-nap`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/centro-treinamento`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pedidos`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];
}
