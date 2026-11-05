import type { Metadata } from "next";
import { BlogHero } from "@/components/sections/blog/blog-hero";
import { BlogArticles } from "@/components/sections/blog/blog-articles";
import { demoArticles } from "@/data/demo-blogs";

export const metadata: Metadata = {
  title: "Blog | Zaron Industries",
  description: "Explore roofing insights, product knowledge and industry updates from Zaron Industries.",
  alternates: { canonical: "https://www.zaron.in/blog" },
};
export default function BlogPage() {
  return <main><BlogHero /><BlogArticles articles={demoArticles} /></main>;
}
