import React from 'react';
import { Layers, ArrowDownUp, CheckCircle, Database, Server, Globe, Sparkles, Shield } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { ARCHITECTURE_LAYERS } from '../../data/architecture';

export const ArchitectureView: React.FC = () => {
  const { selectedLayerId, setSelectedLayerId, isMobile } = useNeural();

  const selectedLayer = ARCHITECTURE_LAYERS.find((l) => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[0];

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 55,
        ...(isMobile
          ? {
              bottom: '16px',
              left: '16px',
              right: '16px',
              maxHeight: '65vh',
            }
          : {
              top: '90px',
              left: '32px',
              width: '420px',
            }),
        background: 'rgba(12, 18, 32, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(59, 130, 246, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        animation: 'slideInLeft 0.3s ease-out',
        maxHeight: isMobile ? '65vh' : 'calc(100vh - 120px)',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: '#38BDF8',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Layers size={14} />
          <span>LAYERED ARCHITECTURE STACK</span>
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#F8FAFC',
            margin: '4px 0 0 0'
          }}
        >
          Full-Stack Topology
        </h2>
      </div>

      {/* Layer selector tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {ARCHITECTURE_LAYERS.map((layer) => {
          const isSelected = selectedLayer.id === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setSelectedLayerId(layer.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                border: isSelected ? `1px solid ${layer.color}` : '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                color: isSelected ? '#FFFFFF' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.2s ease-out',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.74rem',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: layer.color, fontWeight: 700 }}>L{layer.level}</span>
                <span>{layer.name}</span>
              </div>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isSelected ? layer.color : 'transparent',
                  border: `1px solid ${layer.color}`
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Selected layer deep-dive */}
      <div
        style={{
          background: 'rgba(8, 13, 22, 0.7)',
          border: `1px solid ${selectedLayer.color}44`,
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem',
              color: selectedLayer.color,
              fontWeight: 700
            }}
          >
            ACTIVE LAYER: LEVEL {selectedLayer.level}
          </div>
          <p style={{ fontSize: '0.82rem', color: '#E2E8F0', margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {selectedLayer.description}
          </p>
        </div>

        {/* Data Packet Stream */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '8px 10px',
            borderRadius: '6px',
            fontSize: '0.74rem',
            color: '#38BDF8',
            fontFamily: "'JetBrains Mono', monospace"
          }}
        >
          <ArrowDownUp size={14} />
          <span>{selectedLayer.packetFlow}</span>
        </div>

        {/* Tech Stack Pills */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem',
              color: '#94A3B8',
              marginBottom: '6px'
            }}
          >
            STANDARDS & TECHNOLOGIES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedLayer.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: '0.74rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#F8FAFC',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
