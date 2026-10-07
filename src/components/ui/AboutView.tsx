import React from 'react';
import { Sparkles, Server, Database, Globe, RefreshCw, Shield, Layers, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';

const MODULES = [
  { id: 'ai', label: 'AI & INTELLIGENCE', icon: Sparkles, color: '#8B5CF6', desc: 'Autonomous reasoning, agentic tool workflows & vector retrieval' },
  { id: 'apis', label: 'API MESH', icon: Globe, color: '#38BDF8', desc: 'High-speed gateway mesh, rate limiting & webhook delivery' },
  { id: 'backend', label: 'BACKEND ENGINE', icon: Server, color: '#3B82F6', desc: 'Distributed transaction processing & microservice logic' },
  { id: 'database', label: 'DATA LAYER', icon: Database, color: '#22D3EE', desc: 'ACID relational models, memory caching & row level security' },
  { id: 'automation', label: 'AUTOMATION', icon: RefreshCw, color: '#EC4899', desc: 'Self-healing background queues & event-driven schedulers' },
  { id: 'security', label: 'SECURITY', icon: Shield, color: '#10B981', desc: 'Zero-trust authorization, cryptographic gates & access control' },
];

export const AboutView: React.FC = () => {
  const { setViewMode, selectNodeById, isMobile } = useNeural();

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 55,
        ...(isMobile
          ? {
              inset: '70px 16px 16px 16px',
            }
          : {
              top: '84px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '820px',
              maxHeight: 'calc(100vh - 110px)',
            }),
        background: 'rgba(8, 13, 22, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: isMobile ? '20px' : '28px 32px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.85), 0 0 35px rgba(59, 130, 246, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflowY: 'auto',
        animation: 'fadeInScaleAbout 0.25s ease-out'
      }}
    >
      {/* Header Purpose (Section 38) */}
      <div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            color: '#22D3EE',
            textTransform: 'uppercase'
          }}
        >
          SYSTEM PURPOSE // ARCHITECTURE
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isMobile ? '1.45rem' : '2.0rem',
            fontWeight: 800,
            lineHeight: 1.2,
            color: '#F8FAFC',
            margin: '6px 0 12px 0',
            letterSpacing: '-0.01em'
          }}
        >
          CONNECTED INTELLIGENCE & ARCHITECTURE.
        </h1>
        <p
          style={{
            fontSize: '0.9rem',
            color: '#CBD5E1',
            lineHeight: 1.65,
            margin: 0,
            maxWidth: '720px'
          }}
        >
          NEURAL is an interactive visualization of how modern digital systems connect intelligence, interfaces, APIs, backend services, data and automation into one continuous processing network.
        </p>
      </div>

      {/* System Modules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '10px' }}>
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              onClick={() => {
                setViewMode('system');
                selectNodeById(mod.id);
              }}
              style={{
                background: 'rgba(12, 18, 32, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = mod.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: `${mod.color}18`,
                  border: `1px solid ${mod.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={16} color={mod.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#F8FAFC',
                    letterSpacing: '0.04em'
                  }}
                >
                  <span>{mod.label}</span>
                  <ArrowRight size={12} color={mod.color} />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '3px', lineHeight: 1.4 }}>
                  {mod.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '14px'
        }}
      >
        <button
          onClick={() => {
            setViewMode('system');
            selectNodeById('ai');
          }}
          className="btn-neural btn-neural-primary"
        >
          <span>INSPECT AI NODE</span>
          <ArrowRight size={13} />
        </button>

        <button
          onClick={() => setViewMode('contact')}
          className="btn-neural"
        >
          <span>VIEW SYSTEM READY // EXIT</span>
        </button>
      </div>

      <style>{`
        @keyframes fadeInScaleAbout {
          from { opacity: 0; transform: ${isMobile ? 'translateY(16px)' : 'translate(-50%, -8px)'}; }
          to { opacity: 1; transform: ${isMobile ? 'translateY(0)' : 'translate(-50%, 0)'}; }
        }
      `}</style>
    </div>
  );
};

