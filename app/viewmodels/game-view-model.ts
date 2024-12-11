import { Observable } from '@nativescript/core';
import { GameService } from '../services/game.service';
import { PlayerModel } from '../models/player.model';
import { LolyModel } from '../models/loly.model';

export class GameViewModel extends Observable {
    private gameService: GameService;
    private playerModel: PlayerModel;
    private _currentDialogue: string = '';

    constructor() {
        super();
        this.gameService = new GameService();
        this.playerModel = PlayerModel.getInstance();
        
        this.gameService.on('propertyChange', (data: any) => {
            if (data.propertyName === 'currentLoly') {
                this.notifyPropertyChange('currentLoly', this.currentLoly);
                this.showNewLolyDialogue();
            }
        });

        // Show initial dialogue
        this.showNewLolyDialogue();
    }

    get player() {
        return this.playerModel.data;
    }

    get currentLoly() {
        return this.gameService.currentLoly;
    }

    get currentDialogue() {
        return this._currentDialogue;
    }

    onLolyTap() {
        this.gameService.onTap();
        
        // Show defeat dialogue if loly is defeated
        if (this.currentLoly.currentHealth <= 0) {
            this._currentDialogue = LolyModel.getRandomDialogue(this.currentLoly.dialogues.defeat);
            this.notifyPropertyChange('currentDialogue', this._currentDialogue);
        }
    }

    private showNewLolyDialogue() {
        this._currentDialogue = LolyModel.getRandomDialogue(this.currentLoly.dialogues.intro);
        this.notifyPropertyChange('currentDialogue', this._currentDialogue);
    }

    onCharactersTap() {
        // TODO: Implement character selection navigation
        console.log('Characters tapped');
    }

    onShopTap() {
        console.log('Shop tapped');
    }

    onSettingsTap() {
        console.log('Settings tapped');
    }

    dispose() {
        this.gameService.dispose();
    }
}