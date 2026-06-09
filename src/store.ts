import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Device, Connection, DeviceType, Port } from './types';
import { generateNextIP } from './lib/utils';

interface DesignerStore {
  devices: Device[];
  connections: Connection[];
  selectedId: string | null;
  gridSize: number;
  showGrid: boolean;
  subnetBase: string;
  addDevice: (template: any, x: number, y: number) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  removeDevice: (id: string) => void;
  addConnection: (fromId: string, fromPortId: string, toId: string, toPortId: string) => void;
  removeConnection: (id: string) => void;
  setSelectedId: (id: string | null) => void;
  updateSubnet: (subnet: string) => void;
  toggleGrid: () => void;
  clearProject: () => void;
}

export const useStore = create<DesignerStore>((set, get) => ({
  devices: [],
  connections: [],
  selectedId: null,
  gridSize: 20,
  showGrid: true,
  subnetBase: '192.168.0',

  addDevice: (template, x, y) => {
    const devices = get().devices;
    const existingIps = devices.map(d => d.network.ipAddress);
    const nextIp = generateNextIP(existingIps, get().subnetBase);

    const portsList = template.ports || [];
    const minHeight = 72 + portsList.length * 24 + 18;
    const finalHeight = Math.max(template.height || 140, minHeight);
    const finalWidth = template.width || 140;

    const newDevice: Device = {
      id: uuidv4(),
      type: template.type || 'PLC',
      category: template.category || 'Process Control',
      name: template.name || 'New Device',
      tag: `TAG-${devices.length + 1}`,
      description: template.description || '',
      x,
      y,
      width: finalWidth,
      height: finalHeight,
      ports: portsList,
      iconName: template.iconName || 'Cpu',
      network: {
        ipAddress: nextIp,
        subnetMask: '255.255.255.0',
        gateway: `${get().subnetBase}.1`,
        profinetName: `device-${devices.length + 1}`,
      },
      metadata: {
        manufacturer: 'Generic',
        modelNumber: 'v1.0',
        firmwareVersion: '1.0.0',
      },
    };

    set(state => ({ devices: [...state.devices, newDevice] }));
  },

  updateDevice: (id, updates) => set(state => ({
    devices: state.devices.map(d => d.id === id ? { ...d, ...updates } : d)
  })),

  removeDevice: (id) => set(state => ({
    devices: state.devices.filter(d => d.id !== id),
    connections: state.connections.filter(c => c.fromDeviceId !== id && c.toDeviceId !== id),
    selectedId: state.selectedId === id ? null : state.selectedId
  })),

  addConnection: (fromDeviceId, fromPortId, toDeviceId, toPortId) => {
    const { connections } = get();
    const exists = connections.find(c =>
      (c.fromDeviceId === fromDeviceId && c.fromPortId === fromPortId && c.toDeviceId === toDeviceId && c.toPortId === toPortId) ||
      (c.fromDeviceId === toDeviceId && c.fromPortId === toPortId && c.toDeviceId === fromDeviceId && c.toPortId === fromPortId)
    );

    if (exists) return;

    const newConn: Connection = {
      id: uuidv4(),
      fromDeviceId,
      fromPortId,
      toDeviceId,
      toPortId,
      cableType: 'PROFINET',
      color: '#00cc00',
    };

    set(state => ({ connections: [...state.connections, newConn] }));
  },

  removeConnection: (id) => set(state => ({
    connections: state.connections.filter(c => c.id !== id),
    selectedId: state.selectedId === id ? null : state.selectedId
  })),

  setSelectedId: (id) => set({ selectedId: id }),

  updateSubnet: (subnetBase) => set({ subnetBase }),

  toggleGrid: () => set(state => ({ showGrid: !state.showGrid })),

  clearProject: () => set({ devices: [], connections: [], selectedId: null }),
}));
