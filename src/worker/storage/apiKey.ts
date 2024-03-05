import { obfuscateApiKey } from "@/utils/obfuscateText";
import { allProviderKeys, ProviderKey } from "@/types/Provider";
import { ApiKeysObject } from "@/types/Settings";

export async function getApiKey(provider: ProviderKey): Promise<string> {
    const storageKey = createStorageKeyForProvider(provider);

    const { [storageKey]: apiKey } = await chrome.storage.local.get(storageKey);
    return apiKey;
}

export async function getObfuscatedApiKeys(
    providers: ProviderKey[] = Array.from(allProviderKeys)
): Promise<ApiKeysObject> {
    const storageKeys = allProviderKeys.map(createStorageKeyForProvider);

    const fullApiKeys = await chrome.storage.local.get(storageKeys);

    const obfuscatedApiKeys: ApiKeysObject = {};
    for (let index = 0; index < providers.length; index++) {
        let valueForProvider = "";

        const apiKeyForProvider = fullApiKeys[storageKeys[index]];
        if (apiKeyForProvider) {
            valueForProvider = obfuscateApiKey(apiKeyForProvider);
        }

        obfuscatedApiKeys[providers[index]] = valueForProvider;
    }

    return obfuscatedApiKeys;
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
