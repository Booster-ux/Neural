import React, { useState } from 'react';
import { Volume2, VolumeX, Map as MapIcon, Terminal, Activity } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { ViewMode } from '../../types';

export const TopNav: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    isSoundEnabled,
    toggleSound,
    toggleMap,
    toggleCommand,
    triggerEasterEgg,
    isMobile
  } = useNeural();

  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    if (next >= 5) {
      setLogoClicks(0);
      triggerEasterEgg('root_access');
    } else {
      setLogoClicks(next);
      setViewMode('system');
    }
  };

  const navItems: { mode: ViewMode; label: string }[] = [
    { mode: 'system', label: 'SYSTEM' },
    { mode: 'architecture', label: 'ARCHITECTURE' },
    { mode: 'about', label: 'ABOUT' },
    { mode: 'contact', label: 'CONTACT' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: '14px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 28px)',
        maxWidth: '1100px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 14px',
        background: 'rgba(8, 13, 22, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.55)',
        transition: 'all 0.25s ease-out'
      }}
    >
      {/* Left: Brand Logo (Dominant) */}
      <div
        onClick={handleLogoClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '4px 6px',
          borderRadius: '6px'
        }}
        title="NEURAL System (Click 5 times for Root Terminal)"
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #22D3EE 0%, #3B82F6 100%)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF' }} />
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 800,
            letterSpacing: '0.22em',
            color: '#F8FAFC'
          }}
        >
          NEURAL
        </span>
      </div>

      {/* Center: Navigation Links (Section 13) */}
      <nav
        style={{
          display: isMobile ? 'none' : 'flex',
          alignItems: 'center',
          gap: '3px',
          background: 'rgba(12, 18, 32, 0.6)',
          padding: '2px',
          borderRadius: '7px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {navItems.map((item) => {
          const isActive = viewMode === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => setViewMode(item.mode)}
              style={{
                background: isActive ? 'rgba(59, 130, 246, 0.18)' : 'transparent',
                border: isActive ? '1px solid rgba(59, 130, 246, 0.45)' : '1px solid transparent',
                borderRadius: '5px',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                padding: '5px 12px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s ease-out',
                boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.25)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = '#94A3B8';
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Mobile Mode Cycle */}
        {isMobile && (
          <button
            onClick={() => {
              const modes: ViewMode[] = ['system', 'architecture', 'about', 'contact'];
              const nextIndex = (modes.indexOf(viewMode) + 1) % modes.length;
              setViewMode(modes[nextIndex]);
            }}
            className="btn-neural"
            style={{ padding: '5px 8px', fontSize: '0.68rem' }}
          >
            <Activity size={12} color="#22D3EE" />
            <span>{viewMode.toUpperCase()}</span>
          </button>
        )}

        {/* System Map Trigger */}
        <button
          onClick={() => toggleMap()}
          className="btn-neural"
          style={{ padding: '5px 9px' }}
          title="Open Architecture Map"
        >
          <MapIcon size={13} color="#38BDF8" />
          <span style={{ display: isMobile ? 'none' : 'inline', fontSize: '0.72rem' }}>MAP</span>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={() => toggleCommand(true)}
          className="btn-neural"
          style={{ padding: '5px 9px' }}
          title="Command Palette (Ctrl + K)"
        >
          <Terminal size={13} color="#A78BFA" />
          <span style={{ display: isMobile ? 'none' : 'inline', color: '#94A3B8', fontSize: '0.65rem' }}>
            ⌘K
          </span>
        </button>

        {/* Sound Toggle (Optional, never autoplays per Section 22) */}
        <button
          onClick={toggleSound}
          className="btn-neural"
          style={{
            padding: '5px 9px',
            borderColor: isSoundEnabled ? 'rgba(34, 211, 238, 0.4)' : 'rgba(255, 255, 255, 0.08)'
          }}
          title={isSoundEnabled ? 'Audio Enabled' : 'Audio Muted'}
        >
          {isSoundEnabled ? <Volume2 size={13} color="#22D3EE" /> : <VolumeX size={13} color="#64748B" />}
        </button>
      </div>
    </header>
  );
};

