import { Observable, Frame } from '@nativescript/core';
import { PlayerModel } from '../models/player.model';

interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: 'coins' | 'gems';
    imagePath: string;
    effect: () => void;
}

export class ShopViewModel extends Observable {
    private player: PlayerModel;
    private _shopItems: ShopItem[];

    constructor() {
        super();
        this.player = PlayerModel.getInstance();
        this.initializeShopItems();
    }

    get shopItems(): ShopItem[] {
        return this._shopItems;
    }

    private initializeShopItems() {
        this._shopItems = [
            {
                id: 'autoClicker1',
                name: 'Basic Auto Clicker',
                description: 'Automatically clicks once per second',
                price: 100,
                currency: 'coins',
                imagePath: '~/assets/shop/auto-clicker.png',
                effect: () => this.player.data.autoClickDamage += 1
            },
            {
                id: 'damageBoost1',
                name: 'Damage Boost',
                description: 'Increases tap damage by 50%',
                price: 200,
                currency: 'coins',
                imagePath: '~/assets/shop/damage-boost.png',
                effect: () => this.player.data.tapDamage *= 1.5
            },
            {
                id: 'energyBoost1',
                name: 'Energy Boost',
                description: 'Increases max energy by 5',
                price: 50,
                currency: 'gems',
                imagePath: '~/assets/shop/energy-boost.png',
                effect: () => { /* Implement energy boost */ }
            }
        ];
    }

    onBuyItem(args: EventData) {
        const button = args.object as Button;
        const item = this._shopItems.find(i => i.id === button.id);
        
        if (!item) return;

        if (item.currency === 'coins' && this.player.data.coins >= item.price) {
            this.player.data.coins -= item.price;
            item.effect();
            this.notifyPropertyChange('player', this.player.data);
        } else if (item.currency === 'gems' && this.player.data.gems >= item.price) {
            this.player.data.gems -= item.price;
            item.effect();
            this.notifyPropertyChange('player', this.player.data);
        }
    }

    onBackButtonTap() {
        Frame.topmost().goBack();
    }
}