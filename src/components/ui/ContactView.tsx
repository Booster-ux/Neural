import React, { useState } from 'react';
import { Mail, Github, Globe, User, RotateCcw, Send, Check } from 'lucide-react';
import { useNeural } from '../../context/NeuralContext';
import { soundManager } from '../../services/soundService';

export const ContactView: React.FC = () => {
  const { resetExperience, isMobile } = useNeural();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactInfo = {
    name: 'OPERATOR // SYSTEM ARCHITECT',
    email: 'contact@neural.systems',
    github: 'github.com/neural-systems',
    portfolio: 'neural.systems/architecture'
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
              top: '84px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '640px',
              maxHeight: 'calc(100vh - 110px)',
            }),
        background: 'rgba(8, 13, 22, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: isMobile ? '20px' : '28px 32px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.85), 0 0 35px rgba(34, 211, 238, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflowY: 'auto',
        animation: 'fadeInScaleContact 0.25s ease-out'
      }}
    >
      {/* End State Header (Section 39) */}
      <div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            color: '#22D3EE',
            textTransform: 'uppercase'
          }}
        >
          COMMUNICATION MATRIX // DISPATCH
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isMobile ? '1.6rem' : '2.2rem',
            fontWeight: 800,
            color: '#F8FAFC',
            margin: '6px 0 6px 0',
            letterSpacing: '0.01em'
          }}
        >
          SYSTEM READY.
        </h1>
        <p
          style={{
            fontSize: '0.9rem',
            color: '#CBD5E1',
            lineHeight: 1.5,
            margin: 0
          }}
        >
          "Everything is connected."
        </p>
      </div>

      {/* Profile Placeholders Card Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            color: '#94A3B8',
            textTransform: 'uppercase'
          }}
        >
          OPERATOR CONTACT CHANNELS
        </div>

        {/* Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(12, 18, 32, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '10px 14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={15} color="#38BDF8" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.74rem', color: '#94A3B8' }}>
              OPERATOR
            </span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#F8FAFC', fontWeight: 600 }}>
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
            background: 'rgba(12, 18, 32, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3B82F6')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={15} color="#8B5CF6" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.74rem', color: '#94A3B8' }}>
              EMAIL
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#22D3EE' }}>
              {contactInfo.email}
            </span>
            {copiedField === 'email' ? <Check size={13} color="#10B981" /> : <Send size={13} color="#64748B" />}
          </div>
        </div>

        {/* GitHub */}
        <div
          onClick={() => handleCopy('github', contactInfo.github)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(12, 18, 32, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B5CF6')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Github size={15} color="#A78BFA" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.74rem', color: '#94A3B8' }}>
              GITHUB
            </span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#E2E8F0' }}>
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
            background: 'rgba(12, 18, 32, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#22D3EE')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={15} color="#22D3EE" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.74rem', color: '#94A3B8' }}>
              NETWORK
            </span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#E2E8F0' }}>
            {contactInfo.portfolio}
          </span>
        </div>
      </div>

      {/* Buttons: EXPLORE AGAIN & CONNECT (Section 39) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '14px',
          gap: '12px'
        }}
      >
        <button
          onClick={resetExperience}
          className="btn-neural btn-neural-highlight"
          style={{ padding: '9px 16px' }}
        >
          <RotateCcw size={13} />
          <span>EXPLORE AGAIN</span>
        </button>

        <button
          onClick={() => handleCopy('email', contactInfo.email)}
          className="btn-neural btn-neural-primary"
          style={{ padding: '9px 16px' }}
        >
          <Send size={13} />
          <span>CONNECT</span>
        </button>
      </div>

      <style>{`
        @keyframes fadeInScaleContact {
          from { opacity: 0; transform: ${isMobile ? 'translateY(16px)' : 'translate(-50%, -8px)'}; }
          to { opacity: 1; transform: ${isMobile ? 'translateY(0)' : 'translate(-50%, 0)'}; }
        }
      `}</style>
    </div>
  );
};

