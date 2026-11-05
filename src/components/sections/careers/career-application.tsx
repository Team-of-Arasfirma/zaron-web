"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import type { Job } from "@/data/careers";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const RESUME_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export function validateResume(file: File | undefined): string {
  if (!file) return "Please choose your resume.";
  if (!/\.(pdf|doc|docx)$/i.test(file.name) || (file.type && !RESUME_TYPES.includes(file.type))) return "Choose a PDF, DOC or DOCX file.";
  if (file.size === 0) return "The resume file is empty.";
  if (file.size > MAX_RESUME_SIZE) return "Your resume must be 5 MB or smaller.";
  return "";
}

// Future API integration belongs here. This preview never sends candidate data.
function previewApplication() {
  return "Your form passed validation. Submission is unavailable until the application service is connected. No application has been sent.";
}

export function CareerApplication({ job, onClose }: { job: Job; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [fileError, setFileError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    dialog?.querySelector<HTMLInputElement>("#application-name")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  function handleValidation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const form = event.currentTarget;
    const input = form.elements.namedItem("resume") as HTMLInputElement;
    const error = validateResume(input.files?.[0]);
    setFileError(error);
    input.setCustomValidity(error);
    if (!form.reportValidity()) return;
    setNotice(previewApplication());
  }

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const elements = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]');
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  const inputClass = "mt-2 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-[#222D32] outline-none focus:border-[#FF6500] focus:ring-2 focus:ring-[#FF6500]/20";
  return (
    <dialog onKeyDown={trapFocus} ref={dialogRef} aria-labelledby="application-title" aria-describedby="application-info" onCancel={(event) => { event.preventDefault(); onClose(); }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 text-[#222D32] shadow-2xl backdrop:bg-[#142027]/75 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-sm font-medium text-[#C94E00]">Join our team</p><h2 id="application-title" className="mt-1 text-2xl font-bold">Apply for {job.title}</h2></div>
        <button type="button" onClick={onClose} aria-label="Close application" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 focus-visible:outline-2 focus-visible:outline-[#FF6500]"><X aria-hidden="true" size={21} /></button>
      </div>
      <p id="application-info" className="mb-6 mt-4 rounded-lg bg-orange-50 p-3 text-sm leading-relaxed text-[#755039]">Preview only. This is a sample vacancy. Applications cannot be submitted yet. You can test the form validation; no details or files will be sent or saved. All fields are required except Cover Letter.</p>
      <form onInput={() => setNotice("")} onSubmit={handleValidation} className="grid min-w-0 gap-4 sm:grid-cols-2">
        <label className="min-w-0 text-sm font-medium" htmlFor="application-name">Full Name<input id="application-name" name="fullName" autoComplete="name" required maxLength={120} pattern=".*\S.*" className={inputClass} /></label>
        <label className="min-w-0 text-sm font-medium" htmlFor="application-email">Email Address<input id="application-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} /></label>
        <label className="min-w-0 text-sm font-medium" htmlFor="application-mobile">Mobile Number<input id="application-mobile" name="mobile" type="tel" autoComplete="tel" required pattern="(?=(?:\D*\d){7,15}\D*$)\+?[0-9\s\(\)\-]{7,24}" title="Enter 7–15 digits, with optional spaces, brackets, hyphens or a leading plus." className={inputClass} /></label>
        <label className="min-w-0 text-sm font-medium" htmlFor="application-position">Position Applied For<input id="application-position" name="position" readOnly value={job.title} className={`${inputClass} bg-gray-50`} /></label>
        <label className="min-w-0 text-sm font-medium" htmlFor="application-experience">Experience<input id="application-experience" name="experience" required maxLength={120} pattern=".*\S.*" placeholder="e.g. 3 years in manufacturing" className={inputClass} /></label>
        <label className="min-w-0 text-sm font-medium" htmlFor="application-qualification">Qualification<input id="application-qualification" name="qualification" required maxLength={200} pattern=".*\S.*" className={inputClass} /></label>
        <div className="min-w-0 sm:col-span-2"><label htmlFor="application-resume" className="text-sm font-medium">Resume Upload</label><input id="application-resume" name="resume" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" aria-describedby="resume-help resume-error" aria-invalid={Boolean(fileError)} onChange={(event) => { const error = validateResume(event.currentTarget.files?.[0]); setFileError(error); setNotice(""); event.currentTarget.setCustomValidity(error); }} className={`${inputClass} text-sm file:mr-3 file:rounded file:border-0 file:bg-orange-50 file:px-3 file:py-2 file:text-[#A64000]`} /><p id="resume-help" className="mt-1 text-xs text-gray-600">PDF, DOC or DOCX · Maximum 5 MB</p><p id="resume-error" role="alert" className="mt-1 text-sm text-red-700">{fileError}</p></div>
        <label htmlFor="application-cover" className="min-w-0 text-sm font-medium sm:col-span-2">Cover Letter <span className="font-normal text-gray-500">(optional)</span><textarea id="application-cover" name="coverLetter" rows={4} maxLength={5000} className={inputClass} /></label>
        <div className="sm:col-span-2"><button type="submit" className="min-h-12 rounded-full bg-[#FF6500] px-6 py-3 font-semibold text-white hover:bg-[#de5800] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6500]">Validate application</button><p className="mt-3 text-sm text-gray-600">Submission unavailable — backend connection pending.</p><p role="status" className="mt-3 text-sm font-medium leading-relaxed text-[#755039]">{notice}</p></div>
      </form>
    </dialog>
  );
}



