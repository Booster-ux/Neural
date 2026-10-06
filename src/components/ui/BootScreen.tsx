import React, { useState, useEffect } from 'react';
import { useNeural } from '../../context/NeuralContext';
import { soundManager } from '../../services/soundService';

const BOOT_ITEMS = [
  { label: 'CORE', status: 'ONLINE', delay: 300 },
  { label: 'NEURAL NETWORK', status: 'ONLINE', delay: 750 },
  { label: 'DATABASE', status: 'ONLINE', delay: 1200 },
  { label: 'API LAYER', status: 'ONLINE', delay: 1650 },
  { label: 'SECURITY', status: 'ONLINE', delay: 2100 },
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
      }, 500);
    }, 2700);

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
    }, 200);
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
          maxWidth: '420px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2.5rem',
              fontWeight: 800,
              letterSpacing: '0.35em',
              color: '#F8FAFC',
              margin: 0,
              textShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
              textIndent: '0.35em'
            }}
          >
            NEURAL
          </h1>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.78rem',
              letterSpacing: '0.2em',
              color: '#38BDF8',
              marginTop: '8px',
              textTransform: 'uppercase'
            }}
          >
            INITIALIZING SYSTEM...
          </p>
        </div>

        {/* Diagnostic Boot Rows */}
        <div
          style={{
            width: '100%',
            background: 'rgba(12, 18, 32, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '20px 24px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
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
                  fontSize: '0.8rem',
                  opacity: isOnline ? 1 : 0.25,
                  transition: 'opacity 0.25s ease-out'
                }}
              >
                <span style={{ color: '#94A3B8', letterSpacing: '0.08em' }}>
                  {item.label}{' '}
                  <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>
                    {'.'.repeat(Math.max(2, 20 - item.label.length))}
                  </span>
                </span>
                <span
                  style={{
                    color: isOnline ? '#22D3EE' : '#64748B',
                    fontWeight: 600,
                    textShadow: isOnline ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none'
                  }}
                >
                  {isOnline ? 'ONLINE' : 'CONNECTING'}
                </span>
              </div>
            );
          })}

          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '2px',
              marginTop: '12px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #22D3EE)',
                boxShadow: '0 0 10px #22D3EE',
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
            fontSize: '0.72rem',
            padding: '6px 16px',
            opacity: 0.75,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
        >
          SKIP INITIALIZATION [ESC]
        </button>
      </div>
    </div>
  );
};
