import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Wifi } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { SYSTEM_STATS } from '../../data/nodes';

export const StatusIndicator: React.FC = () => {
  const { isMobile, selectedNode } = useNeural();
  const [throughput, setThroughput] = useState(SYSTEM_STATS.throughput);
  const [packetCount, setPacketCount] = useState(14820);

  // Live telemetry pulse
  useEffect(() => {
    const interval = setInterval(() => {
      const baseThroughput = 1.8 + Math.random() * 0.15;
      setThroughput(`${baseThroughput.toFixed(2)} GB/s`);
      setPacketCount((prev) => prev + Math.floor(Math.random() * 12) + 8);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Hide on mobile if node panel is open
  if (isMobile && selectedNode) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        background: 'rgba(8, 13, 22, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        padding: '10px 14px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
        pointerEvents: 'none',
        maxWidth: isMobile ? '240px' : '300px'
      }}
    >
      {/* Primary Status Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="status-dot" />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#F8FAFC'
            }}
          >
            SYSTEM STATUS
          </span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            color: '#22D3EE',
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}
        >
          ● ONLINE
        </span>
      </div>

      {/* Sub Telemetry Metrics */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '6px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            color: '#94A3B8'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Wifi size={11} color="#38BDF8" /> STABILITY
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 500 }}>99.98%</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            color: '#94A3B8'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Cpu size={11} color="#8B5CF6" /> DATA FLOW
          </span>
          <span style={{ color: '#38BDF8', fontWeight: 500 }}>{throughput}</span>
        </div>

        {!isMobile && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: '#64748B'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={11} color="#10B981" /> PACKETS
            </span>
            <span style={{ color: '#94A3B8' }}>{packetCount.toLocaleString()} /s</span>
          </div>
        )}
      </div>
    </div>
  );
};
