import { Observable } from '@nativescript/core';

export interface Character {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  unlocked: boolean;
  level: number;
  baseMultiplier: number;
}

export const INITIAL_CHARACTERS: Character[] = [
  {
    id: 'riku',
    name: 'Riku',
    description: 'El Astuto - Multiplicador de monedas por tap',
    imagePath: '~/assets/characters/riku.png',
    unlocked: true,
    level: 1,
    baseMultiplier: 1.2
  },
  {
    id: 'kai',
    name: 'Kai',
    description: 'El Fuerte - Daño base más alto',
    imagePath: '~/assets/characters/kai.png',
    unlocked: true,
    level: 1,
    baseMultiplier: 1.5
  },
  {
    id: 'sora',
    name: 'Sora',
    description: 'El Rápido - Incremento en el DPS automático',
    imagePath: '~/assets/characters/sora.png',
    unlocked: true,
    level: 1,
    baseMultiplier: 1.3
  }
];