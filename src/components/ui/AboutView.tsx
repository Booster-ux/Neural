import React from 'react';
import { Sparkles, Cpu, GitBranch, Database, Zap, ArrowRight } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';

const DOMAINS = [
  { label: 'SYSTEM DESIGN', icon: GitBranch, color: '#38BDF8', desc: 'Distributed architecture & resilient service mesh' },
  { label: 'AI INTEGRATION', icon: Sparkles, color: '#8B5CF6', desc: 'LLM agents, vector knowledge & autonomous pipelines' },
  { label: 'BACKEND ENGINEERING', icon: Cpu, color: '#3B82F6', desc: 'High-throughput business logic & event orchestration' },
  { label: 'DATABASE ARCHITECTURE', icon: Database, color: '#22D3EE', desc: 'ACID transactional integrity & row level security' },
  { label: 'AUTOMATION', icon: Zap, color: '#EC4899', desc: 'Zero-maintenance background tasks & synchronized workflows' },
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
              top: '90px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '860px',
              maxHeight: 'calc(100vh - 120px)',
            }),
        background: 'rgba(12, 18, 32, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: isMobile ? '20px' : '32px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 35px rgba(59, 130, 246, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
        animation: 'fadeInScale 0.3s ease-out'
      }}
    >
      {/* Header Statement */}
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
          MISSION & PHILOSOPHY
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isMobile ? '1.5rem' : '2.2rem',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#F8FAFC',
            margin: '8px 0 16px 0',
            letterSpacing: '-0.01em'
          }}
        >
          BUILDING SYSTEMS<br />
          THAT THINK,<br />
          <span style={{ color: '#38BDF8' }}>CONNECT AND SCALE.</span>
        </h1>
        <p
          style={{
            fontSize: '0.95rem',
            color: '#CBD5E1',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: 0
          }}
        >
          "NEURAL is an interactive visualization of modern software systems — where interfaces, APIs, intelligence, data and automation operate as one connected architecture."
        </p>
      </div>

      {/* Core Domains Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          return (
            <div
              key={domain.label}
              style={{
                background: 'rgba(8, 13, 22, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = domain.color)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${domain.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={16} color={domain.color} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#F8FAFC',
                    letterSpacing: '0.04em'
                  }}
                >
                  {domain.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '3px', lineHeight: 1.4 }}>
                  {domain.desc}
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
          paddingTop: '16px'
        }}
      >
        <button
          onClick={() => {
            setViewMode('system');
            selectNodeById('ai');
          }}
          className="btn-neural btn-neural-primary"
        >
          <span>EXPLORE AI LAYER</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={() => setViewMode('contact')}
          className="btn-neural"
        >
          <span>PROCEED TO CONTACT</span>
        </button>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: ${isMobile ? 'translateY(20px)' : 'translate(-50%, -10px)'}; }
          to { opacity: 1; transform: ${isMobile ? 'translateY(0)' : 'translate(-50%, 0)'}; }
        }
      `}</style>
    </div>
  );
};
