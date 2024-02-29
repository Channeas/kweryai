import { ProviderKey } from "../_types/Provider";

// TODO: It should be possible to clear all keys

export async function getApiKey(provider: ProviderKey): Promise<string> {
    const storageKey = createStorageKeyForProvider(provider);

    const { [storageKey]: apiKey } = await chrome.storage.local.get(storageKey);
    return apiKey;
}

export async function setApiKey(provider: ProviderKey, apiKey: string) {
    const storageKey = createStorageKeyForProvider(provider);

    await chrome.storage.local.set({
        [storageKey]: apiKey
    });
}

function createStorageKeyForProvider(provider: ProviderKey) {
    return `kweryApiKeyFor-${provider}`;
}
