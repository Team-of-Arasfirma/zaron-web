export type Job = {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  status: "open" | "closed";
};

// Demonstration records only; replace this source with published vacancies later.
export const careerJobs: Job[] = [
  { id: "production-engineer", title: "Production Engineer", experience: "2–5 Years", description: "Support production planning, process improvement and shop-floor operations." },
  { id: "quality-engineer", title: "Quality Engineer", experience: "2–4 Years", description: "Ensure product quality and compliance with industry standards across all production stages." },
  { id: "sales-executive", title: "Sales Executive", experience: "1–4 Years", description: "Drive business growth by identifying new opportunities and building strong client relationships." },
  { id: "design-engineer", title: "Design Engineer", experience: "2–5 Years", description: "Create and optimize roofing and structural designs using industry-standard software." },
  { id: "manufacturing-supervisor", title: "Manufacturing Supervisor", experience: "3–6 Years", description: "Oversee manufacturing operations and ensure efficiency, safety and timely production." },
  { id: "hr-executive", title: "HR Executive", experience: "1–3 Years", description: "Support recruitment, employee engagement and HR operations across departments." },
].map((job) => ({ ...job, location: "Coimbatore, TN", employmentType: "Full-Time", status: "open" }));
