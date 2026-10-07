import React, { useState } from 'react';
import { X, Sparkles, Server, Database, Globe, RefreshCw, Shield, Layers, Radio, Activity, CornerUpRight } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { NODES_DATA, CONNECTIONS_DATA } from '../../data/nodes';
import { soundManager } from '../../services/soundService';

export const SystemMapModal: React.FC = () => {
  const { isMapOpen, toggleMap, selectNodeById, setViewMode } = useNeural();
  const [activeRoutingNode, setActiveRoutingNode] = useState<string | null>(null);

  if (!isMapOpen) return null;

  const handleNodeClick = (nodeId: string) => {
    setActiveRoutingNode(nodeId);
    soundManager.playSelect();

    setTimeout(() => {
      toggleMap(false);
      setViewMode('system');
      selectNodeById(nodeId);
      setActiveRoutingNode(null);
    }, 450);
  };

  const getNode = (id: string) => NODES_DATA.find(n => n.id === id);

  const aiNode = getNode('ai');
  const apisNode = getNode('apis');
  const backendNode = getNode('backend');
  const dbNode = getNode('database');
  const secNode = getNode('security');
  const autoNode = getNode('automation');
  const appNode = getNode('applications');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        backgroundColor: 'rgba(3, 5, 10, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeInMap 0.2s ease-out'
      }}
      onClick={() => toggleMap(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          background: 'rgba(8, 13, 22, 0.96)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '24px 28px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.85), 0 0 40px rgba(59, 130, 246, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'relative',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with LIVE telemetry badge (Section 16) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                color: '#22D3EE',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Radio size={12} color="#22D3EE" className="animate-pulse" />
              <span>SYSTEM BLUEPRINT // NETWORK TOPOLOGY</span>
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#F8FAFC',
                margin: '3px 0 0 0'
              }}
            >
              Interactive Architectural Map
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '4px 10px',
                borderRadius: '20px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: '#10B981',
                fontWeight: 700
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
              <span>LIVE</span>
            </div>

            <button
              onClick={() => toggleMap(false)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Technical Blueprint Grid */}
        <div
          style={{
            background: 'rgba(5, 9, 16, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            borderRadius: '12px',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '18px',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Left Column: Applications & Automation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {appNode && (
              <div
                onClick={() => handleNodeClick(appNode.id)}
                className={`blueprint-node ${activeRoutingNode === appNode.id ? 'routing-active' : ''}`}
                style={{
                  border: `1px solid ${appNode.color}66`,
                  background: 'rgba(6, 182, 212, 0.08)',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: appNode.glowColor }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={15} />
                    <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
                      {appNode.label}
                    </span>
                  </div>
                  <CornerUpRight size={13} color={appNode.glowColor} />
                </div>
                <p style={{ fontSize: '0.72rem', color: '#94A3B8', margin: '6px 0 0 0', lineHeight: 1.4 }}>
                  Client UI, SaaS applications & WebGL state
                </p>
              </div>
            )}

            {autoNode && (
              <div
                onClick={() => handleNodeClick(autoNode.id)}
                className={`blueprint-node ${activeRoutingNode === autoNode.id ? 'routing-active' : ''}`}
                style={{
                  border: `1px solid ${autoNode.color}66`,
                  background: 'rgba(236, 72, 153, 0.08)',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: autoNode.glowColor }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw size={15} />
                    <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
                      {autoNode.label}
                    </span>
                  </div>
                  <CornerUpRight size={13} color={autoNode.glowColor} />
                </div>
                <p style={{ fontSize: '0.72rem', color: '#94A3B8', margin: '6px 0 0 0', lineHeight: 1.4 }}>
                  Self-healing queues, sync runners & background cron
                </p>
              </div>
            )}
          </div>

          {/* Central Backbone: AI -> APIs -> Backend -> Database */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {/* AI */}
            {aiNode && (
              <div
                onClick={() => handleNodeClick(aiNode.id)}
                className={`blueprint-node ${activeRoutingNode === aiNode.id ? 'routing-active' : ''}`}
                style={{
                  width: '100%',
                  border: `1px solid ${aiNode.color}`,
                  background: 'rgba(139, 92, 246, 0.12)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: aiNode.glowColor }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={15} />
                    <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
                      {aiNode.label}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#C084FC' }}>
                    REASONING CORE
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#CBD5E1', marginTop: '4px' }}>
                  Multi-Agent LLM Orchestration & RAG
                </div>
              </div>
            )}

            <div style={{ width: '2px', height: '14px', background: 'linear-gradient(to bottom, #8B5CF6, #38BDF8)' }} />

            {/* APIs */}
            {apisNode && (
              <div
                onClick={() => handleNodeClick(apisNode.id)}
                className={`blueprint-node ${activeRoutingNode === apisNode.id ? 'routing-active' : ''}`}
                style={{
                  width: '100%',
                  border: `1px solid ${apisNode.color}`,
                  background: 'rgba(56, 189, 248, 0.12)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: apisNode.glowColor }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Globe size={15} />
                    <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
                      {apisNode.label}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#7DD3FC' }}>
                    GATEWAY MESH
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#CBD5E1', marginTop: '4px' }}>
                  REST, GraphQL, Rate Limiting & Webhooks
                </div>
              </div>
            )}

            <div style={{ width: '2px', height: '14px', background: 'linear-gradient(to bottom, #38BDF8, #3B82F6)' }} />

            {/* BACKEND */}
            {backendNode && (
              <div
                onClick={() => handleNodeClick(backendNode.id)}
                className={`blueprint-node ${activeRoutingNode === backendNode.id ? 'routing-active' : ''}`}
                style={{
                  width: '100%',
                  border: `1px solid ${backendNode.color}`,
                  background: 'rgba(59, 130, 246, 0.14)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: backendNode.glowColor }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Server size={15} />
                    <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
                      {backendNode.label}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#60A5FA' }}>
                    SERVICE ENGINE
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#CBD5E1', marginTop: '4px' }}>
                  Node.js, Event Pipelines & Business Logic
                </div>
              </div>
            )}

            <div style={{ width: '2px', height: '14px', background: 'linear-gradient(to bottom, #3B82F6, #22D3EE)' }} />

            {/* DATABASE */}
            {dbNode && (
              <div
                onClick={() => handleNodeClick(dbNode.id)}
                className={`blueprint-node ${activeRoutingNode === dbNode.id ? 'routing-active' : ''}`}
                style={{
                  width: '100%',
                  border: `1px solid ${dbNode.color}`,
                  background: 'rgba(34, 211, 238, 0.12)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: dbNode.glowColor }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Database size={15} />
                    <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
                      {dbNode.label}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#67E8F9' }}>
                    PERSISTENCE LAYER
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#CBD5E1', marginTop: '4px' }}>
                  PostgreSQL, pgvector, Redis & RLS Policies
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Security cross-cutting */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {secNode && (
              <div
                onClick={() => handleNodeClick(secNode.id)}
                className={`blueprint-node ${activeRoutingNode === secNode.id ? 'routing-active' : ''}`}
                style={{
                  border: `1px solid ${secNode.color}66`,
                  background: 'rgba(16, 185, 129, 0.08)',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: secNode.glowColor }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={15} />
                    <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
                      {secNode.label}
                    </span>
                  </div>
                  <CornerUpRight size={13} color={secNode.glowColor} />
                </div>
                <p style={{ fontSize: '0.72rem', color: '#94A3B8', margin: '6px 0 0 0', lineHeight: 1.4 }}>
                  Zero-Trust Auth, RBAC & Cross-Cutting Cryptographic Gate
                </p>
              </div>
            )}

            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace" }}>
                <Activity size={13} />
                <span>SIGNAL ROUTER</span>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Select any node to dispatch a signal route and focus the 3D interactive viewport.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#64748B' }}>
            7 NODES // 14 HIGH-SPEED ROUTES
          </div>
          <button onClick={() => toggleMap(false)} className="btn-neural">
            CLOSE MAP
          </button>
        </div>
      </div>

      <style>{`
        .blueprint-node {
          transition: all 0.2s ease-out;
        }
        .blueprint-node:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.25);
          filter: brightness(1.15);
        }
        .blueprint-node.routing-active {
          border-color: #22D3EE !important;
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.5) !important;
          transform: scale(1.02);
        }
        @keyframes fadeInMap {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

