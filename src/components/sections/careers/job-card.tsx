
"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  UserRoundCheck,
} from "lucide-react";
import { motion } from "motion/react";

import { useCareerReducedMotion } from "@/hooks/use-career-reduced-motion";
import type { Job } from "@/data/careers";

export function JobCard({
  job,
  index,
  onApply,
}: {
  job: Job;
  index: number;
  onApply: (job: Job) => void;
}) {
  const reduced = useCareerReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduced ? 0 : 0.45,
        delay: reduced ? 0 : index * 0.06,
      }}
      whileHover={reduced ? undefined : { y: -4 }}

      className="
        relative flex h-full min-w-0
        cursor-pointer flex-col
        rounded-[14px]
        border border-[#FF6500]
        bg-white p-6
        shadow-[0_3px_12px_#00000006]
        transition-shadow
        hover:shadow-lg
        sm:p-7
      "
    >
      {/* JOB TITLE */}
      <h3 className="text-xl font-semibold leading-snug text-[#333333]">
        {job.title}
      </h3>

      {/* JOB DETAILS */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#595959]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F4] px-2.5 py-1.5">
          <MapPin
            size={14}
            aria-hidden="true"
            className="text-[#FF6500]"
          />
          {job.location}
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F4] px-2.5 py-1.5">
          <BriefcaseBusiness
            size={14}
            aria-hidden="true"
            className="text-[#FF6500]"
          />
          {job.employmentType}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="mb-6 mt-5 text-sm leading-relaxed text-[#777777]">
        {job.description}
      </p>

      {/* EXPERIENCE + APPLY NOW */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5 text-sm">
        <span className="inline-flex items-center gap-2 text-[#666666]">
          <UserRoundCheck
            size={17}
            aria-hidden="true"
            className="text-[#FF6500]"
          />
          {job.experience}
        </span>

        <button
          type="button"
          onClick={() => onApply(job)}
          aria-label={`Apply for ${job.title}`}
          className="
            inline-flex min-h-11
            after:absolute after:inset-0 after:rounded-[14px]
            items-center gap-2
            rounded font-semibold
            text-[#FF6500]
            transition-colors duration-300
            hover:text-[#D94F00]
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-[#FF6500]
          "
        >
          Apply Now
          <ArrowRight
            size={17}
            aria-hidden="true"
          />
        </button>
      </div>
    </motion.article>
  );
}
