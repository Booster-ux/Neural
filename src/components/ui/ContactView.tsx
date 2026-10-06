import React, { useState } from 'react';
import { Mail, Github, Globe, User, RotateCcw, Send, Check } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { soundManager } from '../../services/soundService';

export const ContactView: React.FC = () => {
  const { resetExperience, isMobile } = useNeural();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Clearly marked placeholder credentials
  const contactInfo = {
    name: 'YOUR NAME',
    email: 'YOUR EMAIL',
    github: 'YOUR GITHUB',
    portfolio: 'YOUR PORTFOLIO'
  };

  const handleCopy = (field: string, val: string) => {
    navigator.clipboard?.writeText(val);
    setCopiedField(field);
    soundManager.playAffirmative();
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 55,
        ...(isMobile
          ? {
              inset: '70px 16px 16px 16px',
            }
          : {
              top: '90px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '680px',
              maxHeight: 'calc(100vh - 120px)',
            }),
        background: 'rgba(12, 18, 32, 0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: isMobile ? '20px' : '32px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 35px rgba(34, 211, 238, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
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
            textTransform: 'uppercase'
          }}
        >
          COMMUNICATION INTERFACE // EXIT
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isMobile ? '1.8rem' : '2.4rem',
            fontWeight: 800,
            color: '#F8FAFC',
            margin: '8px 0 8px 0',
            letterSpacing: '0.02em'
          }}
        >
          SYSTEM READY.
        </h1>
        <p
          style={{
            fontSize: '0.92rem',
            color: '#CBD5E1',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          "Every useful digital product begins with a system worth building."
        </p>
      </div>

      {/* Placeholder Links Card Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: '#94A3B8',
            textTransform: 'uppercase'
          }}
        >
          CONTACT // PROFILE PLACEHOLDERS
        </div>

        {/* Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(8, 13, 22, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '12px 16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={16} color="#38BDF8" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#94A3B8' }}>
              OPERATOR
            </span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: '#F8FAFC', fontWeight: 600 }}>
            {contactInfo.name}
          </span>
        </div>

        {/* Email */}
        <div
          onClick={() => handleCopy('email', contactInfo.email)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(8, 13, 22, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '12px 16px',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3B82F6')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={16} color="#8B5CF6" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#94A3B8' }}>
              EMAIL
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: '#22D3EE' }}>
              {contactInfo.email}
            </span>
            {copiedField === 'email' ? <Check size={14} color="#10B981" /> : <Send size={14} color="#64748B" />}
          </div>
        </div>

        {/* GitHub */}
        <div
          onClick={() => handleCopy('github', contactInfo.github)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(8, 13, 22, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '12px 16px',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B5CF6')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Github size={16} color="#A78BFA" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#94A3B8' }}>
              GITHUB
            </span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: '#E2E8F0' }}>
            {contactInfo.github}
          </span>
        </div>

        {/* Portfolio */}
        <div
          onClick={() => handleCopy('portfolio', contactInfo.portfolio)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(8, 13, 22, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '12px 16px',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#22D3EE')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={16} color="#22D3EE" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#94A3B8' }}>
              PORTFOLIO
            </span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: '#E2E8F0' }}>
            {contactInfo.portfolio}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '16px',
          gap: '12px'
        }}
      >
        <button
          onClick={resetExperience}
          className="btn-neural btn-neural-highlight"
          style={{ padding: '10px 18px' }}
        >
          <RotateCcw size={14} />
          <span>EXPLORE AGAIN</span>
        </button>

        <button
          onClick={() => handleCopy('email', contactInfo.email)}
          className="btn-neural btn-neural-primary"
          style={{ padding: '10px 18px' }}
        >
          <Send size={14} />
          <span>CONNECT</span>
        </button>
      </div>
    </div>
  );
};
