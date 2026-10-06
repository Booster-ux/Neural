import React from 'react';
import { X, ArrowDown, Activity, Sparkles, Server, Database, Globe, RefreshCw, Shield, Layers } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { NODES_DATA } from '../../data/nodes';

export const SystemMapModal: React.FC = () => {
  const { isMapOpen, toggleMap, selectNodeById, setViewMode } = useNeural();

  if (!isMapOpen) return null;

  const handleNodeClick = (nodeId: string) => {
    toggleMap(false);
    setViewMode('system');
    selectNodeById(nodeId);
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
        backgroundColor: 'rgba(3, 5, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={() => toggleMap(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '850px',
          background: 'rgba(12, 18, 32, 0.95)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(59, 130, 246, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: '#22D3EE',
                textTransform: 'uppercase'
              }}
            >
              SYSTEM BLUEPRINT // MAP
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#F8FAFC',
                margin: '4px 0 0 0'
              }}
            >
              Neural Architecture Topology
            </h2>
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
            <X size={18} />
          </button>
        </div>

        {/* Blueprint Graph Container */}
        <div
          style={{
            background: 'rgba(8, 13, 22, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Left Column: Applications & Automation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {appNode && (
              <div
                onClick={() => handleNodeClick(appNode.id)}
                className="blueprint-node"
                style={{
                  border: `1px solid ${appNode.color}55`,
                  background: 'rgba(6, 182, 212, 0.08)',
                  padding: '16px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: appNode.glowColor }}>
                  <Layers size={16} />
                  <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
                    {appNode.label}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '6px 0 0 0' }}>
                  Web, SaaS, Dashboards & Interactive UI
                </p>
              </div>
            )}

            {autoNode && (
              <div
                onClick={() => handleNodeClick(autoNode.id)}
                className="blueprint-node"
                style={{
                  border: `1px solid ${autoNode.color}55`,
                  background: 'rgba(236, 72, 153, 0.08)',
                  padding: '16px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: autoNode.glowColor }}>
                  <RefreshCw size={16} />
                  <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
                    {autoNode.label}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '6px 0 0 0' }}>
                  Event triggers, scheduled workers & sync
                </p>
              </div>
            )}
          </div>

          {/* Central Column: Main Core Backbone (AI -> APIs -> Backend -> Database) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {/* AI */}
            {aiNode && (
              <div
                onClick={() => handleNodeClick(aiNode.id)}
                className="blueprint-node"
                style={{
                  width: '100%',
                  border: `1px solid ${aiNode.color}`,
                  background: 'rgba(139, 92, 246, 0.12)',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: aiNode.glowColor }}>
                  <Sparkles size={16} />
                  <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
                    {aiNode.label}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>
                  LLMs, Agents & Decision Engine
                </div>
              </div>
            )}

            <ArrowDown size={14} color="#38BDF8" />

            {/* APIs */}
            {apisNode && (
              <div
                onClick={() => handleNodeClick(apisNode.id)}
                className="blueprint-node"
                style={{
                  width: '100%',
                  border: `1px solid ${apisNode.color}`,
                  background: 'rgba(56, 189, 248, 0.12)',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: apisNode.glowColor }}>
                  <Globe size={16} />
                  <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
                    {apisNode.label}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>
                  REST, Gateways & Integrations
                </div>
              </div>
            )}

            <ArrowDown size={14} color="#38BDF8" />

            {/* BACKEND */}
            {backendNode && (
              <div
                onClick={() => handleNodeClick(backendNode.id)}
                className="blueprint-node"
                style={{
                  width: '100%',
                  border: `1px solid ${backendNode.color}`,
                  background: 'rgba(59, 130, 246, 0.15)',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: backendNode.glowColor }}>
                  <Server size={16} />
                  <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
                    {backendNode.label}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>
                  Node.js, Auth & Business Engine
                </div>
              </div>
            )}

            <ArrowDown size={14} color="#38BDF8" />

            {/* DATABASE */}
            {dbNode && (
              <div
                onClick={() => handleNodeClick(dbNode.id)}
                className="blueprint-node"
                style={{
                  width: '100%',
                  border: `1px solid ${dbNode.color}`,
                  background: 'rgba(34, 211, 238, 0.12)',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: dbNode.glowColor }}>
                  <Database size={16} />
                  <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
                    {dbNode.label}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>
                  PostgreSQL, Supabase & RLS
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Security */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {secNode && (
              <div
                onClick={() => handleNodeClick(secNode.id)}
                className="blueprint-node"
                style={{
                  border: `1px solid ${secNode.color}55`,
                  background: 'rgba(16, 185, 129, 0.08)',
                  padding: '16px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: secNode.glowColor }}>
                  <Shield size={16} />
                  <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
                    {secNode.label}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '6px 0 0 0' }}>
                  Zero-Trust Auth, RBAC & Policy Verification
                </p>
              </div>
            )}

            <div
              style={{
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                padding: '16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
                <Activity size={14} />
                <span>INTERACTIVE TOPOLOGY</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: '#64748B', margin: 0 }}>
                Click any node in this diagram to smoothly navigate the 3D camera to its spatial position.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
