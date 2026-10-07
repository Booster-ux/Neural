import { TechNode, ConnectionLink } from '../types';

export const NODES_DATA: TechNode[] = [
  {
    id: 'ai',
    label: 'AI',
    title: 'Artificial Intelligence',
    category: 'ai',
    position: [-0.8, 3.8, 1.2],
    color: '#8B5CF6', // Violet
    glowColor: '#A78BFA',
    accentColor: '#C084FC',
    description: 'Autonomous decision engine, vector semantic memory, and orchestrator of continuous intelligent workflows.',
    capabilities: [
      'Multi-Agent Coordination',
      'LLM Reasoning Pipelines',
      'Vector Knowledge Retrieval (RAG)',
      'Autonomous Intent Routing',
      'Real-time Context Synthesis',
      'Predictive Optimization'
    ],
    technologies: ['OpenAI', 'Anthropic', 'LangChain', 'LlamaIndex', 'HuggingFace', 'Vector DBs'],
    techLabels: ['LLM', 'AGENTS', 'RAG', 'REASONING'],
    connections: ['apis', 'backend', 'automation', 'security'],
    metrics: {
      throughput: '1.42 M tok/s',
      latency: '16 ms',
      uptime: '99.99%',
      reliability: 'Zero-Failover',
      load: '38%'
    }
  },
  {
    id: 'apis',
    label: 'APIs',
    title: 'API Mesh & Gateway',
    category: 'api',
    position: [-4.2, 1.8, -1.0],
    color: '#38BDF8', // Sky Blue
    glowColor: '#7DD3FC',
    accentColor: '#BAE6FD',
    description: 'High-speed communication fabric routing external traffic, authenticating payloads, and dispatching service contracts.',
    capabilities: [
      'RESTful & GraphQL Gateways',
      'Bidirectional Webhook Mesh',
      'Distributed Rate Limiting',
      'Edge Token Verification',
      'Cloud Service Integrations',
      'Real-time SSE & WebSocket Streams'
    ],
    technologies: ['OpenAPI', 'gRPC', 'GraphQL', 'Stripe', 'Twilio', 'Webhooks'],
    techLabels: ['GATEWAY', 'REST', 'STREAM', 'OAUTH'],
    connections: ['ai', 'backend', 'applications', 'security'],
    metrics: {
      throughput: '86,400 req/s',
      latency: '4.8 ms',
      uptime: '99.99%',
      reliability: 'Multi-Region',
      load: '44%'
    }
  },
  {
    id: 'backend',
    label: 'BACKEND',
    title: 'Backend Engine',
    category: 'backend',
    position: [4.0, 1.2, 1.6],
    color: '#3B82F6', // Blue
    glowColor: '#60A5FA',
    accentColor: '#93C5FD',
    description: 'Core computation engine executing business transactions, event state machines, and microservice orchestration.',
    capabilities: [
      'Distributed Business Logic',
      'Asynchronous Event Streams',
      'Secure Session Handling',
      'High-throughput Fastify/Node APIs',
      'Microservice Job Dispatching',
      'Resilient Circuit Breakers'
    ],
    technologies: ['Node.js', 'TypeScript', 'Fastify', 'Docker', 'Redis', 'Kafka'],
    techLabels: ['ENGINE', 'EVENTS', 'SERVICES', 'PIPELINES'],
    connections: ['apis', 'database', 'security', 'ai'],
    metrics: {
      throughput: '42,500 ops/s',
      latency: '3.2 ms',
      uptime: '99.99%',
      reliability: 'Fault-Tolerant',
      load: '51%'
    }
  },
  {
    id: 'database',
    label: 'DATABASE',
    title: 'Data & State Layer',
    category: 'database',
    position: [3.2, -2.6, -2.0],
    color: '#22D3EE', // Cyan
    glowColor: '#67E8F9',
    accentColor: '#A5F3FC',
    description: 'ACID-compliant relational storage, vectorized embeddings, sub-millisecond memory caching, and live replication.',
    capabilities: [
      'PostgreSQL & High-Scale Schemas',
      'Granular Row-Level Security (RLS)',
      'Vector Similarity Search (pgvector)',
      'Multi-tier Redis Memory Cache',
      'Zero-Loss Transaction Logs',
      'Real-time Change Subscriptions'
    ],
    technologies: ['PostgreSQL', 'Supabase', 'Redis', 'pgvector', 'Prisma', 'Timescale'],
    techLabels: ['SQL', 'ACID', 'VECTORS', 'RLS'],
    connections: ['backend', 'security', 'applications'],
    metrics: {
      throughput: '124,000 IOPS',
      latency: '1.1 ms',
      uptime: '99.999%',
      reliability: 'Multi-AZ Sync',
      load: '34%'
    }
  },
  {
    id: 'automation',
    label: 'AUTOMATION',
    title: 'Automation & Workflows',
    category: 'automation',
    position: [-3.4, -2.4, 2.4],
    color: '#EC4899', // Rose/Magenta accent
    glowColor: '#F472B6',
    accentColor: '#FBCFE8',
    description: 'Self-healing background runners, scheduled chron jobs, cross-platform synchronization, and autonomous event triggers.',
    capabilities: [
      'Self-Healing Distributed Queues',
      'Event-Driven Workflow Pipelines',
      'Two-Way State Synchronization',
      'High-Priority Dead-Letter Handlers',
      'Dynamic Webhook Dispatchers',
      'Continuous Batch Schedulers'
    ],
    technologies: ['Temporal', 'BullMQ', 'Cron', 'Inngest', 'Webhooks', 'Redis Queue'],
    techLabels: ['WORKFLOWS', 'QUEUES', 'SYNC', 'CRON'],
    connections: ['ai', 'apis', 'backend'],
    metrics: {
      throughput: '6,200 jobs/min',
      latency: '11.5 ms',
      uptime: '99.97%',
      reliability: 'At-Least-Once',
      load: '29%'
    }
  },
  {
    id: 'security',
    label: 'SECURITY',
    title: 'Security & Zero-Trust',
    category: 'security',
    position: [0.4, -3.8, 1.2],
    color: '#10B981', // Emerald
    glowColor: '#34D399',
    accentColor: '#6EE7B7',
    description: 'Cross-cutting defense layer managing continuous authentication, strict cryptographic policies, and encrypted channels.',
    capabilities: [
      'Zero-Trust Identity Verification',
      'Role-Based Authorization (RBAC)',
      'End-to-End TLS 1.3 Encryption',
      'Database Row Level Policies',
      'Cryptographic Token Rotation',
      'Automated Vulnerability Scanning'
    ],
    technologies: ['OAuth 2.1', 'JWT', 'KMS', 'TLS 1.3', 'Argon2id', 'RBAC Policies'],
    techLabels: ['ZERO-TRUST', 'ENCRYPT', 'POLICIES', 'AUTH'],
    connections: ['backend', 'database', 'apis', 'ai', 'applications'],
    metrics: {
      throughput: '256-bit AES',
      latency: '< 0.4 ms',
      uptime: '100.00%',
      reliability: 'Zero-Trust Gate',
      load: '19%'
    }
  },
  {
    id: 'applications',
    label: 'APPLICATIONS',
    title: 'Client Interfaces',
    category: 'applications',
    position: [-3.8, 0.2, 3.2],
    color: '#06B6D4', // Cyan/Teal
    glowColor: '#22D3EE',
    accentColor: '#67E8F9',
    description: 'Responsive presentation layer where users and external clients interact with the underlying intelligence fabric.',
    capabilities: [
      'Interactive 3D WebGL Workspaces',
      'High-Performance React Frameworks',
      'Real-time Streaming Visualizations',
      'Optimistic Client State Hydration',
      'Progressive Offline Operations',
      'Sub-50ms Global Edge Delivery'
    ],
    technologies: ['React 18', 'Next.js', 'Three.js', 'TypeScript', 'Tailwind', 'R3F'],
    techLabels: ['WEBGL', 'REACT', 'INTERACTION', 'STREAM'],
    connections: ['apis', 'database', 'security'],
    metrics: {
      throughput: '60+ FPS',
      latency: '24 ms TTFB',
      uptime: '99.99%',
      reliability: 'Global Edge CDN',
      load: '22%'
    }
  }
];

