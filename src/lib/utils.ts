import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateNextIP(existingIps: string[], subnet: string): string {
  const usedLastOctets = existingIps
    .filter(ip => ip.startsWith(subnet))
    .map(ip => parseInt(ip.split('.').pop() || '0'))
    .sort((a, b) => a - b);

  let nextOctet = 10; // Start at .10 for devices
  while (usedLastOctets.includes(nextOctet)) {
    nextOctet++;
  }
  return `${subnet}.${nextOctet}`;
}
