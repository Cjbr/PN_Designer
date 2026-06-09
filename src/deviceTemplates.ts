import { DeviceType, Port } from './types';

export interface DeviceTemplate {
  type: DeviceType;
  category: string;
  name: string;
  iconName: string;
  width: number;
  height: number;
  ports: Port[];
  description: string;
}

export const DEVICE_TEMPLATES: DeviceTemplate[] = [
  {
    type: 'PLC',
    category: 'S7-1500 Series',
    name: 'CPU 1511-1 PN',
    iconName: 'Server',
    width: 140,
    height: 140,
    description: 'Standard PLC for medium-sized applications',
    ports: [
      { id: 'p1', name: 'X1 P1', type: 'ETHERNET', label: 'X1 P1' },
      { id: 'p2', name: 'X1 P2', type: 'ETHERNET', label: 'X1 P2' },
    ],
  },
  {
    type: 'SWITCH',
    category: 'Industrial Switches',
    name: 'Scalance XC208',
    iconName: 'Network',
    width: 140,
    height: 282,
    description: 'Managed Layer 2 Industrial Ethernet Switch',
    ports: [
      { id: 'p1', name: 'P1', type: 'ETHERNET', label: 'P1' },
      { id: 'p2', name: 'P2', type: 'ETHERNET', label: 'P2' },
      { id: 'p3', name: 'P3', type: 'ETHERNET', label: 'P3' },
      { id: 'p4', name: 'P4', type: 'ETHERNET', label: 'P4' },
      { id: 'p5', name: 'P5', type: 'ETHERNET', label: 'P5' },
      { id: 'p6', name: 'P6', type: 'ETHERNET', label: 'P6' },
      { id: 'p7', name: 'P7', type: 'ETHERNET', label: 'P7' },
      { id: 'p8', name: 'P8', type: 'ETHERNET', label: 'P8' },
    ],
  },
  {
    type: 'IO',
    category: 'Distributed I/O',
    name: 'ET 200SP IM 155-6 PN',
    iconName: 'Boxes',
    width: 140,
    height: 140,
    description: 'Interface module for ET 200SP',
    ports: [
      { id: 'p1', name: 'P1', type: 'ETHERNET', label: 'P1' },
      { id: 'p2', name: 'P2', type: 'ETHERNET', label: 'P2' },
    ],
  },
  {
    type: 'DRIVE',
    category: 'Variable Frequency Drives',
    name: 'Sinamics G120',
    iconName: 'Zap',
    width: 140,
    height: 150,
    description: 'Modular converter for standard applications',
    ports: [
      { id: 'p1', name: 'PN P1', type: 'ETHERNET', label: 'P1' },
      { id: 'p2', name: 'PN P2', type: 'ETHERNET', label: 'P2' },
    ],
  },
  {
    type: 'FIELD_DEVICE',
    category: 'Instruments',
    name: 'Mass Flowmeter',
    iconName: 'Activity',
    width: 140,
    height: 140,
    description: 'Ethernet/IP Flowmeter',
    ports: [
      { id: 'p1', name: 'P1', type: 'ETHERNET', label: 'P1' },
    ],
  },
];
