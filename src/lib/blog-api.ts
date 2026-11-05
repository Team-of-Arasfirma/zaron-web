import "server-only";
import { cache } from "react";
import type { RichNode } from "@/components/sections/blog/rich-content";
export type PublicBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  content: RichNode;
  authorName: string;
  publishedAt: string;
  seo: { title?: string; description?: string };
};
type RawBlog = Omit<PublicBlog, "id" | "coverImage" | "coverAlt"> & {
  _id: string;
  coverImage: { url: string; alt: string } | null;
};
function normalize(blog: RawBlog): PublicBlog {
  return {
    ...blog,
    id: blog._id,
    coverImage: blog.coverImage?.url ?? "/blog/blog-hero-illustration.png",
    coverAlt: blog.coverImage?.alt ?? blog.title,
  };
}
async function request(path: string) {
  const base = process.env.BLOG_API_URL;
  if (!base) throw new Error("Blog service is not configured");
  const response = await fetch(base.replace(/\/$/, "") + path, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Blog service is unavailable");
  return response.json();
}
export const getBlog = cache(
  async (slug: string): Promise<PublicBlog | null> => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
    const result = await request("/blogs/" + encodeURIComponent(slug));
    return result ? normalize(result.blog) : null;
  },
);
export async function getBlogPage(
  page = 1,
): Promise<{
  items: PublicBlog[];
  page: number;
  pages: number;
  total: number;
}> {
  const result = await request("/blogs?page=" + page + "&limit=12");
  return { ...result, items: result.items.map(normalize) };
}
