import { Observable, Frame } from '@nativescript/core';
import { GameService } from '../services/game/game.service';
import { PlayerModel } from '../models/player.model';
import { LolyModel } from '../models/loly.model';
import { formatNumber } from '../core/utils/number-formatter';

export class GameViewModel extends Observable {
    private gameService: GameService;
    private playerModel: PlayerModel;
    private _currentDialogue: string = '';
    private tapCount: number = 0;
    private lastTapTime: number = 0;

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

    get formattedDamage() {
        return formatNumber(this.player.tapDamage);
    }

    get healthPercentage() {
        if (!this.currentLoly) return 0;
        return (this.currentLoly.currentHealth / this.currentLoly.maxHealth) * 100;
    }

    onLolyTap(args: any) {
        const now = Date.now();
        if (now - this.lastTapTime < 50) return; // Prevent too rapid taps
        this.lastTapTime = now;

        this.gameService.onTap();
        this.tapCount++;
        
        // Visual feedback
        const loly = args.object;
        loly.animate({
            scale: { x: 0.95, y: 0.95 },
            duration: 50
        }).then(() => {
            loly.animate({
                scale: { x: 1, y: 1 },
                duration: 50
            });
        });
        
        // Show damage numbers
        this.showDamageNumber(args.object, this.player.tapDamage);
        
        if (this.currentLoly.currentHealth <= 0) {
            this._currentDialogue = LolyModel.getRandomDialogue(this.currentLoly.dialogues.defeat);
            this.notifyPropertyChange('currentDialogue', this._currentDialogue);
        }
    }

    private showDamageNumber(target: any, damage: number) {
        const page = Frame.topmost().currentPage;
        const damageLabel = new Label();
        damageLabel.text = `-${formatNumber(damage)}`;
        damageLabel.className = 'text-red-500 font-bold text-lg';
        
        // Random position around tap location
        const x = target.getLocationOnScreen().x + Math.random() * 50 - 25;
        const y = target.getLocationOnScreen().y + Math.random() * 50 - 25;
        
        damageLabel.translateX = x;
        damageLabel.translateY = y;
        
        page.addChild(damageLabel);
        
        damageLabel.animate({
            translate: { x: x, y: y - 100 },
            opacity: 0,
            duration: 1000
        }).then(() => {
            page.removeChild(damageLabel);
        });
    }

    private showNewLolyDialogue() {
        this._currentDialogue = LolyModel.getRandomDialogue(this.currentLoly.dialogues.intro);
        this.notifyPropertyChange('currentDialogue', this._currentDialogue);
    }

    onCharactersTap() {
        Frame.topmost().navigate({
            moduleName: 'views/characters-page',
            transition: {
                name: 'slide'
            }
        });
    }

    onShopTap() {
        Frame.topmost().navigate({
            moduleName: 'views/shop-page',
            transition: {
                name: 'slide'
            }
        });
    }

    onSettingsTap() {
        Frame.topmost().navigate({
            moduleName: 'views/settings-page',
            transition: {
                name: 'slide'
            }
        });
    }

    dispose() {
        this.gameService.dispose();
    }
}