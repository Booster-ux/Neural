import React, { useState, useEffect } from 'react';
import { Activity, Cpu, ShieldCheck, Zap, X } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';

export const SystemInspector: React.FC = () => {
  const { selectedNode, isMobile, isInspectorOpen, toggleInspector } = useNeural();

  const [metrics, setMetrics] = useState({
    load: 38,
    latency: 16,
    dataFlow: '1.82 MB/s',
    packets: 1824
  });

  // Periodically update simulated metrics with organic jitter (Section 19)
  useEffect(() => {
    if (!selectedNode) return;

    // Initialize with node's baseline
    const baseLoad = parseInt(selectedNode.metrics.load) || 40;
    const baseLatency = parseInt(selectedNode.metrics.latency) || 12;

    setMetrics({
      load: baseLoad,
      latency: baseLatency,
      dataFlow: (1.6 + Math.random() * 0.4).toFixed(2) + ' MB/s',
      packets: 1800 + Math.floor(Math.random() * 50)
    });

    const timer = setInterval(() => {
      setMetrics((prev) => {
        const jitterLoad = Math.max(15, Math.min(88, baseLoad + Math.floor(Math.random() * 9) - 4));
        const jitterLatency = Math.max(2, Math.min(45, baseLatency + Math.floor(Math.random() * 5) - 2));
        const jitterFlow = (1.5 + Math.random() * 0.5).toFixed(2) + ' MB/s';
        const jitterPackets = prev.packets + Math.floor(Math.random() * 12) + 3;

        return {
          load: jitterLoad,
          latency: jitterLatency,
          dataFlow: jitterFlow,
          packets: jitterPackets
        };
      });
    }, 2400);

    return () => clearInterval(timer);
  }, [selectedNode]);

  if (!selectedNode || !isInspectorOpen || isMobile) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 45,
        width: '280px',
        background: 'rgba(8, 13, 22, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '14px 16px',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(59, 130, 246, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        animation: 'slideUpInspector 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity size={13} color="#22D3EE" />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#F8FAFC'
            }}
          >
            SYSTEM INSPECTOR
          </span>
        </div>
        <button
          onClick={() => toggleInspector(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Minimize Inspector"
        >
          <X size={13} />
        </button>
      </div>

      {/* Node label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          paddingBottom: '8px'
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#94A3B8' }}>
          SYSTEM
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem',
            fontWeight: 700,
            color: selectedNode.glowColor
          }}
        >
          {selectedNode.label}
        </span>
      </div>

      {/* Metrics Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748B' }}>STATUS</span>
          <span style={{ color: '#10B981', fontWeight: 600 }}>OPERATIONAL</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748B' }}>LOAD</span>
          <span style={{ color: metrics.load > 70 ? '#F59E0B' : '#F8FAFC', fontWeight: 600 }}>
            {metrics.load}%
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748B' }}>CONNECTIONS</span>
          <span style={{ color: '#38BDF8', fontWeight: 600 }}>{selectedNode.connections.length} ROUTES</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748B' }}>DATA FLOW</span>
          <span style={{ color: '#22D3EE', fontWeight: 600 }}>{metrics.dataFlow}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748B' }}>LATENCY</span>
          <span style={{ color: '#A78BFA', fontWeight: 600 }}>{metrics.latency} ms</span>
        </div>
      </div>

      {/* Simulated Notice */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          color: '#475569',
          letterSpacing: '0.06em'
        }}
      >
        <span>SIMULATED TELEMETRY</span>
        <span style={{ color: '#22D3EE' }}>LIVE</span>
      </div>

      <style>{`
        @keyframes slideUpInspector {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
