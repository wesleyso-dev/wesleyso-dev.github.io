import type { Copy, Href } from './copy'

export const site = {
  name: 'Wesley So',
  /** Shown above the hero headline. */
  role: 'Software engineer · Data Science at UC Berkeley' as Copy,
  url: 'https://wesleyso-dev.github.io',
  description:
    'Wesley So is a software engineer and UC Berkeley Data Science student. Founder of Brassflows, contract software engineer at Yahoo. Selected work and engineering case studies.',

  /** Hero facts, shown as a small definition list. */
  facts: [
    { term: 'Currently', detail: 'Software Engineer (Contract), Yahoo · Founder, Brassflows' },
    { term: 'Studying', detail: 'B.A. Data Science, UC Berkeley, ’28' },
    { term: 'Based in', detail: 'Berkeley, CA' },
    { term: 'Awards', detail: '2nd place, Berkeley × DeepMind Hackathon' },
  ] satisfies { term: string; detail: Copy }[],
}

export const links = {
  github: 'https://github.com/wesleyso-dev' as Href,
  linkedin: 'https://www.linkedin.com/in/wesley-so/' as Href,
  resume: '/Wesley_So_Resume.pdf' as Href,
  email: 'wesleyso@berkeley.edu' as Copy,
}

export const about = {
  lead: 'I got into software after discovering the thrill of competitive programming. Now I’m a Data Science student at UC Berkeley, building products people use every day and tools that go deep on fundamentals.' as Copy,
  body: [
    'The biggest of those is Brassflows, a trumpet-practice platform I founded and still run, used by 33,000+ musicians and 35+ schools across 15 countries. Alongside it, I build smaller tools, like a system-diagnostics CLI in Python and an encrypted secrets vault in Go.',
    'Before Berkeley, I was president of the Computer Science Club, mentoring 30+ students in data structures and algorithms for programming contests, and of the Cybersecurity Club, running weekly workshops on network security.',
  ] satisfies Copy[],
  /** Short, human details. Keep each to a few words. */
  outside: ['The gym', 'Poker', 'Reading'] satisfies Copy[],
}

export type Role = {
  period: string
  title: string
  org: string
  summary: string
}

export const experience: Role[] = [
  {
    period: 'Sep 2026 – Now',
    title: 'Software Engineer (Contract)',
    org: 'Yahoo',
    summary:
      'Building interactive TypeScript prototypes for new Yahoo Mail features: reusable UI components and simulated email workflows for subscription management, turning product requirements into something stakeholders can click through.',
  },
  {
    period: 'Dec 2024 – Now',
    title: 'Founder',
    org: 'Brassflows',
    summary:
      'Built and grew a React and Node.js trumpet-practice platform to 33,000+ users, 294 paying subscribers and 35+ school site licences across 15 countries.',
  },
]

export const leadership: Role[] = [
  {
    period: 'Aug 2024 – May 2026',
    title: 'President',
    org: 'Computer Science Club · Arcadia, CA',
    summary:
      'Mentored 30+ students in mathematics and data structures & algorithms, with a 30% improvement in competitive contest scores; ran operations and weekly practice for 40+ members.',
  },
  {
    period: 'Aug 2024 – May 2026',
    title: 'President',
    org: 'Cybersecurity Club · Arcadia, CA',
    summary:
      'Led weekly workshops on ethical hacking, network security and IT standards for 20+ students, and coached teams for cybersecurity competitions.',
  },
]

export type Credential = { kind: string; title: string; detail: Copy }

export const credentials: Credential[] = [
  { kind: 'Education', title: 'University of California, Berkeley', detail: 'B.A. Data Science · Expected May 2028' },
  {
    kind: 'Recognition',
    title: '2nd place, Berkeley × DeepMind Hackathon',
    detail:
      '2026 · Team project: Dose, a web app that scans medicine bottles and builds a dosing schedule to prevent double dosing.',
  },
  { kind: 'Certification', title: 'CompTIA A+', detail: 'Hardware, operating systems, networking, security and IT support' },
]

export type SkillGroup = { label: string; items: Copy[] }

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['Python', 'Go', 'TypeScript', 'JavaScript', 'SQL', 'Bash', 'PowerShell'] },
  { label: 'Web & tooling', items: ['React', 'Node.js', 'Flask', 'REST APIs', 'pytest', 'Git & GitHub'] },
  { label: 'Cloud & data', items: ['AWS (EC2, SQS, Lambda)', 'PostgreSQL', 'Supabase', 'GitHub Actions', 'CI/CD'] },
  { label: 'Networking & IT', items: ['DNS', 'TCP/IP', 'HTTPS/TLS', 'System diagnostics', 'Access control'] },
]
