import { EventData, Page, NavigatedData } from '@nativescript/core';
import { ShopViewModel } from '../viewmodels/shop-view-model';

let viewModel: ShopViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    viewModel = new ShopViewModel();
    page.bindingContext = viewModel;
}

export function onUnloaded() {
    if (viewModel) {
        viewModel.dispose();
    }
}