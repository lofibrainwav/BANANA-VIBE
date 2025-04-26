import React, { useState } from 'react';

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type: string;
}

const LangFlowEditor: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: '1',
      type: 'input',
      position: { x: 100, y: 100 },
      data: { label: 'Gemini API', type: 'llm' }
    },
    {
      id: '2',
      type: 'default',
      position: { x: 300, y: 200 },
      data: { label: 'Prompt Template', type: 'template' }
    },
    {
      id: '3',
      type: 'output',
      position: { x: 500, y: 100 },
      data: { label: 'Output Parser', type: 'parser' }
    },
    {
      id: '4',
      type: 'default',
      position: { x: 700, y: 200 },
      data: { label: 'Firebase DB', type: 'database' }
    }
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    { id: 'e1-2', source: '1', target: '2', type: 'default' },
    { id: 'e2-3', source: '2', target: '3', type: 'default' },
    { id: 'e3-4', source: '3', target: '4', type: 'default' }
  ]);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodeTypes = [
    { type: 'llm', label: 'LLM', color: 'bg-neon-blue' },
    { type: 'template', label: '템플릿', color: 'bg-neon-purple' },
    { type: 'parser', label: '파서', color: 'bg-neon-pink' },
    { type: 'database', label: '데이터베이스', color: 'bg-neon-green' },
    { type: 'api', label: 'API', color: 'bg-yellow-500' },
    { type: 'tool', label: '도구', color: 'bg-orange-500' }
  ];

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  const addNode = (type: string) => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      type: 'default',
      position: { x: 200, y: 300 },
      data: { label: `New ${type}`, type }
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative bg-bg-dark border border-gray-800 rounded-lg overflow-hidden">
        {/* Mock Flow Editor Canvas */}
        <div className="absolute inset-0 bg-[#111] bg-opacity-50">
          <div className="absolute inset-0" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)' }}></div>
          
          {/* Render Nodes */}
          {nodes.map((node) => (
            <div 
              key={node.id}
              className={`absolute w-48 rounded-lg border ${selectedNode?.id === node.id ? 'border-neon-blue' : 'border-gray-700'} bg-bg-dark-secondary shadow-lg cursor-pointer`}
              style={{ left: `${node.position.x}px`, top: `${node.position.y}px` }}
              onClick={() => handleNodeClick(node)}
            >
              <div className={`px-3 py-2 rounded-t-lg ${nodeTypes.find(t => t.type === node.data.type)?.color || 'bg-gray-700'} bg-opacity-30 flex items-center justify-between`}>
                <span className="text-sm font-medium text-neutral-light">{node.data.label}</span>
                <div className="flex space-x-1">
                  <button className="w-4 h-4 rounded-full bg-gray-700 hover:bg-gray-600"></button>
                  <button className="w-4 h-4 rounded-full bg-gray-700 hover:bg-gray-600"></button>
                </div>
              </div>
              <div className="p-3">
                <div className="text-xs text-neutral-medium">
                  {node.data.type === 'llm' && (
                    <div className="space-y-2">
                      <div>모델: Gemini Pro</div>
                      <div>온도: 0.7</div>
                      <div>최대 토큰: 1024</div>
                    </div>
                  )}
                  {node.data.type === 'template' && (
                    <div className="space-y-2">
                      <div>입력 변수: 2</div>
                      <div>템플릿 길이: 256자</div>
                    </div>
                  )}
                  {node.data.type === 'parser' && (
                    <div className="space-y-2">
                      <div>파서 유형: JSON</div>
                      <div>스키마: 정의됨</div>
                    </div>
                  )}
                  {node.data.type === 'database' && (
                    <div className="space-y-2">
                      <div>DB 유형: Firestore</div>
                      <div>컬렉션: projects</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-3 py-2 border-t border-gray-700 flex justify-between">
                <div className="flex -space-x-1">
                  <div className="w-5 h-5 rounded-full bg-neon-blue opacity-70"></div>
                  <div className="w-5 h-5 rounded-full bg-neon-purple opacity-70"></div>
                </div>
                <button className="text-xs text-neutral-medium hover:text-neutral-light">편집</button>
              </div>
            </div>
          ))}
          
          {/* Render Edges (simplified) */}
          <svg className="absolute inset-0 pointer-events-none">
            {edges.map((edge) => {
              const source = nodes.find(n => n.id === edge.source);
              const target = nodes.find(n => n.id === edge.target);
              
              if (!source || !target) return null;
              
              const sourceX = source.position.x + 96; // half of node width
              const sourceY = source.position.y + 50;
              const targetX = target.position.x + 96;
              const targetY = target.position.y + 50;
              
              return (
                <g key={edge.id}>
                  <path
                    d={`M${sourceX},${sourceY} C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`}
                    stroke="#666"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={edge.type === 'dashed' ? '5,5' : undefined}
                  />
                  <circle cx={targetX} cy={targetY} r="3" fill="#666" />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      
      {/* Controls */}
      <div className="h-64 bg-bg-dark-secondary border border-gray-800 rounded-lg mt-4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-neutral-light">노드 속성</h3>
          <div className="flex space-x-2">
            <button className="px-2 py-1 bg-neon-blue/20 rounded border border-neon-blue text-neutral-light hover:bg-neon-blue/30 transition-colors text-xs">
              저장
            </button>
            <button className="px-2 py-1 bg-bg-dark rounded border border-gray-700 text-neutral-light hover:border-neon-blue transition-colors text-xs">
              취소
            </button>
          </div>
        </div>
        
        {selectedNode ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-medium mb-1">노드 이름</label>
              <input 
                type="text" 
                className="w-full bg-bg-dark border border-gray-700 rounded p-1.5 text-sm text-neutral-light focus:outline-none focus:ring-1 focus:ring-neon-blue"
                value={selectedNode.data.label}
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-medium mb-1">노드 유형</label>
              <select 
                className="w-full bg-bg-dark border border-gray-700 rounded p-1.5 text-sm text-neutral-light focus:outline-none focus:ring-1 focus:ring-neon-blue"
                value={selectedNode.data.type}
              >
                {nodeTypes.map(type => (
                  <option key={type.type} value={type.type}>{type.label}</option>
                ))}
              </select>
            </div>
            
            {selectedNode.data.type === 'llm' && (
              <>
                <div>
                  <label className="block text-xs text-neutral-medium mb-1">모델</label>
                  <select 
                    className="w-full bg-bg-dark border border-gray-700 rounded p-1.5 text-sm text-neutral-light focus:outline-none focus:ring-1 focus:ring-neon-blue"
                  >
                    <option>Gemini Pro</option>
                    <option>Gemini Ultra</option>
                    <option>GPT-4</option>
                    <option>Claude 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-neutral-medium mb-1">온도</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    className="w-full"
                    value="0.7"
                  />
                </div>
              </>
            )}
            
            {selectedNode.data.type === 'database' && (
              <>
                <div>
                  <label className="block text-xs text-neutral-medium mb-1">데이터베이스 유형</label>
                  <select 
                    className="w-full bg-bg-dark border border-gray-700 rounded p-1.5 text-sm text-neutral-light focus:outline-none focus:ring-1 focus:ring-neon-blue"
                  >
                    <option>Firestore</option>
                    <option>Realtime DB</option>
                    <option>Supabase</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-neutral-medium mb-1">컬렉션/테이블</label>
                  <input 
                    type="text" 
                    className="w-full bg-bg-dark border border-gray-700 rounded p-1.5 text-sm text-neutral-light focus:outline-none focus:ring-1 focus:ring-neon-blue"
                    value="projects"
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {nodeTypes.map(type => (
              <button 
                key={type.type}
                className={`px-3 py-1.5 rounded border border-gray-700 text-neutral-light hover:border-${type.color.replace('bg-', '')} transition-colors text-sm flex items-center`}
                onClick={() => addNode(type.type)}
              >
                <div className={`w-3 h-3 rounded-full ${type.color} mr-2`}></div>
                {type.label} 추가
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LangFlowEditor;
