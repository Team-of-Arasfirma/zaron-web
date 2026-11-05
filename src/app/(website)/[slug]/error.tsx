"use client";
export default function ArticleError({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen px-5 pt-48">
      <h1 className="text-3xl font-bold">Article temporarily unavailable</h1>
      <p className="my-5">We could not load this article. Please try again.</p>
      <button
        onClick={reset}
        className="rounded bg-[#FF6500] px-5 py-3 text-white"
      >
        Try again
      </button>
    </main>
  );
}
