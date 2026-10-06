import React from 'react';
import { X, Sparkles, Server, Database, Globe, RefreshCw, Shield, Layers, ArrowRight, CornerDownLeft } from 'lucide-react';
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
    const size = 20;
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
              maxHeight: '78vh',
              borderRadius: '20px 20px 0 0',
              borderTop: `1px solid ${selectedNode.color}44`,
            }
          : {
              top: '80px',
              right: '24px',
              bottom: '24px',
              width: '380px',
              borderRadius: '16px',
              border: `1px solid ${selectedNode.color}44`,
            }),
        background: 'rgba(12, 18, 32, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px ${selectedNode.color}22`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: isMobile ? 'slideUp 0.3s ease-out' : 'slideLeft 0.3s ease-out'
      }}
    >
      {/* Header bar */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(8, 13, 22, 0.6)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: `${selectedNode.color}26`,
              border: `1px solid ${selectedNode.color}66`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 16px ${selectedNode.color}33`
            }}
          >
            {renderCategoryIcon(selectedNode.category)}
          </div>
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
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
                  boxShadow: `0 0 8px ${selectedNode.glowColor}`
                }}
              />
              NODE STATUS // ONLINE
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#F8FAFC',
                margin: '2px 0 0 0'
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
          <X size={18} />
        </button>
      </div>

      {/* Scrollable body content */}
      <div
        style={{
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          flex: 1
        }}
      >
        {/* Short description */}
        <p
          style={{
            fontSize: '0.88rem',
            color: '#E2E8F0',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          "{selectedNode.description}"
        </p>

        {/* Technical stack tags */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: '#94A3B8',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}
          >
            TECHNICAL LABELS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedNode.techLabels.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: selectedNode.glowColor,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${selectedNode.color}33`,
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Capabilities list */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: '#94A3B8',
              marginBottom: '8px',
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
              gap: '6px'
            }}
          >
            {selectedNode.capabilities.map((cap) => (
              <li
                key={cap}
                style={{
                  fontSize: '0.82rem',
                  color: '#CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ color: selectedNode.glowColor, fontSize: '0.9rem' }}>▹</span>
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
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: '#94A3B8',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}
          >
            TECHNOLOGY STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedNode.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: '0.78rem',
                  color: '#F1F5F9',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '4px 10px',
                  borderRadius: '6px'
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
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: '#94A3B8',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}
          >
            CONNECTED SYSTEMS
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
                  padding: '7px 10px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  color: '#E2E8F0',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = conn.color;
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#E2E8F0';
                }}
              >
                <span>{conn.label}</span>
                <ArrowRight size={12} color={conn.glowColor} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer action buttons */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(8, 13, 22, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <button
          onClick={() => {
            // Jump to the first connected node or cycle
            const nextNode = connectedNodes[0];
            if (nextNode) selectNodeById(nextNode.id);
          }}
          className="btn-neural btn-neural-highlight"
          style={{ width: '100%', padding: '9px 14px' }}
        >
          <ArrowRight size={14} />
          <span>EXPLORE CONNECTIONS</span>
        </button>

        <button
          onClick={returnToCore}
          className="btn-neural"
          style={{ width: '100%', padding: '8px 14px' }}
        >
          <CornerDownLeft size={14} />
          <span>RETURN TO CORE</span>
        </button>
      </div>

      {/* Inline styles for keyframe animations */}
      <style>{`
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(30px); }
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
