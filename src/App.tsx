import React, { Component, ErrorInfo, ReactNode } from 'react';
import { NeuralProvider, useNeural } from './context/NeuralContext';
import { NeuralCanvas } from './components/three/NeuralCanvas';
import { BootScreen } from './components/ui/BootScreen';
import { TopNav } from './components/ui/TopNav';
import { StatusIndicator } from './components/ui/StatusIndicator';
import { NodeDetailPanel } from './components/ui/NodeDetailPanel';
import { CoreOverlay } from './components/ui/CoreOverlay';
import { SystemMapModal } from './components/ui/SystemMapModal';
import { ArchitectureView } from './components/ui/ArchitectureView';
import { AboutView } from './components/ui/AboutView';
import { ContactView } from './components/ui/ContactView';
import { CommandPalette } from './components/ui/CommandPalette';
import { EasterEggModal } from './components/ui/EasterEggModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { InitialHint } from './components/ui/InitialHint';
import { Fallback2DView } from './components/ui/Fallback2DView';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL / 3D Canvas error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Fallback2DView onRetry={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}

const NeuralAppContent: React.FC = () => {
  const { viewMode, isBootComplete } = useNeural();

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambience Vignette & Grid */}
      <div className="neural-overlay-vignette" />
      <div className="neural-grid-lines" />

      {/* Boot Experience */}
      <BootScreen />

      {/* 3D WebGL Neural Universe */}
      <WebGLErrorBoundary>
        <NeuralCanvas />
      </WebGLErrorBoundary>

      {/* Custom Cursor on Desktop */}
      <CustomCursor />

      {/* Top Floating Navigation Bar */}
      {isBootComplete && <TopNav />}

      {/* Real-time System Status Indicator */}
      {isBootComplete && viewMode === 'system' && <StatusIndicator />}

      {/* Initial Navigation Hint */}
      <InitialHint />

      {/* Interactive Overlays */}
      {isBootComplete && (
        <>
          <NodeDetailPanel />
          <CoreOverlay />
          <SystemMapModal />
          {viewMode === 'architecture' && <ArchitectureView />}
          {viewMode === 'about' && <AboutView />}
          {viewMode === 'contact' && <ContactView />}
          <CommandPalette />
          <EasterEggModal />
        </>
      )}
    </div>
  );
};

export function App() {
  return (
    <NeuralProvider>
      <NeuralAppContent />
    </NeuralProvider>
  );
}

export default App;
