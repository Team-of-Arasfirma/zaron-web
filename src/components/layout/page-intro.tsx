import { Section } from "@/components/layout/section";

type PageIntroProps = {
  heading: string;
};

export function PageIntro({ heading }: PageIntroProps) {
  const headingId = `${heading.toLowerCase().replaceAll(" ", "-")}-heading`;

  return (
    <Section
      aria-labelledby={headingId}
      className="flex min-h-[60vh] items-center text-center"
    >
      <h1
        id={headingId}
        className="mx-auto max-w-4xl break-words text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
      >
        {heading}
      </h1>
    </Section>
  );
}