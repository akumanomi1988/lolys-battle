import { NavigatedData, Page } from '@nativescript/core';
import { SettingsViewModel } from '../viewmodels/settings-view-model';

let viewModel: SettingsViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    viewModel = new SettingsViewModel();
    page.bindingContext = viewModel;
}