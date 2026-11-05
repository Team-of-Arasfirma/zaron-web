
"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { useCareerReducedMotion } from "@/hooks/use-career-reduced-motion";
import { Container } from "@/components/layout/container";
import { careerJobs, type Job } from "@/data/careers";
import { JobCard } from "./job-card";
import { CareerApplication } from "./career-application";

export function CurrentOpenings() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const reduced = useCareerReducedMotion();

  const openJobs = careerJobs.filter(
    (job) => job.status === "open"
  );

  return (
    <section
      id="current-openings"
      aria-labelledby="openings-heading"
      className="
        scroll-mt-32
        bg-[#F4F4F4]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      <Container className="mx-auto max-w-[1920px]">
        {/* SECTION HEADING */}
        <motion.div
          initial={
            reduced
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: reduced ? 0 : 0.5,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* MAIN HEADING */}
          <h2
            id="openings-heading"
            className="
              text-2xl
              font-bold
              tracking-tight
              text-[#FF6500]
              sm:text-3xl
            "
          >
            CURRENT OPENINGS
          </h2>

          {/* SUBHEADING */}
          <p
            className="
              mt-3
              text-xl
              font-bold
              text-[#707070]
              sm:text-2xl
            "
          >
            FIND YOUR NEXT OPPORTUNITY.
          </p>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4
              text-base
              leading-relaxed
              text-[#777777]
            "
          >
            Explore available roles across engineering,
            manufacturing, quality, sales and operations.
          </p>

          {/* DEMO NOTICE */}
          <p className="mt-3 text-xs text-[#666666]">
            Sample vacancies for demonstration.
            These are not confirmed live openings.
          </p>
        </motion.div>

        {/* JOB GRID */}
        {openJobs.length > 0 ? (
          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {openJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onApply={() => setSelectedJob(job)}
              />
            ))}
          </div>
        ) : (
          /* NO OPEN POSITIONS */
          <div
            className="
              mx-auto mt-10
              max-w-xl
              rounded-[14px]
              border border-[#E5E5E5]
              bg-white
              px-6 py-12
              text-center
            "
          >
            <h3 className="text-xl font-semibold text-[#333333]">
              No Current Openings
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#777777]">
              There are no open positions at the moment.
              Please check back for future opportunities.
            </p>
          </div>
        )}
      </Container>

      {/* APPLICATION MODAL */}
      {selectedJob && (
        <CareerApplication
          key={selectedJob.id}
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </section>
  );
}
