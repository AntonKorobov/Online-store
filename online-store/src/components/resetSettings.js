const resetSettingsButton = document.querySelector(".reset-settings-button");

export function eventClickResetSettings() {
    resetSettingsButton.addEventListener('click', () => {
        localStorage.clear();
        document.location.reload();
    })
}