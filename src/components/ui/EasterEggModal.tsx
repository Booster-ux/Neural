import React, { useState, useEffect } from 'react';
import { Terminal, X, ShieldAlert, Cpu } from 'lucide-react';
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
        'SECURITY PROTOCOL BYPASSED',
        'ACCESS LEVEL: [SUPERUSER // ROOT]',
        'NEURAL CORE MATRIX UNLOCKED',
        'SYS_DEBUG: TRUE',
        'WELCOME, OPERATOR. ALL ARCHITECTURE PARAMETERS UNDER YOUR COMMAND.'
      ];
      msgs.forEach((msg, idx) => {
        setTimeout(() => setLogs((prev) => [...prev, msg]), idx * 150);
      });
    } else if (easterEggType === 'human_404') {
      const msgs = [
        'ERROR 404: HUMAN COMPONENT NOT FOUND',
        'AUTONOMOUS AGENT DETECTED AT COORD [2.9, 2.5, -1.8]',
        'INTELLIGENCE IS NOW PURELY SYNTHETIC',
        'RESUMING NEURAL CONVERGENCE...'
      ];
      msgs.forEach((msg, idx) => {
        setTimeout(() => setLogs((prev) => [...prev, msg]), idx * 150);
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
        backgroundColor: 'rgba(3, 5, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={() => triggerEasterEgg(null)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(12, 18, 32, 0.98)',
          border: '1px solid #22D3EE',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(34, 211, 238, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(8, 13, 22, 0.9)',
            borderBottom: '1px solid rgba(34, 211, 238, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {easterEggType === 'root_access' ? <ShieldAlert size={16} color="#22D3EE" /> : <Cpu size={16} color="#EC4899" />}
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.78rem',
                fontWeight: 700,
                color: easterEggType === 'root_access' ? '#22D3EE' : '#EC4899',
                letterSpacing: '0.1em'
              }}
            >
              {easterEggType === 'root_access' ? 'ROOT ACCESS GRANTED' : '404: HUMAN NOT FOUND'}
            </span>
          </div>
          <button
            onClick={() => triggerEasterEgg(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Terminal Screen */}
        <div
          style={{
            padding: '20px',
            background: '#03050A',
            minHeight: '160px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.76rem',
            lineHeight: 1.8,
            color: '#38BDF8',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          {logs.map((log, index) => (
            <div key={index} style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#64748B' }}>&gt;</span>
              <span>{log}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px', animation: 'blink 1s infinite' }}>
            <span style={{ color: '#22D3EE' }}>_</span>
          </div>
        </div>

        {/* Action Button */}
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(8, 13, 22, 0.8)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button onClick={() => triggerEasterEgg(null)} className="btn-neural btn-neural-highlight">
            ACKNOWLEDGE & EXIT
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
