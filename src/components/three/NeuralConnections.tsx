import React, { useMemo } from 'react';
import * as THREE from 'three';
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

  // Compute line segments
  const links = useMemo(() => {
    return CONNECTIONS_DATA.map(conn => {
      const fromPos = nodesMap.get(conn.from) || [0, 0, 0];
      const toPos = nodesMap.get(conn.to) || [0, 0, 0];

      return {
        id: conn.id,
        from: conn.from,
        to: conn.to,
        points: [fromPos, toPos] as [[number, number, number], [number, number, number]]
      };
    });
  }, [nodesMap]);

  return (
    <group>
      {/* Major Node Interconnections */}
      {links.map(link => {
        const isConnected =
          activeNode === link.from ||
          activeNode === link.to ||
          selectedNode?.id === link.from ||
          selectedNode?.id === link.to;

        return (
          <Line
            key={link.id}
            points={link.points}
            color={isConnected ? '#22D3EE' : '#3B82F6'}
            lineWidth={isConnected ? 2.2 : 1.0}
            transparent
            opacity={isConnected ? 0.85 : 0.25}
          />
        );
      })}

      {/* Core connections to all primary nodes */}
      {NODES_DATA.map(node => {
        const isCoreConnected =
          activeNode === 'core' ||
          activeNode === node.id ||
          selectedNode?.id === node.id;

        return (
          <Line
            key={`core-${node.id}`}
            points={[[0, 0, 0], node.position]}
            color={isCoreConnected ? '#A78BFA' : '#8B5CF6'}
            lineWidth={isCoreConnected ? 2.5 : 1.2}
            transparent
            opacity={isCoreConnected ? 0.9 : 0.35}
          />
        );
      })}
    </group>
  );
};
