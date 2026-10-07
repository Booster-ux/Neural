import React, { useState, useEffect } from 'react';
import { Terminal, X, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';

export const EasterEggModal: React.FC = () => {
  const { easterEggType, triggerEasterEgg } = useNeural();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!easterEggType) {
      setLogs([]);
      return;
    }

    if (easterEggType === 'root_access') {
      const msgs = [
        'INITIALIZING SU-SESSION...',
        'AUTHENTICATION ACCEPTED',
        'ACCESS LEVEL: [SUPERUSER // ROOT]',
        'SYSTEM ARCHITECTURE UNLOCKED',
        'SYS_STATUS: ALL 7 NODES SYNCHRONIZED',
        'OPERATOR OVERRIDE ACTIVE. ARCHITECTURE FULLY ACCESSIBLE.'
      ];
      msgs.forEach((msg, idx) => {
        setTimeout(() => setLogs((prev) => [...prev, msg]), idx * 120);
      });
    } else if (easterEggType === 'human_404') {
      const msgs = [
        'COORDINATE [2.9, 2.5, -1.8] INSPECTED',
        'AUTONOMOUS AGENT DETECTED IN NEURAL LATTICE',
        'INTELLIGENCE IS DISTRIBUTED & CONNECTED',
        'RESUMING ARCHITECTURAL STREAM...'
      ];
      msgs.forEach((msg, idx) => {
        setTimeout(() => setLogs((prev) => [...prev, msg]), idx * 120);
      });
    }
  }, [easterEggType]);

  if (!easterEggType) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(3, 5, 10, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeInEgg 0.2s ease-out'
      }}
      onClick={() => triggerEasterEgg(null)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'rgba(8, 13, 22, 0.98)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 35px rgba(59, 130, 246, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header (Section 21) */}
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(12, 18, 32, 0.9)',
            borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={15} color="#38BDF8" />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#F8FAFC',
                letterSpacing: '0.1em'
              }}
            >
              {easterEggType === 'root_access' ? 'ROOT ACCESS // GRANTED' : 'SYSTEM EXCEPTION'}
            </span>
          </div>
          <button
            onClick={() => triggerEasterEgg(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Terminal Screen */}
        <div
          style={{
            padding: '18px 20px',
            background: '#03050A',
            minHeight: '150px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.74rem',
            lineHeight: 1.75,
            color: '#38BDF8',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px'
          }}
        >
          {logs.map((log, index) => (
            <div key={index} style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#64748B' }}>&gt;</span>
              <span style={{ color: log.includes('ACCEPTED') || log.includes('UNLOCKED') ? '#22D3EE' : '#CBD5E1' }}>
                {log}
              </span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px', animation: 'blink 1s infinite' }}>
            <span style={{ color: '#22D3EE' }}>_</span>
          </div>
        </div>

        {/* Action Button */}
        <div
          style={{
            padding: '10px 16px',
            background: 'rgba(8, 13, 22, 0.8)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button onClick={() => triggerEasterEgg(null)} className="btn-neural btn-neural-highlight" style={{ padding: '6px 14px', fontSize: '0.72rem' }}>
            ACKNOWLEDGE & CONTINUE
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInEgg {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

