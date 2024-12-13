import { NavigatedData, Page } from '@nativescript/core';
import { HomeViewModel } from '../viewmodels/home-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const viewModel = new HomeViewModel();
    page.bindingContext = viewModel;
}