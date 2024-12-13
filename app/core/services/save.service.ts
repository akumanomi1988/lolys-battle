import { ApplicationSettings } from '@nativescript/core';
import { PlayerModel } from '../../models/player.model';
import { GameState } from '../interfaces/game-state.interface';

export class SaveService {
    private static readonly SAVE_KEY = 'LOLYS_BATTLE_SAVE';
    
    static saveGame(player: PlayerModel): void {
        const saveData: GameState = {
            player: player.data,
            timestamp: Date.now()
        };
        
        ApplicationSettings.setString(
            this.SAVE_KEY, 
            JSON.stringify(saveData)
        );
    }
    
    static loadGame(): GameState | null {
        const saveData = ApplicationSettings.getString(this.SAVE_KEY);
        return saveData ? JSON.parse(saveData) : null;
    }
}