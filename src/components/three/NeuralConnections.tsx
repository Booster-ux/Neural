import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { CONNECTIONS_DATA, NODES_DATA } from '../../data/nodes';
import { useNeural } from '../../context/NeuralContext';

export const NeuralConnections: React.FC = () => {
  const { activeNode, selectedNode } = useNeural();

  // Create node lookup map
  const nodesMap = useMemo(() => {
    const map = new Map<string, [number, number, number]>();
    map.set('core', [0, 0, 0]);
    NODES_DATA.forEach(node => {
      map.set(node.id, node.position);
    });
    return map;
  }, []);

  // Compute line segments with type data
  const links = useMemo(() => {
    return CONNECTIONS_DATA.map(conn => {
      const fromPos = nodesMap.get(conn.from) || [0, 0, 0];
      const toPos = nodesMap.get(conn.to) || [0, 0, 0];

      return {
        id: conn.id,
        from: conn.from,
        to: conn.to,
        type: conn.type,
        points: [fromPos, toPos] as [[number, number, number], [number, number, number]]
      };
    });
  }, [nodesMap]);

  const hasSelection = !!selectedNode;
  const focusedNodeId = selectedNode?.id || (activeNode !== 'core' ? activeNode : null);

  return (
    <group>
      {/* Node Interconnections */}
      {links.map(link => {
        const isDirectToFocus =
          focusedNodeId === link.from ||
          focusedNodeId === link.to;

        // Visual calculation based on Section 07
        let color = '#3B82F6';
        let opacity = 0.22;
        let lineWidth = 1.0;

        if (link.type === 'primary') {
          color = '#38BDF8';
          opacity = 0.35;
          lineWidth = 1.2;
        } else if (link.type === 'cross_cutting') {
          color = '#10B981';
          opacity = 0.22;
          lineWidth = 0.9;
        } else {
          color = '#818CF8';
          opacity = 0.18;
          lineWidth = 0.9;
        }

        if (isDirectToFocus) {
          // Highlight direct connection
          color = '#22D3EE';
          opacity = 0.92;
          lineWidth = 2.4;
        } else if (hasSelection) {
          // Dim unrelated connections
          opacity = 0.06;
          lineWidth = 0.8;
        }

        return (
          <Line
            key={link.id}
            points={link.points}
            color={color}
            lineWidth={lineWidth}
            transparent
            opacity={opacity}
          />
        );
      })}

      {/* Core connections to all primary nodes */}
      {NODES_DATA.map(node => {
        const isDirectCoreConnection =
          activeNode === 'core' ||
          focusedNodeId === node.id;

        let color = '#8B5CF6';
        let opacity = 0.28;
        let lineWidth = 1.0;

        if (isDirectCoreConnection) {
          color = '#C084FC';
          opacity = 0.88;
          lineWidth = 2.2;
        } else if (hasSelection) {
          opacity = 0.08;
          lineWidth = 0.8;
        }

        return (
          <Line
            key={`core-${node.id}`}
            points={[[0, 0, 0], node.position]}
            color={color}
            lineWidth={lineWidth}
            transparent
            opacity={opacity}
          />
        );
      })}
    </group>
  );
};

