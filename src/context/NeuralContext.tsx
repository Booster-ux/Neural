import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ViewMode, TechNode, CoreState } from '../types';
import { NODES_DATA } from '../data/nodes';
import { soundManager } from '../services/soundService';

interface NeuralContextType {
  activeNode: string | null;
  selectedNode: TechNode | null;
  selectedLayerId: string | null;
  viewMode: ViewMode;
  coreState: CoreState;
  isMapOpen: boolean;
  isCommandOpen: boolean;
  isBootComplete: boolean;
  isSoundEnabled: boolean;
  isReducedMotion: boolean;
  isMobile: boolean;
  easterEggType: 'root_access' | 'human_404' | null;
  cameraFocusTarget: [number, number, number] | null;
  cameraDistance: number;
  isInspectorOpen: boolean;
  
  // Actions
  setActiveNode: (id: string | null) => void;
  selectNodeById: (id: string | null) => void;
  setSelectedLayerId: (id: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleMap: (open?: boolean) => void;
  toggleCommand: (open?: boolean) => void;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
  toggleInspector: (open?: boolean) => void;
  triggerEasterEgg: (type: 'root_access' | 'human_404' | null) => void;
  returnToCore: () => void;
  completeBoot: () => void;
  resetExperience: () => void;
}

const NeuralContext = createContext<NeuralContextType | undefined>(undefined);

export const NeuralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeNode, setActiveNodeState] = useState<string | null>(null);
  const [selectedNode, setSelectedNodeState] = useState<TechNode | null>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [viewMode, setViewModeState] = useState<ViewMode>('system');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [easterEggType, setEasterEggType] = useState<'root_access' | 'human_404' | null>(null);
  const [cameraFocusTarget, setCameraFocusTarget] = useState<[number, number, number] | null>([0, 0, 0]);
  const [cameraDistance, setCameraDistance] = useState<number>(13.5);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);

  // Responsive mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobileQuery = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
      setIsMobile(mobileQuery);
      if (mobileQuery) {
        setCameraDistance(15.5);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Core state derivation (Section 05)
  const coreState = useMemo<CoreState>(() => {
    if (easterEggType === 'root_access') return 'root_access';
    if (selectedNode) return 'processing';
    if (activeNode && activeNode !== 'core') return 'observing';
    if (activeNode === 'core') return 'connected';
    return 'idle';
  }, [easterEggType, selectedNode, activeNode]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K, Esc, numbers)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
        soundManager.playHover();
      }
      if (e.key === 'Escape') {
        if (isCommandOpen) setIsCommandOpen(false);
        else if (isMapOpen) setIsMapOpen(false);
        else if (selectedNode) {
          setSelectedNodeState(null);
          setCameraFocusTarget([0, 0, 0]);
          setCameraDistance(isMobile ? 15.5 : 13.5);
          soundManager.playWarp();
        } else if (easterEggType) setEasterEggType(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, isMapOpen, selectedNode, easterEggType, isMobile]);

  const setActiveNode = useCallback((id: string | null) => {
    setActiveNodeState(id);
    if (id) {
      soundManager.playHover();
    }
  }, []);

  const selectNodeById = useCallback((id: string | null) => {
    if (!id) {
      setSelectedNodeState(null);
      setCameraFocusTarget([0, 0, 0]);
      setCameraDistance(isMobile ? 15.5 : 13.5);
      soundManager.playWarp();
      return;
    }

    if (id === 'core') {
      setSelectedNodeState(null);
      setCameraFocusTarget([0, 0, 0]);
      setCameraDistance(isMobile ? 6.5 : 5.8);
      soundManager.playSelect();
      return;
    }

    const node = NODES_DATA.find(n => n.id === id);
    if (node) {
      setSelectedNodeState(node);
      setCameraFocusTarget(node.position);
      setCameraDistance(isMobile ? 6.5 : 5.6);
      soundManager.playSelect();
    }
  }, [isMobile]);

  const returnToCore = useCallback(() => {
    setSelectedNodeState(null);
    setSelectedLayerId(null);
    setCameraFocusTarget([0, 0, 0]);
    setCameraDistance(isMobile ? 15.5 : 13.5);
    soundManager.playWarp();
  }, [isMobile]);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    setIsMapOpen(false);
    setSelectedNodeState(null);
    setSelectedLayerId(null);
    
    if (mode === 'system') {
      setCameraFocusTarget([0, 0, 0]);
      setCameraDistance(isMobile ? 15.5 : 13.5);
    } else if (mode === 'architecture') {
      setCameraFocusTarget([0, 0, 0]);
      setCameraDistance(isMobile ? 13.5 : 11.5);
    }
    soundManager.playSelect();
  }, [isMobile]);

  const toggleMap = useCallback((open?: boolean) => {
    setIsMapOpen(prev => {
      const next = open !== undefined ? open : !prev;
      if (next) soundManager.playSelect();
      else soundManager.playHover();
      return next;
    });
  }, []);

  const toggleCommand = useCallback((open?: boolean) => {
    setIsCommandOpen(prev => {
      const next = open !== undefined ? open : !prev;
      if (next) soundManager.playSelect();
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const next = !prev;
      soundManager.setMuted(!next);
      return next;
    });
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setIsReducedMotion(prev => !prev);
    soundManager.playHover();
  }, []);

  const toggleInspector = useCallback((open?: boolean) => {
    setIsInspectorOpen(prev => open !== undefined ? open : !prev);
    soundManager.playHover();
  }, []);

  const triggerEasterEgg = useCallback((type: 'root_access' | 'human_404' | null) => {
    setEasterEggType(type);
    if (type) {
      soundManager.playEasterEgg();
    }
  }, []);

  const completeBoot = useCallback(() => {
    setIsBootComplete(true);
    soundManager.playAffirmative();
  }, []);

  const resetExperience = useCallback(() => {
    setViewModeState('system');
    setSelectedNodeState(null);
    setSelectedLayerId(null);
    setIsMapOpen(false);
    setIsCommandOpen(false);
    setCameraFocusTarget([0, 0, 0]);
    setCameraDistance(isMobile ? 15.5 : 13.5);
    soundManager.playAffirmative();
  }, [isMobile]);

  return (
    <NeuralContext.Provider
      value={{
        activeNode,
        selectedNode,
        selectedLayerId,
        viewMode,
        coreState,
        isMapOpen,
        isCommandOpen,
        isBootComplete,
        isSoundEnabled,
        isReducedMotion,
        isMobile,
        easterEggType,
        cameraFocusTarget,
        cameraDistance,
        isInspectorOpen,
        setActiveNode,
        selectNodeById,
        setSelectedLayerId,
        setViewMode,
        toggleMap,
        toggleCommand,
        toggleSound,
        toggleReducedMotion,
        toggleInspector,
        triggerEasterEgg,
        returnToCore,
        completeBoot,
        resetExperience
      }}
    >
      {children}
    </NeuralContext.Provider>
  );
};

export const useNeural = () => {
  const context = useContext(NeuralContext);
  if (!context) {
    throw new Error('useNeural must be used within a NeuralProvider');
  }
  return context;
};

