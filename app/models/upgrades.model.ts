import { Observable } from '@nativescript/core';
import { GameConfig } from '../config/game.config';
import { PlayerModel } from './player.model';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  getNextCost(): number;
  apply(): void;
}

export class AutoClickerUpgrade implements Upgrade {
  id = 'autoClicker';
  name = 'Auto Clicker';
  description = 'Automatically damages enemies every second';
  level = 0;

  constructor(private player: PlayerModel) {}

  get cost(): number {
    return Math.floor(
      GameConfig.AUTO_CLICKER_BASE_COST * 
      Math.pow(GameConfig.AUTO_CLICKER_COST_MULTIPLIER, this.level)
    );
  }

  getNextCost(): number {
    return Math.floor(
      GameConfig.AUTO_CLICKER_BASE_COST * 
      Math.pow(GameConfig.AUTO_CLICKER_COST_MULTIPLIER, this.level + 1)
    );
  }

  apply(): void {
    if (this.player.data.coins >= this.cost) {
      this.player.data.coins -= this.cost;
      this.level++;
      this.player.data.autoClickDamage += GameConfig.AUTO_CLICKER_DAMAGE;
    }
  }
}