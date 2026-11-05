
"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import { Container } from "@/components/layout/container";
import { ContactSupport } from "./contact-support";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  requirement: string;
  message: string;
};

type FormErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  requirement: "",
  message: "",
};

const requirements = [
  "Roofing Sheets",
  "PPGI Coils",
  "C & Z Purlins",
  "Decking Sheets",
  "Standing Seam Roofing",
  "Tile Roofing",
  "Cladding Solutions",
  "Structural Solutions",
  "Other Enquiry",
];

const inputClassName = `
  h-[56px] w-full
  rounded-[5px]
  border border-[#C8C8C8]
  bg-white px-5
  text-[15px]
  text-[#282828]
  outline-none
  transition-colors duration-200
  placeholder:text-[#B4B4B4]
  focus:border-[#FF6500]
  focus:ring-2
  focus:ring-[#FF6500]/10
`;

const labelClassName = `
  mb-2 block
  font-serif
  text-[18px]
  text-[#171717]
  sm:text-[20px]
`;

function validateForm(
  values: ContactFormValues
): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      values.email.trim()
    )
  ) {
    errors.email =
      "Please enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (
    !/^[6-9]\d{9}$/.test(
      values.phone.replace(/[\s-]/g, "")
    )
  ) {
    errors.phone =
      "Enter a valid 10-digit Indian mobile number.";
  }

  if (!values.requirement) {
    errors.requirement =
      "Please select a requirement.";
  }

  return errors;
}

export function ContactForm() {
  const reduceMotion = Boolean(useReducedMotion());

  const [values, setValues] =
    useState<ContactFormValues>(initialValues);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [formNotice, setFormNotice] = useState("");

  const updateField = (
    field: keyof ContactFormValues,
    value: string
  ) => {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    setFormNotice("");
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0] as keyof ContactFormValues;
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      setFormNotice(
        "Please correct the highlighted fields."
      );
      return;
    }

    // Backend endpoint will be connected later.
    setFormNotice(
      "Your details are valid. Online enquiry submission is not available yet. Please contact our team using the details alongside the form."
    );
  };

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="
        relative z-10
        w-full
        bg-[#F0F0F0]
        pt-0 pb-16
        md:pb-20
      "
    >
      <Container>
        {/* MAIN FORM CONTAINER */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            grid grid-cols-1
            gap-8
            rounded-[28px]
            border border-[#D8D8D8]
            bg-white
            p-5
            shadow-[0_3px_5px_rgba(0,0,0,0.20)]
            sm:p-7
            lg:grid-cols-[1.9fr_1fr]
            lg:gap-10
            lg:p-8
            xl:gap-12
          "
        >
          {/* LEFT SIDE: ENQUIRY FORM */}
          <div className="min-w-0">
            <h2
              id="contact-form-heading"
              className="
                text-[28px]
                font-extrabold
                tracking-[-0.035em]
                text-[#FF6500]
                sm:text-[36px]
                lg:text-[40px]
              "
            >
              Send Us a Message
            </h2>

            <p
              className="
                mt-4 max-w-[660px]
                text-[16px]
                leading-[1.4]
                text-[#555555]
                sm:text-[20px]
              "
            >
              Tell us about your requirement and our
              team will get back to you with the right
              solution.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8"
            >
              {/* NAME, EMAIL, PHONE, COMPANY */}
              <div
                className="
                  grid grid-cols-1
                  gap-x-9 gap-y-5
                  sm:grid-cols-2
                "
              >
                {/* NAME */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className={labelClassName}
                  >
                    Your Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={(event) =>
                      updateField(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Enter your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name
                        ? "contact-name-error"
                        : undefined
                    }
                    className={inputClassName}
                  />

                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className={labelClassName}
                  >
                    Email Address{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="Enter your email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? "contact-email-error"
                        : undefined
                    }
                    className={inputClassName}
                  />

                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className={labelClassName}
                  >
                    Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    value={values.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="Enter your phone number"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone
                        ? "contact-phone-error"
                        : undefined
                    }
                    className={inputClassName}
                  />

                  {errors.phone && (
                    <p
                      id="contact-phone-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* COMPANY */}
                <div>
                  <label
                    htmlFor="contact-company"
                    className={labelClassName}
                  >
                    Company Name
                  </label>

                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(event) =>
                      updateField(
                        "company",
                        event.target.value
                      )
                    }
                    placeholder="Enter your company name"
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* REQUIREMENT */}
              <div className="mt-5">
                <label
                  htmlFor="contact-requirement"
                  className={labelClassName}
                >
                  Product / Requirement{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="contact-requirement"
                    name="requirement"
                    required
                    value={values.requirement}
                    onChange={(event) =>
                      updateField(
                        "requirement",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(
                      errors.requirement
                    )}
                    aria-describedby={
                      errors.requirement
                        ? "contact-requirement-error"
                        : undefined
                    }
                    className={`
                      ${inputClassName}
                      appearance-none pr-12
                      ${
                        values.requirement
                          ? "text-[#282828]"
                          : "text-[#B4B4B4]"
                      }
                    `}
                  >
                    <option value="" disabled>
                      Select your requirement
                    </option>

                    {requirements.map((requirement) => (
                      <option
                        key={requirement}
                        value={requirement}
                      >
                        {requirement}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    aria-hidden="true"
                    size={23}
                    className="
                      pointer-events-none
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-[#888888]
                    "
                  />
                </div>

                {errors.requirement && (
                  <p
                    id="contact-requirement-error"
                    className="mt-1 text-xs text-red-600"
                  >
                    {errors.requirement}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div className="mt-7">
                <label
                  htmlFor="contact-message"
                  className={labelClassName}
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(event) =>
                    updateField(
                      "message",
                      event.target.value
                    )
                  }
                  placeholder="Tell us about your project..."
                  className="
                    min-h-[125px] w-full
                    resize-y rounded-[5px]
                    border border-[#C8C8C8]
                    bg-white px-5 py-5
                    text-[15px]
                    text-[#282828]
                    outline-none
                    transition-colors
                    placeholder:text-[#B4B4B4]
                    focus:border-[#FF6500]
                    focus:ring-2
                    focus:ring-[#FF6500]/10
                  "
                />
              </div>

              {/* SUBMIT */}
              <div className="mt-7 flex justify-center">
                <button
                  type="submit"
                  className="
                    group inline-flex
                    min-h-[58px]
                    w-full max-w-[480px]
                    items-center justify-center
                    gap-4 rounded-full
                    bg-[#FF6500]
                    px-8 py-3
                    text-[18px]
                    font-semibold
                    text-white
                    transition-all duration-300
                    hover:bg-[#E85B00]
                    hover:shadow-[0_10px_25px_rgba(255,101,0,0.22)]
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-[#FF6500]
                  "
                >
                  Send Enquiry

                  <ArrowRight
                    aria-hidden="true"
                    size={23}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </div>

              {/* STATUS */}
              {formNotice && (
                <p
                  role="status"
                  aria-live="polite"
                  className="
                    mt-4 text-center
                    text-[13px]
                    leading-relaxed
                    text-[#555555]
                  "
                >
                  {formNotice}
                </p>
              )}
            </form>
          </div>

          {/* RIGHT SUPPORT PANEL */}
          <ContactSupport />
        </motion.div>
      </Container>
    </section>
  );
}
