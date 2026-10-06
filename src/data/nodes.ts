import { TechNode, ConnectionLink } from '../types';

export const NODES_DATA: TechNode[] = [
  {
    id: 'ai',
    label: 'AI',
    title: 'Artificial Intelligence',
    category: 'ai',
    position: [0, 4.5, 0],
    color: '#8B5CF6', // Violet
    glowColor: '#A78BFA',
    description: 'Intelligence is the layer that turns raw information into decisions, predictions and automated behavior.',
    capabilities: [
      'AI integration',
      'LLM workflows',
      'AI agents',
      'Prompt systems',
      'Automation',
      'Intelligent APIs'
    ],
    technologies: ['OpenAI', 'Anthropic', 'LangChain', 'LlamaIndex', 'HuggingFace', 'Vector DBs'],
    techLabels: ['LLM', 'AGENTS', 'RAG', 'AUTOMATION'],
    connections: ['apis', 'backend', 'database', 'security', 'applications', 'automation'],
    metrics: {
      throughput: '1.4M tokens/s',
      latency: '18ms',
      uptime: '99.99%',
      reliability: 'Enterprise'
    }
  },
  {
    id: 'backend',
    label: 'BACKEND',
    title: 'Backend Systems',
    category: 'backend',
    position: [4.8, 1.2, 2.0],
    color: '#3B82F6', // Blue
    glowColor: '#60A5FA',
    description: 'The engine responsible for business logic, authentication, APIs, data processing and application behavior.',
    capabilities: [
      'Node.js & TypeScript',
      'Express & Fastify',
      'REST & GraphQL APIs',
      'Authentication & Sessions',
      'Webhooks & Event Handlers',
      'Business Logic Pipelines'
    ],
    technologies: ['Node.js', 'Express', 'TypeScript', 'Fastify', 'Docker', 'Redis'],
    techLabels: ['NODE', 'API', 'AUTH', 'WEBHOOKS'],
    connections: ['ai', 'apis', 'database', 'security', 'applications', 'automation'],
    metrics: {
      throughput: '42,000 req/s',
      latency: '4ms',
      uptime: '99.99%',
      reliability: 'Fault-tolerant'
    }
  },
  {
    id: 'database',
    label: 'DATABASE',
    title: 'Data Layer',
    category: 'database',
    position: [3.2, -3.8, -1.5],
    color: '#22D3EE', // Cyan
    glowColor: '#67E8F9',
    description: 'Structured data systems designed for reliability, security and scalable application workflows.',
    capabilities: [
      'PostgreSQL & Supabase',
      'Database Architecture & Schema Design',
      'Row Level Security (RLS)',
      'High-performance Queries & Indexing',
      'Entity Relationships & Migrations',
      'Real-time Streaming Subscriptions'
    ],
    technologies: ['PostgreSQL', 'Supabase', 'Prisma', 'Redis', 'Vector DB', 'Timescale'],
    techLabels: ['SQL', 'POSTGRES', 'RLS', 'RPC'],
    connections: ['backend', 'ai', 'security', 'apis'],
    metrics: {
      throughput: '120,000 IOPS',
      latency: '1.2ms',
      uptime: '99.999%',
      reliability: 'Multi-AZ'
    }
  },
  {
    id: 'apis',
    label: 'APIs',
    title: 'API Infrastructure',
    category: 'api',
    position: [-4.2, 2.2, -2.5],
    color: '#38BDF8', // Sky Blue
    glowColor: '#7DD3FC',
    description: 'The communication layer connecting applications, services, payments and external systems.',
    capabilities: [
      'RESTful & GraphQL Architectures',
      'Third-party Cloud Integrations',
      'Reliable Webhook Delivery',
      'Payment API Integrations',
      'OAuth & Modern Authentication',
      'Rate Limiting & Gateway Mesh'
    ],
    technologies: ['OpenAPI', 'Stripe', 'Twilio', 'GraphQL', 'gRPC', 'Webhooks'],
    techLabels: ['REST', 'JSON', 'WEBHOOK', 'OAUTH'],
    connections: ['ai', 'backend', 'applications', 'security', 'automation'],
    metrics: {
      throughput: '85,000 req/s',
      latency: '6ms',
      uptime: '99.98%',
      reliability: 'Redundant'
    }
  },
  {
    id: 'automation',
    label: 'AUTOMATION',
    title: 'Automation',
    category: 'automation',
    position: [-3.8, -2.5, 3.2],
    color: '#EC4899', // Rose/Pink accent
    glowColor: '#F472B6',
    description: 'Systems that eliminate repetitive work and connect business processes into reliable workflows.',
    capabilities: [
      'End-to-end Workflow Automation',
      'Event-Driven Push Notifications',
      'Scheduled Background Jobs & Queues',
      'Two-way Webhook Orchestration',
      'Cross-Platform Data Synchronization',
      'Self-Healing Task Runners'
    ],
    technologies: ['Temporal', 'BullMQ', 'Cron', 'Inngest', 'Zapier/Make', 'Webhooks'],
    techLabels: ['WORKFLOW', 'EVENTS', 'JOBS', 'SYNC'],
    connections: ['ai', 'backend', 'apis', 'database'],
    metrics: {
      throughput: '5,000 jobs/min',
      latency: '12ms',
      uptime: '99.95%',
      reliability: 'At-least-once'
    }
  },
  {
    id: 'security',
    label: 'SECURITY',
    title: 'Security',
    category: 'security',
    position: [0, -4.6, 2.5],
    color: '#10B981', // Emerald
    glowColor: '#34D399',
    description: 'Application security built around authentication, authorization, access control and protected data.',
    capabilities: [
      'Zero-Trust Authentication Architecture',
      'Granular Role-Based Access Control (RBAC)',
      'Database Row Level Security (RLS)',
      'Secure Token & JWT Verification',
      'Encrypted At-Rest & In-Flight Data',
      'Automated Vulnerability Policies'
    ],
    technologies: ['JWT', 'OAuth2', 'RBAC', 'KMS', 'TLS 1.3', 'Argon2'],
    techLabels: ['JWT', 'RLS', 'RBAC', 'POLICY'],
    connections: ['ai', 'backend', 'database', 'apis', 'applications'],
    metrics: {
      throughput: '256-bit AES',
      latency: '<0.5ms',
      uptime: '100%',
      reliability: 'Zero-Trust'
    }
  },
  {
    id: 'applications',
    label: 'APPLICATIONS',
    title: 'Applications',
    category: 'applications',
    position: [-4.6, 0.5, 1.8],
    color: '#06B6D4', // Cyan/Teal
    glowColor: '#22D3EE',
    description: 'The interface where users interact with the systems underneath.',
    capabilities: [
      'Responsive Web & Modern SaaS Applications',
      'High-conversion E-commerce Platforms',
      'Real-time Analytic Dashboards',
      'Internal Tooling & Business Portals',
      'Interactive 3D WebGL Experiences',
      'Progressive Web Apps (PWA)'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js', 'Vite'],
    techLabels: ['REACT', 'TYPESCRIPT', 'UI', 'UX'],
    connections: ['ai', 'backend', 'apis', 'security'],
    metrics: {
      throughput: '60+ FPS',
      latency: 'sub-50ms TTFB',
      uptime: '99.99%',
      reliability: 'Global CDN'
    }
  }
];

// Defined explicit connection routes with speed & particle density
export const CONNECTIONS_DATA: ConnectionLink[] = [
  { id: 'ai-apis', from: 'ai', to: 'apis', speed: 1.2, particleCount: 8 },
  { id: 'ai-backend', from: 'ai', to: 'backend', speed: 1.4, particleCount: 10 },
  { id: 'ai-database', from: 'ai', to: 'database', speed: 0.9, particleCount: 6 },
  { id: 'ai-security', from: 'ai', to: 'security', speed: 1.1, particleCount: 7 },
  { id: 'ai-applications', from: 'ai', to: 'applications', speed: 1.3, particleCount: 9 },
  { id: 'ai-automation', from: 'ai', to: 'automation', speed: 1.5, particleCount: 8 },
  { id: 'backend-apis', from: 'backend', to: 'apis', speed: 1.6, particleCount: 10 },
  { id: 'backend-database', from: 'backend', to: 'database', speed: 1.8, particleCount: 12 },
  { id: 'backend-applications', from: 'backend', to: 'applications', speed: 1.4, particleCount: 10 },
  { id: 'backend-automation', from: 'backend', to: 'automation', speed: 1.2, particleCount: 7 },
  { id: 'backend-security', from: 'backend', to: 'security', speed: 1.1, particleCount: 8 },
  { id: 'apis-applications', from: 'apis', to: 'applications', speed: 1.5, particleCount: 9 },
  { id: 'apis-automation', from: 'apis', to: 'automation', speed: 1.3, particleCount: 6 },
  { id: 'apis-security', from: 'apis', to: 'security', speed: 1.0, particleCount: 6 },
  { id: 'database-security', from: 'database', to: 'security', speed: 1.3, particleCount: 8 },
  { id: 'applications-security', from: 'applications', to: 'security', speed: 1.2, particleCount: 7 },
  { id: 'automation-database', from: 'automation', to: 'database', speed: 1.0, particleCount: 6 },
];

export const SYSTEM_STATS = {
  nodesCount: 7,
  connectionsCount: 17,
  dataFlowStatus: 'ACTIVE',
  securityStatus: 'ENABLED',
  systemStatus: 'OPERATIONAL',
  stability: '99.98%',
  throughput: '1.85 GB/s'
};
