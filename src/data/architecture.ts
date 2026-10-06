import { ArchitectureLayer } from '../types';

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'user',
    name: 'USER & CLIENTS',
    level: 5,
    description: 'Entry point for users across web, mobile, desktop clients, and autonomous external agents.',
    position: [0, 4.0, 0],
    color: '#38BDF8',
    items: ['Web Browsers', 'Mobile Devices', 'Third-Party Webhooks', 'API Consumers'],
    techStack: ['HTTP/3', 'WebSockets', 'TLS 1.3', 'CDN Edge'],
    packetFlow: 'Initiates encrypted requests & receives real-time UI streams'
  },
  {
    id: 'frontend',
    name: 'FRONTEND & PRESENTATION',
    level: 4,
    description: 'High-performance interactive interfaces, component state, real-time client hydration, and WebGL.',
    position: [0, 2.4, 0],
    color: '#818CF8',
    items: ['React & Next.js', 'State Hydration', 'WebGL / Three.js', 'Dynamic Animations'],
    techStack: ['React', 'TypeScript', 'Tailwind', 'GSAP', 'R3F'],
    packetFlow: 'Dispatches authenticated actions to the Gateway mesh'
  },
  {
    id: 'api',
    name: 'API GATEWAY & MESH',
    level: 3,
    description: 'Traffic routing, rate limiting, token authentication, payload validation, and request dispatch.',
    position: [0, 0.8, 0],
    color: '#8B5CF6',
    items: ['REST & GraphQL Endpoints', 'OAuth / JWT Validation', 'Rate Limiting', 'Telemetry Tracing'],
    techStack: ['OpenAPI', 'Reverse Proxy', 'JWT', 'gRPC'],
    packetFlow: 'Routes verified requests directly to core service handlers'
  },
  {
    id: 'backend',
    name: 'BACKEND & AI ENGINE',
    level: 2,
    description: 'Core application business logic, background queues, AI inference orchestrations, and event dispatch.',
    position: [0, -0.8, 0],
    color: '#3B82F6',
    items: ['Node.js & Fastify', 'LLM Agent Pipelines', 'Job Queues & Workers', 'Webhook Handlers'],
    techStack: ['Node.js', 'TypeScript', 'LangChain', 'BullMQ', 'Docker'],
    packetFlow: 'Executes computations & queries data persistence'
  },
  {
    id: 'database',
    name: 'DATA LAYER & CACHE',
    level: 1,
    description: 'Structured relational storage, transactional integrity, vector search embeddings, and memory caching.',
    position: [0, -2.4, 0],
    color: '#22D3EE',
    items: ['PostgreSQL Database', 'Row Level Security', 'Redis In-Memory Cache', 'Vector Indexing (pgvector)'],
    techStack: ['PostgreSQL', 'Supabase', 'Redis', 'Prisma', 'SQL'],
    packetFlow: 'Stores ACID transactions & serves sub-millisecond cached states'
  },
  {
    id: 'external',
    name: 'EXTERNAL SERVICES & INTEGRATIONS',
    level: 0,
    description: 'Third-party APIs, payment gateways, push notification services, and external cloud tools.',
    position: [0, -4.0, 0],
    color: '#10B981',
    items: ['Stripe Payments', 'OpenAI / Anthropic Models', 'SendGrid / Twilio', 'Cloud Storage S3'],
    techStack: ['Webhook Sync', 'REST APIs', 'Cloud KMS', 'Sentry'],
    packetFlow: 'Synchronizes external state and dispatches outgoing webhooks'
  }
];
