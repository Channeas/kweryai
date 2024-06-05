import { ProviderKey } from "@/types/Provider";
import { defaultProvider } from "@/defaults";

export const providerStorageKey = "kwerySelectedProvider";

export async function getSelectedProvider(): Promise<ProviderKey> {
    const { [providerStorageKey]: selectedProvider } =
        await chrome.storage.local.get(providerStorageKey);

    return selectedProvider || defaultProvider;
}

export async function setSelectedProvider(selectedProvider: ProviderKey) {
    await chrome.storage.local.set({
        [providerStorageKey]: selectedProvider
    });
}
