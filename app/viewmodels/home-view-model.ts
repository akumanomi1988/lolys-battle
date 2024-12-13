import { Observable, Frame } from '@nativescript/core';

export class HomeViewModel extends Observable {
    constructor() {
        super();
    }

    onStartGame() {
        Frame.topmost().navigate({
            moduleName: "views/game-page",
            transition: {
                name: "slide"
            }
        });
    }

    onCharacters() {
        Frame.topmost().navigate({
            moduleName: "views/characters-page",
            transition: {
                name: "slide"
            }
        });
    }

    onShop() {
        Frame.topmost().navigate({
            moduleName: "views/shop-page",
            transition: {
                name: "slide"
            }
        });
    }

    onSettings() {
        Frame.topmost().navigate({
            moduleName: "views/settings-page",
            transition: {
                name: "slide"
            }
        });
    }
}