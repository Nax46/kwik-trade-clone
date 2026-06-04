export type ResourceType = 'pdf' | 'guide' | 'learning'

export type Resource = {
  id: string
  title: string
  description: string
  type: ResourceType
  category: string
  fileSize: string
  pages?: number
  duration?: string
  downloadUrl: string
}

export const resources: Resource[] = [
  {
    id: 'r1',
    title: '2026 Wealth Planning Playbook',
    description:
      'A comprehensive overview of portfolio construction, tax coordination, and estate considerations for high-net-worth families.',
    type: 'pdf',
    category: 'Wealth Management',
    fileSize: '2.4 MB',
    pages: 48,
    downloadUrl: '#download-wealth-playbook',
  },
  {
    id: 'r2',
    title: 'Corporate Finance Readiness Checklist',
    description:
      'Step-by-step preparation guide for companies evaluating capital raises, refinancing, or strategic transactions.',
    type: 'pdf',
    category: 'Corporate Advisory',
    fileSize: '1.1 MB',
    pages: 22,
    downloadUrl: '#download-corp-checklist',
  },
  {
    id: 'r3',
    title: 'Understanding Risk Registers',
    description:
      'How to build and maintain an enterprise risk register that boards and committees can act on.',
    type: 'guide',
    category: 'Risk & Compliance',
    fileSize: '890 KB',
    pages: 16,
    downloadUrl: '#download-risk-register',
  },
  {
    id: 'r4',
    title: 'Quarterly Macro Outlook Q2 2026',
    description:
      'Meridian Research perspectives on rates, inflation, equities, and cross-asset implications for allocators.',
    type: 'pdf',
    category: 'Research',
    fileSize: '3.2 MB',
    pages: 36,
    downloadUrl: '#download-macro-outlook',
  },
  {
    id: 'r5',
    title: 'Family Governance Workshop Series',
    description:
      'Video learning modules on communication frameworks, succession planning, and shared investment principles.',
    type: 'learning',
    category: 'Family Office',
    fileSize: '—',
    duration: '4.5 hours',
    downloadUrl: '#learning-family-governance',
  },
  {
    id: 'r6',
    title: 'Retirement Plan Fiduciary Guide',
    description:
      'Educational material for plan sponsors covering oversight duties, benchmarking, and participant outcomes.',
    type: 'guide',
    category: 'Benefits',
    fileSize: '1.5 MB',
    pages: 28,
    downloadUrl: '#download-fiduciary-guide',
  },
  {
    id: 'r7',
    title: 'FX Hedging Policy Template',
    description:
      'Customizable policy framework for treasury teams managing multi-currency exposure.',
    type: 'pdf',
    category: 'Treasury',
    fileSize: '620 KB',
    pages: 12,
    downloadUrl: '#download-fx-template',
  },
  {
    id: 'r8',
    title: 'Introduction to Alternative Investments',
    description:
      'Self-paced learning path covering private equity, private credit, real assets, and portfolio role.',
    type: 'learning',
    category: 'Education',
    fileSize: '—',
    duration: '3 hours',
    downloadUrl: '#learning-alternatives',
  },
]

export const resourceCategories = ['All', 'Wealth Management', 'Corporate Advisory', 'Research', 'Risk & Compliance', 'Education'] as const
