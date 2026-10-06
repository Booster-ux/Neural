import React from 'react';
import { Cpu, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { SYSTEM_STATS } from '../../data/nodes';

export const CoreOverlay: React.FC = () => {
  const { cameraDistance, cameraFocusTarget, selectNodeById, returnToCore, isMobile } = useNeural();

  // Core is active if focus is at [0,0,0] and distance is close (6)
  const isCoreFocused = cameraFocusTarget &&
    cameraFocusTarget[0] === 0 &&
    cameraFocusTarget[1] === 0 &&
    cameraFocusTarget[2] === 0 &&
    cameraDistance <= 7;

  if (!isCoreFocused) return null;

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
            }
          : {
              top: '90px',
              right: '32px',
              width: '380px',
            }),
        background: 'rgba(12, 18, 32, 0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(59, 130, 246, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        animation: 'fadeInScale 0.3s ease-out'
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            color: '#22D3EE',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Cpu size={14} />
          <span>CENTRAL AI CORE</span>
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.6rem',
            fontWeight: 800,
            color: '#F8FAFC',
            margin: '4px 0 0 0',
            letterSpacing: '0.04em'
          }}
        >
          NEURAL CORE
        </h2>
        <p style={{ fontSize: '0.86rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
          "All systems connected."
        </p>
      </div>

      {/* Statistics Diagnostic Panel */}
      <div
        style={{
          background: 'rgba(8, 13, 22, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.76rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94A3B8' }}>NODES ..........</span>
          <span style={{ color: '#F8FAFC', fontWeight: 700 }}>07</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94A3B8' }}>CONNECTIONS ....</span>
          <span style={{ color: '#F8FAFC', fontWeight: 700 }}>18</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94A3B8' }}>DATA FLOW ......</span>
          <span style={{ color: '#22D3EE', fontWeight: 700 }}>ACTIVE</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94A3B8' }}>SECURITY .......</span>
          <span style={{ color: '#10B981', fontWeight: 700 }}>ENABLED</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94A3B8' }}>STATUS .........</span>
          <span style={{ color: '#38BDF8', fontWeight: 700 }}>OPERATIONAL</span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={() => selectNodeById('ai')}
          className="btn-neural btn-neural-highlight"
          style={{ width: '100%', padding: '10px 16px' }}
        >
          <span>ENTER SYSTEM</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={returnToCore}
          className="btn-neural"
          style={{ width: '100%', padding: '8px 16px' }}
        >
          <span>RESET ORBIT VIEW</span>
        </button>
      </div>
    </div>
  );
};
