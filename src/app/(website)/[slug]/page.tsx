import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";

import { getBlog, getBlogPage } from "@/lib/blog-api";
import { RichContent } from "@/components/sections/blog/rich-content";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return {
    title: `${blog.seo.title || blog.title} | Zaron Industries`,
    description: blog.seo.description || blog.excerpt,
    alternates: {
      canonical: process.env.SITE_URL
        ? new URL("/" + blog.slug, process.env.SITE_URL).href
        : "/" + blog.slug,
    },
    openGraph: {
      title: blog.title,
      description: blog.seo.description || blog.excerpt,
      images: [blog.coverImage],
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = (await getBlogPage().catch(() => ({ items: [] }))).items
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* ARTICLE HEADER */}
      <section className="bg-[#F7F7F7] pt-[165px] pb-14 sm:pt-[185px] lg:pt-[200px] lg:pb-20">
        <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8 lg:px-10">
          {/* BACK LINK */}
          <Link
            href="/blog"
            className="
              inline-flex items-center gap-2
              text-[14px] font-semibold
              text-[#FF6500]
              transition-colors duration-300
              hover:text-[#D94F00]
            "
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          {/* DATE */}
          <div className="mt-10 flex items-center gap-2 text-[#FF6500]">
            <CalendarDays size={17} />

            <time
              dateTime={blog.publishedAt}
              className="text-[14px] font-medium"
            >
              {formatDate(blog.publishedAt)}
            </time>
          </div>

          {/* TITLE */}
          <h1
            className="
              mt-5 max-w-[1000px]
              text-[34px] font-extrabold
              leading-[1.12] tracking-[-0.035em]
              text-[#282828]
              sm:text-[46px]
              lg:text-[60px]
            "
          >
            {blog.title}
          </h1>

          <p className="mt-5 text-sm text-[#737373]">By {blog.authorName}</p>
          {/* EXCERPT */}
          <p
            className="
              mt-6 max-w-[850px]
              text-[17px] leading-[1.7]
              text-[#737373]
              sm:text-[20px]
            "
          >
            {blog.excerpt}
          </p>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      <section className="bg-white pt-10 sm:pt-14">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
          <div
            className="
              relative aspect-[16/9]
              w-full overflow-hidden
              rounded-[14px]
              bg-[#EAEAEA]
            "
          >
            <Image
              unoptimized
              src={blog.coverImage}
              alt={blog.coverAlt}
              fill
              quality={85}
              loading="eager"
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[820px] px-5 sm:px-8">
          {/* SECTION HEADING */}
          <div className="mb-10 flex items-center gap-4">
            <span className="h-[3px] w-[45px] bg-[#FF6500]" />

            <span className="text-[15px] font-medium text-[#282828]">
              Industry Insights
            </span>
          </div>

          {/* ARTICLE BODY */}
          <div className="space-y-7">
            <RichContent content={blog.content} />
          </div>

          {/* BACK BUTTON */}
          <div className="mt-12 border-t border-[#E7E7E7] pt-8">
            <Link
              href="/blog"
              className="
                inline-flex items-center gap-3
                rounded-[8px] bg-[#FF6500]
                px-6 py-3
                text-[14px] font-semibold
                text-white
                transition-colors duration-300
                hover:bg-[#D94F00]
              "
            >
              <ArrowLeft size={18} />
              Back to Articles
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {relatedBlogs.length > 0 && (
        <section className="bg-[#F4F4F4] py-16 lg:py-24">
          <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
            {/* HEADING */}
            <div className="mb-10 flex items-center gap-4">
              <span className="h-[3px] w-[52px] bg-[#FF6500]" />

              <h2 className="font-serif text-[24px] text-[#282828] sm:text-[30px]">
                Related Articles
              </h2>
            </div>

            {/* RELATED GRID */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((item) => (
                <article
                  key={item.id}
                  className="
                    group flex h-full flex-col
                    overflow-hidden rounded-[8px]
                    border border-[#FFB08B]
                    bg-white p-4
                    transition-shadow duration-300
                    hover:shadow-[0_12px_30px_rgba(0,0,0,0.09)]
                  "
                >
                  <Link
                    href={`/${item.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden rounded-[5px]"
                  >
                    <Image
                      unoptimized
                      src={item.coverImage}
                      alt={item.coverAlt}
                      fill
                      quality={85}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="
                        object-cover
                        transition-transform duration-500
                        group-hover:scale-[1.04]
                        motion-reduce:transform-none
                      "
                    />
                  </Link>

                  <time
                    dateTime={item.publishedAt}
                    className="mt-5 text-[12px] font-medium text-[#FF6500]"
                  >
                    {formatDate(item.publishedAt)}
                  </time>

                  <h3 className="mt-2 text-[19px] font-semibold leading-[1.35] text-[#282828]">
                    <Link
                      href={`/${item.slug}`}
                      className="transition-colors hover:text-[#FF6500]"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-[14px] leading-[1.6] text-[#858585]">
                    {item.excerpt}
                  </p>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/${item.slug}`}
                      className="
                        inline-flex items-center gap-2
                        rounded-[5px] bg-[#FF6500]
                        px-4 py-2
                        text-[12px] font-semibold text-white
                        transition-colors hover:bg-[#D94F00]
                      "
                    >
                      Read Article
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
