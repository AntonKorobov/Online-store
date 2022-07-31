const resetSettingsButton = document.querySelector('.reset-settings-button') as HTMLElement;

export function eventClickResetSettings() {
    resetSettingsButton.addEventListener('click', () => {
        localStorage.clear();
        document.location.reload();
    });
}
