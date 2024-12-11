import { Loly, LolyType } from './loly.interface';
import { LOLY_TYPES } from './loly-types';
import { GameConfig } from '../../config/game.config';

export class LolyFactory {
  static createLoly(playerLevel: number): Loly {
    const selectedType = this.getRandomLolyType();
    const baseHealth = this.calculateBaseHealth(playerLevel);

    return {
      ...selectedType,
      level: playerLevel,
      maxHealth: Math.floor(baseHealth),
      currentHealth: Math.floor(baseHealth),
      coins: Math.floor(baseHealth * GameConfig.ENEMY_COIN_MULTIPLIER),
      experience: Math.floor(baseHealth * GameConfig.ENEMY_XP_MULTIPLIER)
    };
  }

  private static getRandomLolyType(): LolyType {
    return LOLY_TYPES[Math.floor(Math.random() * LOLY_TYPES.length)];
  }

  private static calculateBaseHealth(playerLevel: number): number {
    return GameConfig.BASE_ENEMY_HEALTH * 
           Math.pow(GameConfig.ENEMY_HEALTH_MULTIPLIER, playerLevel - 1);
  }
}