// Meaningful connection architecture with defined types (Section 07)
export const CONNECTIONS_DATA: ConnectionLink[] = [
  // Primary core pathways
  { id: 'ai-apis', from: 'ai', to: 'apis', type: 'primary', speed: 1.3, particleCount: 8, description: 'AI agent dispatch to API gateway' },
  { id: 'apis-backend', from: 'backend', to: 'apis', type: 'primary', speed: 1.5, particleCount: 10, description: 'API payload routing to backend engine' },
  { id: 'backend-database', from: 'backend', to: 'database', type: 'primary', speed: 1.7, particleCount: 12, description: 'Transactional persistence & cache sync' },
  { id: 'ai-backend', from: 'ai', to: 'backend', type: 'primary', speed: 1.4, particleCount: 9, description: 'Inference compute pipeline' },
  { id: 'apis-applications', from: 'apis', to: 'applications', type: 'primary', speed: 1.4, particleCount: 8, description: 'Client UI state streams' },
  
  // Secondary pathways
  { id: 'ai-automation', from: 'ai', to: 'automation', type: 'secondary', speed: 1.1, particleCount: 6, description: 'Autonomous trigger execution' },
  { id: 'automation-backend', from: 'automation', to: 'backend', type: 'secondary', speed: 1.2, particleCount: 7, description: 'Job queue task processing' },
  { id: 'automation-apis', from: 'automation', to: 'apis', type: 'secondary', speed: 1.0, particleCount: 5, description: 'Outgoing webhook sync' },
  { id: 'database-applications', from: 'database', to: 'applications', type: 'secondary', speed: 1.3, particleCount: 7, description: 'Direct real-time subscription stream' },
  
  // Cross-cutting security pathways
  { id: 'security-backend', from: 'security', to: 'backend', type: 'cross_cutting', speed: 1.0, particleCount: 6, description: 'Zero-trust authorization policy' },
  { id: 'security-database', from: 'security', to: 'database', type: 'cross_cutting', speed: 1.2, particleCount: 6, description: 'Row level security verification' },
  { id: 'security-apis', from: 'security', to: 'apis', type: 'cross_cutting', speed: 1.1, particleCount: 5, description: 'Token signature inspection' },
  { id: 'security-applications', from: 'security', to: 'applications', type: 'cross_cutting', speed: 0.9, particleCount: 5, description: 'Client credential session guard' },
  { id: 'security-ai', from: 'security', to: 'ai', type: 'cross_cutting', speed: 1.0, particleCount: 5, description: 'Agent permission boundary enforcement' },
];

export const SYSTEM_STATS = {
  nodesCount: 7,
  connectionsCount: 14,
  dataFlowStatus: 'STREAMING',
  securityStatus: 'ZERO-TRUST ACTIVE',
  systemStatus: 'CONTINUOUS PROCESSING',
  stability: '99.99%',
  throughput: '1.84 GB/s'
};

