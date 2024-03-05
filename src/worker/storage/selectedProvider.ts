import { ProviderKey } from "@/types/Provider";

import { defaultProvider } from "@/defaults";

const storageKey = "kwerySelectedProvider";

export async function getSelectedProvider(): Promise<ProviderKey> {
    const { [storageKey]: selectedProvider } =
        await chrome.storage.local.get(storageKey);

    return selectedProvider || defaultProvider;
}

export async function setSelectedProvider(selectedProvider: ProviderKey) {
    await chrome.storage.local.set({
        [storageKey]: selectedProvider
    });
}
