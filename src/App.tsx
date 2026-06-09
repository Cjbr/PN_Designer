import React, { useRef, useState, useEffect } from 'react';
import { 
  Plus, Save, FileDown, Trash2, Settings, 
  Search, Grid3X3, Layers, AlertCircle, 
  ChevronRight, Box, Cpu, Network, Zap, 
  Activity, Server, Boxes, MousePointer2,
  Download, Image as ImageIcon, FileText
} from 'lucide-react';
import { useStore } from './store';
import { DEVICE_TEMPLATES, DeviceTemplate } from './deviceTemplates';
import { cn } from './lib/utils';
import { Stage, Layer, Rect, Text, Group, Line, Circle } from 'react-konva';
import { Device, Port, Connection } from './types';
import jsPDF from 'jspdf';

// --- Sub-components ---

const Toolbar = () => {
  const { toggleGrid, showGrid, devices, connections, clearProject } = useStore();
  
  const handleClear = () => {
    if (confirm('Are you sure you want to clear the entire project?')) {
      clearProject();
    }
  };

  const exportAsImage = () => {
    // Basic implementation using stage toDataURL
    const stage = (window as any).canvasStage;
    if (stage) {
      const dataURL = stage.toDataURL();
      const link = document.createElement('a');
      link.download = 'network-diagram.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportAsPDF = () => {
    const stage = (window as any).canvasStage;
    if (stage) {
      const pdf = new jsPDF('l', 'px', [stage.width(), stage.height()]);
      pdf.setTextColor('#000000');
      pdf.text('Industrial Network Diagram', 20, 20);
      pdf.addImage(stage.toDataURL(), 'PNG', 0, 40, stage.width(), stage.height());
      pdf.save('network-diagram.pdf');
    }
  };

  return (
    <nav className="h-14 border-b border-neutral-800 bg-[#161616] flex items-center justify-between px-6 z-10 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#00A859] rounded flex items-center justify-center text-black font-bold">
            📐
          </div>
          <h1 className="text-xs font-semibold tracking-wider uppercase text-neutral-100">
            Industrial Network Designer 
            <span className="text-neutral-500 font-normal ml-3">/ Project_H2_Refinery</span>
          </h1>
        </div>
        <div className="h-6 w-px bg-neutral-800" />
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-neutral-800 rounded text-neutral-400 transition-colors" title="Save Project">
            <Save className="w-4 h-4" />
          </button>
          <button 
            className={cn("p-2 rounded transition-colors", showGrid ? "text-[#00A859] bg-[#00A859]/10" : "text-neutral-400 hover:bg-neutral-800")} 
            onClick={toggleGrid}
            title="Toggle Grid"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button 
            className="p-2 hover:bg-red-950/30 text-red-500/70 rounded transition-colors" 
            onClick={handleClear}
            title="Clear Project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex bg-[#222] border border-neutral-800 p-1 rounded-lg">
          <button onClick={exportAsImage} className="px-3 py-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700/50 rounded-md transition-all">
            <ImageIcon className="w-3.5 h-3.5" />
            PNG
          </button>
          <button onClick={exportAsPDF} className="px-3 py-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700/50 rounded-md transition-all">
            <FileText className="w-3.5 h-3.5" />
            PDF Drawing
          </button>
        </div>
        <button className="bg-[#00A859] text-black px-4 py-2 rounded text-xs font-bold uppercase hover:bg-[#008f4c] transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </nav>
  );
};

const LibrarySidebar = () => {
  const { addDevice } = useStore();

  return (
    <aside className="w-72 bg-[#111] border-r border-neutral-800 flex flex-col shrink-0">
      <div className="p-4 border-b border-neutral-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search Library..." 
            className="w-full bg-[#1A1A1A] border border-neutral-800 focus:border-[#00A859] rounded px-3 pl-9 py-2 text-xs text-neutral-200 focus:outline-none transition-colors"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 px-2">Components Library</h3>
          <div className="grid grid-cols-1 gap-2">
            {DEVICE_TEMPLATES.map((template) => (
              <button
                key={template.name}
                onClick={() => addDevice(template, 400, 300)}
                className="group flex flex-col p-3 bg-[#1A1A1A] border border-neutral-800 rounded hover:border-neutral-600 transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-neutral-800 rounded flex items-center justify-center group-hover:bg-[#00A859] transition-colors">
                    {template.iconName === 'Server' && <Server className="w-4 h-4 text-neutral-400 group-hover:text-black" />}
                    {template.iconName === 'Network' && <Network className="w-4 h-4 text-neutral-400 group-hover:text-black" />}
                    {template.iconName === 'Boxes' && <Boxes className="w-4 h-4 text-neutral-400 group-hover:text-black" />}
                    {template.iconName === 'Zap' && <Zap className="w-4 h-4 text-neutral-400 group-hover:text-black" />}
                    {template.iconName === 'Activity' && <Activity className="w-4 h-4 text-neutral-400 group-hover:text-black" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-200 leading-tight">{template.name}</h4>
                    <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-tight">{template.category}</span>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-500 leading-relaxed font-medium">
                  {template.description}
                </p>
                <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity self-end">
                   <span className="text-[9px] font-bold text-[#00A859] uppercase">Add Component</span>
                   <Plus className="w-3 h-3 text-[#00A859]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

const PropertiesSidebar = () => {
  const { selectedId, devices, connections, updateDevice, removeDevice, removeConnection } = useStore();
  
  const selectedDevice = devices.find(d => d.id === selectedId);
  const selectedConnection = connections.find(c => c.id === selectedId);

  if (!selectedId) {
    return (
      <aside className="w-80 border-l border-neutral-800 bg-[#111] flex flex-col shrink-0 items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mb-4 border border-neutral-800">
          <MousePointer2 className="w-8 h-8 text-neutral-700" />
        </div>
        <h3 className="text-neutral-100 font-semibold mb-1 text-sm uppercase tracking-wider">Empty State</h3>
        <p className="text-neutral-500 text-xs italic">Select a node or link to view properties.</p>
      </aside>
    );
  }

  if (selectedDevice) {
    return (
      <aside className="w-80 border-l border-neutral-800 bg-[#111] flex flex-col shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
          <h3 className="font-bold text-neutral-100 text-[10px] uppercase tracking-widest">Device Inspector</h3>
          <button 
            onClick={() => removeDevice(selectedDevice.id)}
            className="p-1.5 hover:bg-red-950/20 text-neutral-600 hover:text-red-500 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-5 space-y-6">
          <div className="space-y-4">
             <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Identification</label>
              <div className="space-y-2">
                <div className="space-y-1">
                  <span className="text-[9px] text-neutral-600 font-bold ml-1 italic">NAME</span>
                  <input 
                    value={selectedDevice.name}
                    onChange={(e) => updateDevice(selectedDevice.id, { name: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-neutral-800 rounded px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-[#00A859]" 
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-neutral-600 font-bold ml-1 italic">TAG ID</span>
                  <input 
                    value={selectedDevice.tag}
                    onChange={(e) => updateDevice(selectedDevice.id, { tag: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-neutral-100 focus:outline-none focus:border-[#00A859]" 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Network Layer</label>
              <div className="space-y-3 bg-[#1A1A1A] p-4 rounded border border-neutral-800">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] text-neutral-400 font-medium">IP Address</span>
                  <input 
                    value={selectedDevice.network.ipAddress}
                    onChange={(e) => updateDevice(selectedDevice.id, { network: { ...selectedDevice.network, ipAddress: e.target.value } })}
                    className="flex-1 bg-transparent text-right text-xs font-mono text-neutral-100 focus:outline-none border-b border-transparent focus:border-[#00A859]" 
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] text-neutral-400 font-medium">Subnet Mask</span>
                  <input 
                    value={selectedDevice.network.subnetMask}
                    onChange={(e) => updateDevice(selectedDevice.id, { network: { ...selectedDevice.network, subnetMask: e.target.value } })}
                    className="flex-1 bg-transparent text-right text-xs font-mono text-neutral-100 focus:outline-none border-b border-transparent focus:border-[#00A859]" 
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] text-neutral-400 font-medium">Profinet Name</span>
                  <input 
                    value={selectedDevice.network.profinetName || ''}
                    onChange={(e) => updateDevice(selectedDevice.id, { network: { ...selectedDevice.network, profinetName: e.target.value } })}
                    className="flex-1 bg-transparent text-right text-xs font-mono text-neutral-100 focus:outline-none border-b border-transparent focus:border-[#00A859]" 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Connectivity Matrix</label>
              <div className="space-y-1">
                {selectedDevice.ports.map(port => (
                  <div key={port.id} className="flex items-center justify-between p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] font-bold text-neutral-300">{port.name}</span>
                    <span className="text-[9px] bg-neutral-800 text-neutral-500 px-1.5 py-0.5 rounded font-bold">{port.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  if (selectedConnection) {
    return (
      <aside className="w-80 border-l border-neutral-800 bg-[#111] flex flex-col shrink-0 overflow-y-auto">
         <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
          <h3 className="font-bold text-neutral-100 text-[10px] uppercase tracking-widest">Link Properties</h3>
          <button 
            onClick={() => removeConnection(selectedConnection.id)}
            className="p-1.5 hover:bg-red-950/20 text-neutral-600 hover:text-red-500 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
           <div className="bg-[#1A1A1A] rounded p-4 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-[#00A859]" />
                <span className="text-[10px] font-bold text-neutral-100 uppercase tracking-wider">Industrial Plane</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-black/20 p-2 rounded">
                  <span className="text-[10px] text-neutral-500 uppercase">Medium</span>
                  <span className="text-xs font-bold text-neutral-200">{selectedConnection.cableType}</span>
                </div>
                <div className="flex justify-between items-center bg-black/20 p-2 rounded">
                  <span className="text-[10px] text-neutral-500 uppercase">State</span>
                  <span className="text-xs font-bold text-[#00A859]">ACTIVE</span>
                </div>
              </div>
           </div>
        </div>
      </aside>
    );
  }

  return null;
};

// --- Canvas Components ---

const GRID_SIZE = 20;

const DeviceNode = ({ device, onPortClick }: { device: Device, onPortClick: (portId: string) => void }) => {
  const { setSelectedId, updateDevice, selectedId } = useStore();
  const isSelected = selectedId === device.id;

  return (
    <Group
      x={device.x}
      y={device.y}
      draggable
      onClick={(e) => {
        e.cancelBubble = true;
        setSelectedId(device.id);
      }}
      onDragEnd={(e) => {
        const x = Math.round(e.target.x() / GRID_SIZE) * GRID_SIZE;
        const y = Math.round(e.target.y() / GRID_SIZE) * GRID_SIZE;
        updateDevice(device.id, { x, y });
        e.target.setPosition({ x, y });
      }}
    >
      {/* Device Body */}
      <Rect
        width={device.width}
        height={device.height}
        fill="#1A1A1A"
        stroke={isSelected ? "#00A859" : "#333"}
        strokeWidth={isSelected ? 2 : 1}
        cornerRadius={4}
        shadowColor="black"
        shadowBlur={isSelected ? 10 : 2}
        shadowOpacity={0.5}
      />
      
      {/* Sub-header Area */}
      <Text
        text={device.category.toUpperCase()}
        x={12}
        y={12}
        fontSize={8}
        fontFamily="JetBrains Mono, monospace"
        fontStyle="bold"
        fill={isSelected ? "#00A859" : "#555"}
        letterSpacing={1}
      />

      {/* Main Info */}
      <Text
        text={device.name}
        x={12}
        y={28}
        fontSize={12}
        fontFamily="system-ui, sans-serif"
        fontStyle="bold"
        fill="#eee"
        width={device.width - 24}
      />

      <Text
        text={device.tag}
        x={12}
        y={44}
        fontSize={10}
        fontFamily="JetBrains Mono, monospace"
        fill="#777"
      />

      {/* Ports Interface */}
      {device.ports.map((port, idx) => {
        const portY = 72 + idx * 24;
        return (
          <Group key={port.id} y={portY}>
            <Circle
              x={0}
              y={0}
              radius={5}
              fill="#111"
              stroke={isSelected ? "#00A859" : "#444"}
              strokeWidth={1.5}
              onClick={(e) => {
                e.cancelBubble = true;
                onPortClick(port.id);
              }}
              onMouseOver={(e) => {
                const container = e.target.getStage()?.container();
                if (container) container.style.cursor = 'crosshair';
                (e.target as any).setStroke('#00A859');
                e.target.getLayer()?.draw();
              }}
              onMouseOut={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) container.style.cursor = 'default';
                  (e.target as any).setStroke(isSelected ? '#00A859' : '#444');
                  e.target.getLayer()?.draw();
              }}
            />
            <Text
              text={port.label}
              x={12}
              y={-4}
              fontSize={8}
              fontFamily="JetBrains Mono, monospace"
              fontStyle="bold"
              fill="#666"
            />
          </Group>
        );
      })}

      {/* Networking Overlay */}
      <Rect 
         x={0} y={device.height - 20} 
         width={device.width} height={20} 
         fill="#111" cornerRadius={[0, 0, 4, 4]} 
      />
      <Text
        text={device.network.ipAddress}
        x={12}
        y={device.height - 14}
        fontSize={9}
        fontFamily="JetBrains Mono, monospace"
        fontStyle="bold"
        fill="#00A859"
      />
    </Group>
  );
};

const ConnectionLine = ({ connection }: { connection: Connection }) => {
  const { devices, setSelectedId, selectedId } = useStore();
  const isSelected = selectedId === connection.id;
  const fromDevice = devices.find(d => d.id === connection.fromDeviceId);
  const toDevice = devices.find(d => d.id === connection.toDeviceId);

  if (!fromDevice || !toDevice) return null;

  const fromIdx = fromDevice.ports.findIndex(p => p.id === connection.fromPortId);
  const toIdx = toDevice.ports.findIndex(p => p.id === connection.toPortId);

  const startX = fromDevice.x;
  const startY = fromDevice.y + 72 + (fromIdx !== -1 ? fromIdx : 0) * 24;
  const endX = toDevice.x;
  const endY = toDevice.y + 72 + (toIdx !== -1 ? toIdx : 0) * 24;

  return (
    <Group onClick={() => setSelectedId(connection.id)}>
      {/* Interaction Buffer */}
      <Line
        points={[startX, startY, endX, endY]}
        stroke="transparent"
        strokeWidth={15}
      />
      {/* Glow Effect for Profinet */}
      <Line
        points={[startX, startY, endX, endY]}
        stroke="#00A859"
        strokeWidth={isSelected ? 6 : 4}
        opacity={isSelected ? 0.3 : 0.1}
      />
      <Line
        points={[startX, startY, endX, endY]}
        stroke="#00A859"
        strokeWidth={2}
        shadowColor="#00A859"
        shadowBlur={isSelected ? 10 : 0}
        dash={isSelected ? [5, 2] : []}
      />
    </Group>
  );
};

export default function App() {
  const { 
    devices, connections, showGrid, gridSize, 
    setSelectedId, addConnection, selectedId, removeDevice, removeConnection 
  } = useStore();
  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [connecting, setConnecting] = useState<{deviceId: string, portId: string} | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

        if (selectedId) {
          if (devices.find(d => d.id === selectedId)) {
            removeDevice(selectedId);
          } else {
            removeConnection(selectedId);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, devices, removeDevice, removeConnection]);

  useEffect(() => {
    (window as any).canvasStage = stageRef.current;
    
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      setConnecting(null);
    }
  };

  const handleMouseMove = (e: any) => {
    if (connecting) {
      const stage = e.target.getStage();
      const pos = stage.getPointerPosition();
      setMousePos(pos);
    }
  };

  const handlePortClick = (deviceId: string, portId: string) => {
    if (!connecting) {
      setConnecting({ deviceId, portId });
    } else {
      if (connecting.deviceId !== deviceId) {
        addConnection(connecting.deviceId, connecting.portId, deviceId, portId);
      }
      setConnecting(null);
    }
  };

  const getPortPosition = (deviceId: string, portId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return { x: 0, y: 0 };
    const portIdx = device.ports.findIndex(p => p.id === portId);
    return {
      x: device.x,
      y: device.y + 72 + (portIdx !== -1 ? portIdx : 0) * 24
    };
  };

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] text-neutral-300 font-sans overflow-hidden">
      <Toolbar />
      
      <div className="flex flex-1 overflow-hidden relative">
        <LibrarySidebar />
        
        <div ref={containerRef} className="flex-1 bg-[#0F0F0F] flex flex-col relative overflow-hidden ring-1 ring-neutral-800 ring-inset">
          {/* Grid Dots Effect Overlay */}
          {showGrid && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03]" 
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
            />
          )}

          {/* Status Overlay */}
          <div className="absolute top-4 left-4 z-10 flex gap-2 pointer-events-none">
             {connecting && (
               <div className="bg-[#1A1A1A] px-3 py-1.5 rounded border border-[#00A859]/50 flex items-center gap-2 shadow-2xl animate-in slide-in-from-top-4">
                  <div className="w-2 h-2 rounded-full bg-[#00A859] animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest text-[#00A859] uppercase italic">Awaiting port selection...</span>
               </div>
             )}
             <div className="bg-[#161616]/80 backdrop-blur px-3 py-1.5 rounded border border-neutral-800 flex items-center gap-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00A859]" />
                  <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Profinet Mesh</span>
                </div>
                <div className="h-3 w-[1px] bg-neutral-800" />
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">
                  {devices.length} Objects / {connections.length} Mesh
                </span>
             </div>
          </div>

          <Stage
            className="flex-1 cursor-grab active:cursor-grabbing outline-none"
            width={dimensions.width}
            height={dimensions.height}
            onClick={handleStageClick}
            onMouseMove={handleMouseMove}
            ref={stageRef}
          >
            <Layer>
              <Group>
                {connections.map(connection => (
                  <ConnectionLine key={connection.id} connection={connection} />
                ))}

                {connecting && (() => {
                  const start = getPortPosition(connecting.deviceId, connecting.portId);
                  return (
                    <Line
                      points={[start.x, start.y, mousePos.x, mousePos.y]}
                      stroke="#00A859"
                      strokeWidth={1}
                      dash={[4, 4]}
                      opacity={0.5}
                    />
                  );
                })()}
                
                {devices.map(device => (
                  <DeviceNode 
                    key={device.id} 
                    device={device} 
                    onPortClick={(portId) => handlePortClick(device.id, portId)}
                  />
                ))}
              </Group>
            </Layer>
          </Stage>

          {/* Validation Footer */}
          <footer className="h-8 bg-[#00A859] px-4 flex items-center justify-between text-black z-10 shrink-0">
             <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold uppercase tracking-tight">System Operational</span>
                <div className="h-3 w-[1px] bg-black/20"></div>
                <span className="text-[10px] uppercase">Nodes: {devices.length}</span>
                <span className="text-[10px] uppercase">Links: {connections.length}</span>
             </div>
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold bg-white/20 px-2 rounded">
                  VALIDATION: PROJECT INTEGRITY SECURED
                </span>
             </div>
          </footer>
        </div>

        <PropertiesSidebar />
      </div>
    </div>
  );
}
