export type DeviceType = 'PLC' | 'SWITCH' | 'IO' | 'DRIVE' | 'FIELD_DEVICE' | 'POWER_SUPPLY';

export interface Port {
  id: string;
  name: string;
  type: 'ETHERNET' | 'POWER' | 'FIBER';
  label: string;
  side?: 'left' | 'right' | 'bottom';
}

export interface DeviceMetadata {
  manufacturer?: string;
  modelNumber?: string;
  firmwareVersion?: string;
}

export interface NetworkConfig {
  ipAddress: string;
  subnetMask: string;
  gateway: string;
  profinetName?: string;
  vlan?: string;
}

export interface Device {
  id: string;
  type: DeviceType;
  category: string;
  name: string;
  tag: string;
  description: string;
  x: number;
  y: number;
  ports: Port[];
  network: NetworkConfig;
  metadata: DeviceMetadata;
  iconName: string;
  width: number;
  height: number;
}

export interface Connection {
  id: string;
  fromDeviceId: string;
  fromPortId: string;
  toDeviceId: string;
  toPortId: string;
  cableType: 'CAT6' | 'FIBER' | 'PROFINET';
  color: string;
}

export interface ProjectState {
  devices: Device[];
  connections: Connection[];
  selectedId: string | null;
  gridSize: number;
  showGrid: boolean;
  subnetBase: string; // e.g., "192.168.1"
}
