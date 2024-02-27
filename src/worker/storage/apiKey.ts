const storageKey = "kweryOpenaiApiKey";

export async function getApiKey(): Promise<string> {
    const { [storageKey]: apiKey } = await chrome.storage.local.get(storageKey);
    return apiKey;
}

export async function setApiKey(apiKey: string) {
    await chrome.storage.local.set({
        [storageKey]: apiKey
    });
}
