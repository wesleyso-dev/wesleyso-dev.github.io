import { tbd, type Copy, type Href } from './copy'

export type Decision = {
  title: Copy
  /** Why you chose it: the constraint or goal that drove it. */
  rationale: Copy
  /** What you gave up. Showing trade-offs signals engineering judgement. */
  tradeoff: Copy
}

export type Project = {
  slug: string
  name: string
  /** Hidden from production builds; visible in `npm run dev` while you write it. */
  draft?: boolean
  period: Copy
  /** One line, shown on the card. Lead with what it does for someone. */
  tagline: Copy
  role: Copy
  stack: Copy[]
  links: { repo: Href; live: Href }
  caseStudy: {
    overview: Copy
    problem: Copy
    /** What you built, as concrete statements. */
    built: Copy[]
    decisions: Decision[]
    challenges: { title: Copy; body: Copy }[]
    outcome: Copy
    learnings: Copy[]
  }
}

const why = () => tbd('Why this was the right call: the constraint or goal that drove it.')
const cost = () => tbd('What it cost, and how you would revisit it.')
const hardestProblem = () => [
  {
    title: tbd('Hardest technical problem'),
    body: tbd('What broke or was hard, how you diagnosed it, and what the fix was. Concrete beats impressive.'),
  },
]
const learnings = () => [tbd('Something you would do differently'), tbd('Something you would keep doing')]

