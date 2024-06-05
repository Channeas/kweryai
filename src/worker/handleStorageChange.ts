import { apiStorageKeyStart } from "./storage/apiKey";
import { providerStorageKey } from "./storage/selectedProvider";
import hasProviderAndApiKey from "./utils/hasProviderAndApiKey";
import sendMessageToExtensionTabs from "./utils/sendMessageToExtensionTabs";

type StorageChanges = {
    [key: string]: chrome.storage.StorageChange;
};

export default async function handleStorageChanges(changes: StorageChanges) {
    await handleProviderAndApiKeyChanges(changes);
}

async function handleProviderAndApiKeyChanges(changes: StorageChanges) {
    const changeKeys = Object.keys(changes);
    if (!hasModifiedProviderOrApiKey(changeKeys)) return;

    const settingsAreValid = await hasProviderAndApiKey();
    if (!settingsAreValid) return;

    await sendMessageToExtensionTabs({
        type: "settingsStatusChanged",
        hasCompletedSetup: true
    });
}

function hasModifiedProviderOrApiKey(changeKeys: string[]): boolean {
    for (const key of changeKeys) {
        if (key === providerStorageKey || key.startsWith(apiStorageKeyStart)) {
            return true;
        }
    }
    return false;
}
