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
      { id: 'p1', name: 'X1 P1', type: 'ETHERNET', label: 'X1 P1', side: 'left' },
      { id: 'p2', name: 'X1 P2', type: 'ETHERNET', label: 'X1 P2', side: 'right' },
      { id: 'p3', name: 'PE Terminal', type: 'POWER', label: 'PE', side: 'bottom' },
    ],
  },
  {
    type: 'SWITCH',
    category: 'Industrial Switches',
    name: 'Scalance XC208',
    iconName: 'Network',
    width: 154,
    height: 180,
    description: 'Managed Layer 2 Industrial Ethernet Switch',
    ports: [
      { id: 'p1', name: 'P1-Left', type: 'ETHERNET', label: 'P1', side: 'left' },
      { id: 'p2', name: 'P2-Left', type: 'ETHERNET', label: 'P2', side: 'left' },
      { id: 'p3', name: 'P3-Left', type: 'ETHERNET', label: 'P3', side: 'left' },
      { id: 'p4', name: 'P4-Right', type: 'ETHERNET', label: 'P4', side: 'right' },
      { id: 'p5', name: 'P5-Right', type: 'ETHERNET', label: 'P5', side: 'right' },
      { id: 'p6', name: 'P6-Right', type: 'ETHERNET', label: 'P6', side: 'right' },
      { id: 'p7', name: 'P7-Bottom', type: 'ETHERNET', label: 'P7', side: 'bottom' },
      { id: 'p8', name: 'P8-Bottom', type: 'ETHERNET', label: 'P8', side: 'bottom' },
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
      { id: 'p1', name: 'P1', type: 'ETHERNET', label: 'P1', side: 'left' },
      { id: 'p2', name: 'P2', type: 'ETHERNET', label: 'P2', side: 'right' },
      { id: 'p3', name: 'Bus Terminal', type: 'POWER', label: 'AUX', side: 'bottom' },
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
      { id: 'p1', name: 'PN P1', type: 'ETHERNET', label: 'P1', side: 'left' },
      { id: 'p2', name: 'PN P2', type: 'ETHERNET', label: 'P2', side: 'right' },
      { id: 'p3', name: 'Motor Feed L1/2/3', type: 'POWER', label: 'MOTOR', side: 'bottom' },
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
      { id: 'p1', name: 'P1 Link', type: 'ETHERNET', label: 'P1', side: 'left' },
      { id: 'p2', name: 'P2 Link', type: 'ETHERNET', label: 'P2', side: 'right' },
      { id: 'p3', name: '24V DC Input', type: 'POWER', label: '24V', side: 'bottom' },
    ],
  },
];
