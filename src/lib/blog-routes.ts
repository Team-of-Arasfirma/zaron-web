import { blogs } from "../data/blogs";

const reservedSlugs = new Set([
  "about", "products", "projects", "blog", "careers", "contact",
]);

export function getArticleSlugs() {
  return blogs
    .filter((blog) => blog.status === "published")
    .map((blog) => {
      if (reservedSlugs.has(blog.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(blog.slug)) {
        throw new Error(`Invalid or reserved blog article slug: ${blog.slug}`);
      }
      return blog.slug;
    });
}

export function isArticlePath(pathname: string) {
  return getArticleSlugs().some((slug) => pathname === `/${slug}`);
}
