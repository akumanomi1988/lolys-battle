import { ApplicationSettings } from '@nativescript/core';
import { PlayerModel } from '../../models/player.model';

export class SaveService {
  private static readonly SAVE_KEY = 'LOLYS_BATTLE_SAVE';
  
  static saveGame(player: PlayerModel): void {
    const saveData = {
      player: player.data,
      timestamp: Date.now()
    };
    
    ApplicationSettings.setString(
      this.SAVE_KEY, 
      JSON.stringify(saveData)
    );
  }
  
  static loadGame(): any {
    const saveData = ApplicationSettings.getString(this.SAVE_KEY);
    return saveData ? JSON.parse(saveData) : null;
  }
}