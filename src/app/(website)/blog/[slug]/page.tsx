import { permanentRedirect } from "next/navigation";
import { getBlog } from "@/lib/blog-api";
import { notFound } from "next/navigation";
export default async function LegacyArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(await getBlog(slug))) notFound();
  permanentRedirect("/" + slug);
}
