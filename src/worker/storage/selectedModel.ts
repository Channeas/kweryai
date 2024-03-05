import { ProviderKey } from "@/types/Provider";

import { defaultProviderModels } from "@/defaults";

export async function getSelectedModel(provider: ProviderKey): Promise<string> {
    const storageKey = createStorageKeyForProvider(provider);

    const { [storageKey]: storedSelectedModel } =
        await chrome.storage.local.get(storageKey);
    if (storedSelectedModel) {
        return storedSelectedModel;
    }

    return defaultProviderModels[provider];
}

export async function setSelectedModel(
    provider: ProviderKey,
    selectedModel: string
) {
    const storageKey = createStorageKeyForProvider(provider);

    await chrome.storage.local.set({
        [storageKey]: selectedModel
    });
}

function createStorageKeyForProvider(provider: ProviderKey) {
    return `kwerySelectedModelFor-${provider}`;
}
