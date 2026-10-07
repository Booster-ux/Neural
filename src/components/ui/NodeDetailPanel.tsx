import React from 'react';
import { X, Sparkles, Server, Database, Globe, RefreshCw, Shield, Layers, ArrowRight, CornerDownLeft, Eye } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { NODES_DATA } from '../../data/nodes';

export const NodeDetailPanel: React.FC = () => {
  const {
    selectedNode,
    selectNodeById,
    returnToCore,
    isMobile
  } = useNeural();

  if (!selectedNode) return null;

  // Icon mapping
  const renderCategoryIcon = (category: string) => {
    const size = 18;
    const color = selectedNode.glowColor;
    switch (category) {
      case 'ai': return <Sparkles size={size} color={color} />;
      case 'backend': return <Server size={size} color={color} />;
      case 'database': return <Database size={size} color={color} />;
      case 'api': return <Globe size={size} color={color} />;
      case 'automation': return <RefreshCw size={size} color={color} />;
      case 'security': return <Shield size={size} color={color} />;
      case 'applications': return <Layers size={size} color={color} />;
      default: return <Server size={size} color={color} />;
    }
  };

  // Connected nodes details
  const connectedNodes = NODES_DATA.filter((n) => selectedNode.connections.includes(n.id));

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 60,
        ...(isMobile
          ? {
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: '75vh',
              borderRadius: '20px 20px 0 0',
              borderTop: `1px solid ${selectedNode.color}66`,
            }
          : {
              top: '84px',
              right: '24px',
              bottom: '24px',
              width: '360px',
              borderRadius: '14px',
              border: `1px solid rgba(255, 255, 255, 0.1)`,
            }),
        background: 'rgba(8, 13, 22, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px ${selectedNode.color}22`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: isMobile ? 'slideUp 0.25s ease-out' : 'slideLeft 0.25s ease-out'
      }}
    >
      {/* Header bar */}
      <div
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(12, 18, 32, 0.6)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `${selectedNode.color}22`,
              border: `1px solid ${selectedNode.color}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 12px ${selectedNode.color}26`
            }}
          >
            {renderCategoryIcon(selectedNode.category)}
          </div>
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: selectedNode.glowColor,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: selectedNode.glowColor,
                  boxShadow: `0 0 6px ${selectedNode.glowColor}`
                }}
              />
              NODE // ONLINE
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: '#F8FAFC',
                margin: '1px 0 0 0'
              }}
            >
              {selectedNode.title}
            </h2>
          </div>
        </div>

        <button
          onClick={() => selectNodeById(null)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
          title="Close panel (Esc)"
        >
          <X size={17} />
        </button>
      </div>

      {/* Scrollable body content */}
      <div
        style={{
          padding: '18px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: 1
        }}
      >
        {/* Concise description (Section 14) */}
        <p
          style={{
            fontSize: '0.85rem',
            color: '#CBD5E1',
            lineHeight: 1.55,
            margin: 0
          }}
        >
          {selectedNode.description}
        </p>

        {/* Capabilities list */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              color: '#94A3B8',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}
          >
            CAPABILITIES
          </div>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}
          >
            {selectedNode.capabilities.map((cap) => (
              <li
                key={cap}
                style={{
                  fontSize: '0.8rem',
                  color: '#E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ color: selectedNode.glowColor, fontSize: '0.85rem' }}>▹</span>
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              color: '#94A3B8',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}
          >
            STACK & STANDARDS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {selectedNode.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: '0.74rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#F1F5F9',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '3px 8px',
                  borderRadius: '5px'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Connected Systems */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              color: '#94A3B8',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}
          >
            CONNECTED SYSTEMS ({connectedNodes.length})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
            {connectedNodes.map((conn) => (
              <button
                key={conn.id}
                onClick={() => selectNodeById(conn.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 9px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '6px',
                  color: '#E2E8F0',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = conn.color;
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.color = '#E2E8F0';
                }}
              >
                <span>{conn.label}</span>
                <ArrowRight size={11} color={conn.glowColor} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer primary action (Section 14) */}
      <div
        style={{
          padding: '14px 18px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(8, 13, 22, 0.85)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <button
          onClick={() => {
            const nextNode = connectedNodes[0];
            if (nextNode) selectNodeById(nextNode.id);
          }}
          className="btn-neural btn-neural-highlight"
          style={{ width: '100%', padding: '8px 14px' }}
        >
          <Eye size={13} />
          <span>FOCUS SYSTEM CONNECTION</span>
        </button>

        <button
          onClick={returnToCore}
          className="btn-neural"
          style={{ width: '100%', padding: '7px 14px' }}
        >
          <CornerDownLeft size={13} />
          <span>RETURN TO OVERVIEW</span>
        </button>
      </div>

      <style>{`
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

