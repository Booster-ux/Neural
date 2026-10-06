import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Terminal, ArrowRight, X, Volume2, Shield, Eye, Layers } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { NODES_DATA } from '../../data/nodes';

export const CommandPalette: React.FC = () => {
  const {
    isCommandOpen,
    toggleCommand,
    selectNodeById,
    setViewMode,
    toggleSound,
    isSoundEnabled,
    toggleReducedMotion,
    isReducedMotion
  } = useNeural();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandOpen]);

  // Command items list
  const commands = useMemo(() => {
    const list = [
      { id: 'core', label: 'Go to AI Core', category: 'Navigation', icon: Terminal, action: () => selectNodeById('core') },
      ...NODES_DATA.map(node => ({
        id: node.id,
        label: `Open ${node.label} (${node.title})`,
        category: 'System Nodes',
        icon: ArrowRight,
        action: () => {
          setViewMode('system');
          selectNodeById(node.id);
        }
      })),
      { id: 'arch', label: 'Open Architecture View', category: 'Views', icon: Layers, action: () => setViewMode('architecture') },
      { id: 'about', label: 'Open About Statement', category: 'Views', icon: Eye, action: () => setViewMode('about') },
      { id: 'contact', label: 'Open Contact / Exit', category: 'Views', icon: ArrowRight, action: () => setViewMode('contact') },
      { id: 'sound', label: isSoundEnabled ? 'Disable Audio Soundscape' : 'Enable Audio Soundscape', category: 'Preferences', icon: Volume2, action: () => toggleSound() },
      { id: 'motion', label: isReducedMotion ? 'Disable Reduced Motion' : 'Enable Reduced Motion', category: 'Accessibility', icon: Shield, action: () => toggleReducedMotion() },
    ];

    if (!query.trim()) return list;

    return list.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, isSoundEnabled, isReducedMotion, selectNodeById, setViewMode, toggleSound, toggleReducedMotion]);

  // Keyboard navigation within list
  useEffect(() => {
    if (!isCommandOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (commands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + commands.length) % (commands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (commands[selectedIndex]) {
          commands[selectedIndex].action();
          toggleCommand(false);
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isCommandOpen, commands, selectedIndex, toggleCommand]);

  if (!isCommandOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(3, 5, 10, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
        animation: 'fadeIn 0.15s ease-out'
      }}
      onClick={() => toggleCommand(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'rgba(12, 18, 32, 0.96)',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          borderRadius: '14px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.85), 0 0 30px rgba(59, 130, 246, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div
          style={{
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <Search size={18} color="#38BDF8" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or jump to system node..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#F8FAFC',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.9rem'
            }}
          />
          <button
            onClick={() => toggleCommand(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Command list */}
        <div
          style={{
            maxHeight: '340px',
            overflowY: 'auto',
            padding: '8px'
          }}
        >
          {commands.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#64748B', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
              No matching system commands found
            </div>
          ) : (
            commands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    toggleCommand(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(59, 130, 246, 0.18)' : 'transparent',
                    border: isSelected ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease-out'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={15} color={isSelected ? '#22D3EE' : '#94A3B8'} />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.82rem',
                        color: isSelected ? '#FFFFFF' : '#E2E8F0'
                      }}
                    >
                      {cmd.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#64748B',
                      textTransform: 'uppercase'
                    }}
                  >
                    {cmd.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div
          style={{
            padding: '8px 16px',
            background: 'rgba(8, 13, 22, 0.8)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            color: '#64748B'
          }}
        >
          <span>↑↓ Navigate</span>
          <span>↵ Execute</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
};
