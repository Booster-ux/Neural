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
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '1200px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: 'rgba(8, 13, 22, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s ease-out'
      }}
    >
      {/* Left: Brand Logo */}
      <div
        onClick={handleLogoClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '6px'
        }}
        title="NEURAL System (Click 5 times for Root Terminal)"
      >
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #22D3EE 0%, #3B82F6 100%)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF' }} />
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem',
            fontWeight: 800,
            letterSpacing: '0.2em',
            color: '#F8FAFC'
          }}
        >
          NEURAL
        </span>
      </div>

      {/* Center: Navigation Links */}
      <nav
        style={{
          display: isMobile ? 'none' : 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(12, 18, 32, 0.6)',
          padding: '3px',
          borderRadius: '8px',
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
                background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                border: isActive ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid transparent',
                borderRadius: '6px',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                padding: '6px 14px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s ease-out',
                boxShadow: isActive ? '0 0 12px rgba(59, 130, 246, 0.3)' : 'none'
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Mobile View Mode Selector */}
        {isMobile && (
          <button
            onClick={() => {
              const modes: ViewMode[] = ['system', 'architecture', 'about', 'contact'];
              const nextIndex = (modes.indexOf(viewMode) + 1) % modes.length;
              setViewMode(modes[nextIndex]);
            }}
            className="btn-neural"
            style={{ padding: '6px 10px', fontSize: '0.7rem' }}
          >
            <Activity size={13} color="#22D3EE" />
            <span>{viewMode.toUpperCase()}</span>
          </button>
        )}

        {/* System Map Trigger */}
        <button
          onClick={() => toggleMap()}
          className="btn-neural"
          style={{ padding: '6px 10px' }}
          title="Open Architecture Map"
        >
          <MapIcon size={14} color="#38BDF8" />
          <span style={{ display: isMobile ? 'none' : 'inline' }}>MAP</span>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={() => toggleCommand(true)}
          className="btn-neural"
          style={{ padding: '6px 10px' }}
          title="Command Palette (Ctrl + K)"
        >
          <Terminal size={14} color="#A78BFA" />
          <span style={{ display: isMobile ? 'none' : 'inline', color: '#94A3B8', fontSize: '0.68rem' }}>
            ⌘K
          </span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="btn-neural"
          style={{
            padding: '6px 10px',
            borderColor: isSoundEnabled ? 'rgba(34, 211, 238, 0.4)' : 'rgba(255, 255, 255, 0.08)'
          }}
          title={isSoundEnabled ? 'Sound Enabled' : 'Sound Muted'}
        >
          {isSoundEnabled ? <Volume2 size={14} color="#22D3EE" /> : <VolumeX size={14} color="#64748B" />}
        </button>
      </div>
    </header>
  );
};