const allProjects: Project[] = [
  {
    slug: 'brassflows',
    name: 'Brassflows',
    period: '2024 – Now',
    tagline:
      'A browser-based trumpet trainer that maps keystrokes to valve combinations, so musicians can practise without the instrument.',
    role: 'Founder · Product, engineering and growth',
    stack: ['React', 'Node.js', 'PostgreSQL', 'SSO'],
    links: { repo: tbd('Repository URL, or null if private'), live: 'https://brassflows.com' },
    caseStudy: {
      overview:
        'Brassflows is a web app for practising trumpet fingerings from a computer keyboard. I founded it in December 2024 and have built and run it since: the practice interface, the backend, onboarding, and the school-licensing side of the business.',
      problem:
        'Practising valve combinations normally means having a trumpet in hand. Brassflows lets musicians drill fingerings interactively in the browser, without the cost of physical equipment.',
      built: [
        'A responsive React interface that maps keyboard strokes to trumpet valve combinations, backed by Node.js.',
        'Automated onboarding pipelines and marketing-technology integrations, on a PostgreSQL deployment built to scale with the user base.',
        'Custom single sign-on (SSO) flows and real-time student performance analytics for schools, so teachers can fold Brassflows into their music curriculum.',
      ],
      decisions: [
        {
          title: 'Keyboard input as the instrument',
          rationale:
            'It makes practice accessible: anyone with a computer can drill fingerings whenever and wherever they are, without needing a trumpet in hand.',
          tradeoff: cost(),
        },
        { title: 'PostgreSQL as the system of record', rationale: why(), tradeoff: cost() },
        { title: 'Custom SSO for institutional licences', rationale: why(), tradeoff: cost() },
      ],
      challenges: hardestProblem(),
      outcome:
        '33,000+ users, 294 paying subscribers and $2,500+ in annual recurring revenue, plus enterprise site licences sold to 35+ educational institutions across 15 countries.',
      learnings: learnings(),
    },
  },
  {
    slug: 'sysscout',
    name: 'SysScout',
    period: '2026',
    tagline:
      'A cross-platform Python CLI that checks system health and network connectivity, and reports the results as JSON.',
    role: 'Solo · Design and engineering',
    stack: ['Python', 'psutil', 'pytest', 'GitHub Actions'],
    links: { repo: tbd('Repository URL, or null if private'), live: null },
    caseStudy: {
      overview:
        'SysScout is a command-line tool for diagnosing a machine: memory, disk and network health in one run, with thresholds you can tune and a machine-readable report at the end.',
      problem: tbd('What prompted it: the situation where you wanted a single command to tell you what is wrong with a machine.'),
      built: [
        'System diagnostics on psutil that monitor real-time memory and disk utilisation and flag bottlenecks against configurable warning thresholds.',
        'Network checks for DNS resolution, TCP socket connectivity and HTTPS/TLS certificate verification, with configurable timeouts, exception handling and detailed error reporting.',
        'JSON diagnostic reports, with automated pytest tests validating the system and network checks, run in GitHub Actions.',
      ],
      decisions: [
        { title: 'psutil for cross-platform metrics', rationale: why(), tradeoff: cost() },
        { title: 'Configurable thresholds and timeouts', rationale: why(), tradeoff: cost() },
        { title: 'JSON as the report format', rationale: why(), tradeoff: cost() },
      ],
      challenges: hardestProblem(),
      outcome: tbd('Where it stands now. Real, verifiable results only; “I use it on my own machines” is a fine answer.'),
      learnings: learnings(),
    },
  },
  {
    slug: 'envvault',
    name: 'EnvVault',
    period: '2025 – Now',
    tagline: 'A zero-dependency Go CLI that keeps secrets encrypted at rest with AES-256-GCM.',
    role: 'Solo · Design and engineering',
    stack: ['Go', 'AES-256-GCM', 'PBKDF2'],
    links: { repo: tbd('Repository URL, or null if private'), live: null },
    caseStudy: {
      overview:
        'EnvVault is a small command-line vault written in Go with no third-party dependencies. It encrypts secrets with authenticated encryption and is careful about everything around the cryptography: key derivation, file writes and permissions.',
      problem: tbd('What it is for: the secrets workflow you wanted to make safer, and what was wrong with the alternatives.'),
      built: [
        'Encryption with AES-256-GCM and keys derived via PBKDF2-HMAC-SHA256 at 600,000 iterations, using only the Go standard library.',
        'Header data bound to each ciphertext as AAD, with a unique nonce per encryption.',
        'Atomic writes with fsync and strict 0600 file permissions, so a crash or another user never sees a partial or readable file.',
      ],
      decisions: [
        { title: 'Zero dependencies: standard library only', rationale: why(), tradeoff: cost() },
        { title: 'Binding the header as AAD', rationale: why(), tradeoff: cost() },
        { title: 'Atomic, fsynced writes', rationale: why(), tradeoff: cost() },
      ],
      challenges: hardestProblem(),
      outcome:
        '94% test coverage across 32 unit tests, which verify tamper resistance and that no plaintext leaks to disk.',
      learnings: learnings(),
    },
  },
  draftProject('freecan', 'FreeCan'),
  draftProject('econlab', 'EconLab'),
]

function draftProject(slug: string, name: string): Project {
  return {
    slug,
    name,
    draft: true,
    period: tbd('Year'),
    tagline: tbd(`One line on what ${name} does and who it’s for`),
    role: tbd('Your role'),
    stack: [tbd('Tech'), tbd('Tech')],
    links: { repo: tbd('Repository URL, or null'), live: tbd('Live URL, or null') },
    caseStudy: {
      overview: tbd('What it is, who it is for, and your role.'),
      problem: tbd('The problem in the user’s terms.'),
      built: [tbd('What you built')],
      decisions: [{ title: tbd('Key decision'), rationale: why(), tradeoff: cost() }],
      challenges: hardestProblem(),
      outcome: tbd('Where it stands now.'),
      learnings: learnings(),
    },
  }
}

/** Display order is array order. Drafts only appear in development. */
export const projects: Project[] = allProjects.filter((p) => import.meta.env.DEV || !p.draft)

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)

/** Zero-based position in display order. */
export const projectIndex = (project: Project) => projects.indexOf(project)

/** Display number, e.g. "01". */
export const projectNumber = (project: Project) => String(projectIndex(project) + 1).padStart(2, '0')
