import React, { useState, useEffect } from 'react';
import { useNeural } from '../../context/NeuralContext';
import { soundManager } from '../../services/soundService';

const BOOT_ITEMS = [
  { label: 'NEURAL CORE', status: 'ONLINE', delay: 350 },
  { label: 'GRAPH ENGINE', status: 'ONLINE', delay: 850 },
  { label: 'DATA STREAM', status: 'ONLINE', delay: 1350 },
  { label: 'SECURITY', status: 'ACTIVE', delay: 1850 },
];

export const BootScreen: React.FC = () => {
  const { isBootComplete, completeBoot, isReducedMotion } = useNeural();
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isBootComplete) return;

    if (isReducedMotion) {
      completeBoot();
      return;
    }

    const itemTimers = BOOT_ITEMS.map((_, index) => {
      return setTimeout(() => {
        setVisibleItems(index + 1);
        setProgress(Math.round(((index + 1) / BOOT_ITEMS.length) * 100));
      }, BOOT_ITEMS[index].delay);
    });

    const finishTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        completeBoot();
      }, 450);
    }, 2500);

    return () => {
      itemTimers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [isBootComplete, completeBoot, isReducedMotion]);

  if (isBootComplete) return null;

  const handleSkip = () => {
    soundManager.playWarp();
    setFadeOut(true);
    setTimeout(() => {
      completeBoot();
    }, 180);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#03050A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
        userSelect: 'none',
        padding: '24px'
      }}
    >
      <div
        style={{
          maxWidth: '440px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Minimal High-End Hero Branding (Section 11) */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              color: '#38BDF8',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}
          >
            CONNECTED INTELLIGENCE
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2.8rem',
              fontWeight: 800,
              letterSpacing: '0.25em',
              color: '#F8FAFC',
              margin: 0,
              textIndent: '0.25em',
              textShadow: '0 0 35px rgba(59, 130, 246, 0.5)'
            }}
          >
            NEURAL
          </h1>
          <p
            style={{
              fontSize: '0.84rem',
              color: '#94A3B8',
              lineHeight: 1.5,
              marginTop: '10px',
              maxWidth: '380px'
            }}
          >
            Explore the architecture behind intelligent digital systems.
          </p>
        </div>

        {/* Diagnostic Boot Rows (Section 10) */}
        <div
          style={{
            width: '100%',
            background: 'rgba(8, 13, 22, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '18px 22px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem',
              color: '#64748B',
              letterSpacing: '0.1em',
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>SYSTEM INITIALIZING</span>
            <span>{progress}%</span>
          </div>

          {BOOT_ITEMS.map((item, index) => {
            const isOnline = index < visibleItems;
            return (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.78rem',
                  opacity: isOnline ? 1 : 0.2,
                  transition: 'opacity 0.2s ease-out'
                }}
              >
                <span style={{ color: '#CBD5E1', letterSpacing: '0.06em' }}>
                  {item.label}{' '}
                  <span style={{ color: 'rgba(255, 255, 255, 0.12)' }}>
                    {'.'.repeat(Math.max(2, 18 - item.label.length))}
                  </span>
                </span>
                <span
                  style={{
                    color: isOnline ? (item.status === 'ACTIVE' ? '#10B981' : '#22D3EE') : '#64748B',
                    fontWeight: 600,
                    textShadow: isOnline ? '0 0 10px rgba(34, 211, 238, 0.4)' : 'none'
                  }}
                >
                  {isOnline ? item.status : 'CONNECTING'}
                </span>
              </div>
            );
          })}

          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '2px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '2px',
              marginTop: '10px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #22D3EE)',
                boxShadow: '0 0 8px #22D3EE',
                transition: 'width 0.3s ease-out'
              }}
            />
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="btn-neural"
          style={{
            fontSize: '0.7rem',
            padding: '6px 14px',
            opacity: 0.7,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
        >
          SKIP INITIALIZATION [ESC]
        </button>
      </div>
    </div>
  );
};

