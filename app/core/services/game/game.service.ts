import { Observable } from '@nativescript/core';
import { PlayerModel } from '../../../models/player.model';
import { Loly } from '../../interfaces/models/loly.interface';
import { LolyFactory } from '../../../models/loly/loly.factory';
import { SaveService } from '../save/save.service';
import { AutoClickService } from './auto-click.service';
import { DamageService } from './damage.service';

export class GameService extends Observable {
    private player: PlayerModel;
    private _currentLoly: Loly;
    private autoClickService: AutoClickService;
    private damageService: DamageService;
    private saveInterval: number;

    constructor() {
        super();
        this.player = PlayerModel.getInstance();
        this.damageService = new DamageService(this.player);
        this.autoClickService = new AutoClickService(this.damageService);
        this.initialize();
    }

    private initialize(): void {
        this.loadGame();
        this.generateNewLoly();
        this.autoClickService.start();
        this.startAutoSave();
    }

    get currentLoly(): Loly {
        return this._currentLoly;
    }

    onTap(): void {
        this.damageService.applyTapDamage(this._currentLoly);
        this.checkLolyStatus();
    }

    private checkLolyStatus(): void {
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
        this._currentLoly = LolyFactory.createLoly(this.player.data.level);
        this.notifyPropertyChange('currentLoly', this._currentLoly);
    }

    private startAutoSave(): void {
        this.saveInterval = setInterval(() => {
            SaveService.saveGame(this.player);
        }, 60000);
    }

    private loadGame(): void {
        const saveData = SaveService.loadGame();
        if (saveData?.player) {
            Object.assign(this.player.data, saveData.player);
        }
    }

    dispose(): void {
        this.autoClickService.stop();
        clearInterval(this.saveInterval);
        SaveService.saveGame(this.player);
    }
}