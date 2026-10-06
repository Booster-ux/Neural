import React from 'react';
import { NODES_DATA } from '../../data/nodes';
import { ARCHITECTURE_LAYERS } from '../../data/architecture';

interface Fallback2DViewProps {
  onRetry?: () => void;
}

export const Fallback2DView: React.FC<Fallback2DViewProps> = ({ onRetry }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#03050A',
        color: '#F8FAFC',
        overflowY: 'auto',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '640px' }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '2.2rem',
            fontWeight: 800,
            letterSpacing: '0.2em',
            margin: 0
          }}
        >
          NEURAL
        </h1>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem',
            color: '#EC4899',
            marginTop: '8px',
            letterSpacing: '0.12em'
          }}
        >
          ● 3D ENVIRONMENT UNAVAILABLE // 2D COMPATIBILITY MODE
        </div>
        <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginTop: '12px' }}>
          Your browser or device does not have hardware-accelerated WebGL available. 
          Presenting the full NEURAL system architecture in 2D blueprint mode.
        </p>
        {onRetry && (
          <button onClick={onRetry} className="btn-neural btn-neural-primary" style={{ marginTop: '12px' }}>
            RELOAD 3D GRAPHICS
          </button>
        )}
      </div>

      {/* Nodes Architecture Grid */}
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}
      >
        {NODES_DATA.map((node) => (
          <div
            key={node.id}
            style={{
              background: 'rgba(12, 18, 32, 0.9)',
              border: `1px solid ${node.color}55`,
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: node.glowColor, fontWeight: 700 }}>
                {node.label}
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#10B981' }}>
                ONLINE
              </span>
            </div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', margin: 0 }}>
              {node.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: 0 }}>
              {node.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 'auto' }}>
              {node.techLabels.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    color: '#CBD5E1'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Layered System Stack */}
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          background: 'rgba(12, 18, 32, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', margin: 0 }}>
          SYSTEM ARCHITECTURE STACK
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {ARCHITECTURE_LAYERS.map((layer) => (
            <div
              key={layer.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: 'rgba(8, 13, 22, 0.7)',
                border: `1px solid ${layer.color}33`,
                borderRadius: '8px'
              }}
            >
              <div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: layer.color, fontWeight: 700, marginRight: '10px' }}>
                  L{layer.level}
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{layer.name}</span>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                  {layer.description}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {layer.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.7rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      color: '#E2E8F0'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
