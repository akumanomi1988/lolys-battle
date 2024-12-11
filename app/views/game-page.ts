import { EventData, Page } from '@nativescript/core';
import { GameViewModel } from '../viewmodels/game-view-model';

let viewModel: GameViewModel;

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    viewModel = new GameViewModel();
    page.bindingContext = viewModel;
}

export function onUnloaded() {
    if (viewModel) {
        viewModel.dispose();
    }
}