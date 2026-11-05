import Image from "next/image";

export function CtaImage() {
  return (
    <Image
      src="/Banner/fac-cta.png"
      alt="Aerial view of an industrial roofing facility"
      fill
      sizes="(max-width: 1023px) 100vw, 48vw"
      loading="lazy"
      className="object-cover object-center"
    />
  );
}