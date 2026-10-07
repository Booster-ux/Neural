export type ViewMode = 'system' | 'architecture' | 'about' | 'contact';

export type CoreState = 'idle' | 'observing' | 'processing' | 'connected' | 'root_access';

export type ConnectionType = 'primary' | 'secondary' | 'active' | 'cross_cutting';

export interface TechNode {
  id: string;
  label: string;
  title: string;
  category: 'ai' | 'backend' | 'database' | 'api' | 'automation' | 'security' | 'applications';
  position: [number, number, number];
  color: string;
  glowColor: string;
  accentColor: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  techLabels: string[];
  connections: string[]; // IDs of connected nodes
  metrics: {
    throughput: string;
    latency: string;
    uptime: string;
    reliability: string;
    load: string;
  };
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  level: number;
  description: string;
  position: [number, number, number];
  color: string;
  items: string[];
  techStack: string[];
  packetFlow: string;
}

export interface ConnectionLink {
  id: string;
  from: string;
  to: string;
  type: ConnectionType;
  color?: string;
  speed: number;
  particleCount: number;
  description?: string;
}

export interface SystemStats {
  nodesCount: number;
  connectionsCount: number;
  dataFlowStatus: string;
  securityStatus: string;
  systemStatus: string;
  stability: string;
  throughput: string;
}

export interface NodeTelemetry {
  nodeId: string;
  load: number;
  latency: number;
  throughput: number;
  packetsPerSec: number;
  activeConnections: number;
}

