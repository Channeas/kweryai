import { allProviderKeys, ProviderKey } from "@/types/Provider";

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

export async function clearAllApiKeys() {
    const storageKeys = allProviderKeys.map(createStorageKeyForProvider);
    await chrome.storage.local.remove(storageKeys);
}

function createStorageKeyForProvider(provider: ProviderKey) {
    return `kweryApiKeyFor-${provider}`;
}
