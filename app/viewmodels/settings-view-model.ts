import { Observable, Frame, ApplicationSettings, alert } from '@nativescript/core';

export class SettingsViewModel extends Observable {
    private _soundEnabled: boolean;
    private _musicEnabled: boolean;
    private _notificationsEnabled: boolean;

    constructor() {
        super();
        this._soundEnabled = ApplicationSettings.getBoolean('soundEnabled', true);
        this._musicEnabled = ApplicationSettings.getBoolean('musicEnabled', true);
        this._notificationsEnabled = ApplicationSettings.getBoolean('notificationsEnabled', true);
    }

    get soundEnabled(): boolean {
        return this._soundEnabled;
    }

    get musicEnabled(): boolean {
        return this._musicEnabled;
    }

    get notificationsEnabled(): boolean {
        return this._notificationsEnabled;
    }

    onSoundToggle() {
        this._soundEnabled = !this._soundEnabled;
        ApplicationSettings.setBoolean('soundEnabled', this._soundEnabled);
        this.notifyPropertyChange('soundEnabled', this._soundEnabled);
    }

    onMusicToggle() {
        this._musicEnabled = !this._musicEnabled;
        ApplicationSettings.setBoolean('musicEnabled', this._musicEnabled);
        this.notifyPropertyChange('musicEnabled', this._musicEnabled);
    }

    onNotificationsToggle() {
        this._notificationsEnabled = !this._notificationsEnabled;
        ApplicationSettings.setBoolean('notificationsEnabled', this._notificationsEnabled);
        this.notifyPropertyChange('notificationsEnabled', this._notificationsEnabled);
    }

    async onResetProgress() {
        const result = await alert({
            title: "Reset Progress",
            message: "Are you sure you want to reset all progress? This cannot be undone.",
            okButtonText: "Reset",
            cancelButtonText: "Cancel"
        });

        if (result) {
            ApplicationSettings.clear();
            Frame.topmost().navigate({
                moduleName: "views/splash-page",
                clearHistory: true
            });
        }
    }

    onRestorePurchases() {
        // Implement in-app purchase restoration
        alert("Restoring purchases...");
    }

    onPrivacyPolicy() {
        // Implement privacy policy navigation
    }

    onTermsOfService() {
        // Implement terms of service navigation
    }

    onBackButtonTap() {
        Frame.topmost().goBack();
    }
}