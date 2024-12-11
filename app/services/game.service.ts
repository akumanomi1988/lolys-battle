import { Observable } from '@nativescript/core';
import { PlayerModel } from '../models/player.model';
import { Loly, LolyModel } from '../models/loly.model';
import { SaveService } from './save.service';

export class GameService extends Observable {
  private player: PlayerModel;
  private _currentLoly: Loly;
  private autoClickInterval: number;
  private saveInterval: number;

  constructor() {
    super();
    this.player = PlayerModel.getInstance();
    this.loadGame();
    this.generateNewLoly();
    this.startAutoClick();
    this.startAutoSave();
  }

  get currentLoly(): Loly {
    return this._currentLoly;
  }

  onTap(): void {
    this.damageLoly(this.player.data.tapDamage);
  }

  private damageLoly(damage: number): void {
    this._currentLoly.currentHealth = Math.max(0, this._currentLoly.currentHealth - damage);
    
    if (this._currentLoly.currentHealth <= 0) {
      this.defeatLoly();
    }
    
    this.notifyPropertyChange('currentLoly', this._currentLoly);
  }

  private defeatLoly(): void {
    this.player.addCoins(this._currentLoly.coins);
    this.player.addExperience(this._currentLoly.experience);
    this.generateNewLoly();
  }

  private generateNewLoly(): void {
    this._currentLoly = LolyModel.generateLoly(this.player.data.level);
    this.notifyPropertyChange('currentLoly', this._currentLoly);
  }

  private startAutoClick(): void {
    this.autoClickInterval = setInterval(() => {
      if (this.player.data.autoClickDamage > 0) {
        this.damageLoly(this.player.data.autoClickDamage);
      }
    }, 1000);
  }

  private startAutoSave(): void {
    this.saveInterval = setInterval(() => {
      SaveService.saveGame(this.player);
    }, 60000);
  }

  private loadGame(): void {
    const saveData = SaveService.loadGame();
    if (saveData && saveData.player) {
      Object.assign(this.player.data, saveData.player);
    }
  }

  dispose(): void {
    clearInterval(this.autoClickInterval);
    clearInterval(this.saveInterval);
    SaveService.saveGame(this.player);
  }
}