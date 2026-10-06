export type ViewMode = 'system' | 'architecture' | 'about' | 'contact';

export interface TechNode {
  id: string;
  label: string;
  title: string;
  category: 'ai' | 'backend' | 'database' | 'api' | 'automation' | 'security' | 'applications';
  position: [number, number, number];
  color: string;
  glowColor: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  techLabels: string[];
  connections: string[]; // IDs of connected nodes
  metrics: {
    throughput?: string;
    latency?: string;
    uptime?: string;
    reliability?: string;
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
  color?: string;
  speed: number;
  particleCount: number;
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
