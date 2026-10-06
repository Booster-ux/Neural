import React, { useState, useEffect } from 'react';
import { useNeural } from '../../context/NeuralContext';
import { MousePointer, Compass } from 'lucide-react';

export const InitialHint: React.FC = () => {
  const { isBootComplete, selectedNode, viewMode, isMobile } = useNeural();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isBootComplete && viewMode === 'system' && !selectedNode) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 7000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isBootComplete, selectedNode, viewMode]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isMobile ? '80px' : '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 35,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(8, 13, 22, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: '8px 18px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        pointerEvents: 'none',
        animation: 'fadeInOut 7s forwards'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Compass size={14} color="#38BDF8" />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            color: '#CBD5E1',
            textTransform: 'uppercase'
          }}
        >
          {isMobile ? 'DRAG TO ROTATE' : 'MOVE TO EXPLORE'}
        </span>
      </div>
      <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>//</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <MousePointer size={14} color="#22D3EE" />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            color: '#22D3EE',
            textTransform: 'uppercase'
          }}
        >
          CLICK TO CONNECT
        </span>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, 10px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          80% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -10px); }
        }
      `}</style>
    </div>
  );
};
